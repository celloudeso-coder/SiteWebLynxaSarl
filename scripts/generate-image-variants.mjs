#!/usr/bin/env node
// Pipeline de génération de variantes d'images, exécuté avant "vite build"
// (voir le script "build" de package.json). Pour chaque image de contenu de
// public/, génère des variantes WebP + repli (JPEG/PNG selon la source) aux
// largeurs 80/160/400/800/1600 px — en s'arrêtant à la largeur native pour ne
// jamais agrandir une image — et écrit un manifeste JSON consommé par
// src/components/AppImage.jsx pour construire srcset/sizes.
//
// Les fichiers générés (public/generated-images/ et
// src/lib/imageManifest.generated.json) sont des artefacts de build : non
// committés (.gitignore), régénérés à chaque "npm run build".

import { readdir, mkdir, stat, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "generated-images");
const MANIFEST_PATH = path.join(ROOT, "src", "lib", "imageManifest.generated.json");

const BREAKPOINTS = [80, 160, 400, 800, 1600];

// Icônes d'app, manifestes PWA et placeholder d'erreur : tailles fixes déjà
// correctes, ou trop rarement affichées pour justifier des variantes.
const SKIP = new Set([
  "admin-icon-192.png",
  "admin-icon-512.png",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "og-default.png", // spec réseaux sociaux : taille fixe 1200×630 requise
]);

async function findContentImages() {
  const entries = await readdir(PUBLIC_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && /\.(png|jpe?g)$/i.test(e.name) && !SKIP.has(e.name))
    .map((e) => e.name);
}

async function processImage(filename) {
  const srcPath = path.join(PUBLIC_DIR, filename);
  const base = filename.replace(/\.(png|jpe?g)$/i, "");
  const ext = /\.png$/i.test(filename) ? "png" : "jpg";

  const img = sharp(srcPath);
  const meta = await img.metadata();
  const nativeWidth = meta.width;

  const widths = BREAKPOINTS.filter((w) => w <= nativeWidth);
  if (widths.length === 0) widths.push(nativeWidth);
  // Toujours inclure la taille native si elle dépasse la plus grande
  // variante générée (jamais de repli plus flou que la source).
  if (widths[widths.length - 1] !== nativeWidth && nativeWidth < BREAKPOINTS[BREAKPOINTS.length - 1]) {
    widths.push(nativeWidth);
  }

  const variants = [];
  for (const w of widths) {
    const webpName = `${base}-${w}w.webp`;
    const fallbackName = `${base}-${w}w.${ext}`;
    const resized = sharp(srcPath).resize({ width: w, withoutEnlargement: true });

    await resized.clone().webp({ quality: 80 }).toFile(path.join(OUT_DIR, webpName));
    if (ext === "png") {
      await resized.clone().png({ quality: 82, compressionLevel: 9 }).toFile(path.join(OUT_DIR, fallbackName));
    } else {
      await resized.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT_DIR, fallbackName));
    }

    variants.push({
      w,
      webp: `/generated-images/${webpName}`,
      fallback: `/generated-images/${fallbackName}`,
    });
  }

  return {
    path: `/${filename}`,
    width: nativeWidth,
    height: meta.height,
    variants,
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = await findContentImages();

  const manifest = {};
  let totalVariants = 0;
  for (const filename of files) {
    const before = await stat(path.join(PUBLIC_DIR, filename));
    const entry = await processImage(filename);
    manifest[entry.path] = entry;
    totalVariants += entry.variants.length;
    console.log(
      `[images] ${filename} (${entry.width}×${entry.height}, ${(before.size / 1024).toFixed(0)} kB) → ${entry.variants.length} variante(s)`,
    );
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`[images] Terminé : ${files.length} image(s) source, ${totalVariants} variante(s) écrites dans public/generated-images/.`);
}

main().catch((err) => {
  console.error("[images] Échec de la génération des variantes :", err);
  process.exitCode = 1;
});
