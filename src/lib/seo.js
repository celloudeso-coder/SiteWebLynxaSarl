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

export const SITE_NAME = "LYNXA SARL";

// Générée par scripts/generate-og-image.mjs (1200x630, format standard
// Open Graph / Twitter Card). Une page peut fournir sa propre image via
// la prop `image` de <Seo>.
export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";
export const DEFAULT_OG_IMAGE_ALT = "Lynxa Tech Guinée — Innovation Sans Frontières";

// Données de contact statiques : volontairement pas issues du hook
// useSiteSettings (fetch Supabase asynchrone) pour que le JSON-LD soit
// présent dès le premier rendu, y compris pendant le prerendering au
// build où l'on ne peut pas garantir l'arrivée des données CMS à temps.
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lynxa Tech Guinea",
  legalName: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/admin-icon-512.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Conakry",
    addressCountry: "GN",
  },
  telephone: "+224 614 666 680",
  email: "contact@lynxatech.com",
  sameAs: [
    "https://www.linkedin.com/company/lynxatech",
    "https://twitter.com/LynxaTechGuinea",
    "https://facebook.com/LynxaTechGuinea",
  ],
};
