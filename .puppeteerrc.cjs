// Sur Vercel, le prérendu utilise @sparticuz/chromium (voir
// scripts/prerender.mjs) : le Chrome que puppeteer télécharge à
// l'installation ne peut pas y démarrer (bibliothèques système absentes).
// On évite donc ce téléchargement inutile là-bas ; en local et en Docker,
// rien ne change.
module.exports = {
  skipDownload: Boolean(process.env.VERCEL),
};
