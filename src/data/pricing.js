// Source unique de vérité pour tous les montants affichés sur le site
// (Services, formulaire Contact, formulaire Partenariat/Demande de projet).
// Les prix sont saisis en dollars US (devise de référence pour nos coûts
// techniques — hébergement, licences, outillage) puis convertis en francs
// guinéens via EXCHANGE_RATE_USD_TO_GNF, affichés en GNF (principal) avec
// l'équivalent USD (secondaire) au format français.
//
// Taux fourni par l'équipe le 24/09/2026 : 1 $ = 9 100 GNF. À mettre à jour
// ici (et seulement ici) si le taux change — aucun montant ne doit être
// recalculé ou recopié ailleurs dans le code.
export const EXCHANGE_RATE_USD_TO_GNF = 9100;
export const EXCHANGE_RATE_DATE = "2026-09-24";

const gnfFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const usdFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export function usdToGnf(usd) {
  return Math.round(usd * EXCHANGE_RATE_USD_TO_GNF);
}

export function formatGNF(usd) {
  return `${gnfFormatter.format(usdToGnf(usd))} GNF`;
}

export function formatUSD(usd) {
  return `${usdFormatter.format(usd)} $`;
}

// Rendu "GNF principal, USD secondaire" pour un montant simple.
export function formatDualPrice(usd) {
  if (usd == null) return null;
  return { primary: formatGNF(usd), secondary: `≈ ${formatUSD(usd)}` };
}

// Rendu "GNF principal, USD secondaire" pour une fourchette min–max.
export function formatDualRange(usdMin, usdMax) {
  if (usdMax == null) return { primary: `À partir de ${formatGNF(usdMin)}`, secondary: `≈ ${formatUSD(usdMin)}+` };
  return {
    primary: `${formatGNF(usdMin)} – ${formatGNF(usdMax)}`,
    secondary: `≈ ${formatUSD(usdMin)} – ${formatUSD(usdMax)}`,
  };
}

// ─── Plans principaux (Services) ───────────────────────────────────────────
// Repli utilisé si la table Supabase "pricing_plans" est vide ; sert aussi de
// valeurs de référence pour aligner le seed (supabase/schema.sql).
export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Pack Startup",
    priceUsd: 500,
    period: "À partir de",
    description: "Pour les startups et PME.",
    features: ["Site web vitrine (5 pages)", "Design responsive", "SEO de base", "1 mois de support"],
    popular: false,
    color: "gray",
  },
  {
    id: "professional",
    name: "Suite Professionnelle",
    priceUsd: 2000,
    period: "À partir de",
    description: "Solution complète pour les entreprises en croissance.",
    features: ["Application web/mobile complète", "Base de données", "API REST", "Authentification", "3 mois de support"],
    popular: true,
    color: "primary",
  },
  {
    id: "enterprise",
    name: "Solution Entreprise",
    priceUsd: null, // "Sur devis" — pas de montant fixe
    period: "Sur mesure",
    description: "Sur mesure pour les grandes organisations.",
    features: ["Architecture sur mesure", "Intégrations illimitées", "SLA négocié au contrat", "Support 24/7", "Chef de projet dédié"],
    popular: false,
    color: "accent",
  },
];

