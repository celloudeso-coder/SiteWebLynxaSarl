// Source unique de vérité pour tous les montants affichés sur le site
// (Services, Accueil, À propos, formulaires Contact et Partenariat).
//
// Le franc guinéen est la valeur SAISIE : chaque prix ci-dessous est un
// montant rond, décidé commercialement. Le dollar n'est qu'une valeur
// DÉRIVÉE, calculée à l'affichage et arrondie à la dizaine — il ne doit
// jamais être saisi ni stocké.
//
// Règle d'arrondi des montants GNF (voir roundGnfToCommercialTier) :
//   - moins de 5 000 000 GNF  → palier de 100 000 GNF
//   - 5 000 000 GNF et plus   → palier de 500 000 GNF

// ─── Taux de référence ─────────────────────────────────────────────────────
// Taux COMMERCIAL, pas le taux de marché : il inclut une marge sur le
// mid-market pour absorber la volatilité du franc guinéen entre le devis et
// l'encaissement. Il ne sert qu'à afficher l'équivalent indicatif en dollars.
//
// Mid-market constaté le 23/09/2026 : 1 $ = 8 804 GNF.
// Taux commercial retenu            : 1 $ = 9 000 GNF (≈ +2,2 %).
//
// À RÉVISER chaque trimestre, ou dès que l'écart avec le mid-market dépasse
// ±5 %. Réviser le taux ne change aucun prix GNF : seul l'équivalent USD
// affiché bouge.
export const EXCHANGE_RATE_GNF_PER_USD = 9000;
export const EXCHANGE_RATE_MID_MARKET = 8804;
export const EXCHANGE_RATE_OBSERVED_ON = "2026-09-23";
export const EXCHANGE_RATE_NEXT_REVIEW = "2026-12-23";

export function roundGnfToCommercialTier(gnf) {
  if (gnf == null || Number.isNaN(Number(gnf))) return null;
  const n = Number(gnf);
  const step = n < 5_000_000 ? 100_000 : 500_000;
  return Math.round(n / step) * step;
}

export function gnfToUsd(gnf) {
  if (gnf == null) return null;
  return Math.round(gnf / EXCHANGE_RATE_GNF_PER_USD / 10) * 10;
}

const numberFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export function formatGNF(gnf) {
  return `${numberFormatter.format(gnf)} GNF`;
}

// Équivalent indicatif en dollars d'un montant GNF.
export function formatUSD(gnf) {
  return `${numberFormatter.format(gnfToUsd(gnf))} $`;
}

// Rendu "GNF principal, USD secondaire" pour un montant simple.
export function formatDualPrice(gnf) {
  if (gnf == null) return null;
  return { primary: formatGNF(gnf), secondary: `≈ ${formatUSD(gnf)}` };
}

// Rendu "GNF principal, USD secondaire" pour une fourchette min–max
// (max absent = "à partir de").
export function formatDualRange(gnfMin, gnfMax) {
  if (gnfMax == null) return { primary: `À partir de ${formatGNF(gnfMin)}`, secondary: `≈ ${formatUSD(gnfMin)}+` };
  return {
    primary: `${formatGNF(gnfMin)} – ${formatGNF(gnfMax)}`,
    secondary: `≈ ${formatUSD(gnfMin)} – ${formatUSD(gnfMax)}`,
  };
}

// ─── Plans principaux (Services) ───────────────────────────────────────────
// Repli utilisé si la table Supabase "pricing_plans" est vide ; sert aussi de
// valeurs de référence pour le seed (supabase/schema.sql, colonne price_gnf).
export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Pack Startup",
    priceGnf: 4_500_000,
    period: "À partir de",
    description: "Pour les startups et PME.",
    features: ["Site web vitrine (5 pages)", "Design responsive", "SEO de base", "1 mois de support"],
    popular: false,
    color: "gray",
  },
  {
    id: "professional",
    name: "Suite Professionnelle",
    priceGnf: 18_000_000,
    period: "À partir de",
    description: "Solution complète pour les entreprises en croissance.",
    features: ["Application web/mobile complète", "Base de données", "API REST", "Authentification", "3 mois de support"],
    popular: true,
    color: "primary",
  },
  {
    id: "enterprise",
    name: "Solution Entreprise",
    priceGnf: null, // "Sur devis" — pas de montant fixe
    period: "Sur mesure",
    description: "Sur mesure pour les grandes organisations.",
    features: ["Architecture sur mesure", "Intégrations illimitées", "SLA négocié au contrat", "Support 24/7", "Chef de projet dédié"],
    popular: false,
    color: "accent",
  },
];

