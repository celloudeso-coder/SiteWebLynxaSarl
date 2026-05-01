-- ============================================================
-- LYNXA TECH GUINEA — CMS Schema
-- À exécuter dans l'éditeur SQL de Supabase
-- ============================================================

-- -------------------------------------------------------
-- 1. SITE SETTINGS (informations de contact, réseaux sociaux…)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Données initiales
INSERT INTO site_settings (key, value) VALUES
  ('contact', '{"phone": "+224 621 724 657", "email": "contact@lynxatech.com", "address": "Conakry, République de Guinée", "hours": "Lun-Ven 8h-18h, Sam 9h-14h"}'),
  ('social', '{"linkedin": "https://linkedin.com/company/lynxatech", "twitter": "https://twitter.com/LynxaTechGuinea", "facebook": "https://facebook.com/LynxaTechGuinea"}'),
  ('company', '{"name": "Lynxa Tech Guinea", "tagline": "Innovation Sans Frontières", "description": "Construire l''avenir technologique de la Guinée vers le monde."}')
ON CONFLICT (key) DO NOTHING;

-- -------------------------------------------------------
-- 2. HERO SECTIONS (une par page)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text UNIQUE NOT NULL,
  title text,
  subtitle text,
  description text,
  cta_primary_text text,
  cta_primary_link text,
  cta_secondary_text text,
  cta_secondary_link text,
  image_url text,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO hero_sections (page, title, subtitle, description, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link) VALUES
  ('home', 'Innovation Sans Frontières', 'Construire l''Avenir depuis la Guinée', 'Des solutions technologiques de classe mondiale conçues en Guinée pour transformer les entreprises à travers l''Afrique de l''Ouest et au-delà.', 'Découvrir nos services', '/service', 'Notre portfolio', '/portfolio'),
  ('about', 'Notre Histoire', 'Innovation, Vision & Impact', 'Découvrez le parcours de Lynxa Tech, de la Guinée au reste du monde.', 'Profil de l''entreprise', '#', 'Rejoindre l''équipe', '/join-us'),
  ('services', 'Nos Services', 'Solutions Technologiques de Pointe', 'Développement mobile, infrastructure réseau, web — des solutions pensées pour l''Afrique, compétitives à l''échelle mondiale.', 'Demander un devis', '/contact', 'Voir le portfolio', '/portfolio'),
  ('portfolio', 'Nos Réalisations', 'Histoires de Succès Inspirantes', 'Des projets qui transforment des vies et propulsent des organisations.', 'Démarrer un projet', '/contact', 'Partenariats', '/partnership'),
  ('partnership', 'Partenariat', 'Collaborons Ensemble', 'Rejoignez notre réseau de partenaires et construisons l''avenir technologique de l''Afrique.', 'Soumettre un projet', '#', 'Nous contacter', '/contact'),
  ('contact', 'Contactez-nous', 'Toujours à Votre Écoute', 'Discutons de votre projet. Nous répondons sous 24h.', 'WhatsApp', '#', 'Email', 'mailto:contact@lynxatech.com')
ON CONFLICT (page) DO NOTHING;

-- -------------------------------------------------------
-- 3. SERVICES
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  icon text,
  description text,
  highlights jsonb DEFAULT '[]',
  technologies jsonb DEFAULT '[]',
  metrics jsonb DEFAULT '[]',
  projects jsonb DEFAULT '[]',
  project_count integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO services (sort_order, slug, title, subtitle, icon, description, highlights, technologies, metrics, projects, project_count) VALUES
  (1, 'mobile-development', 'Développement Mobile', 'Native & Cross-Platform', 'Smartphone',
   'Créez des applications mobiles puissantes qui engagent les utilisateurs et stimulent la croissance. Des solutions fintech aux plateformes agricoles.',
   '["iOS & Android natif", "Cross-platform avec React Native", "Progressive Web Apps (PWA)", "Optimisation App Store"]',
   '["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Firebase"]',
   '[{"label": "Note moyenne", "value": "4.8/5"}, {"label": "Taux de succès", "value": "98%"}, {"label": "Rétention utilisateurs", "value": "85%"}, {"label": "Score performance", "value": "95/100"}]',
   '[{"name": "GuineaPay Mobile", "description": "Solution de paiement digital pour PME avec +50K utilisateurs actifs", "industry": "Fintech"}, {"name": "AgriConnect", "description": "Marché agricole reliant producteurs et acheteurs en Afrique de l''Ouest", "industry": "Agriculture"}, {"name": "EduGuinea", "description": "Plateforme d''éducation à distance pour +10K étudiants", "industry": "Éducation"}]',
   1),
  (2, 'network-infrastructure', 'Infrastructure Réseau', 'Solutions Réseau Robustes & Évolutives', 'Wifi',
   'Conception et déploiement d''infrastructures réseau sécurisées et évolutives adaptées aux défis de connectivité en Afrique de l''Ouest.',
   '["Conception et déploiement réseau", "Sécurité de l''infrastructure", "Optimisation des performances", "Supervision et maintenance"]',
   '["Cisco", "Ubiquiti", "pfSense", "VMware", "Linux"]',
   '[{"label": "Disponibilité réseau", "value": "99.8%"}, {"label": "Incidents sécurité", "value": "0"}, {"label": "Amélioration perf.", "value": "300%"}, {"label": "Satisfaction client", "value": "100%"}]',
   '[{"name": "Réseau Ministère Santé", "description": "Infrastructure nationale connectant +50 établissements de santé", "industry": "Santé"}, {"name": "Sécurité Secteur Bancaire", "description": "Implémentation cybersécurité avancée pour institution financière majeure", "industry": "Finance"}, {"name": "Réseau Universitaire", "description": "Réseau campus pour l''Université de Conakry avec +5000 utilisateurs", "industry": "Éducation"}]',
   0),
  (3, 'web-development', 'Développement Web', 'Solutions Web Modernes & Responsives', 'Globe',
   'Créez des sites web et applications performants qui offrent des expériences utilisateur exceptionnelles pour des organisations à travers la Guinée.',
   '["Design web responsive", "Plateformes e-commerce", "Systèmes de gestion de contenu", "Optimisation SEO & analytics"]',
   '["React", "Vue.js", "Node.js", "PHP", "WordPress", "Shopify"]',
   '[{"label": "Vitesse de chargement", "value": "< 2s"}, {"label": "Score SEO", "value": "95/100"}, {"label": "Taux de conversion", "value": "+250%"}, {"label": "Optimisation mobile", "value": "100%"}]',
   '[{"name": "Portail Tourisme Guinée", "description": "Site officiel du tourisme avec système de réservation intégré", "industry": "Tourisme"}, {"name": "Plateforme Impact ONG", "description": "Système de suivi et reporting pour projets de développement", "industry": "ONG"}, {"name": "Marketplace E-Commerce", "description": "Plateforme multi-vendeurs pour artisans locaux et clients internationaux", "industry": "E-Commerce"}]',
   0)
ON CONFLICT (slug) DO NOTHING;

