-- =====================================================================
-- 4e domaine d'expertise « Cybersécurité et Conformité » (table services)
-- =====================================================================
--
-- À lancer APRÈS supabase/migrations/20260924120000_session_schema.sql,
-- une fois les vraies valeurs saisies ci-dessous. Volontairement hors de
-- migrations/ : la ligne s'affiche dès son insertion sur l'Accueil et la
-- page Services, y compris avec le build actuellement en ligne.
--
-- Sans métriques, le rendu est dégradé :
--   - Accueil : la carte n'a pas de rangée d'indicateurs, contrairement aux
--     trois autres (vide en bas de carte) ;
--   - Services : le panneau est en deux colonnes, « Points Clés » à gauche,
--     la colonne « Indicateurs de Performance » à droite reste vide.
-- Le script refuse donc de s'exécuter tant que les métriques ne sont pas
-- renseignées (3 minimum, affichées sur l'Accueil ; 4 recommandées, grille
-- 2 × 2 sur Services, comme les autres domaines).
--
-- Exécutable d'un bloc dans l'éditeur SQL Supabase. N'écrase jamais une
-- ligne "cybersecurity" déjà créée (par exemple depuis /admin/services).
-- =====================================================================

BEGIN;

-- ▼▼▼ À COMPLÉTER ▼▼▼ ------------------------------------------------
-- Indicateurs chiffrés, vérifiables. Laisser ('', '') les lignes inutilisées.
CREATE TEMP TABLE _cyber_metrics (pos int, label text, value text) ON COMMIT DROP;
INSERT INTO _cyber_metrics (pos, label, value) VALUES
  (1, '', ''),
  (2, '', ''),
  (3, '', ''),
  (4, '', '');

-- Projets liés (au moins 1). Le premier est repris tel quel du domaine
-- Infrastructure Réseau ; ajoutez-en d'autres sur le même modèle.
CREATE TEMP TABLE _cyber_projects (pos int, name text, description text, industry text) ON COMMIT DROP;
INSERT INTO _cyber_projects (pos, name, description, industry) VALUES
  (1, 'Sécurité Secteur Bancaire', 'Implémentation cybersécurité avancée pour institution financière majeure', 'Finance');
-- ▲▲▲ FIN DE LA ZONE À COMPLÉTER ▲▲▲ ---------------------------------

DELETE FROM _cyber_metrics  WHERE btrim(label) = '' AND btrim(value) = '';
DELETE FROM _cyber_projects WHERE btrim(coalesce(name, '')) = '';

DO $$
DECLARE
  n_metrics int := (SELECT count(*) FROM _cyber_metrics);
BEGIN
  IF EXISTS (SELECT 1 FROM _cyber_metrics WHERE btrim(label) = '' OR btrim(value) = '') THEN
    RAISE EXCEPTION 'Une métrique a un libellé sans valeur (ou l''inverse) : complétez-la ou videz les deux champs.';
  END IF;
  IF n_metrics < 3 THEN
    RAISE EXCEPTION 'Seulement % métrique(s) renseignée(s) : il en faut au moins 3 pour que la carte de l''Accueil ne soit pas dégradée. Rien n''a été inséré.', n_metrics;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM _cyber_projects) THEN
    RAISE EXCEPTION 'Aucun projet lié : il en faut au moins 1. Rien n''a été inséré.';
  END IF;
  IF EXISTS (SELECT 1 FROM public.services WHERE slug = 'cybersecurity') THEN
    RAISE NOTICE 'Une ligne "cybersecurity" existe déjà dans services : elle est conservée telle quelle, rien n''est modifié.';
  END IF;
END
$$;

INSERT INTO public.services
  (sort_order, slug, title, subtitle, icon, description, highlights, technologies, metrics, projects, project_count)
SELECT
  4, 'cybersecurity', 'Cybersécurité et Conformité', 'Protection, Résilience & Conformité des Données', 'Shield',
  'Protégez vos systèmes, vos données et votre réputation avec une approche complète de la cybersécurité, de l''audit à la réponse à incident, en passant par la sensibilisation de vos équipes.',
  '["Audit de vulnérabilités et test d''intrusion", "Durcissement d''infrastructure", "Réponse à incident et investigation", "Sensibilisation et formation des équipes", "Conformité et protection des données"]'::jsonb,
  '["Nmap", "Metasploit", "Burp Suite", "Wireshark", "pfSense", "SIEM"]'::jsonb,
  (SELECT jsonb_agg(jsonb_build_object('label', btrim(label), 'value', btrim(value)) ORDER BY pos) FROM _cyber_metrics),
  (SELECT jsonb_agg(jsonb_build_object('name', name, 'description', description, 'industry', industry) ORDER BY pos) FROM _cyber_projects),
  0
ON CONFLICT (slug) DO NOTHING;

SELECT slug, jsonb_array_length(metrics) AS metriques, jsonb_array_length(projects) AS projets
FROM public.services WHERE slug = 'cybersecurity';

COMMIT;