// ─── Maintenance mensuelle ─────────────────────────────────────────────────
// Référencée aussi par l'Accueil (MetricsDashboard) et À propos
// (CompanyValues) : ne jamais recopier ces montants ailleurs.
export const MAINTENANCE_TIERS_GNF = {
  basic: 900_000,      // support email + mises à jour de base
  standard: 2_700_000, // supervision + intervention à distance
  full: 4_500_000,     // support complet + intervention sur site
};
export const MAINTENANCE_MONTHLY = {
  minGnf: MAINTENANCE_TIERS_GNF.basic,
  maxGnf: MAINTENANCE_TIERS_GNF.full,
};

// ─── Services additionnels (Services) ──────────────────────────────────────
// Aucune table CMS dédiée n'existe pour ce bloc (contrairement aux plans
// principaux, qui viennent de "pricing_plans") : ces montants sont donc
// légitimement définis ici, comme unique source de vérité du code.
export const ADDITIONAL_SERVICES = [
  {
    name: "Installation d'Infrastructure Réseau",
    priceMinGnf: 13_500_000,
    priceMaxGnf: 45_000_000,
    priceNote: "ou plus",
    el: ["Câblage", "Installation des équipements", "Configuration", "Documentation"],
    icon: "Wifi",
  },
  {
    name: "Mise en place d'un système complet de supervision et d'inventaire des équipements réseau",
    priceMinGnf: 8_000_000,
    priceMaxGnf: 22_500_000,
    el: [
      "Détection proactive des vulnérabilités et anomalies réseau.",
      "Recommandations techniques alignées sur vos priorités et votre budget.",
      "Rapports détaillés, clairs et immédiatement exploitables par vos équipes.",
    ],
    icon: "Activity",
  },
  {
    name: "Migration de Système",
    priceMinGnf: 11_500_000,
    priceMaxGnf: 36_000_000,
    el: ["Zéro perte de données.", "Transition rapide et planifiée.", "Formation pour faciliter l'adoption par vos équipes."],
    icon: "ArrowRightLeft",
  },
  {
    name: "Optimisation des Performances",
    priceMinGnf: 4_500_000,
    priceMaxGnf: 18_000_000,
    el: ["Temps de réponse améliorés.", "Moins de pannes et d'interruptions.", "Meilleure productivité pour vos équipes."],
    icon: "Zap",
  },
  {
    name: "Programme de Formation du Personnel",
    priceMinGnf: 3_200_000,
    priceMaxGnf: 13_500_000,
    el: ["Sessions adaptées à votre secteur.", "Modules pratiques et interactifs.", "Certificats de participation valorisants."],
    icon: "GraduationCap",
  },
  {
    name: "Maintenance Continue",
    priceMinGnf: MAINTENANCE_MONTHLY.minGnf,
    priceMaxGnf: MAINTENANCE_MONTHLY.maxGnf,
    priceNote: "/mois",
    el: [
      `${formatGNF(MAINTENANCE_TIERS_GNF.basic)} / mois (≈ ${formatUSD(MAINTENANCE_TIERS_GNF.basic)}) — support email + mises à jour de base`,
      `${formatGNF(MAINTENANCE_TIERS_GNF.standard)} / mois (≈ ${formatUSD(MAINTENANCE_TIERS_GNF.standard)}) — supervision + intervention à distance`,
      `${formatGNF(MAINTENANCE_TIERS_GNF.full)} / mois (≈ ${formatUSD(MAINTENANCE_TIERS_GNF.full)}) — support complet + intervention sur site`,
    ],
    icon: "Settings",
  },
  // Pôle Cybersécurité et Conformité — mêmes prestations que le domaine
  // d'expertise "cybersecurity" de la table services, déclinées en offres.
  {
    name: "Audit de Vulnérabilités",
    priceMinGnf: 5_500_000,
    priceMaxGnf: 22_500_000,
    el: [
      "Cartographie des failles sur votre infrastructure et vos applications.",
      "Priorisation des risques selon leur criticité réelle.",
      "Rapport détaillé avec plan de remédiation.",
    ],
    icon: "Search",
  },
  {
    name: "Test d'Intrusion (Pentest)",
    priceMinGnf: 11_000_000,
    priceMaxGnf: 54_000_000,
    el: [
      "Simulation d'attaque réelle sur vos systèmes (interne ou externe).",
      "Preuves de concept documentées, sans impact sur la production.",
      "Restitution avec l'équipe technique et plan de correction.",
    ],
    icon: "ShieldAlert",
  },
  {
    name: "Durcissement d'Infrastructure",
    priceMinGnf: 7_000_000,
    priceMaxGnf: 36_000_000,
    el: [
      "Application des bonnes pratiques de configuration sécurisée.",
      "Réduction de la surface d'attaque (services, accès, privilèges).",
      "Documentation des changements pour vos équipes.",
    ],
    icon: "Lock",
  },
  {
    name: "Réponse à Incident",
    priceMinGnf: 4_500_000,
    priceMaxGnf: 31_500_000,
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
    priceMinGnf: 2_700_000,
    priceMaxGnf: 11_000_000,
    el: [
      "Ateliers pratiques sur le phishing, les mots de passe, les usages à risque.",
      "Supports adaptés au niveau technique de vos équipes.",
      "Mesure de la progression via des simulations.",
    ],
    icon: "Users",
  },
  {
    name: "Conformité des Données",
    priceMinGnf: 6_500_000,
    priceMaxGnf: 27_000_000,
    el: [
      "Cartographie des données personnelles et sensibles traitées.",
      "Mise en conformité avec les exigences applicables (protection des données).",
      "Politiques et procédures documentées pour vos équipes.",
    ],
    icon: "FileCheck2",
  },
];

