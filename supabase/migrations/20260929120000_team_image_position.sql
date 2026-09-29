-- Équipe : point focal des portraits.
--
-- Les portraits sont affichés dans des cercles (object-fit: cover) et
-- recadrés au centre par défaut, ce qui coupe parfois les visages. Cette
-- colonne stocke la position CSS (object-position) choisie dans l'admin,
-- au format « X% Y% ». NULL = centre, comportement actuel inchangé.
--
-- À exécuter dans l'éditeur SQL Supabase AVANT de déployer le code qui
-- enregistre ce réglage (sinon l'enregistrement d'un membre dont on a
-- changé le cadrage échoue : colonne inconnue). Idempotent.

ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS image_position text;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'team_members_image_position_format') THEN
    ALTER TABLE public.team_members
      ADD CONSTRAINT team_members_image_position_format
      CHECK (image_position IS NULL OR image_position ~ '^[0-9]{1,3}(\.[0-9]+)?% [0-9]{1,3}(\.[0-9]+)?%$');
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
