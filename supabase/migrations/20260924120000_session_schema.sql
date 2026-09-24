-- =====================================================================
-- Migration 2026-09-24 — ajouts de schéma de la branche
-- fix/seo-prerender-cleanup, à appliquer AVANT de déployer le front.
-- =====================================================================
--
-- Exécutable d'un seul bloc dans l'éditeur SQL Supabase, et relançable
-- sans effet de bord : chaque instruction est idempotente (IF NOT EXISTS,
-- ON CONFLICT DO NOTHING, UPDATE limités aux colonnes encore vides).
-- Aucune ligne n'est supprimée, aucune colonne existante n'est modifiée.
-- Tout s'exécute dans une transaction : en cas d'erreur, rien n'est appliqué.
--
-- Ordre (dépendances) :
--   0. Garde-fou : tables préexistantes attendues
--   1. Colonnes additives sur les tables existantes (+ contraintes)
--   2. Table unrecorded_submissions, droits et RLS
--   3. Contenu : ligne "cybersecurity" (services) + remplissage des
--      nouvelles colonnes de prix GNF
--   4. Auto-vérification (annule tout si un point échoue)
--   5. Rechargement du cache de schéma PostgREST
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- 0. Garde-fou
-- ---------------------------------------------------------------------
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'services', 'portfolio_projects', 'pricing_plans',
    'partnership_pathways', 'contact_messages', 'about_advantages'
  ] LOOP
    IF to_regclass('public.' || t) IS NULL THEN
      RAISE EXCEPTION 'Table public.% absente : ce n''est pas la base attendue, migration annulée.', t;
    END IF;
  END LOOP;
END
$$;

-- ---------------------------------------------------------------------
-- 1. Colonnes additives
-- ---------------------------------------------------------------------

-- Prix saisis en francs guinéens (l'équivalent USD est calculé côté site).
ALTER TABLE public.pricing_plans
  ADD COLUMN IF NOT EXISTS price_gnf bigint;

ALTER TABLE public.partnership_pathways
  ADD COLUMN IF NOT EXISTS budget_min_gnf bigint,
  ADD COLUMN IF NOT EXISTS budget_max_gnf bigint;

-- Études de cas (galerie) et produits phares (page /produits/:slug).
ALTER TABLE public.portfolio_projects
  ADD COLUMN IF NOT EXISTS gallery_urls        jsonb   DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS status              text,
  ADD COLUMN IF NOT EXISTS is_flagship_product boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS product_slug        text,
  ADD COLUMN IF NOT EXISTS value_proposition   text,
  ADD COLUMN IF NOT EXISTS key_features        jsonb   DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS compliance_notes    text,
  ADD COLUMN IF NOT EXISTS demo_url            text;

-- Les demandes Partenariat et Services arrivent désormais dans
-- contact_messages (canal principal), avec leur formulaire d'origine.
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS source  text  DEFAULT 'contact',
  ADD COLUMN IF NOT EXISTS details jsonb DEFAULT '{}';

-- Source (nom + année) des statistiques macro de la page À propos.
ALTER TABLE public.about_advantages
  ADD COLUMN IF NOT EXISTS source text DEFAULT '';

-- Contraintes : ne portent que sur les nouvelles colonnes (vides ou à
-- leur valeur par défaut sur les lignes existantes), donc toujours valides.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'portfolio_projects_product_slug_key') THEN
    ALTER TABLE public.portfolio_projects
      ADD CONSTRAINT portfolio_projects_product_slug_key UNIQUE (product_slug);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'portfolio_projects_product_slug_format') THEN
    ALTER TABLE public.portfolio_projects
      ADD CONSTRAINT portfolio_projects_product_slug_format
      CHECK (product_slug IS NULL OR product_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'portfolio_projects_gallery_max_2') THEN
    ALTER TABLE public.portfolio_projects
      ADD CONSTRAINT portfolio_projects_gallery_max_2
      CHECK (gallery_urls IS NULL OR (jsonb_typeof(gallery_urls) = 'array' AND jsonb_array_length(gallery_urls) <= 2));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pricing_plans_price_gnf_positive') THEN
    ALTER TABLE public.pricing_plans
      ADD CONSTRAINT pricing_plans_price_gnf_positive CHECK (price_gnf IS NULL OR price_gnf > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'partnership_pathways_budget_range') THEN
    ALTER TABLE public.partnership_pathways
      ADD CONSTRAINT partnership_pathways_budget_range
      CHECK (budget_max_gnf IS NULL OR (budget_min_gnf IS NOT NULL AND budget_max_gnf > budget_min_gnf));
  END IF;
END
$$;

