#!/usr/bin/env node
// ============================================================
// Prerendering des routes publiques (post "vite build")
// ============================================================
//
// Le site est une SPA 100% CSR : title/description/OG/canonical sont
// injectés par react-helmet après montage de React. C'est invisible pour
// tout ce qui ne rend pas le JS (crawlers Open Graph de Facebook/LinkedIn/
// X, la plupart des audits SEO, curl…). Ce script ouvre chaque route
// publique dans un vrai Chromium headless après le build, attend que React
// + Helmet aient fini de peindre le <head>, puis écrit le HTML obtenu tel
// quel dans dist/. Le bundle JS chargé ensuite par le navigateur est
// inchangé : on ne fait que remplacer la coquille statique de dist/ par un
// instantané fidèle, sans passer en SSR/hydratation.
//
// /admin/* est volontairement exclu (panneau privé, jamais indexé).
//
// En local et en préproduction (Vercel preview, ou CI sans cible de prod
// explicite) : best-effort. Si Chromium ne peut pas être lancé, on logue un
// avertissement et on sort en succès — le site se déploie comme avant (SPA
// pure), sans régression. En revanche, sur un build CI/Vercel dont la
// cible EST la production, un prerendering manquant est une régression SEO
// silencieuse inacceptable : le build échoue avec un message explicite.

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");
const PORT = 4318;

// Les 6 routes publiques principales du site (voir la nav dans Header.jsx).
// /admin/* reste hors prerendering.
const ROUTES = ["/", "/about", "/service", "/portfolio", "/partnership", "/contact"];

// true sur un runner CI générique (GitHub Actions, etc.) ou sur Vercel.
function isRunningOnCiOrVercel() {
  return process.env.CI === "true" || process.env.CI === "1" || Boolean(process.env.VERCEL);
}

// true si la cible du build est la production.
function isProductionTarget() {
  if (process.env.VERCEL) {
    // Vercel positionne VERCEL_ENV sur CHAQUE déploiement : "production",
    // "preview" ou "development" — c'est le signal le plus fiable, il
    // distingue nativement la production de la préproduction (preview).
    return process.env.VERCEL_ENV === "production";
  }
  // CI générique hors Vercel : PRERENDER_TARGET=production permet de le
  // préciser explicitement dans le pipeline ; à défaut on se fie à
  // NODE_ENV s'il est déjà positionné par l'environnement appelant.
  return process.env.PRERENDER_TARGET === "production" || process.env.NODE_ENV === "production";
}

const STRICT_MODE = isRunningOnCiOrVercel() && isProductionTarget();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json",
};

async function startStaticServer() {
  // Capturée une seule fois, avant que la boucle de prerendering ne se mette
  // à écraser dist/index.html avec le rendu de "/". Sans ça, la route
  // traitée après "/" retomberait sur le HTML déjà rendu de Home au lieu de
  // la coquille SPA vierge — le <script> de sélection du manifeste s'y
  // exécuterait une seconde fois et dupliquerait le <link rel="manifest">.
  const pristineIndexHtml = await readFile(path.join(DIST_DIR, "index.html"), "utf-8");

  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const filePath = path.join(DIST_DIR, urlPath);

    let isRealFile = false;
    try {
      const info = await stat(filePath);
      isRealFile = info.isFile();
    } catch {
      isRealFile = false;
    }

    if (isRealFile) {
      res.setHeader("Content-Type", MIME_TYPES[path.extname(filePath)] || "application/octet-stream");
      const stream = createReadStream(filePath);
      stream.on("error", () => {
        res.statusCode = 404;
        res.end("Not found");
      });
      stream.pipe(res);
      return;
    }

    // Pas de fichier statique à ce chemin : on retombe sur la coquille SPA
    // pristine, exactement comme le rewrite catch-all de Vercel
    // (vercel.json) le ferait pour toute route non explicitement listée.
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(pristineIndexHtml);
  });

  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

// react-helmet ajoute sa propre <meta name="description"> sans savoir
// qu'une description par défaut existe déjà dans index.html : les deux
// coexistent dans le DOM rendu. Pour le HTML statique qu'on écrit ici, on
// ne garde que celle posée par Helmet (marquée data-react-helmet="true"),
// pour ne pas laisser deux balises description dans la même page — les
// moteurs de recherche ne garantissent pas laquelle des deux ils retiennent.
function dedupeStaticDescription(html) {
  const descriptionTag = /<meta\s+name="description"[^>]*>/g;
  const matches = html.match(descriptionTag) || [];
  const hasHelmetVersion = matches.some((tag) => tag.includes("data-react-helmet"));
  if (!hasHelmetVersion || matches.length < 2) return html;
  let removedStaticOne = false;
  return html.replace(descriptionTag, (tag) => {
    if (!removedStaticOne && !tag.includes("data-react-helmet")) {
      removedStaticOne = true;
      return "";
    }
    return tag;
  });
}

