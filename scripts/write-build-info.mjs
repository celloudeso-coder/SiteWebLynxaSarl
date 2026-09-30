// Écrit dist/build-info.json : {"builtAt":"<ISO 8601>","commit":"<sha court>"}.
//
// L'admin (bouton « Publier les modifications ») interroge ce fichier pour
// savoir quand le build déclenché est en ligne : builtAt postérieur à la
// demande = site à jour. Exécuté en dernière étape du build, après le
// prérendu, pour que builtAt corresponde à un site complet.
//
// Commit : VERCEL_GIT_COMMIT_SHA sur Vercel, sinon le sha git local.
// Pas de cache longue durée : ni vercel.json ni nginx.conf n'en posent sur
// les .json (seuls js, css, images et polices sont en cache 1 an).

import { execSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
if (!existsSync(distDir)) {
  console.error("write-build-info : dist/ introuvable, lancer vite build d'abord.");
  process.exit(1);
}

function shortCommit() {
  const vercelSha = process.env.VERCEL_GIT_COMMIT_SHA;
  if (vercelSha) return vercelSha.slice(0, 7);
  try {
    return execSync("git rev-parse --short=7 HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "unknown";
  }
}

const info = { builtAt: new Date().toISOString(), commit: shortCommit() };
writeFileSync(resolve(distDir, "build-info.json"), JSON.stringify(info) + "\n");
console.log(`write-build-info : dist/build-info.json ${JSON.stringify(info)}`);