-- -------------------------------------------------------
-- 4. PORTFOLIO PROJECTS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  title text NOT NULL,
  service_type text,
  industry text,
  scale text,
  impact text,
  description text,
  challenge text,
  solution text,
  implementation_steps jsonb DEFAULT '[]',
  technologies jsonb DEFAULT '[]',
  metrics jsonb DEFAULT '[]',
  testimonial jsonb,
  duration text,
  image_url text,
  project_url text,
  updated_at timestamptz DEFAULT now()
);

-- -------------------------------------------------------
-- 5. TEAM MEMBERS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  name text NOT NULL,
  role text,
  image_url text,
  expertise jsonb DEFAULT '[]',
  description text,
  achievements jsonb DEFAULT '[]',
  social_links jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO team_members (sort_order, name, role, image_url, expertise, description, achievements, social_links) VALUES
  (1, 'Elhadj Sadou Barry', 'Mobile Development Lead', '/CellouK.png',
   '["React Native", "Flutter", "iOS", "Android", "Firebase"]',
   'Expert en développement mobile avec une vision centrée sur l''utilisateur et une passion pour les solutions innovantes.',
   '["Lead technique sur 3 applications mobiles déployées", "Formateur React Native pour l''équipe", "Contributeur open source"]',
   '{"linkedin": "#", "github": "#"}'),
  (2, 'Mamadou Cellou Kanté', 'CEO & Co-Fondateur', '/Cellou.png',
   '["Vision Produit", "Business Development", "Leadership", "Stratégie Tech"]',
   'Visionnaire et entrepreneur, Mamadou Cellou dirige Lynxa Tech avec pour mission de faire de la Guinée un hub technologique africain.',
   '["Fondateur de Lynxa Tech", "Développeur full-stack senior", "Speaker tech Africa"]',
   '{"linkedin": "#", "twitter": "#"}'),
  (3, 'Aissatou Lamarana Diallo', 'Head of Digital Solutions', '/lamarana.png',
   '["Web Development", "UX Design", "Project Management", "SEO"]',
   'Experte en solutions digitales, Lamarana coordonne les projets web et assure une qualité d''exécution irréprochable.',
   '["Gestion de +15 projets web", "Certifiée Google Project Management", "Mentor femmes tech Guinée"]',
   '{"linkedin": "#"}'),
  (4, 'Bandiougou Keita', 'Head of Network Services', '/keita.jpg',
   '["Cisco", "Cybersécurité", "Infrastructure Cloud", "VMware"]',
   'Architecte réseau chevronné, Bandiougou conçoit des infrastructures fiables qui connectent les organisations guinéennes au monde.',
   '["Certifié CCNP", "Déploiement réseau pour +10 entreprises", "Expert sécurité périmétrique"]',
   '{"linkedin": "#"}')
ON CONFLICT DO NOTHING;

-- -------------------------------------------------------
-- 6. PRICING PLANS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  name text NOT NULL,
  price text,
  price_note text,
  is_popular boolean DEFAULT false,
  features jsonb DEFAULT '[]',
  cta_text text DEFAULT 'Demander un devis',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO pricing_plans (sort_order, name, price, price_note, is_popular, features, cta_text) VALUES
  (1, 'Pack Startup', '$700', 'prix de départ', false,
   '["Site web vitrine (5 pages)", "Design responsive mobile", "Formulaire de contact", "SEO de base", "1 mois de support"]',
   'Démarrer'),
  (2, 'Suite Professionnelle', '$3 500', 'prix de départ', true,
   '["Application web complète", "Intégration base de données", "Panneau d''administration", "API REST", "Authentification utilisateurs", "Tests et déploiement", "3 mois de support", "Formation équipe"]',
   'Choisir ce plan'),
  (3, 'Solution Entreprise', 'Sur devis', '', false,
   '["Architecture système sur mesure", "Intégrations tierces illimitées", "Infrastructure dédiée", "SLA garanti 99.9%", "Support 24/7", "Chef de projet dédié", "Formation complète", "Maintenance évolutive"]',
   'Nous contacter')
ON CONFLICT DO NOTHING;

