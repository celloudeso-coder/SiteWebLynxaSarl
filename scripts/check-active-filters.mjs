#!/usr/bin/env node
// ============================================================
// Garde-fou : lectures publiques de src/lib/cms.js et colonne `active`
// ============================================================
//
// Toute lecture publique d'une table qui a une colonne `active` doit filtrer
// explicitement `active = true`. La RLS n'est pas un filtre d'affichage :
// quand un admin est connecté dans le navigateur, la policy
// cms_authenticated_read lui renvoie aussi les lignes désactivées, sur le
// site public comme dans l'admin (bug des Engagements légaux sur
// /partnership et du Laboratoire d'Innovation sur /portfolio).
//
// Méthode : on exécute réellement le module. src/lib/cms.js est chargé par
// Vite avec un faux client Supabase qui enregistre chaque requête, puis
// chaque fonction exportée get* est appelée avec ses arguments par défaut,
// c'est-à-dire l'appel public (les écrans d'admin passent activeOnly =
// false). Pour chaque lecture d'une table à colonne `active`, la requête
// doit contenir .eq("active", true).
//
// Tables à colonne `active` : lues dans supabase/schema.sql et
// supabase/migrations/*.sql (CREATE TABLE … active boolean, ALTER TABLE …
// ADD COLUMN active).
//
// Exécuté en tête de `npm run build` : une régression fait échouer le build,
// donc le déploiement. Lancement seul : npm test.
// Argument facultatif : chemin d'un autre fichier cms.js à vérifier.

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CMS_FILE = path.resolve(process.argv[2] || path.join(ROOT, "src/lib/cms.js"));

// Fonctions get* exportées qui lisent volontairement une table à colonne
// `active` sans filtre (lecture réservée à l'admin). Chaque entrée doit
// être justifiée : appelée uniquement par l'admin, et table sans policy de
// lecture pour anon.
const ADMIN_ONLY_READS = {
  // SubscriptionTrackerAdmin ; lecture limitée à has_admin_permission('subscriptions').
  getTrackedSubscriptions: "suivi des abonnements clients, l'admin doit voir les inactifs",
  // NewsletterAdmin ; lecture limitée à has_admin_permission('newsletter').
  getNewsletterSubscriptions: "abonnés newsletter, l'admin doit voir les désinscrits",
};

async function tablesWithActiveColumn() {
  const migrationsDir = path.join(ROOT, "supabase/migrations");
  const files = [path.join(ROOT, "supabase/schema.sql")];
  for (const name of (await readdir(migrationsDir)).sort()) {
    if (name.endsWith(".sql")) files.push(path.join(migrationsDir, name));
  }
  const tables = new Set();
  const ident = String.raw`(?:"?public"?\.)?"?([a-z_][a-z0-9_]*)"?`;
  for (const file of files) {
    const sql = await readFile(file, "utf8");
    const createTable = new RegExp(String.raw`CREATE TABLE (?:IF NOT EXISTS )?${ident}\s*\(([\s\S]*?)\n\);`, "gi");
    for (const [, table, body] of sql.matchAll(createTable)) {
      if (/^\s*"?active"?\s+boolean\b/im.test(body)) tables.add(table);
    }
    const addColumn = new RegExp(String.raw`ALTER TABLE (?:ONLY )?(?:IF EXISTS )?${ident}\s+ADD COLUMN (?:IF NOT EXISTS )?"?active"?\s+boolean`, "gi");
    for (const [, table] of sql.matchAll(addColumn)) tables.add(table);
  }
  return tables;
}

// Faux client Supabase : chaque supabase.from(table) renvoie une chaîne qui
// enregistre ses appels et se résout en { data: [], error: null }.
const MOCK_ID = "\0mock-supabase";
const MOCK_SOURCE = `
export const queries = [];
function chain(table) {
  const query = { table, calls: [] };
  queries.push(query);
  const proxy = new Proxy(function () {}, {
    get(_, prop) {
      if (prop === "then") {
        return (resolve) => resolve({ data: [], error: null });
      }
      return (...args) => { query.calls.push([prop, args]); return proxy; };
    },
  });
  return proxy;
}
export const supabase = {
  from: (table) => chain(table),
  storage: { from: () => chain("storage") },
  auth: new Proxy({}, { get: () => async () => ({ data: {}, error: null }) }),
};
`;

const mockSupabasePlugin = {
  name: "mock-supabase",
  enforce: "pre",
  resolveId(source) {
    if (source === "./supabase" || source.endsWith("/lib/supabase") || source.endsWith("/lib/supabase.js")) return MOCK_ID;
    // Permet de vérifier une copie de cms.js placée hors de src/lib.
    if (source === "./imageCompression") return path.join(ROOT, "src/lib/imageCompression.js");
    return null;
  },
  load(id) {
    return id === MOCK_ID ? MOCK_SOURCE : null;
  },
};

async function main() {
  const activeTables = await tablesWithActiveColumn();
  if (activeTables.size === 0) {
    throw new Error("aucune table à colonne active trouvée dans le schéma : vérification impossible");
  }

  const server = await createServer({
    root: ROOT,
    configFile: false,
    logLevel: "error",
    appType: "custom",
    server: { middlewareMode: true, hmr: false, fs: { strict: false } },
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [mockSupabasePlugin],
  });

  const failures = [];
  let checkedReads = 0;
  try {
    const mock = await server.ssrLoadModule(MOCK_ID);
    const cms = await server.ssrLoadModule(CMS_FILE);
    const getters = Object.keys(cms).filter((name) => /^get[A-Z]/.test(name) && typeof cms[name] === "function");

    for (const name of getters) {
      mock.queries.length = 0;
      try {
        await cms[name]();
      } catch {
        // Une erreur après la requête ne change rien : on vérifie ce qui a été demandé.
      }
      for (const query of mock.queries) {
        const isRead = query.calls.some(([method]) => method === "select");
        if (!isRead || !activeTables.has(query.table)) continue;
        checkedReads++;
        const filtered = query.calls.some(([method, args]) => method === "eq" && args[0] === "active" && args[1] === true);
        if (!filtered && !(name in ADMIN_ONLY_READS)) failures.push(`${name}() lit « ${query.table} » sans .eq("active", true)`);
      }
    }
  } finally {
    await server.close();
  }

  const label = path.relative(ROOT, CMS_FILE) || CMS_FILE;
  if (failures.length) {
    console.error(`[check-active-filters] ÉCHEC : ${failures.length} lecture(s) publique(s) de ${label} sans filtre active = true :`);
    for (const failure of failures) console.error(`  - ${failure}`);
    console.error("Ajouter le paramètre activeOnly = true (modèle : getProjects), et passer false depuis l'écran d'admin.");
    process.exit(1);
  }
  console.log(`[check-active-filters] OK : ${checkedReads} lecture(s) de tables à colonne active vérifiées dans ${label} (${activeTables.size} tables à colonne active).`);
}

main().catch((err) => {
  console.error("[check-active-filters] Erreur :", err?.message || err);
  process.exit(1);
});
