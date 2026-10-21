-- APPLIQUÉ EN PRODUCTION le 2026-10-21, entre 22:51 et 22:55 UTC (heure de
-- Conakry), heure exacte non relevée. Par Mamadou Cellou Kanté, éditeur SQL
-- Supabase. 14 lignes mises à jour en une seule transaction : le message du
-- premier passage n'a pas été capturé, mais un second passage lancé par
-- erreur a été refusé par la garde (« 1. home_why_items réactivité :
-- 0 ligne(s) au lieu de 1 »), preuve que la transaction complète avait été
-- validée. Contrôle après application (SELECT A, 2026-10-21) : les 13 lignes
-- visibles portent toutes les nouvelles valeurs.
-- NE PAS RELANCER : les gardes le refuseraient (0 ligne) et n'écriraient rien.
--
-- Corrections de contenu du 2026-10-21 : promesses intenables et statuts.
--
-- À exécuter par Cellou dans l'éditeur SQL Supabase, en une transaction,
-- après la sauvegarde (CLAUDE.md, règle 9) et après les SELECT de contrôle.
--
-- Chaque mise à jour cible une ligne par son identifiant ET vérifie
-- l'ancienne valeur : si la ligne a changé depuis la sauvegarde du
-- 2026-10-01, ou si elle a déjà été corrigée, le script s'arrête et
-- n'écrit rien (ROLLBACK implicite).
--
-- Les replis du code (src/) et les seeds (supabase/schema.sql) portent les
-- mêmes textes : une panne de la base ne doit pas ressusciter les anciennes
-- promesses.

BEGIN;

DO $$
DECLARE
  n integer;  -- lignes touchées par la dernière mise à jour, exactement 1 attendue
