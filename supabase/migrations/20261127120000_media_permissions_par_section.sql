-- APPLIQUÉ EN PRODUCTION le 2026-11-27
-- Par Mamadou Cellou Kanté, éditeur SQL Supabase. Heure non relevée.
-- Migration de politiques (DDL) : il n'y a pas de nombre de lignes à
-- constater. Son effet ne se vérifie pas de l'extérieur du projet ; le
-- contrôle réel est le point 6 du contrôle de non-régression (le CV s'ouvre
-- depuis la fiche admin), qui traverse les droits du stockage.
-- Un rejeu est sans danger : les DROP sont en IF EXISTS et les CREATE
-- recréent les mêmes politiques.
--
-- Médias du CMS : les droits d'écriture suivent la section, comme pour les tables.
--
-- AVANT. Les trois politiques d'écriture de cms-media reposaient sur
-- has_any_admin_permission(action), c'est-à-dire « détenir cette action sur
-- AU MOINS UNE section ». Prouvé sur base jetable (PostgreSQL 17.12) :
--   - un admin dont la seule section est « insights » supprimait une photo
--     d'équipe sous team-members/ ;
--   - un éditeur dont la seule section est « team » téléversait dans
--     projects/, renommait un livre blanc sous whitepapers/, et écrivait dans
--     n'importe quel dossier inexistant.
-- L'interface n'ouvre le champ d'upload que dans la section autorisée :
-- l'écart ne se voyait qu'en appelant l'API de stockage avec un jeton valide.
-- Ce n'était donc pas un défaut d'affichage, mais un défaut de la base.
--
-- APRÈS. La ressource est déduite du premier segment du chemin de l'objet, sur
-- le modèle de settings_admin_resource(key) déjà en place pour site_settings
-- (supabase/schema.sql, section 35).
--
-- Correspondance établie depuis le code, pas supposée :
--   team-members/ -> team       src/pages/Admin/sections/TeamAdmin.jsx:169
--                               défaut de ImageUpload, FormField.jsx:121
--   projects/     -> portfolio  PortfolioAdmin.jsx:296, 306, 313
--                               défaut de ImageField, FormField.jsx:209
--   whitepapers/  -> insights   InsightsAdmin.jsx:272
--   reports/      -> insights   InsightsAdmin.jsx:505
--
-- Le dossier documents/, valeur par défaut de FileUpload (FormField.jsx:303),
-- n'est employé par aucun appel aujourd'hui : il reste volontairement hors
-- correspondance. Tout dossier non cartographié est refusé à tout le monde
-- sauf au propriétaire. Si un futur champ écrit dans un nouveau dossier,
-- l'upload échouera jusqu'à ce que la correspondance soit étendue ici : c'est
-- un échec bruyant, voulu, plutôt qu'un droit accordé par défaut.
--
-- NE CHANGE PAS :
--   - la lecture publique des médias (le site public en dépend : point 2 du
--     contrôle de non-régression, les photos de /about) ;
--   - le propriétaire, qui conserve l'écriture partout ;
--   - le bucket des CV, traité par 20260928120000_private_joinus_bucket.sql.
--
-- EFFET DE BORD CONNU : après cette migration, la fonction
-- has_any_admin_permission(text) n'est plus appelée par aucune politique. Elle
-- est conservée, pas supprimée.
--
-- Exécutée une fois dans l'éditeur SQL Supabase. Idempotent.

CREATE OR REPLACE FUNCTION public.media_admin_resource(object_name text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT CASE split_part(coalesce(object_name, ''), '/', 1)
    WHEN 'team-members' THEN 'team'
    WHEN 'projects'     THEN 'portfolio'
    WHEN 'whitepapers'  THEN 'insights'
    WHEN 'reports'      THEN 'insights'
    ELSE NULL            -- dossier non cartographié : refus par défaut
  END
$$;

REVOKE ALL ON FUNCTION public.media_admin_resource(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.media_admin_resource(text) TO authenticated;

DROP POLICY IF EXISTS "Upload admin" ON storage.objects;
CREATE POLICY "Upload admin" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-media'
    AND (SELECT public.has_admin_permission(public.media_admin_resource(name), 'create')));

DROP POLICY IF EXISTS "Modification admin" ON storage.objects;
CREATE POLICY "Modification admin" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-media'
    AND (SELECT public.has_admin_permission(public.media_admin_resource(name), 'update')))
  WITH CHECK (bucket_id = 'cms-media'
    AND (SELECT public.has_admin_permission(public.media_admin_resource(name), 'update')));

DROP POLICY IF EXISTS "Suppression admin" ON storage.objects;
CREATE POLICY "Suppression admin" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cms-media'
    AND (SELECT public.has_admin_permission(public.media_admin_resource(name), 'delete')));

-- Vérification après exécution.
--   1. La correspondance répond bien :
--      SELECT public.media_admin_resource('team-members/x.jpg');  -- team
--      SELECT public.media_admin_resource('inconnu/x.jpg');       -- NULL
--   2. Les trois politiques citent la correspondance :
--      SELECT policyname, cmd FROM pg_policies
--      WHERE schemaname = 'storage' AND tablename = 'objects'
--        AND qual LIKE '%media_admin_resource%'
--         OR with_check LIKE '%media_admin_resource%';
--   3. La lecture publique est intacte :
--      SELECT policyname, roles FROM pg_policies
--      WHERE schemaname = 'storage' AND policyname = 'Lecture publique médias';
