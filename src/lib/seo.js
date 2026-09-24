// Base URL du site, utilisée pour construire toutes les URL absolues (canonical,
// og:url, og:image…). VITE_SITE_URL permet de la surcharger en préproduction
// (preview Vercel, staging) sans toucher au code.
const rawSiteUrl = import.meta.env.VITE_SITE_URL || "https://www.lynxatech.com";
export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

// Construit une URL absolue à partir d'un chemin ("/about") ou la retourne
// telle quelle si elle est déjà absolue.
export function absoluteUrl(pathOrUrl = "/") {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${cleanPath}`;
}