BEGIN
  -- 1. Accueil, « Pourquoi choisir Lynxa Tech ? » : réactivité.
  UPDATE public.home_why_items
  SET title = 'Des délais d''intervention écrits au contrat',
      description = 'Consultation gratuite, réponse sous 48h ouvrables et suivi continu tout au long de votre projet.'
  WHERE id = '479f7b9e-1e7d-4f50-a319-9f3e59a1fea5'
    AND title = 'Réactivité garantie'
    AND description = 'Consultation gratuite, réponse sous 24h et suivi continu tout au long de votre projet.';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '1. home_why_items réactivité : % ligne(s) au lieu de 1', n; END IF;

  -- 2a. Accueil, « Pourquoi choisir Lynxa Tech ? » : équipe. Pas de tiret
  -- cadratin dans les textes visibles (règle permanente).
  UPDATE public.home_why_items
  SET description = 'Mobile, réseau, cybersécurité, web : toutes les compétences réunies sous un même toit.'
  WHERE id = '2cd53e76-6ac7-4b81-aa1a-9df3aed92712'
    AND description = 'Mobile, réseau, cybersécurité, web — toutes les compétences réunies sous un même toit.';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '2a. home_why_items équipe : % ligne(s) au lieu de 1', n; END IF;

  -- 2. Accueil, « Pourquoi choisir Lynxa Tech ? » : sécurité.
  UPDATE public.home_why_items
  SET title = 'La sécurité prise en compte dès la conception'
  WHERE id = '675dd5d1-cc83-4eac-a863-05a625bb9bef'
    AND title = 'Sécurité by design';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '2. home_why_items sécurité : % ligne(s) au lieu de 1', n; END IF;

  -- 3. Accueil, bandeau d'engagements : sécurité.
  UPDATE public.home_engagements
  SET label = 'Sécurité dès la conception',
      sub_label = 'Des engagements écrits au contrat'
  WHERE id = 'b04d952f-ffd8-4d27-b372-07231774b0ec'
    AND label = 'Sécurité by design'
    AND sub_label = 'Confiance garantie';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '3. home_engagements sécurité : % ligne(s) au lieu de 1', n; END IF;

  -- 4. Accueil, bandeau d'engagements : délai de réponse.
  UPDATE public.home_engagements
  SET label = 'Réponse sous 48h ouvrables'
  WHERE id = '0f876883-f28e-4798-8cb1-e2cefacad93b'
    AND label = 'Réponse en 24h';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '4. home_engagements réponse : % ligne(s) au lieu de 1', n; END IF;

  -- 5. Contact, en-tête de page : délai de réponse.
  UPDATE public.hero_sections
  SET description = 'Discutons de votre projet. Nous répondons sous 48h ouvrables.'
  WHERE id = '75e4f0b7-c088-4bb3-8826-2269b13345f3'
    AND page = 'contact'
    AND description = 'Discutons de votre projet. Nous répondons sous 24h.';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '5. hero_sections contact : % ligne(s) au lieu de 1', n; END IF;

  -- 6. Services, offre « Solution Entreprise » : plus de SLA chiffré ni de 24/7.
  UPDATE public.pricing_plans
  SET features = '["Architecture système sur mesure", "Intégrations tierces illimitées", "Infrastructure dédiée", "Disponibilité et délais d''intervention définis au contrat", "Support aux heures ouvrées, du lundi au vendredi et le samedi matin", "Astreinte en dehors des heures ouvrées sur demande, facturée en supplément", "Chef de projet dédié", "Formation complète", "Maintenance évolutive"]'::jsonb
  WHERE id = '21f6c44e-7f64-4278-8cf9-0d82014c1db3'
    AND name = 'Solution Entreprise'
    AND features = '["Architecture système sur mesure", "Intégrations tierces illimitées", "Infrastructure dédiée", "SLA garanti 99.9%", "Support 24/7", "Chef de projet dédié", "Formation complète", "Maintenance évolutive"]'::jsonb;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '6. pricing_plans Solution Entreprise : % ligne(s) au lieu de 1', n; END IF;

  -- 7. Partenariat, parcours « Solutions Entreprises » : plus de 24/7 ni de
  -- « Garanties SLA » (même texte que le repli du code).
  UPDATE public.partnership_pathways
  SET features = '["Systèmes entreprises personnalisés", "Support prioritaire aux heures ouvrées", "Chef de projet dédié", "SLA défini au contrat"]'::jsonb
  WHERE id = '1161505d-dd56-4c44-a905-7ebe2348d047'
    AND features = '["Systèmes entreprises personnalisés", "Support prioritaire 24/7", "Chef de projet dédié", "Garanties SLA"]'::jsonb;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '7. partnership_pathways Solutions Entreprises : % ligne(s) au lieu de 1', n; END IF;

  -- 8. Portfolio, section « Nos produits » (ex-Laboratoire d'Innovation) : KONTA.
  -- Titre et description actuels conservés. Impact : plus aucune promesse de
  -- conformité (« états financiers conformes au SYSCOHADA révisé »), quel que
  -- soit le texte actuel.
  UPDATE public.portfolio_innovations
  SET impact = 'En production, premier client payant.',
      status = 'En production'
  WHERE id = 'e0861cea-6fe0-4438-b374-f3e9738d9df0'
    AND title = 'KONTA, logiciel SaaS de gestion comptable SYSCOHADA'
    AND status = 'Terminé';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '8. portfolio_innovations KONTA : % ligne(s) au lieu de 1', n; END IF;

  -- 9. Portfolio, section « Nos produits » : DJODDI. Ligne créée après la
  -- sauvegarde du 2026-10-01 : identifiant inconnu, ciblée par son titre
  -- exact et son statut actuel (une seule ligne attendue).
  -- Impact : il décrivait un produit qui fonctionne (« Paie mensuelle et
  -- déclarations sociales produites sans ressaisie »).
  UPDATE public.portfolio_innovations
  SET status = 'En phase de recherche',
      impact = 'En phase de recherche.'
  WHERE title = 'DJODDI, SaaS de paie et de gestion RH'
    AND status = 'Phase de Recherche';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '9. portfolio_innovations DJODDI : % ligne(s) au lieu de 1', n; END IF;

  -- 10. Portfolio, statuts des quatre réalisations (aucun statut aujourd'hui).
  UPDATE public.portfolio_projects SET status = 'Déployé'
  WHERE id = '4055ec0e-e4bf-4016-8937-50a9e184b3f3' AND coalesce(status, '') = '';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '10a. portfolio_projects CSIG : % ligne(s) au lieu de 1', n; END IF;

  UPDATE public.portfolio_projects SET status = 'En maintenance'
  WHERE id = '4ba8e450-7e93-4a14-9b9a-7883d73f6126' AND coalesce(status, '') = '';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '10b. portfolio_projects NASSFIT : % ligne(s) au lieu de 1', n; END IF;

  UPDATE public.portfolio_projects SET status = 'Déployé'
  WHERE id = 'e1cb4e8a-c9da-499f-8b2b-5cad0b32dd86' AND coalesce(status, '') = '';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '10c. portfolio_projects 2AC Groupe : % ligne(s) au lieu de 1', n; END IF;

  -- Même ligne : tiret cadratin du titre remplacé par une virgule (règle
  -- permanente : aucun tiret cadratin dans les textes visibles).
  UPDATE public.portfolio_projects
  SET status = 'En maintenance',
      title = 'Logiciel de Caisse (TPV) Résilient & Dashboard Temps Réel, AS SPA'
  WHERE id = 'b379375c-9e31-433f-b540-3af645a4d89a'
    AND title = 'Logiciel de Caisse (TPV) Résilient & Dashboard Temps Réel — AS SPA'
    AND coalesce(status, '') = '';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION '10d. portfolio_projects AS SPA : % ligne(s) au lieu de 1', n; END IF;

  RAISE NOTICE 'Corrections appliquées : 14 lignes mises à jour.';
END
$$;

COMMIT;
