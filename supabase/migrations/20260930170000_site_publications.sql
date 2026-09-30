-- Publication du site depuis l'admin (bouton « Publier les modifications »).
--
-- Le site est prérendu au build : une modification du CMS n'atteint le HTML
-- servi qu'au build suivant. L'admin déclenche ce build via la fonction Edge
-- publish-site, qui appelle un deploy hook Vercel. L'URL du hook vit
-- uniquement comme secret Supabase (VERCEL_DEPLOY_HOOK_URL), jamais ici.
--
-- Toute l'autorisation et la limitation de fréquence sont ici, dans la base :
--   - droit : has_admin_permission('settings', 'update') pour demander et
--     mettre à jour une publication, 'view' pour lire l'historique
--     (propriétaires toujours autorisés, cf. has_admin_permission) ;
--   - au plus une publication (non échouée) toutes les 2 minutes, tous
--     admins confondus ;
--   - au plus 20 publications (non échouées) par jour, heure de Conakry.
--
-- À exécuter dans l'éditeur SQL Supabase. Idempotent.

CREATE TABLE IF NOT EXISTS public.site_publications (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requested_by  uuid NOT NULL REFERENCES auth.users(id),
  requested_at  timestamptz NOT NULL DEFAULT now(),
  status        text NOT NULL DEFAULT 'requested'
                CHECK (status IN ('requested', 'dispatched', 'failed')),
  vercel_job_id text,
  error         text
);

CREATE INDEX IF NOT EXISTS site_publications_requested_at_idx
  ON public.site_publications (requested_at DESC);

ALTER TABLE public.site_publications ENABLE ROW LEVEL SECURITY;

-- Lecture réservée aux admins. Aucune policy d'insertion, de mise à jour ni
-- de suppression : l'écriture passe exclusivement par les deux fonctions
-- SECURITY DEFINER ci-dessous. Les privilèges d'écriture directs sont aussi
-- retirés (défense en profondeur, en plus de la RLS).
DROP POLICY IF EXISTS "site_publications_admin_read" ON public.site_publications;
CREATE POLICY "site_publications_admin_read" ON public.site_publications
  FOR SELECT TO authenticated
  USING ((SELECT public.has_admin_permission('settings', 'view')));

REVOKE ALL ON public.site_publications FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.site_publications FROM authenticated;
GRANT SELECT ON public.site_publications TO authenticated;

-- Demande de publication : contrôle du droit et des limites, puis
-- enregistrement. Retourne l'id de la demande.
CREATE OR REPLACE FUNCTION public.request_site_publication()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_id        uuid;
  v_last      timestamptz;
  v_today     integer;
  v_day_start timestamptz;
BEGIN
  IF NOT public.has_admin_permission('settings', 'update') THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;

  -- Sérialise les demandes concurrentes (deux clics simultanés ne doivent
  -- pas passer tous les deux le contrôle de fréquence).
  PERFORM pg_advisory_xact_lock(hashtext('public.site_publications'));

  SELECT max(requested_at) INTO v_last
  FROM public.site_publications
  WHERE status <> 'failed';

  IF v_last IS NOT NULL AND v_last > now() - interval '2 minutes' THEN
    -- DETAIL = secondes restantes avant de pouvoir republier.
    RAISE EXCEPTION 'rate_limited' USING
      ERRCODE = 'P0001',
      DETAIL = ceil(extract(epoch FROM (v_last + interval '2 minutes' - now())))::integer::text;
  END IF;

  -- Minuit, heure de Conakry (GMT).
  v_day_start := date_trunc('day', now() AT TIME ZONE 'Africa/Conakry') AT TIME ZONE 'Africa/Conakry';

  SELECT count(*) INTO v_today
  FROM public.site_publications
  WHERE status <> 'failed' AND requested_at >= v_day_start;

  IF v_today >= 20 THEN
    RAISE EXCEPTION 'daily_limit' USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.site_publications (requested_by)
  VALUES (auth.uid())
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- Résultat de l'appel au deploy hook : 'dispatched' (avec l'id du job
-- Vercel) ou 'failed' (avec le message d'erreur). Uniquement sur une
-- demande de l'appelant encore à l'état 'requested'.
CREATE OR REPLACE FUNCTION public.mark_site_publication(
  p_id     uuid,
  p_status text,
  p_job    text,
  p_error  text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT public.has_admin_permission('settings', 'update') THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_status NOT IN ('dispatched', 'failed') THEN
    RAISE EXCEPTION 'invalid_status' USING ERRCODE = '22023';
  END IF;

  UPDATE public.site_publications
  SET status        = p_status,
      vercel_job_id = p_job,
      error         = left(p_error, 500)
  WHERE id = p_id
    AND requested_by = auth.uid()
    AND status = 'requested';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'publication_not_found' USING ERRCODE = 'P0002';
  END IF;
END;
$$;

-- Supabase accorde par défaut EXECUTE à anon sur les nouvelles fonctions :
-- on le retire explicitement, en plus de PUBLIC.
REVOKE ALL ON FUNCTION public.request_site_publication() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.mark_site_publication(uuid, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.request_site_publication() TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_site_publication(uuid, text, text, text) TO authenticated;

NOTIFY pgrst, 'reload schema';
