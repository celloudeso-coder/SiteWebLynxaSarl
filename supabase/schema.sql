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