// ─── Services additionnels (Services) ──────────────────────────────────────
// Aucune table CMS dédiée n'existe pour ce bloc (contrairement aux plans
// principaux, qui viennent de "pricing_plans") : ces montants sont donc
// légitimement définis ici en dur, comme unique source de vérité du code.
export const ADDITIONAL_SERVICES = [
  {
    name: "Installation d'Infrastructure Réseau",
    priceMinUsd: 1500,
    priceMaxUsd: 5000,
    priceNote: "ou plus",
    el: ["Câblage", "Installation des équipements", "Configuration", "Documentation"],
    icon: "Wifi",
  },
  {
    name: "Mise en place d'un système complet de supervision et d'inventaire des équipements réseau",
    priceMinUsd: 900,
    priceMaxUsd: 2500,
    el: [
      "Détection proactive des vulnérabilités et anomalies réseau.",
      "Recommandations techniques alignées sur vos priorités et votre budget.",
      "Rapports détaillés, clairs et immédiatement exploitables par vos équipes.",
    ],
    icon: "Activity",
  },
  {
    name: "Migration de Système",
    priceMinUsd: 1250,
    priceMaxUsd: 4000,
    el: ["Zéro perte de données.", "Transition rapide et planifiée.", "Formation pour faciliter l'adoption par vos équipes."],
    icon: "ArrowRightLeft",
  },
  {
    name: "Optimisation des Performances",
    priceMinUsd: 500,
    priceMaxUsd: 2000,
    el: ["Temps de réponse améliorés.", "Moins de pannes et d'interruptions.", "Meilleure productivité pour vos équipes."],
    icon: "Zap",
  },
  {
    name: "Programme de Formation du Personnel",
    priceMinUsd: 350,
    priceMaxUsd: 1500,
    el: ["Sessions adaptées à votre secteur.", "Modules pratiques et interactifs.", "Certificats de participation valorisants."],
    icon: "GraduationCap",
  },
  {
    name: "Maintenance Continue",
    priceMinUsd: 100,
    priceMaxUsd: 500,
    priceNote: "/mois",
    el: [
      `${formatGNF(100)} / mois (≈ ${formatUSD(100)}) — support email + mises à jour de base`,
      `${formatGNF(300)} / mois (≈ ${formatUSD(300)}) — supervision + intervention à distance`,
      `${formatGNF(500)} / mois (≈ ${formatUSD(500)}) — support complet + intervention sur site`,
    ],
    icon: "Settings",
  },
  // Pôle Cybersécurité et Conformité (voir point 2) — mêmes prestations que
  // le domaine d'expertise Services, déclinées en offres tarifées.
  {
    name: "Audit de Vulnérabilités",
    priceMinUsd: 600,
    priceMaxUsd: 2500,
    el: [
      "Cartographie des failles sur votre infrastructure et vos applications.",
      "Priorisation des risques selon leur criticité réelle.",
      "Rapport détaillé avec plan de remédiation.",
    ],
    icon: "Search",
  },
  {
    name: "Test d'Intrusion (Pentest)",
    priceMinUsd: 1200,
    priceMaxUsd: 6000,
    el: [
      "Simulation d'attaque réelle sur vos systèmes (interne ou externe).",
      "Preuves de concept documentées, sans impact sur la production.",
      "Restitution avec l'équipe technique et plan de correction.",
    ],
    icon: "ShieldAlert",
  },
  {
    name: "Durcissement d'Infrastructure",
    priceMinUsd: 800,
    priceMaxUsd: 4000,
    el: [
      "Application des bonnes pratiques de configuration sécurisée.",
      "Réduction de la surface d'attaque (services, accès, privilèges).",
      "Documentation des changements pour vos équipes.",
    ],
    icon: "Lock",
  },
  {
    name: "Réponse à Incident",
    priceMinUsd: 500,
    priceMaxUsd: 3500,
    priceNote: "par incident",
    el: [
      "Confinement et analyse d'un incident de sécurité en cours.",
      "Reconstruction et vérification de l'intégrité des systèmes touchés.",
      "Rapport post-incident et recommandations pour éviter la récidive.",
    ],
    icon: "AlertTriangle",
  },
  {
    name: "Sensibilisation des Équipes",
    priceMinUsd: 300,
    priceMaxUsd: 1200,
    el: [
      "Ateliers pratiques sur le phishing, les mots de passe, les usages à risque.",
      "Supports adaptés au niveau technique de vos équipes.",
      "Mesure de la progression via des simulations.",
    ],
    icon: "Users",
  },
  {
    name: "Conformité des Données",
    priceMinUsd: 700,
    priceMaxUsd: 3000,
    el: [
      "Cartographie des données personnelles et sensibles traitées.",
      "Mise en conformité avec les exigences applicables (protection des données).",
      "Politiques et procédures documentées pour vos équipes.",
    ],
    icon: "FileCheck2",
  },
];

// Fourchette GNF/USD pour un palier de partenariat (CollaborationPathways /
// PathwayInquiryModal), à partir des bornes en dollars — colonnes CMS
// "budget_min_usd"/"budget_max_usd" (table partnership_pathways) ou champs
// statiques équivalents ; repli sur le texte libre "budget" pour les paliers
// sans montant fixe (ex. "Partage de revenus").
export function formatPathwayBudget(pathway) {
  const min = pathway?.budgetMinUsd ?? pathway?.budget_min_usd;
  const max = pathway?.budgetMaxUsd ?? pathway?.budget_max_usd ?? null;
  if (min != null) return formatDualRange(min, max);
  return pathway?.budget ? { primary: pathway.budget, secondary: null } : null;
}

// ─── Fourchettes de budget (formulaires Contact et Partenariat) ────────────
// Une seule échelle continue, sans trou, alignée sur les plans ci-dessus
// (le bas de fourchette couvre le Pack Startup, le haut rejoint "sur devis").
export const BUDGET_BRACKETS = [
  { value: "under-1k", usdMin: 0,     usdMax: 1000,  label: null },
  { value: "1k-3k",    usdMin: 1000,  usdMax: 3000,  label: null },
  { value: "3k-7k",    usdMin: 3000,  usdMax: 7000,  label: null },
  { value: "7k-15k",   usdMin: 7000,  usdMax: 15000, label: null },
  { value: "15k-30k",  usdMin: 15000, usdMax: 30000, label: null },
  { value: "over-30k", usdMin: 30000, usdMax: null,  label: null },
  { value: "discuss",  usdMin: null,  usdMax: null,  label: "Préfère en discuter" },
].map((b) => ({
  ...b,
  label: b.label || (
    b.usdMax == null
      ? `Plus de ${formatGNF(b.usdMin)} (≈ ${formatUSD(b.usdMin)}+)`
      : b.usdMin === 0
        ? `Moins de ${formatGNF(b.usdMax)} (≈ ${formatUSD(b.usdMax)})`
        : `${formatGNF(b.usdMin)} – ${formatGNF(b.usdMax)} (≈ ${formatUSD(b.usdMin)} – ${formatUSD(b.usdMax)})`
  ),
}));