-- ---------------------------------------------------------------------
-- 2. unrecorded_submissions — filet de sécurité des formulaires publics
-- ---------------------------------------------------------------------
-- Contient des coordonnées de prospects : l'anonyme peut y ÉCRIRE mais
-- jamais LIRE, MODIFIER ni SUPPRIMER. Défense en deux couches :
--   a) privilèges : anon n'a que INSERT (même une politique trop large
--      ajoutée plus tard ne lui donnerait pas la lecture) ;
--   b) RLS : aucune politique SELECT/UPDATE/DELETE pour anon ; lecture
--      côté admin réservée à la permission "messages" du CMS.
CREATE TABLE IF NOT EXISTS public.unrecorded_submissions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form         text NOT NULL,
  payload      jsonb NOT NULL,
  db_error     text,
  email_sent   boolean DEFAULT false,
  resolved     boolean DEFAULT false,
  admin_notes  text,
  created_at   timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unrecorded_submissions_form_len') THEN
    ALTER TABLE public.unrecorded_submissions
      ADD CONSTRAINT unrecorded_submissions_form_len CHECK (char_length(form) BETWEEN 1 AND 64);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unrecorded_submissions_payload_size') THEN
    ALTER TABLE public.unrecorded_submissions
      ADD CONSTRAINT unrecorded_submissions_payload_size CHECK (octet_length(payload::text) <= 65536);
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS unrecorded_submissions_created_at_idx
  ON public.unrecorded_submissions (created_at DESC);

ALTER TABLE public.unrecorded_submissions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.unrecorded_submissions FROM anon;
GRANT INSERT ON public.unrecorded_submissions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.unrecorded_submissions TO authenticated;

-- Politiques recréées à l'identique à chaque exécution (DROP IF EXISTS
-- ne touche qu'aux politiques, jamais aux données). "admin_all" est
-- supprimée si elle existe : ouverte à tout compte authentifié, elle
-- exposerait les prospects à n'importe quel utilisateur connecté.
DROP POLICY IF EXISTS "admin_all"              ON public.unrecorded_submissions;
DROP POLICY IF EXISTS "public_insert"          ON public.unrecorded_submissions;
DROP POLICY IF EXISTS "cms_authenticated_read" ON public.unrecorded_submissions;
DROP POLICY IF EXISTS "cms_authorized_insert"  ON public.unrecorded_submissions;
DROP POLICY IF EXISTS "cms_authorized_update"  ON public.unrecorded_submissions;
DROP POLICY IF EXISTS "cms_authorized_delete"  ON public.unrecorded_submissions;

-- Le visiteur ne peut créer qu'une trace "non traitée", sans note admin.
CREATE POLICY "public_insert" ON public.unrecorded_submissions
  FOR INSERT TO anon
  WITH CHECK (resolved IS NOT TRUE AND admin_notes IS NULL);

-- Côté admin : même contrôle que les messages de contact (ressource
-- "messages" du CMS). Si le système de permissions n'existe pas sur cette
-- base, repli sur le rôle admin, puis — à défaut — refus de la migration.
DO $$
DECLARE
  cond_view   text;
  cond_create text;
  cond_update text;
  cond_delete text;
BEGIN
  IF to_regprocedure('public.has_admin_permission(text,text)') IS NOT NULL THEN
    cond_view   := '(SELECT public.has_admin_permission(''messages'', ''view''))';
    cond_create := '(SELECT public.has_admin_permission(''messages'', ''create''))';
    cond_update := '(SELECT public.has_admin_permission(''messages'', ''update''))';
    cond_delete := '(SELECT public.has_admin_permission(''messages'', ''delete''))';
  ELSIF to_regprocedure('public.can_admin(text)') IS NOT NULL THEN
    cond_view   := '(SELECT public.can_admin(''admin''))';
    cond_create := cond_view;
    cond_update := cond_view;
    cond_delete := cond_view;
  ELSE
    RAISE EXCEPTION 'Ni has_admin_permission ni can_admin n''existent : impossible de restreindre la lecture de unrecorded_submissions aux administrateurs. Migration annulée.';
  END IF;

  EXECUTE format('CREATE POLICY "cms_authenticated_read" ON public.unrecorded_submissions FOR SELECT TO authenticated USING (%s)', cond_view);
  EXECUTE format('CREATE POLICY "cms_authorized_insert" ON public.unrecorded_submissions FOR INSERT TO authenticated WITH CHECK (%s)', cond_create);
  EXECUTE format('CREATE POLICY "cms_authorized_update" ON public.unrecorded_submissions FOR UPDATE TO authenticated USING (%s) WITH CHECK (%s)', cond_update, cond_update);
  EXECUTE format('CREATE POLICY "cms_authorized_delete" ON public.unrecorded_submissions FOR DELETE TO authenticated USING (%s)', cond_delete);
END
$$;

-- ---------------------------------------------------------------------
-- 3. Contenu
-- ---------------------------------------------------------------------

-- 4e domaine d'expertise. N'écrase jamais une ligne "cybersecurity" déjà créée.
-- Visible IMMÉDIATEMENT sur le site déjà en ligne (Accueil, Services) : pas de
-- métriques chiffrées tant qu'elles ne sont pas vérifiées (à saisir dans
-- /admin/services), et un seul projet lié, repris tel quel du contenu existant.
INSERT INTO public.services
  (sort_order, slug, title, subtitle, icon, description, highlights, technologies, metrics, projects, project_count)
