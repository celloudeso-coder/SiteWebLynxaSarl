-- =====================================================================
-- Corrections de contenu 2026-11-27 (lots A et A bis) : promesses sans preuve
-- =====================================================================
--
-- Les cartes de l'accueil (home_engagements, home_why_items) et le texte
-- d'accroche (hero_sections) sont lus en base. Le code ne fournit qu'un
-- repli : le corriger ne change donc rien en production tant que ces lignes
-- gardent l'ancien texte.
--
-- Une seule requête, sans table temporaire : l'éditeur SQL de Supabase
-- n'exécute pas toujours un script comme une seule session (erreur
-- « relation "_corrections" does not exist » avec la version précédente).
--
-- Chaque UPDATE ne touche une ligne QUE si elle contient encore mot pour mot
-- le texte d'origine. Tout contenu déjà retouché dans l'admin est laissé
-- intact. Relançable sans effet (0 ligne modifiée la 2e fois).
-- Historique : les trois premières corrections ont été appliquées le
-- 27/11/2026 vers 01h25 (lot A). La quatrième vient du lot A bis.
-- Après exécution : bouton « Publier les modifications » dans l'admin.
-- =====================================================================

WITH a AS (
  UPDATE home_engagements SET sub_label = 'Engagement écrit au contrat', updated_at = now()
  WHERE label = 'Réponse sous 48h ouvrables' AND sub_label = 'Support ultra-réactif'
  RETURNING 1
), b AS (
  UPDATE home_engagements SET label = 'Documentation remise', sub_label = 'À chaque livraison', updated_at = now()
  WHERE label = 'Standards mondiaux' AND sub_label = 'Qualité internationale'
  RETURNING 1
), c AS (
  UPDATE home_why_items
  SET title = 'Bonnes pratiques du métier',
      description = 'Nous appliquons les bonnes pratiques reconnues en sécurité et en documentation, adaptées aux réalités locales.',
      updated_at = now()
  WHERE title = 'Qualité internationale'
    AND description = 'Nos solutions respectent les standards mondiaux tout en étant calibrées pour les réalités locales.'
  RETURNING 1
), d AS (
  UPDATE hero_sections
  SET description = 'Nous accompagnons les entreprises et les institutions de Guinée avec des applications web, des réseaux fiables et la cybersécurité, conçus pour les réalités locales.',
      updated_at = now()
  WHERE page = 'home'
    AND description = 'Des solutions technologiques de classe mondiale conçues en Guinée pour transformer les entreprises à travers l''Afrique de l''Ouest et au-delà.'
  RETURNING 1
)
SELECT 'home_engagements : support ultra-réactif' AS correction, (SELECT count(*) FROM a) AS lignes_corrigees
UNION ALL SELECT 'home_engagements : standards mondiaux', (SELECT count(*) FROM b)
UNION ALL SELECT 'home_why_items : qualité internationale', (SELECT count(*) FROM c)
UNION ALL SELECT 'hero_sections (accueil) : classe mondiale', (SELECT count(*) FROM d);
