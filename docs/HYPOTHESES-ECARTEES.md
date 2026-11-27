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

---

## Piste : « ces seeds sont dormants, le site ne les lit plus »

Revue du 2026-11-27, sur `origin/main` à `381ae3d`. Dix éléments étaient
soupçonnés de n'être que des données de départ mortes, à retirer du dépôt.

**La piste est écartée pour les dix.** Chacun est encore lu dans `src/`, par
une page publique, par l'admin, ou par les deux. Aucun seed n'a été retiré.
La recherche faite est citée pour chaque ligne : elle est rejouable telle
quelle, et c'est elle qu'il faudra refaire avant de reposer la question.

Méthode : `grep -rn` sur `src/` du nom de table, puis du nom de l'accesseur
(`src/lib/cms.js`), puis du hook (`src/hooks/useContent.js`), puis du
composant consommateur, puis de la page qui importe ce composant. Un
composant qui n'est importé par aucune page compterait comme dormant : aucun
n'est dans ce cas.

| Élément | Lu ? | Preuve (recherche faite) | Action |
|---|---|---|---|
| `services.metrics` | oui, public + admin | `grep -rn "\.metrics\b" src/` : `src/pages/Services/index.jsx:97`, `src/pages/Services/components/ServiceDetails.jsx:71-78`, `src/pages/Home/components/ServiceGalaxies.jsx:43,134-136`, `src/pages/Admin/sections/ServicesAdmin.jsx:245`. Seed `services` : `supabase/schema.sql:70` (colonne `metrics` lignes 75, 82, 89). | gardé |
| `services.projects` | oui, public + admin | `grep -rn "\.projects\b" src/` : `src/pages/Services/index.jsx:98`, `src/pages/Services/components/ServiceDetails.jsx:121-128`, `src/pages/Admin/sections/ServicesAdmin.jsx:249`. | gardé |
| `supabase/seed-cybersecurity-domain.sql` | oui, indirectement | Le script insère dans `public.services` (`grep -o "INSERT INTO ..." ` sur le fichier), table lue par les trois fichiers ci-dessus. Script jamais appliqué et volontairement bloqué tant que les métriques réelles ne sont pas saisies (en-tête du fichier, lignes 1-21) : c'est un projet en attente, pas une donnée morte. | gardé |
| `trust_security_items` | oui, public | `grep -rl useTrustSecurityItems src/` : `src/pages/Partnership/components/TrustSignals.jsx`, importé par `src/pages/Partnership/index.jsx`. Seed : `supabase/schema.sql:878`. | gardé |
| `trust_commitment_items` | oui, public | `grep -rl useTrustCommitmentItems src/` : même composant et même page. Seed : `supabase/schema.sql:904`. | gardé |
| `office_details` (adresse Almamya) | oui, admin seulement | `grep -rn office_details src/` : `src/lib/cms.js:562,567` ; `src/pages/Admin/sections/ContactContentAdmin.jsx:2,186,236`. Côté visiteur, la ligne d'adresse est commentée : `src/pages/Contact/index.jsx:82`. Seed : `supabase/schema.sql:942-964`. | gardé, mais à trancher : dormant pour le visiteur, pas pour l'admin, qui l'édite encore |
| `timeline_events` | oui, public | `grep -rl useTimelineEvents src/` : `src/pages/About/components/CompanyTimeline.jsx`, importé par `src/pages/About/index.jsx`. Seed : `supabase/schema.sql:242`. | gardé |
| `about_core_values` | oui, public + admin | `grep -rn getAboutCoreValues src/` : `src/pages/About/components/CompanyValues.jsx:41` (rendu par `src/pages/About/index.jsx:122`), `src/pages/Admin/sections/AboutContentAdmin.jsx:172`. Seed : `supabase/schema.sql:615`. | gardé |
| `about_advantages`, `about_vision_pillars`, `about_roadmap_phases` | oui, public | `grep -rl` des hooks `useAboutAdvantages`, `useAboutVisionPillars`, `useAboutRoadmapPhases` : `src/pages/About/components/WhyGuinea.jsx` et `src/pages/About/components/VisionRoadmap.jsx`, tous deux importés par `src/pages/About/index.jsx`. Seeds : `supabase/schema.sql:646,672,703`. | gardés |
| `team_members` | oui, public + admin | `grep -rl useTeamMembers src/` : `src/pages/About/components/TeamSpotlight.jsx`, importé par `src/pages/About/index.jsx`. C'est aussi le point 2 du contrôle de non-régression (section 7 du protocole). Seed : `supabase/schema.sql:171`. | gardé |
| `job_openings` | oui, public + admin | `grep -rl useJobOpenings src/` : `src/pages/join-us/components/joinus-openings.jsx`, importé par `src/pages/join-us/index.jsx`. Seed : `supabase/schema.sql:349`. | gardé |
| « superlatifs » | sans objet ici | Ce ne sont pas des seeds dormants mais des formulations dans des seeds lus. Comptés sur `origin/main` : « classe mondiale » 1 (`supabase/schema.sql:41`, `hero_sections`), « leader » 5 (lignes 47, 178, 673, 709, 713), « pionnier » 1 (ligne 47), « excellence » 1 (ligne 619), « premium » 1 (ligne 650), « sans précédent » 1 (ligne 1111). Les deux premiers sont déjà traités par le commit `381c2f7` de la branche `fix/lot-a-bis`, non encore fusionnée. | rien retiré : ne pas dupliquer un travail en cours |

### Ce que cette revue a trouvé au passage, et qui reste ouvert

- `metrics` et `portfolio_innovations` sont les deux seules tables de la liste
  dont le seed est déjà vide dans le dépôt (`supabase/schema.sql`, commit
  `1b0808e`). Les lignes correspondantes peuvent subsister en base : c'est
  l'objet de `supabase/content-corrections-2026-11-27-lignes-inventees.sql`,
  branche `fix/lignes-inventees`.
- `src/pages/About/components/CompanyTimeline.jsx:16` garde un repli
  `STATIC_EVENTS`, et `src/pages/About/components/CompanyValues.jsx:7` un
  repli `STATIC_CORE_VALUES`. Ces deux replis affirment un contenu
  d'entreprise sans passer par le CMS, ce que le commit `86fd62c` a interdit
  pour les autres sections. À vérifier ligne à ligne contre la base avant de
  les toucher, règle du repli égal à la base.