VALUES
  (4, 'cybersecurity', 'Cybersécurité et Conformité', 'Protection, Résilience & Conformité des Données', 'Shield',
   'Protégez vos systèmes, vos données et votre réputation avec une approche complète de la cybersécurité, de l''audit à la réponse à incident, en passant par la sensibilisation de vos équipes.',
   '["Audit de vulnérabilités et test d''intrusion", "Durcissement d''infrastructure", "Réponse à incident et investigation", "Sensibilisation et formation des équipes", "Conformité et protection des données"]',
   '["Nmap", "Metasploit", "Burp Suite", "Wireshark", "pfSense", "SIEM"]',
   '[]',
   '[{"name": "Sécurité Secteur Bancaire", "description": "Implémentation cybersécurité avancée pour institution financière majeure", "industry": "Finance"}]',
   0)
ON CONFLICT (slug) DO NOTHING;

-- Prix GNF de la grille tarifaire (src/data/pricing.js). Ne remplit que la
-- nouvelle colonne, et seulement si elle est encore vide : le texte "price"
-- existant est conservé tel quel.
UPDATE public.pricing_plans SET price_gnf = 4500000
  WHERE name = 'Pack Startup' AND price_gnf IS NULL;
UPDATE public.pricing_plans SET price_gnf = 18000000
  WHERE name = 'Suite Professionnelle' AND price_gnf IS NULL;

-- Budgets GNF des voies de collaboration : uniquement pour les lignes dont
-- le texte "budget" est encore celui d'origine (un budget retouché dans
-- l'admin n'est pas remplacé ; il reste affiché tel quel).
UPDATE public.partnership_pathways SET budget_min_gnf = 6500000, budget_max_gnf = 27000000
  WHERE budget = '700 $ – 3 000 $' AND budget_min_gnf IS NULL AND budget_max_gnf IS NULL;
UPDATE public.partnership_pathways SET budget_min_gnf = 31500000, budget_max_gnf = 90000000
  WHERE budget = '3 500 $ – 10 000 $' AND budget_min_gnf IS NULL AND budget_max_gnf IS NULL;
UPDATE public.partnership_pathways SET budget_min_gnf = 135000000
  WHERE budget = '15 000 $ et +' AND budget_min_gnf IS NULL AND budget_max_gnf IS NULL;

-- ---------------------------------------------------------------------
-- 4. Auto-vérification : toute anomalie annule la transaction entière
-- ---------------------------------------------------------------------
DO $$
DECLARE
  missing text;
BEGIN
  SELECT string_agg(format('%s.%s', t, c), ', ') INTO missing
  FROM (VALUES
    ('pricing_plans', 'price_gnf'),
    ('partnership_pathways', 'budget_min_gnf'), ('partnership_pathways', 'budget_max_gnf'),
    ('portfolio_projects', 'gallery_urls'), ('portfolio_projects', 'status'),
    ('portfolio_projects', 'is_flagship_product'), ('portfolio_projects', 'product_slug'),
    ('portfolio_projects', 'value_proposition'), ('portfolio_projects', 'key_features'),
    ('portfolio_projects', 'compliance_notes'), ('portfolio_projects', 'demo_url'),
    ('contact_messages', 'source'), ('contact_messages', 'details'),
    ('about_advantages', 'source')
  ) AS expected(t, c)
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = expected.t AND column_name = expected.c
  );
  IF missing IS NOT NULL THEN
    RAISE EXCEPTION 'Colonnes manquantes après migration : %', missing;
  END IF;

  IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.unrecorded_submissions'::regclass) THEN
    RAISE EXCEPTION 'RLS inactive sur unrecorded_submissions';
  END IF;

  IF has_table_privilege('anon', 'public.unrecorded_submissions', 'SELECT')
     OR has_table_privilege('anon', 'public.unrecorded_submissions', 'UPDATE')
     OR has_table_privilege('anon', 'public.unrecorded_submissions', 'DELETE') THEN
    RAISE EXCEPTION 'anon conserve un droit de lecture/modification sur unrecorded_submissions';
  END IF;
  IF NOT has_table_privilege('anon', 'public.unrecorded_submissions', 'INSERT') THEN
    RAISE EXCEPTION 'anon ne peut pas insérer dans unrecorded_submissions : les formulaires perdraient leur filet de sécurité';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'unrecorded_submissions'
      AND cmd IN ('SELECT', 'ALL', 'UPDATE', 'DELETE')
      AND ('anon' = ANY(roles) OR 'public' = ANY(roles) OR qual = 'true')
  ) THEN
    RAISE EXCEPTION 'Une politique ouvre la lecture ou la modification de unrecorded_submissions trop largement';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'contact_messages' AND cmd = 'INSERT' AND 'anon' = ANY(roles)
  ) THEN
    RAISE EXCEPTION 'contact_messages n''accepte pas l''insertion anonyme : les formulaires ne pourraient rien enregistrer';
  END IF;
END
$$;

COMMIT;

-- ---------------------------------------------------------------------
-- 5. PostgREST (API Supabase) : prise en compte immédiate des colonnes
-- ---------------------------------------------------------------------
NOTIFY pgrst, 'reload schema';