-- -------------------------------------------------------
-- 7. TIMELINE EVENTS (historique de l'entreprise)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  year text NOT NULL,
  title text NOT NULL,
  description text,
  achievements jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO timeline_events (sort_order, year, title, description, achievements) VALUES
  (1, '2025', 'Fondation & Premiers Pas',
   'Lynxa Tech est officiellement fondée par quatre ingénieurs guinéens partageant la vision de transformer le paysage technologique de la Guinée.',
   '["Enregistrement officiel de la société", "Lancement de la première plateforme client", "Constitution de l''équipe fondatrice de 4 ingénieurs"]')
ON CONFLICT DO NOTHING;

-- -------------------------------------------------------
-- 8. METRICS (compteurs de la page d'accueil)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  label text NOT NULL,
  value integer DEFAULT 0,
  suffix text DEFAULT '',
  description text,
  page text DEFAULT 'home',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO metrics (sort_order, label, value, suffix, description, page) VALUES
  (1, 'Applications Mobiles', 1, '+', 'Applications livrées avec succès', 'home'),
  (2, 'Services Réseau', 0, '+', 'Infrastructures déployées', 'home'),
  (3, 'Sites Web Lancés', 0, '+', 'Projets web réalisés', 'home'),
  (4, 'Monitoring Actif', 0, '+', 'Systèmes en supervision', 'home')
ON CONFLICT DO NOTHING;

-- -------------------------------------------------------
-- 9. TESTIMONIALS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  quote text NOT NULL,
  author_name text,
  author_position text,
  author_company text,
  author_image text,
  rating integer DEFAULT 5,
  project_ref text,
  result text,
  updated_at timestamptz DEFAULT now()
);

-- -------------------------------------------------------
-- 10. ROW LEVEL SECURITY
-- -------------------------------------------------------

-- Lecture publique pour tout le contenu CMS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Lecture publique" ON hero_sections FOR SELECT USING (true);
CREATE POLICY "Lecture publique" ON services FOR SELECT USING (active = true);
CREATE POLICY "Lecture publique" ON portfolio_projects FOR SELECT USING (active = true);
CREATE POLICY "Lecture publique" ON team_members FOR SELECT USING (active = true);
CREATE POLICY "Lecture publique" ON pricing_plans FOR SELECT USING (active = true);
CREATE POLICY "Lecture publique" ON timeline_events FOR SELECT USING (active = true);
CREATE POLICY "Lecture publique" ON metrics FOR SELECT USING (active = true);
CREATE POLICY "Lecture publique" ON testimonials FOR SELECT USING (active = true);

-- Écriture réservée aux utilisateurs authentifiés (admin)
CREATE POLICY "Écriture admin" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Écriture admin" ON hero_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Écriture admin" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Écriture admin" ON portfolio_projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Écriture admin" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Écriture admin" ON pricing_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Écriture admin" ON timeline_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Écriture admin" ON metrics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Écriture admin" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- -------------------------------------------------------
-- 11. JOB OPENINGS (postes ouverts)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  title text NOT NULL,
  department text,
  type text DEFAULT 'Temps plein',
  location text DEFAULT 'Conakry, Guinée',
  description text,
  requirements jsonb DEFAULT '[]',
  is_urgent boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO job_openings (sort_order, title, department, type, location, description, requirements, is_urgent) VALUES
  (1, 'Développeur Mobile React Native', 'Développement', 'Temps plein', 'Conakry, Guinée',
   'Rejoignez notre équipe mobile pour concevoir des applications innovantes pour le marché africain.',
   '["2+ ans d''expérience React Native", "Connaissance iOS & Android", "API REST & Firebase", "Portfolio de projets"]',
   true),
  (2, 'Ingénieur Réseau & Sécurité', 'Infrastructure', 'Temps plein', 'Conakry, Guinée',
   'Déployez et sécurisez des infrastructures réseau critiques pour nos clients entreprises.',
   '["Certification CCNA/CCNP appréciée", "Expérience cybersécurité", "pfSense, Cisco, Ubiquiti", "Rigueur et autonomie"]',
   false),
  (3, 'Stage Développement Web Frontend', 'Développement', 'Stage', 'Conakry, Guinée',
   'Intégrez une équipe dynamique et participez à des projets web concrets avec React et Tailwind.',
   '["Bases HTML/CSS/JavaScript", "Notions de React", "Curiosité & apprentissage rapide", "Disponibilité 3-6 mois"]',
   false)
ON CONFLICT DO NOTHING;

ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique postes" ON job_openings FOR SELECT USING (active = true);
CREATE POLICY "Écriture admin postes" ON job_openings FOR ALL USING (auth.role() = 'authenticated');

-- -------------------------------------------------------
-- 11b. JOB APPLICATIONS (candidatures reçues)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  gender text,
  age text,
  education text,
  position text,
  experience text,
  contract_type text,
  availability text,
  cv_url text,
  letter_url text,
  motivation text,
  status text DEFAULT 'pending',
  admin_notes text,
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert" ON job_applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "admin_all" ON job_applications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- -------------------------------------------------------
-- 12. PARTNERSHIP PATHWAYS (voies de collaboration)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS partnership_pathways (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  title text NOT NULL,
  description text,
  icon text DEFAULT 'Handshake',
  features jsonb DEFAULT '[]',
  ideal_for text,
  timeline text,
  budget text,
  color text DEFAULT 'primary',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO partnership_pathways (sort_order, title, description, icon, features, ideal_for, timeline, budget, color) VALUES
  (1, 'Partenariat Startup & PME',
   'Solutions sur mesure pour les entreprises en croissance avec des options de paiement flexibles et une technologie évolutive.',
   'Rocket',
   '["Développement MVP", "Plans de paiement flexibles", "Solutions axées sur la croissance", "Support de mentorat"]',
   'Startups, Petites Entreprises, Entrepreneurs', '2-8 semaines', '700 $ – 3 000 $', 'primary'),
  (2, 'Solutions Entreprises',
   'Partenariats technologiques complets pour les grandes organisations avec des besoins complexes.',
   'Building2',
   '["Systèmes entreprises personnalisés", "Support prioritaire 24/7", "Chef de projet dédié", "Garanties SLA"]',
   'Grandes Entreprises, Gouvernement, ONG', '3-12 mois', '3 500 $ – 10 000 $', 'accent'),
  (3, 'Collaboration Internationale',
   'Partenariats transfrontaliers avec des organisations mondiales s''étendant sur les marchés africains.',
   'Globe',
   '["Adaptation culturelle", "Support multilingue", "Expertise marché local", "Assistance conformité"]',
   'Entreprises Internationales, ONG Mondiales', '4-16 semaines', '15 000 $ et +', 'primary'),
  (4, 'Réseau Technologique',
   'Alliances stratégiques avec d''autres entreprises tech pour une croissance et collaboration mutuelles.',
   'Network',
   '["Programmes de revente", "Intégration technologique", "Joint ventures", "Partage de connaissances"]',
   'Entreprises Tech, Intégrateurs de Systèmes', 'En continu', 'Partage de revenus', 'accent')
ON CONFLICT DO NOTHING;

ALTER TABLE partnership_pathways ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique" ON partnership_pathways FOR SELECT USING (active = true);
CREATE POLICY "Écriture admin" ON partnership_pathways FOR ALL USING (auth.role() = 'authenticated');

-- -------------------------------------------------------
-- 12. NEWSLETTER SUBSCRIPTIONS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert_upsert" ON newsletter_subscriptions
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "admin_all" ON newsletter_subscriptions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- -------------------------------------------------------
-- 12. STORAGE BUCKET pour les médias CMS
-- -------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media', 'cms-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Lecture publique médias" ON storage.objects FOR SELECT USING (bucket_id = 'cms-media');
CREATE POLICY "Upload admin" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cms-media' AND auth.role() = 'authenticated');
CREATE POLICY "Suppression admin" ON storage.objects FOR DELETE USING (bucket_id = 'cms-media' AND auth.role() = 'authenticated');

-- -------------------------------------------------------
-- 13. CONTACT MESSAGES (soumissions du formulaire contact)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  email         text NOT NULL,
  phone         text,
  company       text,
  inquiry_type  text,
  contact_method text,
  budget        text,
  message       text NOT NULL,
  status        text NOT NULL DEFAULT 'new',   -- new | read | replied | archived
  admin_notes   text,
  submitted_at  timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Soumission publique (sans RETURNING pour contourner le check SELECT)
CREATE POLICY "public_insert" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

-- Lecture et gestion réservées aux admins authentifiés
CREATE POLICY "admin_all" ON contact_messages
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- -------------------------------------------------------
-- 14. HOME ENGAGEMENTS (Bande Engagements — accueil)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS home_engagements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Star',
  label text NOT NULL DEFAULT '',
  sub_label text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO home_engagements (sort_order, icon, label, sub_label) VALUES
  (1, 'Flag',        '100 % Guinéen',     'Ancré localement'),
  (2, 'Zap',         'Réponse en 24h',     'Support ultra-réactif'),
  (3, 'Globe',       'Standards mondiaux', 'Qualité internationale'),
  (4, 'ShieldCheck', 'Sécurité by design', 'Confiance garantie')
ON CONFLICT DO NOTHING;
ALTER TABLE home_engagements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON home_engagements FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON home_engagements FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON home_engagements TO anon;
GRANT ALL    ON home_engagements TO authenticated;

-- -------------------------------------------------------
-- 15. HOME WHY ITEMS (Pourquoi Lynxa ? — accueil)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS home_why_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Star',
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO home_why_items (sort_order, icon, title, description) VALUES
  (1, 'MapPin',    'Expertise locale',              'Nous comprenons les défis uniques des marchés africains et concevons des solutions parfaitement adaptées.'),
  (2, 'Award',     'Qualité internationale',        'Nos solutions respectent les standards mondiaux tout en étant calibrées pour les réalités locales.'),
  (3, 'Users',     'Équipe pluridisciplinaire',     'Mobile, réseau, cybersécurité, web — toutes les compétences réunies sous un même toit.'),
  (4, 'Clock',     'Réactivité garantie',           'Consultation gratuite, réponse sous 24h et suivi continu tout au long de votre projet.'),
  (5, 'Handshake', 'Partenariat sur le long terme', 'Nous construisons des relations durables, pas des contrats. Votre succès est notre succès.'),
  (6, 'Lock',      'Sécurité by design',            'La sécurité n''est pas une option : elle est intégrée dès la conception de chaque solution.')
ON CONFLICT DO NOTHING;
ALTER TABLE home_why_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON home_why_items FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON home_why_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON home_why_items TO anon;
GRANT ALL    ON home_why_items TO authenticated;

-- -------------------------------------------------------
-- 16. ABOUT — CORE VALUES (Valeurs fondamentales)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS about_core_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Star',
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO about_core_values (sort_order, icon, title, description) VALUES
  (1, 'Lightbulb', 'Innovation',    'Repousser constamment les limites et explorer de nouvelles possibilités'),
  (2, 'Users',     'Collaboration', 'Travailler ensemble pour obtenir des résultats extraordinaires'),
  (3, 'Shield',    'Intégrité',     'Maintenir les normes éthiques les plus élevées dans tout notre travail'),
  (4, 'Target',    'Excellence',    'Fournir une qualité qui dépasse les attentes à chaque fois'),
  (5, 'Compass',   'Objectif',      'Guidé par un impact significatif et un changement positif'),
  (6, 'Zap',       'Agilité',       'S''adapter rapidement aux besoins et opportunités changeants')
ON CONFLICT DO NOTHING;
ALTER TABLE about_core_values ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON about_core_values FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON about_core_values FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON about_core_values TO anon;
GRANT ALL    ON about_core_values TO authenticated;

-- -------------------------------------------------------
-- 17. ABOUT — ADVANTAGES (Pourquoi la Guinée ?)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS about_advantages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Star',
  title text NOT NULL DEFAULT '',
  stats text DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO about_advantages (sort_order, icon, title, stats, description) VALUES
  (1, 'MapPin',     'Emplacement Stratégique', '400M+ personnes dans la région CEDEAO', 'La position de la Guinée en Afrique de l''Ouest donne accès à plus de 400 millions de personnes dans la région CEDEAO.'),
  (2, 'Users',      'Réservoir de Talents',    '60% de la population jeune',            'Accueil d''esprits brillants désireux de se faire remarquer sur la scène mondiale.'),
  (3, 'Zap',        'Esprit d''Innovation',    'Écosystème technologique en croissance', 'Les Guinéens sont des résolveurs de problèmes naturels.'),
  (4, 'DollarSign', 'Efficacité des Coûts',    'Économie de 20–40%',                    'Fournir une qualité premium à des tarifs compétitifs.'),
  (5, 'Clock',      'Avantage Fuseau Horaire', 'Fuseau horaire GMT+0',                  'Le fuseau GMT s''aligne parfaitement avec les heures de travail européennes.'),
  (6, 'Globe',      'Pont Culturel',           '3+ langues parlées',                    'Maîtrise du français et de l''anglais, plus la compréhension des cultures commerciales africaines.')
ON CONFLICT DO NOTHING;
ALTER TABLE about_advantages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON about_advantages FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON about_advantages FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON about_advantages TO anon;
GRANT ALL    ON about_advantages TO authenticated;

-- -------------------------------------------------------
-- 18. ABOUT — VISION PILLARS (Piliers de la vision)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS about_vision_pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Star',
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO about_vision_pillars (sort_order, icon, title, description) VALUES
  (1, 'Rocket',    'Leadership en Innovation',   'Devenir l''entreprise technologique la plus innovante d''Afrique.'),
  (2, 'Users',     'Développement des Talents',  'Créer 1000+ emplois technologiques de qualité d''ici 2030.'),
  (3, 'Building',  'Construction d''Écosystème', 'Établir des hubs technologiques qui nourrissent la prochaine génération.'),
  (4, 'Handshake', 'Partenariats Globaux',       'Former des alliances stratégiques avec des géants technologiques internationaux.')
ON CONFLICT DO NOTHING;
ALTER TABLE about_vision_pillars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON about_vision_pillars FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON about_vision_pillars FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON about_vision_pillars TO anon;
GRANT ALL    ON about_vision_pillars TO authenticated;

-- -------------------------------------------------------
-- 19. ABOUT — ROADMAP PHASES (Feuille de route)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS about_roadmap_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  phase text NOT NULL DEFAULT '',
  timeline text DEFAULT '',
  title text NOT NULL DEFAULT '',
  status text DEFAULT '',
  status_color text DEFAULT 'bg-gray-100 text-gray-500',
  description text DEFAULT '',
  goals jsonb DEFAULT '[]',
  markets jsonb DEFAULT '[]',
  icon text DEFAULT 'MapPin',
  color text DEFAULT 'bg-primary',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO about_roadmap_phases (sort_order, phase, timeline, title, status, status_color, description, goals, markets, icon, color) VALUES
  (1, 'Phase 1', '2025 – 2027', 'Expansion en Afrique de l''Ouest', 'En cours',  'bg-primary/10 text-primary',
   'Établir des partenariats stratégiques dans les principaux marchés d''Afrique de l''Ouest.',
   '["Ouvrir des bureaux au Sénégal et en Côte d''Ivoire","S''associer à 10+ entreprises technologiques locales","Lancer des services en français et en anglais","Atteindre 100–500 clients régionaux et internationaux"]',
   '["Sénégal","Côte d''Ivoire","Mali"]', 'MapPin', 'bg-primary'),
  (2, 'Phase 2', '2027 – 2028', 'Présence Continentale',            'Planifiée', 'bg-yellow-50 text-yellow-600',
   'S''étendre à travers l''Afrique, établissant Lynxa Tech comme un leader technologique panafricain.',
   '["Entrer sur 5 nouveaux marchés africains","Lancer une plateforme d''intégration de mobile money","Établir des laboratoires d''innovation dans 3 pays","Atteindre 500+ clients continentaux"]',
   '["Kenya","Nigeria","Ghana","Afrique du Sud","Maroc"]', 'Globe', 'bg-accent'),
  (3, 'Phase 3', '2028 – 2030', 'Reconnaissance Globale',           'Vision',    'bg-gray-100 text-gray-500',
   'Obtenir une reconnaissance internationale en tant qu''entreprise technologique leader d''Afrique.',
   '["IPO ou opportunité d''acquisition majeure","Clients Fortune 500 à l''international","Prix internationaux d''innovation","1000+ employés à travers les continents"]',
   '["Europe","Amérique du Nord","Asie","Moyen-Orient"]', 'Trophy', 'bg-success')
ON CONFLICT DO NOTHING;
ALTER TABLE about_roadmap_phases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON about_roadmap_phases FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON about_roadmap_phases FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON about_roadmap_phases TO anon;
GRANT ALL    ON about_roadmap_phases TO authenticated;

-- -------------------------------------------------------
-- 20. ABOUT — SITE SETTINGS seed (founder, ecosystem, impact)
-- -------------------------------------------------------
INSERT INTO site_settings (key, value) VALUES
  ('about_founder', '{"name":"Mamadou Cellou Kante","title":"Fondateur & CEO","image":"/Cellou.png","linkedinUrl":"https://www.linkedin.com/in/mamadou-cellou-kante","quote":"« Je m''appelle Mamadou Cellou Kante. J''aurais pu choisir la France, les États-Unis ou d''autres pays où l''informatique est plus avancée et davantage valorisée, comme l''ont fait beaucoup de mes promotionnaires. Mais j''ai décidé de rester en Guinée. Pourquoi ? Parce que je crois que la prochaine grande vague d''innovation viendra d''Afrique. »","story":["Né à Kamsar et diplômé en informatique à l''IPG-ISTI de Dakar. Administrateur réseaux et systèmes, certifié en cybersécurité, j''ai eu l''opportunité de travailler sur plusieurs projets d''infrastructure.","Ces expériences m''ont permis de constater une réalité frappante : malgré leur expertise et leur créativité, les talents africains restent trop souvent sous-évalués sur la scène internationale.","C''est de ce constat qu''est née cette vision. Avec LYNXA Tech, mon ambition est claire : créer un pont entre l''innovation africaine et les opportunités mondiales."],"tags":["Administrateur Réseaux & Systèmes","Certifié Cybersécurité","Entrepreneur Tech"]}'),
  ('about_ecosystem_stats', '[{"label":"Startups Technologiques","value":"150+","growth":"2025","icon":"TrendingUp"},{"label":"Taux de Pénétration Internet","value":"52%","growth":"2025","icon":"Wifi"},{"label":"Utilisateurs Mobiles","value":"14M","growth":"2024","icon":"Smartphone"},{"label":"Croissance Paiements Numériques","value":"15%","growth":"Afrique 2024","icon":"CreditCard"}]'),
  ('about_impact_metrics', '[{"current":"7+","target":"25+","label":"Membres de l''équipe","icon":"Users"},{"current":"1","target":"20+","label":"Pays","icon":"MapPin"},{"current":"6+","target":"500+","label":"Clients","icon":"Briefcase"},{"current":"0+","target":"1K+","label":"Vies impactées","icon":"Heart"}]')
ON CONFLICT (key) DO NOTHING;

-- -------------------------------------------------------
-- 21. SERVICE — PROCESS STEPS (Processus)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  icon text DEFAULT 'Star',
  duration text DEFAULT '',
  deliverables jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO service_process_steps (sort_order, title, description, icon, duration, deliverables) VALUES
  (1, 'Découverte & Analyse',      'Nous plongeons en profondeur dans vos exigences commerciales, contraintes techniques et objectifs de croissance pour créer une feuille de route complète du projet.', 'Search',  '1–2 semaines',  '["Document des Exigences","Spécification Technique","Calendrier du Projet"]'),
  (2, 'Conception & Architecture', 'Notre équipe crée une architecture système détaillée, des conceptions d''expérience utilisateur et des plans techniques adaptés à vos besoins spécifiques.',              'Layers',  '2–3 semaines',  '["Architecture Système","Conceptions UI/UX","Schéma de Base de Données"]'),
  (3, 'Développement & Tests',     'Le développement Agile avec des tests continus assure des livrables de haute qualité avec des retours réguliers et des améliorations itératives.',                      'Code',    '4–12 semaines', '["Logiciel Fonctionnel","Rapports de Test","Documentation"]'),
  (4, 'Déploiement & Support',     'Déploiement transparent avec formation complète et support continu pour garantir que votre équipe puisse maximiser le potentiel de la solution.',                       'Rocket',  '1–2 semaines',  '["Système en Production","Matériel de Formation","Plan de Support"]')
ON CONFLICT DO NOTHING;
ALTER TABLE service_process_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON service_process_steps FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON service_process_steps FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON service_process_steps TO anon;
GRANT ALL    ON service_process_steps TO authenticated;

-- -------------------------------------------------------
-- 22. SERVICE — TECH ITEMS (Stack Technologique)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_tech_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_key text NOT NULL,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  name text NOT NULL DEFAULT '',
  icon text DEFAULT 'Star',
  description text DEFAULT '',
  link text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO service_tech_items (category_key, sort_order, name, icon, description, link) VALUES
  ('frontend', 1, 'React', 'Code', 'Développement d''interfaces modernes', 'https://react.dev/'),
  ('frontend', 2, 'Vue.js', 'Layers', 'Framework progressif', 'https://vuejs.org/'),
  ('frontend', 3, 'Angular', 'Box', 'Applications d''entreprise', 'https://angular.io/'),
  ('frontend', 4, 'React Native', 'Smartphone', 'Mobile multiplateforme', 'https://reactnative.dev/'),
  ('frontend', 5, 'Flutter', 'Zap', 'Performance native', 'https://flutter.dev/'),
  ('frontend', 6, 'Tailwind CSS', 'Palette', 'Styling utilitaire', 'https://tailwindcss.com/'),
  ('backend', 1, 'Node.js', 'Cpu', 'Runtime JavaScript', 'https://nodejs.org/'),
  ('backend', 2, 'Python', 'Code', 'Programmation polyvalente', 'https://www.python.org/'),
  ('backend', 3, 'PHP', 'Globe', 'Développement web', 'https://www.php.net/'),
  ('backend', 4, 'Java', 'Coffee', 'Solutions d''entreprise', 'https://www.java.com/'),
  ('backend', 5, 'PostgreSQL', 'Database', 'Base de données relationnelle', 'https://www.postgresql.org/'),
  ('backend', 6, 'MongoDB', 'HardDrive', 'Base de données NoSQL', 'https://www.mongodb.com/'),
  ('mobile', 1, 'iOS Native', 'Apple', 'Développement Swift', 'https://developer.apple.com/swift/'),
  ('mobile', 2, 'Android Native', 'Android', 'Applications Kotlin/Java', 'https://developer.android.com/'),
  ('mobile', 3, 'React Native', 'Code', 'Multiplateforme', 'https://reactnative.dev/'),
  ('mobile', 4, 'Flutter', 'Zap', 'Framework Google', 'https://flutter.dev/'),
  ('mobile', 5, 'Ionic', 'Layers', 'Applications hybrides', 'https://ionicframework.com/'),
  ('mobile', 6, 'PWA', 'Globe', 'Applications web progressives', 'https://web.dev/progressive-web-apps/'),
  ('infrastructure', 1, 'AWS', 'Cloud', 'Informatique en cloud', 'https://aws.amazon.com/'),
  ('infrastructure', 2, 'Docker', 'Package', 'Conteneurisation', 'https://www.docker.com/'),
  ('infrastructure', 3, 'Kubernetes', 'Settings', 'Orchestration', 'https://kubernetes.io/'),
  ('infrastructure', 4, 'CI/CD', 'GitBranch', 'Déploiement automatisé', 'https://about.gitlab.com/topics/ci-cd/'),
  ('infrastructure', 5, 'Monitoring', 'Activity', 'Santé du système', 'https://prometheus.io/'),
  ('infrastructure', 6, 'Security', 'Shield', 'Protection des données', 'https://owasp.org/')
ON CONFLICT DO NOTHING;
ALTER TABLE service_tech_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON service_tech_items FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON service_tech_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON service_tech_items TO anon;
GRANT ALL    ON service_tech_items TO authenticated;

-- Tech categories metadata in site_settings
INSERT INTO site_settings (key, value) VALUES
  ('service_tech_categories', '[{"key":"frontend","title":"Développement Frontend","icon":"Monitor"},{"key":"backend","title":"Développement Backend","icon":"Server"},{"key":"mobile","title":"Développement Mobile","icon":"Smartphone"},{"key":"infrastructure","title":"Infrastructure & DevOps","icon":"Cloud"}]')
ON CONFLICT (key) DO NOTHING;

-- -------------------------------------------------------
-- 23. PORTFOLIO — INNOVATION LAB (Lab Innovation R&D)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_innovations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Star',
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  status text DEFAULT '',
  status_color text DEFAULT 'text-gray-600 bg-gray-50',
  impact text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO portfolio_innovations (sort_order, icon, title, description, status, status_color, impact) VALUES
  (1, 'Cpu',  'Optimisation Réseau par IA',
   'Algorithmes d''apprentissage automatique pour optimiser automatiquement les performances réseau et prévenir les pannes.',
   'En Développement', 'text-amber-600 bg-amber-50', 'Réduction de 40% des interruptions réseau'),
  (2, 'Lock', 'Identité Blockchain',
   'Système d''identité décentralisé pour une authentification sécurisée et respectueuse de la vie privée.',
   'Phase de Recherche', 'text-blue-600 bg-blue-50', 'Sécurité pour +100 000 utilisateurs'),
  (3, 'Leaf', 'Agriculture IoT',
   'Capteurs IoT pour surveiller conditions du sol, météo et santé des cultures pour les agriculteurs guinéens.',
   'Test Pilote', 'text-emerald-600 bg-emerald-50', '+20% de rendements agricoles')
ON CONFLICT DO NOTHING;
ALTER TABLE portfolio_innovations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON portfolio_innovations FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON portfolio_innovations FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON portfolio_innovations TO anon;
GRANT ALL    ON portfolio_innovations TO authenticated;

-- -------------------------------------------------------
-- 24. PARTNERSHIP — PROCESS STEPS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS partnership_process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Star',
  color text DEFAULT 'primary',
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  duration text DEFAULT '',
  deliverables jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO partnership_process_steps (sort_order, icon, color, title, description, duration, deliverables) VALUES
  (1, 'Search',     'primary', 'Découverte & Consultation',    'Discussion approfondie pour comprendre vos besoins, objectifs et contraintes techniques.',                              '1-3 jours',        '["Analyse des besoins","Étude de faisabilité","Périmètre initial","Évaluation des risques"]'),
  (2, 'FileText',   'accent',  'Proposition & Planification',  'Proposition détaillée avec calendrier, budget et architecture technique adaptés.',                                      '2-5 jours',        '["Proposition de projet","Architecture technique","Jalons & planning","Détail de l''investissement"]'),
  (3, 'Handshake',  'primary', 'Accord & Lancement',           'Finalisation du contrat et lancement officiel avec votre équipe dédiée.',                                               '1-2 jours',        '["Contrat signé","Réunion de lancement","Présentation équipe","Protocoles de com."]'),
  (4, 'Code',       'accent',  'Développement & Suivi',        'Développement itératif avec mises à jour régulières et revues de jalons.',                                              'Selon le projet',  '["Rapports d''avancement","Démos de jalons","Tests QA continus","Intégration des retours"]'),
  (5, 'CheckCircle','primary', 'Tests & Assurance Qualité',    'Tests complets pour garantir performance, sécurité et conformité aux exigences.',                                       '1-2 semaines',     '["Tests fonctionnels","Optimisation perf.","Validation sécurité","Tests d''acceptation"]'),
  (6, 'Rocket',     'accent',  'Déploiement & Support',        'Mise en production et support continu pour assurer la pérennité de votre solution.',                                    'En continu',       '["Déploiement prod.","Formation équipe","Documentation","Plan de support"]')
ON CONFLICT DO NOTHING;
ALTER TABLE partnership_process_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON partnership_process_steps FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON partnership_process_steps FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON partnership_process_steps TO anon;
GRANT ALL    ON partnership_process_steps TO authenticated;

-- -------------------------------------------------------
-- 25. PARTNERSHIP — TRUST SECURITY ITEMS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS trust_security_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Shield',
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO trust_security_items (sort_order, icon, title, description) VALUES
  (1, 'Key',       'Chiffrement bout-en-bout',   'Toutes les transmissions chiffrées AES-256.'),
  (2, 'Code',      'Développement sécurisé',     'Respect des directives OWASP tout au long du cycle.'),
  (3, 'Search',    'Audits réguliers',            'Tests de pénétration trimestriels et évaluations.'),
  (4, 'UserCheck', 'Conformité RGPD',             'Gestion des données conforme aux normes mondiales.'),
  (5, 'Database',  'Sauvegarde & récupération',  'Sauvegardes quotidiennes, garantie 99,9 %.'),
  (6, 'Eye',       'Surveillance 24/7',           'Monitoring continu et détection des menaces.')
ON CONFLICT DO NOTHING;
ALTER TABLE trust_security_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON trust_security_items FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON trust_security_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON trust_security_items TO anon;
GRANT ALL    ON trust_security_items TO authenticated;

-- -------------------------------------------------------
-- 26. PARTNERSHIP — TRUST COMMITMENT ITEMS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS trust_commitment_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'FileText',
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO trust_commitment_items (sort_order, icon, title, description) VALUES
  (1, 'FileText',  'Accord de confidentialité',    'Protection complète des informations et de la propriété intellectuelle.'),
  (2, 'Clock',     'Contrat de niveau de service', 'Délais de réponse garantis avec clauses pénales.'),
  (3, 'Copyright', 'Droits de propriété intel.',   'Propriété claire et accords de licence sur les solutions développées.'),
  (4, 'Shield',    'Politique de confidentialité', 'Pratiques transparentes de collecte et protection des données.')
ON CONFLICT DO NOTHING;
ALTER TABLE trust_commitment_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON trust_commitment_items FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON trust_commitment_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON trust_commitment_items TO anon;
GRANT ALL    ON trust_commitment_items TO authenticated;

-- -------------------------------------------------------
-- Site settings seeds for Contact & Office details
-- -------------------------------------------------------
INSERT INTO site_settings (key, value) VALUES
  ('contact_form_config', '{
    "inquiry_types": [
      {"value":"new-project","label":"Développement de nouveau projet"},
      {"value":"partnership","label":"Partenariat commercial"},
      {"value":"career","label":"Opportunités de carrière"},
      {"value":"support","label":"Support technique"},
      {"value":"consultation","label":"Consultation gratuite"},
      {"value":"other","label":"Autre"}
    ],
    "budget_ranges": [
      {"value":"under-5k","label":"Moins de 5 000 $"},
      {"value":"5k-15k","label":"5 000 $ – 15 000 $"},
      {"value":"15k-50k","label":"15 000 $ – 50 000 $"},
      {"value":"over-50k","label":"Plus de 50 000 $"},
      {"value":"discuss","label":"Préfère en discuter"}
    ],
    "contact_methods": [
      {"value":"email","label":"Email"},
      {"value":"phone","label":"Appel téléphonique"},
      {"value":"whatsapp","label":"WhatsApp"}
    ]
  }'),
  ('office_details', '{
    "address": "Quartier Almamya, Rue KA-028\nConakry, Guinée",
    "coordinates": "9.5370,-13.6785",
    "phone": "+224 622 123 456",
    "email": "hello@lynxatech.gn",
    "timezone": "GMT+0 (Heure de Guinée)",
    "hours": {
      "weekdays": "Lundi - Vendredi: 8:00 - 18:00",
      "saturday": "Samedi: 9:00 - 14:00",
      "sunday": "Dimanche: Fermé"
    },
    "facilities": [
      {"icon":"Car","label":"Parking Gratuit Disponible"},
      {"icon":"Wifi","label":"Internet Haut Débit"},
      {"icon":"Coffee","label":"Rafraîchissements Offerts"},
      {"icon":"Shield","label":"Accès Sécurisé au Bâtiment"},
      {"icon":"Users","label":"Salles de Réunion"},
      {"icon":"Accessibility","label":"Accès pour Personnes à Mobilité Réduite"}
    ],
    "directions": [
      {"landmark":"De l''Aéroport de Conakry","instruction":"Prendre la nationale N1 vers le centre-ville, tourner à droite au rond-point d''Almamya, continuer sur 500m","duration":"25 minutes en voiture"},
      {"landmark":"Du Palais du Peuple","instruction":"Prendre l''Avenue de la République vers le nord, tourner à gauche au carrefour d''Almamya","duration":"10 minutes en voiture"},
      {"landmark":"Transport en Commun","instruction":"Prendre les bus ligne 12 ou 15 jusqu''à l''arrêt Almamya, marcher 200m vers la rue KA-028","duration":"45 minutes au total"}
    ]
  }')
ON CONFLICT (key) DO NOTHING;

-- -------------------------------------------------------
-- 27. JOIN-US — PROCESS STEPS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS join_us_process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  icon text NOT NULL DEFAULT 'Star',
  color text DEFAULT 'bg-primary',
  title text NOT NULL DEFAULT '',
  desc text DEFAULT '',
  detail text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO join_us_process_steps (sort_order, icon, color, title, desc, detail) VALUES
  (1, 'FileText',     'bg-primary', 'Postulez',          'Remplissez le formulaire ci-dessous avec votre CV et votre lettre de motivation. Simple et rapide.', '~5 minutes'),
  (2, 'MessageSquare','bg-accent',  'Entretien',         'Nos recruteurs vous contactent sous 48h pour un échange convivial sur votre profil et vos ambitions.', 'Sous 48h'),
  (3, 'Code',         'bg-primary', 'Test technique',    'Un petit exercice pratique adapté au poste — l''occasion de montrer votre façon de penser.', 'Optionnel'),
  (4, 'PartyPopper',  'bg-accent',  'Bienvenue à bord !','Si le feeling est là, vous rejoignez la famille Lynxa Tech et contribuez à façonner l''avenir tech africain.', 'C''est parti 🚀')
ON CONFLICT DO NOTHING;
ALTER TABLE join_us_process_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON join_us_process_steps FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON join_us_process_steps FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON join_us_process_steps TO anon;
GRANT ALL    ON join_us_process_steps TO authenticated;

-- -------------------------------------------------------
-- 28. INSIGHTS — BLOG POSTS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  title text NOT NULL DEFAULT '',
  excerpt text DEFAULT '',
  category text DEFAULT '',
  author text DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  read_time text DEFAULT '',
  image text DEFAULT '',
  tags jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO blog_posts (sort_order, title, excerpt, category, author, date, read_time, image, tags) VALUES
  (1, 'Tendances de la Cybersécurité en Afrique de l''Ouest', 'Explorez l''évolution du paysage de la cybersécurité en Afrique de l''Ouest et découvrez des stratégies pratiques pour protéger vos actifs numériques.', 'cybersecurity', 'Dr. Aminata Kone', '2025-01-10', '8 min de lecture', 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&h=400', '["Cybersécurité","PME","Afrique de l''Ouest"]'),
  (2, 'Meilleures Pratiques de Développement Mobile pour les Marchés Émergents', 'Apprenez à créer des applications mobiles robustes qui prospèrent dans des environnements à faible bande passante.', 'mobile', 'Ibrahima Diallo', '2025-01-08', '12 min de lecture', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&h=400', '["Développement Mobile","Marchés Émergents"]'),
  (3, 'Transformation Numérique de la Guinée : Opportunités et Défis', 'Une analyse approfondie du parcours de la Guinée vers la transformation numérique.', 'ecosystem', 'Fatoumata Camara', '2025-01-05', '15 min de lecture', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=400', '["Transformation Numérique","Guinée","Innovation"]'),
  (4, 'Défis des Infrastructures Réseau en Guinée Rurale', 'Répondre aux lacunes de connectivité et construire des infrastructures réseau résilientes.', 'network', 'Mohamed Bah', '2025-01-03', '10 min de lecture', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&h=400', '["Infrastructure Réseau","Connectivité Rurale"]'),
  (5, 'L''Essor de la Fintech en Afrique de l''Ouest', 'Exploration de la révolution fintech et comment les solutions de mobile money transforment l''inclusion financière.', 'mobile', 'Aissatou Barry', '2024-12-28', '9 min de lecture', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=400', '["Fintech","Mobile Money"]'),
  (6, 'Développement d''API Sécurisées pour les Startups Africaines', 'Pratiques de sécurité essentielles pour développer des API robustes.', 'cybersecurity', 'Ousmane Dieng', '2024-12-25', '11 min de lecture', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&h=400', '["Sécurité API","Startups"]'),
  (7, 'Feuille de Route pour l''Implémentation de la 5G dans le Secteur Télécom Guinéen', 'Perspectives stratégiques sur les défis et opportunités du déploiement de la 5G.', 'network', 'Mamadou Sow', '2024-12-22', '13 min de lecture', 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=400', '["5G","Télécommunications","Guinée"]'),
  (8, 'Développement des Talents Tech en Afrique Sub-Saharienne', 'Stratégies pour construire et retenir les talents tech en Afrique.', 'ecosystem', 'Kadiatou Conde', '2024-12-20', '14 min de lecture', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=400', '["Développement des Talents","Éducation"]')
ON CONFLICT DO NOTHING;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON blog_posts FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON blog_posts TO anon;
GRANT ALL    ON blog_posts TO authenticated;

-- -------------------------------------------------------
-- 29. INSIGHTS — WHITEPAPERS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS whitepapers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  category text DEFAULT '',
  pages integer DEFAULT 0,
  download_count integer DEFAULT 0,
  publish_date date DEFAULT CURRENT_DATE,
  image text DEFAULT '',
  tags jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO whitepapers (sort_order, title, description, category, pages, download_count, publish_date, image, tags) VALUES
  (1, 'Cybersécurité pour les PME africaines : Guide complet', 'Stratégies essentielles de cybersécurité et cadres de mise en œuvre spécialement conçus pour les PME à travers l''Afrique.', 'cybersecurity', 42, 1250, '2025-01-01', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&h=300', '["Cybersécurité","PME","Gestion des Risques"]'),
  (2, 'Développement Mobile-First dans des environnements à faible bande passante', 'Meilleures pratiques et stratégies techniques pour créer des applications mobiles performantes.', 'mobile', 38, 890, '2024-12-15', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&h=300', '["Développement Mobile","Performance","Optimisation"]'),
  (3, 'Plan Directeur pour l''Infrastructure Numérique en Afrique de l''Ouest', 'Feuille de route stratégique pour développer une infrastructure numérique durable.', 'network', 56, 675, '2024-11-30', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&h=300', '["Infrastructure","Stratégie Numérique","Afrique de l''Ouest"]')
ON CONFLICT DO NOTHING;
ALTER TABLE whitepapers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON whitepapers FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON whitepapers FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON whitepapers TO anon;
GRANT ALL    ON whitepapers TO authenticated;

-- -------------------------------------------------------
-- 30. INSIGHTS — TECH TALKS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS tech_talks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  title text NOT NULL DEFAULT '',
  speaker text DEFAULT '',
  event text DEFAULT '',
  duration text DEFAULT '',
  views integer DEFAULT 0,
  category text DEFAULT '',
  publish_date date DEFAULT CURRENT_DATE,
  thumbnail text DEFAULT '',
  video_id text DEFAULT '',
  description text DEFAULT '',
  tags jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO tech_talks (sort_order, title, speaker, event, duration, views, category, publish_date, thumbnail, video_id, description, tags) VALUES
  (1, 'L''avenir de la cybersécurité en Afrique', 'Dr. Aminata Kone, CTO', 'Africa Tech Summit 2024', '28:45', 15420, 'cybersecurity', '2024-12-10', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&h=400', 'dQw4w9WgXcQ', 'Exploration des menaces émergentes en cybersécurité et des stratégies de défense innovantes pour les entreprises africaines.', '["Cybersécurité","Afrique","Innovation"]'),
  (2, 'Révolution des paiements mobiles en Afrique de l''Ouest', 'Ibrahima Diallo, Lead Developer', 'Fintech West Africa Conference', '32:18', 22100, 'mobile', '2024-11-25', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=400', 'dQw4w9WgXcQ', 'Analyse approfondie des systèmes de paiement mobile et de leur impact transformateur sur l''inclusion financière.', '["Paiements Mobiles","Fintech"]'),
  (3, 'Construire une infrastructure réseau résiliente', 'Mohamed Bah, Network Architect', 'Infrastructure Africa Symposium', '25:30', 8750, 'network', '2024-11-15', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=600&h=400', 'dQw4w9WgXcQ', 'Stratégies pratiques pour concevoir et maintenir des infrastructures réseau résilientes dans les marchés africains émergents.', '["Infrastructure","Réseau","Résilience"]')
ON CONFLICT DO NOTHING;
ALTER TABLE tech_talks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON tech_talks FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON tech_talks FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON tech_talks TO anon;
GRANT ALL    ON tech_talks TO authenticated;

-- -------------------------------------------------------
-- 31. INSIGHTS — INDUSTRY REPORTS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS industry_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  title text NOT NULL DEFAULT '',
  subtitle text DEFAULT '',
  category text DEFAULT '',
  publish_date date DEFAULT CURRENT_DATE,
  pages integer DEFAULT 0,
  downloads integer DEFAULT 0,
  image text DEFAULT '',
  key_insights jsonb DEFAULT '[]',
  executive_summary text DEFAULT '',
  sections jsonb DEFAULT '[]',
  tags jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);
INSERT INTO industry_reports (sort_order, title, subtitle, category, publish_date, pages, downloads, image, key_insights, executive_summary, sections, tags) VALUES
  (1, 'Rapport sur la Croissance de l''Écosystème Technologique en Guinée 2024', 'Analyse complète du développement du secteur technologique', 'ecosystem', '2024-12-01', 89, 3250, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400', '["Croissance de 45 % d''une année sur l''autre des startups","12,5 M$ d''investissements levés en 2024","Augmentation de 78 % des téléchargements d''applications","32 nouvelles entreprises technologiques créées"]', 'L''écosystème technologique de la Guinée a connu une croissance sans précédent en 2024.', '["Vue d''ensemble du marché","Paysage des startups","Analyse des investissements","Initiatives gouvernementales","Développement des infrastructures"]', '["Analyse du Marché","Startups","Investissement","Guinée"]'),
  (2, 'Panorama des Menaces de Cybersécurité en Afrique de l''Ouest 2024', 'Défis régionaux de sécurité et stratégies d''atténuation', 'cybersecurity', '2024-11-20', 67, 2890, 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&h=400', '["Augmentation de 67 % des attaques par ransomware","Menaces sur la banque mobile en hausse de 124 %","85 % des PME ne disposent pas d''une protection adéquate"]', 'L''Afrique de l''Ouest fait face à une augmentation des menaces de cybersécurité.', '["Vue d''ensemble des menaces","Analyse des vecteurs d''attaque","Stratégies d''atténuation","Recommandations"]', '["Cybersécurité","Menaces","Afrique de l''Ouest"]')
ON CONFLICT DO NOTHING;
ALTER TABLE industry_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON industry_reports FOR SELECT USING (active = true);
CREATE POLICY "admin_all"   ON industry_reports FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON industry_reports TO anon;
GRANT ALL    ON industry_reports TO authenticated;

-- -------------------------------------------------------
-- Site settings seeds for Portfolio filters & Insights categories
-- -------------------------------------------------------
INSERT INTO site_settings (key, value) VALUES
  ('portfolio_filter_options', '{"services":["Tous","Mobile Development","Network Infrastructure","Web Development","Cybersecurity"],"industries":["Tous","Financial Services","Healthcare","Government","NGO","Education","Retail"]}'),
  ('insights_categories', '[{"id":"all","label":"All Content","icon":"Grid"},{"id":"cybersecurity","label":"Cybersecurity","icon":"Shield"},{"id":"mobile","label":"Mobile Innovation","icon":"Smartphone"},{"id":"network","label":"Network Solutions","icon":"Network"},{"id":"ecosystem","label":"African Tech Ecosystem","icon":"Globe"}]')
ON CONFLICT (key) DO NOTHING;
