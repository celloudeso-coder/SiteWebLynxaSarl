# Hypothèses écartées

Une ligne par piste éliminée, avec la preuve qui l'a éliminée (section 6 de
`docs/PROTOCOLE-TRAVAIL-LYNXA.md`). On ne la reteste pas sans preuve nouvelle.

---

## Bug : éléments désactivés dans l'admin toujours affichés sur le site

Sections concernées : `/partnership` (Engagements légaux & contractuels,
table `trust_commitment_items`) et `/portfolio` (Laboratoire d'Innovation,
table `portfolio_innovations`). Diagnostic du 2026-10-01.

Cause démontrée : avec une session admin dans le navigateur, la requête
publique (`select("*")` sans filtre sur `active`, `src/lib/cms.js` lignes
584-586 et 598-600) est aussi autorisée par la policy
`cms_authenticated_read`, qui ne filtre pas `active`. Le visiteur anonyme ne
voit pas ces lignes. Reproduit sur une instance Supabase jetable.

| Hypothèse écartée | Preuve |
|---|---|
| Capture figée au prérendu | Build complet du 2026-10-01 à 02:29 UTC (commit `4ffd320`, `build-info.json`). Le HTML servi de `/partnership` ne contient aucune des quatre cartes, ni le titre de la section ; celui de `/portfolio` ne contient aucune des deux innovations désactivées. |
| L'écriture `active = false` n'a pas abouti (refus RLS ou erreur silencieuse) | Dump de données de production du 2026-10-01 à 00:51 UTC : les 4 lignes de `trust_commitment_items` sont à `false`, et 2 lignes de `portfolio_innovations` aussi. |
| Données de repli codées en dur dans le front | `useAsync` reçoit `[]` comme repli (`src/hooks/useContent.js` lignes 83-89). Aucun texte des cartes dans `src/`, `public/`, `scripts/` ni `index.html`, hors un texte indicatif de l'admin. |
| Le prérendu lit avec une clé privilégiée | `scripts/prerender.mjs` ouvre chaque route dans une page Chromium neuve, sans session ; il ne contient aucune clé `service_role`. La lecture passe par la clé anon du bundle. |
| Même cause pour les projets du Portfolio (`portfolio_projects`) | `getProjects(true)` filtre `active = true` côté client (`src/lib/cms.js` lignes 81-85). Les 4 projets étaient tous actifs dans le dump du 2026-10-01. |
