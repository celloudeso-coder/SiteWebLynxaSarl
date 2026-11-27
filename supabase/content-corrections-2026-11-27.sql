-- =====================================================================
-- Corrections de contenu 2026-11-27 (lot A) : libellés sans preuve de l'accueil
-- =====================================================================
--
-- Les cartes « Nos engagements » et « Pourquoi Lynxa ? » de l'accueil sont
-- lues en base (home_engagements, home_why_items). Le code ne fournit qu'un
-- repli : le corriger ne change donc rien en production tant que ces lignes
-- gardent l'ancien texte.
--
-- Chaque UPDATE ne touche une ligne QUE si elle contient encore mot pour mot
-- le texte d'origine. Tout contenu déjà retouché dans l'admin est laissé
-- intact. Relançable sans effet (0 ligne modifiée la 2e fois).
-- Après exécution : bouton « Publier les modifications » dans l'admin.
-- =====================================================================

BEGIN;

CREATE TEMP TABLE _corrections (item text, rows_updated int) ON COMMIT DROP;

WITH u AS (
  UPDATE home_engagements SET sub_label = 'Engagement écrit au contrat', updated_at = now()
  WHERE label = 'Réponse sous 48h ouvrables' AND sub_label = 'Support ultra-réactif'
  RETURNING 1
) INSERT INTO _corrections SELECT 'home_engagements : support ultra-réactif', count(*) FROM u;

WITH u AS (
  UPDATE home_engagements SET label = 'Documentation remise', sub_label = 'À chaque livraison', updated_at = now()
  WHERE label = 'Standards mondiaux' AND sub_label = 'Qualité internationale'
  RETURNING 1
) INSERT INTO _corrections SELECT 'home_engagements : standards mondiaux', count(*) FROM u;

WITH u AS (
  UPDATE home_why_items
  SET title = 'Bonnes pratiques du métier',
      description = 'Nous appliquons les bonnes pratiques reconnues en sécurité et en documentation, adaptées aux réalités locales.',
      updated_at = now()
  WHERE title = 'Qualité internationale'
    AND description = 'Nos solutions respectent les standards mondiaux tout en étant calibrées pour les réalités locales.'
  RETURNING 1
) INSERT INTO _corrections SELECT 'home_why_items : qualité internationale', count(*) FROM u;

SELECT item AS correction, rows_updated AS lignes_corrigees FROM _corrections;

COMMIT;
