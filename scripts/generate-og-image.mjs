#!/usr/bin/env node
// ============================================================
// Génère l'image de partage par défaut (Open Graph / Twitter Card)
// ============================================================
//
// Outil ponctuel, à relancer à la main si le logo ou les couleurs de
// marque changent : node scripts/generate-og-image.mjs
// Sortie : public/og-default.png, 1200x630 (format standard OG/Twitter).

import puppeteer from "puppeteer";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LOGO_PATH = path.join(ROOT, "public", "admin-icon-512.png");
const OUT_PATH = path.join(ROOT, "public", "og-default.png");

const WIDTH = 1200;
const HEIGHT = 630;
const BG_DARK = "#0A0A0A";
const ACCENT = "#F28E24";

async function main() {
  const logoBuffer = await readFile(LOGO_PATH);
  const logoDataUri = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: ${BG_DARK};
    overflow: hidden;
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
  }
  .canvas {
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: radial-gradient(circle at 85% 15%, rgba(242, 142, 36, 0.28), transparent 45%),
                radial-gradient(circle at 10% 95%, rgba(242, 142, 36, 0.16), transparent 40%),
                ${BG_DARK};
    display: flex;
    align-items: center;
    padding: 0 90px;
  }
  .bottom-bar {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 10px;
    background: ${ACCENT};
  }
  .logo {
    width: 190px;
    height: 190px;
    flex-shrink: 0;
    margin-right: 64px;
  }
  .text h1 {
    color: #ffffff;
    font-size: 58px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.5px;
    margin-bottom: 22px;
  }
  .text h1 .accent { color: ${ACCENT}; }
  .text p {
    color: #C9C9C9;
    font-size: 27px;
    font-weight: 500;
    line-height: 1.4;
    max-width: 720px;
  }
  .brand {
    position: absolute;
    top: 56px;
    right: 90px;
    color: #ffffff;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 3px;
    opacity: 0.85;
  }
  .brand span { color: ${ACCENT}; }
</style>
</head>
<body>
  <div class="canvas">
    <div class="brand">LYNXA <span>TECH</span></div>
    <img class="logo" src="${logoDataUri}" />
    <div class="text">
      <h1>Innovation <span class="accent">Sans Frontières</span></h1>
      <p>Développement mobile, infrastructure réseau, développement web et cybersécurité — depuis la Guinée, pour l'Afrique de l'Ouest et au-delà.</p>
    </div>
    <div class="bottom-bar"></div>
  </div>
</body>
</html>`;

  const launchOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const browser = await puppeteer.launch(launchOptions);
  try {
    const page = await browser.newPage();
    // deviceScaleFactor: 1 pour obtenir exactement 1200x630 px (dimension
    // standard attendue par les cartes Open Graph / Twitter).
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.screenshot({ path: OUT_PATH, type: "png" });
  } finally {
    await browser.close();
  }

  console.log(`[og-image] Généré : ${path.relative(ROOT, OUT_PATH)}`);
}

main().catch((error) => {
  console.error("[og-image] Échec :", error);
  process.exit(1);
});
