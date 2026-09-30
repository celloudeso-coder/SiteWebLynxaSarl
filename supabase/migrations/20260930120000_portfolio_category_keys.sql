-- Portfolio : séparer la CLÉ de catégorie de son LIBELLÉ affiché.
--
-- Avant : portfolio_projects.service_type contenait un libellé
-- (« Web Development »), et la liste des filtres
-- (site_settings.portfolio_filter_options.services) était un tableau de
-- chaînes, « Tous » compris. Renommer une catégorie cassait le lien avec
-- les projets et avec le code (icônes, boutons).
--
-- Après :
--   - service_type contient une clé stable : « web-development » ;
--   - services devient [{ "key": "...", "label": "..." }] ; « Tous » n'est
--     plus un élément de la liste (le site l'ajoute lui-même) ;
--   - le libellé se renomme depuis l'admin (Portfolio+ › Filtres), sans
--     toucher au code ni aux projets.
--
-- Migration de DONNÉES uniquement (aucune colonne ajoutée). Idempotente.
-- Ordre : le code déployé comprend les deux formats, elle peut donc être
-- lancée avant ou après le déploiement.

-- 1. Projets : libellé → clé.
UPDATE public.portfolio_projects
SET service_type = CASE service_type
    WHEN 'Mobile Development'     THEN 'mobile-development'
    WHEN 'Développement Mobile'   THEN 'mobile-development'
    WHEN 'Network Infrastructure' THEN 'network-infrastructure'
    WHEN 'Infrastructure Réseau'  THEN 'network-infrastructure'
    WHEN 'Web Development'        THEN 'web-development'
    WHEN 'Développement Web'      THEN 'web-development'
    WHEN 'Cybersecurity'          THEN 'cybersecurity'
    WHEN 'Cybersécurité'          THEN 'cybersecurity'
    WHEN 'Cloud & DevOps'         THEN 'cloud-devops'
    WHEN 'Data & Analytics'       THEN 'data-analytics'
    ELSE service_type
  END
WHERE service_type IN ('Mobile Development', 'Développement Mobile', 'Network Infrastructure',
  'Infrastructure Réseau', 'Web Development', 'Développement Web', 'Cybersecurity',
  'Cybersécurité', 'Cloud & DevOps', 'Data & Analytics');

-- 2. Liste des catégories : chaînes → { key, label } (libellés français),
--    en conservant l'ordre et en retirant « Tous ». Ne touche pas une liste
--    déjà convertie (éléments objets).
WITH mapping(old_label, key, label) AS (
  VALUES
    ('Mobile Development',     'mobile-development',     'Développement mobile'),
    ('Développement Mobile',   'mobile-development',     'Développement mobile'),
    ('Network Infrastructure', 'network-infrastructure', 'Infrastructure réseau'),
    ('Infrastructure Réseau',  'network-infrastructure', 'Infrastructure réseau'),
    ('Web Development',        'web-development',        'Développement web'),
    ('Développement Web',      'web-development',        'Développement web'),
    ('Cybersecurity',          'cybersecurity',          'Cybersécurité'),
    ('Cybersécurité',          'cybersecurity',          'Cybersécurité'),
    ('Cloud & DevOps',         'cloud-devops',           'Cloud & DevOps'),
    ('Data & Analytics',       'data-analytics',         'Données & analytique')
),
converted AS (
  SELECT s.id,
         COALESCE(jsonb_agg(
           jsonb_build_object(
             'key',   COALESCE(m.key, regexp_replace(lower(e.item), '[^a-z0-9]+', '-', 'g')),
             'label', COALESCE(m.label, e.item)
           ) ORDER BY e.ord
         ) FILTER (WHERE e.item <> 'Tous'), '[]'::jsonb) AS services
  FROM public.site_settings s
  CROSS JOIN LATERAL jsonb_array_elements_text(s.value->'services') WITH ORDINALITY AS e(item, ord)
  LEFT JOIN mapping m ON m.old_label = e.item
  WHERE s.key = 'portfolio_filter_options'
    AND jsonb_typeof(s.value->'services') = 'array'
    AND jsonb_typeof(s.value->'services'->0) = 'string'
  GROUP BY s.id
)
UPDATE public.site_settings s
SET value = jsonb_set(s.value, '{services}', c.services)
FROM converted c
WHERE s.id = c.id;

-- Vérification :
--   SELECT DISTINCT service_type FROM public.portfolio_projects;
--   SELECT value->'services' FROM public.site_settings WHERE key = 'portfolio_filter_options';