// Extrait un résumé diagnostique du HTML final écrit sur disque, pour le
// récapitulatif affiché en fin de build.
function summarizeRoute(route, html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const descriptionMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  return {
    Route: route,
    Titre: titleMatch ? titleMatch[1] : "(absent)",
    "Longueur description": descriptionMatch ? descriptionMatch[1].length : 0,
    Canonical: /<link\s+rel="canonical"/.test(html) ? "✓" : "✗",
    "og:image": /<meta\s+property="og:image"/.test(html) ? "✓" : "✗",
    "JSON-LD": /application\/ld\+json/.test(html) ? "✓" : "✗",
  };
}

function printRouteSummary(summaries) {
  console.log("\n[prerender] Récapitulatif par route :");
  console.table(summaries);
}

async function outputPathFor(route) {
  const outDir = route === "/" ? DIST_DIR : path.join(DIST_DIR, route);
  await mkdir(outDir, { recursive: true });
  return path.join(outDir, "index.html");
}

async function prerender() {
  // Import différé : si "puppeteer" n'est pas installé (install --production
  // sans devDependencies, par ex.), on doit pouvoir sortir proprement plutôt
  // que de faire planter tout le build.
  const { default: puppeteer } = await import("puppeteer");

  const server = await startStaticServer();
  console.log(`[prerender] Serveur statique de dist/ sur http://127.0.0.1:${PORT}`);

  const launchOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  try {
    const browser = await puppeteer.launch(launchOptions);
    const results = [];
    try {
      for (const route of ROUTES) {
        const page = await browser.newPage();
        try {
          const url = `http://127.0.0.1:${PORT}${route}`;
          // "domcontentloaded" plutôt que "networkidle0" : certaines pages
          // font du polling ou dépendent d'appels Supabase qui peuvent
          // tarder sans jamais devenir totalement inactifs. On synchronise
          // plutôt sur un signal explicite : le titre posé par react-helmet.
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
          await page.waitForFunction(
            () => document.title && document.title !== "Lynxa Tech",
            { timeout: 15000 },
          ).catch(() => {
            console.warn(`[prerender] ${route} : le titre par défaut n'a pas changé avant le timeout (capture quand même).`);
          });
          // Laisse le temps au reste du <head> (description/OG/canonical,
          // posés dans le même bloc <Helmet>) et au premier rendu visible
          // de se stabiliser.
          await new Promise((resolve) => setTimeout(resolve, 400));

          const html = dedupeStaticDescription(await page.content());
          const outFile = await outputPathFor(route);
          await writeFile(outFile, html, "utf-8");
          results.push({ route, outFile, ok: true, summary: summarizeRoute(route, html) });
          console.log(`[prerender] ✓ ${route} → ${path.relative(process.cwd(), outFile)}`);
        } finally {
          await page.close();
        }
      }
    } finally {
      await browser.close();
    }
    return results;
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

async function main() {
  const distInfo = await stat(DIST_DIR).catch(() => null);
  if (!distInfo || !distInfo.isDirectory()) {
    console.warn("[prerender] dist/ introuvable — lancez d'abord \"vite build\". Étape ignorée.");
    return;
  }

  try {
    const results = await prerender();
    console.log(`[prerender] Terminé : ${results.length} route(s) prérendue(s).`);
    printRouteSummary(results.map((r) => r.summary));
  } catch (error) {
    if (STRICT_MODE) {
      // Build CI/Vercel ciblant la production : un prerendering manquant
      // serait une régression SEO silencieuse (retour au HTML générique
      // sans title/description/OG par page). On fait échouer le build
      // plutôt que de le laisser passer discrètement.
      console.error("[prerender] ÉCHEC — build de production (CI/Vercel, VERCEL_ENV=production) sans prerendering.");
      console.error(`[prerender] Raison : ${error?.message || error}`);
      console.error("[prerender] Corrigez l'environnement de build (Chromium indisponible ?) ou, en dernier recours,");
      console.error("[prerender] forcez le mode best-effort avec PRERENDER_TARGET=preview.");
      process.exitCode = 1;
      return;
    }
    // Local ou préproduction : ne jamais faire échouer "npm run build" à
    // cause du prerendering — le site reste déployable en SPA pure si
    // Chromium n'a pas pu tourner dans cet environnement.
    console.warn("[prerender] Étape ignorée (best-effort, hors production) — le build SPA reste valide.");
    console.warn(`[prerender] Raison : ${error?.message || error}`);
  }
}

main();