// Fourchette GNF/USD pour un palier de partenariat (CollaborationPathways,
// PathwayInquiryModal, PartnershipAdmin) : bornes en GNF — colonnes CMS
// "budget_min_gnf"/"budget_max_gnf" (table partnership_pathways) ou champs
// statiques équivalents ; repli sur le texte libre "budget" pour les paliers
// sans montant fixe (ex. "Partage de revenus").
export function formatPathwayBudget(pathway) {
  const min = pathway?.budgetMinGnf ?? pathway?.budget_min_gnf;
  const max = pathway?.budgetMaxGnf ?? pathway?.budget_max_gnf ?? null;
  if (min != null) return formatDualRange(Number(min), max == null ? null : Number(max));
  return pathway?.budget ? { primary: pathway.budget, secondary: null } : null;
}

// ─── Fourchettes de budget (formulaires Contact et Partenariat) ────────────
// Construites à partir d'UNE seule liste de bornes : la borne haute d'une
// fourchette est, par construction, la borne basse de la suivante. Chaque
// fourchette se lit comme un intervalle semi-ouvert [min, max[ : aucun trou,
// aucun chevauchement, quel que soit l'arrondi (les bornes sont déjà des
// montants ronds au palier commercial).
export const BUDGET_BOUNDARIES_GNF = [9_000_000, 27_000_000, 63_000_000, 135_000_000, 270_000_000];

function bracketValue(min, max) {
  const m = (gnf) => `${gnf / 1_000_000}m`;
  if (min === 0) return `lt-${m(max)}`;
  if (max == null) return `gt-${m(min)}`;
  return `${m(min)}-${m(max)}`;
}

function bracketLabel(min, max) {
  if (min === 0) return `Moins de ${formatGNF(max)} (≈ ${formatUSD(max)})`;
  if (max == null) return `${formatGNF(min)} et plus (≈ ${formatUSD(min)}+)`;
  return `${formatGNF(min)} – ${formatGNF(max)} (≈ ${formatUSD(min)} – ${formatUSD(max)})`;
}

export const BUDGET_BRACKETS = [
  ...[0, ...BUDGET_BOUNDARIES_GNF].map((min, i, all) => {
    const max = all[i + 1] ?? null;
    return { value: bracketValue(min, max), gnfMin: min, gnfMax: max, label: bracketLabel(min, max) };
  }),
  { value: "discuss", gnfMin: null, gnfMax: null, label: "Préfère en discuter" },
];
