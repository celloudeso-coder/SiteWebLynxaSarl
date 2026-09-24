-- =====================================================================
-- Corrections de contenu 2026-09-24 — OPTIONNEL, à lancer APRÈS
-- supabase/migrations/20260924120000_session_schema.sql
-- =====================================================================
--
-- Les corrections de contenu faites sur cette branche (promesses de SLA et
-- de "99,9 %", compteurs de l'accueil, statistiques sans source, nom d'un
-- membre de l'équipe) n'existent que dans les seeds de schema.sql, écrits
-- en ON CONFLICT DO NOTHING : elles n'atteignent jamais une base déjà
-- remplie. Si ces lignes sont toujours présentes en production, le site
-- continue d'afficher les anciennes formulations.
--
-- Chaque UPDATE ne touche une ligne QUE si elle contient encore mot pour mot
-- le texte d'origine du seed. Tout contenu déjà retouché dans l'admin est
-- laissé intact. Relançable sans effet (0 ligne modifiée la 2e fois).
-- Le script affiche à la fin le nombre de lignes corrigées par table.
-- =====================================================================

BEGIN;

CREATE TEMP TABLE _corrections (item text, rows_updated int) ON COMMIT DROP;

-- Remplace un élément exact dans un tableau jsonb de chaînes, sans changer l'ordre.
CREATE FUNCTION pg_temp.replace_in_array(arr jsonb, old_value text, new_value text)
RETURNS jsonb LANGUAGE sql IMMUTABLE AS $$
  SELECT coalesce(jsonb_agg(CASE WHEN e = old_value THEN new_value ELSE e END ORDER BY ord), '[]'::jsonb)
  FROM jsonb_array_elements_text(arr) WITH ORDINALITY AS t(e, ord)
$$;

-- 1. Plan Entreprise : SLA défini au contrat, pas affiché comme acquis.
WITH u AS (
  UPDATE pricing_plans
  SET features = pg_temp.replace_in_array(pg_temp.replace_in_array(features, 'SLA garanti 99.9%', 'SLA négocié au contrat'), 'SLA 99.9%', 'SLA négocié au contrat')
  WHERE jsonb_typeof(features) = 'array' AND (features ? 'SLA garanti 99.9%' OR features ? 'SLA 99.9%')
  RETURNING 1
) INSERT INTO _corrections SELECT 'pricing_plans : SLA', count(*) FROM u;

-- 2. Palier partenariat Entreprises : idem.
WITH u AS (
  UPDATE partnership_pathways
  SET features = pg_temp.replace_in_array(features, 'Garanties SLA', 'SLA défini au contrat')
  WHERE jsonb_typeof(features) = 'array' AND features ? 'Garanties SLA'
  RETURNING 1
) INSERT INTO _corrections SELECT 'partnership_pathways : SLA', count(*) FROM u;

-- 3. TrustSignals : pratiques internes, non contractuelles.
WITH u AS (
  UPDATE trust_security_items
  SET description = 'Sauvegardes régulières de nos environnements de travail (pratique interne, hors contrat de support).'
  WHERE title = 'Sauvegarde & récupération' AND description = 'Sauvegardes quotidiennes, garantie 99,9 %.'
  RETURNING 1
) INSERT INTO _corrections SELECT 'trust_security_items : sauvegarde', count(*) FROM u;

WITH u AS (
  UPDATE trust_security_items
  SET title = 'Monitoring continu',
      description = 'Suivi et détection des menaces sur nos propres systèmes (pratique interne, hors contrat de support).'
  WHERE title = 'Surveillance 24/7' AND description = 'Monitoring continu et détection des menaces.'
  RETURNING 1
) INSERT INTO _corrections SELECT 'trust_security_items : surveillance', count(*) FROM u;

-- 4. Équipe : nom corrigé.
WITH u AS (
  UPDATE team_members SET name = 'Thierno Sadou Barry' WHERE name = 'Elhadj Sadou Barry' RETURNING 1
) INSERT INTO _corrections SELECT 'team_members : nom', count(*) FROM u;

-- 5. Compteurs de l'accueil : valeurs réelles à la place de "0+".
WITH u AS (
  UPDATE metrics AS m
  SET label = n.label, value = n.value, suffix = n.suffix, description = n.description
  FROM (VALUES
    ('Applications Mobiles', 1, '+', 'Applications livrées avec succès', 'Plateformes Livrées', 4, '',  'Applications web et mobile déployées en production'),
    ('Services Réseau',      0, '+', 'Infrastructures déployées',        'Secteurs Couverts',   3, '',  'Secteurs d''activité accompagnés en Guinée'),
    ('Sites Web Lancés',     0, '+', 'Projets web réalisés',             'SaaS en Phase Pilote', 1, '', 'Solution SaaS actuellement testée avec un client pilote'),
    ('Monitoring Actif',     0, '+', 'Systèmes en supervision',          'Réponse',             24, 'h', 'Délai de réponse maximal à toute demande')
  ) AS n(old_label, old_value, old_suffix, old_description, label, value, suffix, description)
  WHERE m.label = n.old_label AND m.value = n.old_value AND m.suffix = n.old_suffix AND m.description = n.old_description
  RETURNING 1
) INSERT INTO _corrections SELECT 'metrics : compteurs accueil', count(*) FROM u;

-- 6. À propos : sources des statistiques macro.
WITH u AS (
  UPDATE about_advantages SET source = 'ECOWAS, 2024'
  WHERE title = 'Emplacement Stratégique' AND stats = '400M+ personnes dans la région CEDEAO' AND coalesce(source, '') = ''
  RETURNING 1
) INSERT INTO _corrections SELECT 'about_advantages : source CEDEAO', count(*) FROM u;

WITH u AS (
  UPDATE about_advantages
  SET stats = '~60% de la population a moins de 25 ans', source = 'ONU, Perspectives de la population mondiale, 2024'
  WHERE title = 'Réservoir de Talents' AND stats = '60% de la population jeune' AND coalesce(source, '') = ''
  RETURNING 1
) INSERT INTO _corrections SELECT 'about_advantages : population jeune', count(*) FROM u;

-- 7. À propos : statistiques d'écosystème sans source retirées, chiffres
--    de l'équipe/clients ramenés aux valeurs réelles. Remplacement seulement
--    si la valeur stockée est encore exactement celle du seed d'origine.
WITH u AS (
  UPDATE site_settings
  SET value = '[{"label":"Taux de Pénétration Internet","value":"34%","source":"DataReportal, Digital 2024: Guinée","icon":"Wifi"},{"label":"Utilisateurs Mobiles","value":"14M","source":"DataReportal, Digital 2024: Guinée","icon":"Smartphone"}]'::jsonb
  WHERE key = 'about_ecosystem_stats'
    AND value::jsonb = '[{"icon": "TrendingUp", "label": "Startups Technologiques", "value": "150+", "growth": "2025"}, {"icon": "Wifi", "label": "Taux de Pénétration Internet", "value": "52%", "growth": "2025"}, {"icon": "Smartphone", "label": "Utilisateurs Mobiles", "value": "14M", "growth": "2024"}, {"icon": "CreditCard", "label": "Croissance Paiements Numériques", "value": "15%", "growth": "Afrique 2024"}]'::jsonb
  RETURNING 1
) INSERT INTO _corrections SELECT 'site_settings : about_ecosystem_stats', count(*) FROM u;

WITH u AS (
  UPDATE site_settings
  SET value = '[{"current":"4","target":"25+","label":"Membres de l''équipe","icon":"Users"},{"current":"1","target":"20+","label":"Pays","icon":"MapPin"},{"current":"4","target":"500+","label":"Clients","icon":"Briefcase"}]'::jsonb
  WHERE key = 'about_impact_metrics'
    AND value::jsonb = '[{"icon": "Users", "label": "Membres de l''équipe", "target": "25+", "current": "7+"}, {"icon": "MapPin", "label": "Pays", "target": "20+", "current": "1"}, {"icon": "Briefcase", "label": "Clients", "target": "500+", "current": "6+"}, {"icon": "Heart", "label": "Vies impactées", "target": "1K+", "current": "0+"}]'::jsonb
  RETURNING 1
) INSERT INTO _corrections SELECT 'site_settings : about_impact_metrics', count(*) FROM u;

SELECT item AS correction, rows_updated AS lignes_corrigees FROM _corrections;

COMMIT;
