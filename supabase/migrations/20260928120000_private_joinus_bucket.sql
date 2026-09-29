-- Candidatures « Rejoindre » : le bucket des CV et lettres de motivation
-- devient privé.
--
-- Avant : bucket public + politique de lecture ouverte à tous. N'importe quel
-- porteur de la clé anon (publique, présente dans le bundle) pouvait lister le
-- bucket et télécharger tous les CV, et les liens envoyés par email ne
-- s'expiraient jamais.
--
-- Après :
--   - le bucket n'est plus public (plus d'URL /object/public/…) ;
--   - la lecture est réservée aux admins ayant la permission « recruitment »
--     en consultation, qui génèrent une URL signée de courte durée au clic ;
--   - le dépôt anonyme (joinus_public_upload, INSERT seul) est conservé :
--     le formulaire public doit toujours pouvoir envoyer un CV.
--
-- À exécuter une fois dans l'éditeur SQL Supabase. Idempotent.
--
-- Rétrocompatibilité : les lignes existantes de job_applications contiennent
-- l'URL publique complète dans cv_url / letter_url ; les nouvelles contiennent
-- le chemin de l'objet. L'admin sait lire les deux formes, aucune reprise de
-- données n'est nécessaire. En revanche, les anciens liens publics (emails
-- déjà envoyés, exports CSV) cessent de fonctionner dès cette migration :
-- c'est l'objectif.

UPDATE storage.buckets
SET public = false
WHERE id = 'Cv_lettredemotivation_joinus';

DROP POLICY IF EXISTS "joinus_public_read" ON storage.objects;

DROP POLICY IF EXISTS "joinus_admin_read" ON storage.objects;
CREATE POLICY "joinus_admin_read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'Cv_lettredemotivation_joinus' AND (SELECT public.has_admin_permission('recruitment', 'view')));

-- Vérification (doit renvoyer public = false et aucune politique SELECT
-- accessible à anon sur ce bucket) :
--   SELECT id, public FROM storage.buckets WHERE id = 'Cv_lettredemotivation_joinus';
--   SELECT policyname, cmd, roles FROM pg_policies
--   WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname LIKE 'joinus_%';
