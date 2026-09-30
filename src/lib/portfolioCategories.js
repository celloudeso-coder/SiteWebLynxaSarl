// Catégories de service du portfolio : une CLÉ stable et invisible
// (« cybersecurity »), stockée dans portfolio_projects.service_type et
// comparée par le code, et un LIBELLÉ affiché (« Cybersécurité »), réglable
// dans l'admin (site_settings.portfolio_filter_options.services).
// Renommer une catégorie = changer son libellé, jamais sa clé.

export const ALL_SERVICES = "all";

// Liste par défaut (libellés de choix, pas des faits : repli autorisé).
export const DEFAULT_SERVICE_CATEGORIES = [
  { key: "mobile-development",     label: "Développement mobile" },
  { key: "network-infrastructure", label: "Infrastructure réseau" },
  { key: "web-development",        label: "Développement web" },
  { key: "cybersecurity",          label: "Cybersécurité" },
];

// Anciennes valeurs (libellés anglais ou français stockés tels quels avant
// la séparation clé/libellé) → clé. Permet au code de fonctionner avant
// comme après la migration 20260930120000_portfolio_category_keys.sql.
const LEGACY_KEYS = {
  "Mobile Development": "mobile-development",
  "Développement Mobile": "mobile-development",
  "Network Infrastructure": "network-infrastructure",
  "Infrastructure Réseau": "network-infrastructure",
  "Web Development": "web-development",
  "Développement Web": "web-development",
  "Cybersecurity": "cybersecurity",
  "Cybersécurité": "cybersecurity",
  "Cloud & DevOps": "cloud-devops",
  "Data & Analytics": "data-analytics",
};

// Libellés français par défaut, pour afficher en français les anciennes
// valeurs tant que la liste n'a pas été convertie (ou renommée dans l'admin).
const DEFAULT_LABELS = {
  ...Object.fromEntries(DEFAULT_SERVICE_CATEGORIES.map((c) => [c.key, c.label])),
  "cloud-devops": "Cloud & DevOps",
  "data-analytics": "Données & analytique",
};

export function categoryKey(value) {
  if (!value) return "";
  return LEGACY_KEYS[value] || value;
}

// Accepte l'ancien format (tableau de chaînes, avec « Tous ») comme le
// nouveau (tableau de { key, label }).
export function normalizeCategories(list) {
  if (!Array.isArray(list) || list.length === 0) return DEFAULT_SERVICE_CATEGORIES;
  const out = list
    .map((c) => (typeof c === "string"
      ? { key: categoryKey(c), label: DEFAULT_LABELS[categoryKey(c)] || c }
      : { key: c?.key, label: c?.label || DEFAULT_LABELS[c?.key] || c?.key }))
    .filter((c) => c.key && c.key !== "Tous" && c.key !== ALL_SERVICES);
  return out.length ? out : DEFAULT_SERVICE_CATEGORIES;
}

export function categoryLabel(categories, key) {
  return categories.find((c) => c.key === key)?.label || DEFAULT_LABELS[key] || key;
}

// Icône et bouton de lien propres à chaque catégorie, indexés par clé.
const META = {
  "mobile-development":     { icon: "Smartphone", linkLabel: "Voir l'application", linkIcon: "Smartphone" },
  "web-development":        { icon: "Globe",      linkLabel: "Voir le site",       linkIcon: "Globe" },
  "network-infrastructure": { icon: "Network",    linkLabel: "Voir le rapport",    linkIcon: "FileText" },
  "cybersecurity":          { icon: "Shield",     linkLabel: "Voir le rapport",    linkIcon: "ShieldCheck" },
};
const DEFAULT_META = { icon: "Code", linkLabel: "Voir le projet", linkIcon: "ExternalLink" };

export function categoryMeta(key) {
  return META[key] || DEFAULT_META;
}
