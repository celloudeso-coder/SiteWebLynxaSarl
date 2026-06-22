# Lynxa Tech Guinea — Site Vitrine

Site web officiel de **Lynxa Tech Guinea**, hub technologique basé à Conakry proposant des solutions de développement mobile, d'infrastructure réseau, de développement web et de cybersécurité pour la Guinée et l'Afrique de l'Ouest.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework UI | React 18 + Vite 5 |
| Routing | React Router DOM v6 |
| Style | Tailwind CSS v3 + Framer Motion |
| Formulaires | React Hook Form + EmailJS |
| CMS / Backend | Supabase (PostgreSQL + Auth + Storage) |
| État global | Redux Toolkit |
| SEO | React Helmet |
| Icônes | Lucide React |
| Déploiement | Vercel / Docker + Nginx |

---

## Structure du projet

```
src/
├── components/
│   ├── ui/                  # Composants réutilisables (Header, Button…)
│   ├── AppIcon.jsx
│   ├── AppImage.jsx
│   ├── ErrorBoundary.jsx
│   └── ScrollToTop.jsx
├── lib/
│   ├── supabase.js          # Client Supabase centralisé (lit VITE_SUPABASE_URL)
│   └── cms.js               # Fonctions CRUD pour toutes les tables CMS
├── hooks/
│   └── useContent.js        # Hooks React pour fetcher le contenu CMS
├── pages/
│   ├── Admin/               # Panel d'administration CMS (protégé)
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── components/      # Layout, Guard, FormField, SaveButton
│   │   └── sections/        # HeroAdmin, ServicesAdmin, PortfolioAdmin…
│   ├── Home/
│   ├── About/
│   ├── Services/
│   ├── Portfolio/
│   ├── Partnership/
│   ├── Contact/
│   ├── join-us/
│   └── NotFound.jsx
├── styles/
│   ├── index.css
│   └── tailwind.css
├── utils/
│   └── cn.js
├── App.jsx
└── Routes.jsx
supabase/
├── config.toml              # Configuration Supabase CLI locale
└── schema.sql               # Schéma CMS (tables + données initiales + RLS)
```

---

## Développement local

### Prérequis

- Node.js 18+
- npm
- Docker Engine
- Supabase CLI (`~/.local/bin/supabase`)

### 1. Installer les dépendances

```bash
npm install
```


### 3. Appliquer le schéma CMS



### 4. Créer le compte admin

```bash
# Créer le compte
curl -s -X POST "http://127.0.0.1:54321/auth/v1/signup" \
  -H "apikey: <VITE_SUPABASE_ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"email": "ton@email.com", "password": "motdepasse"}'

# Confirmer l'email directement en base
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres \
  -c "UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'ton@email.com';"
```

### 5. Lancer le serveur de développement

```bash
npm start
# App → http://localhost:4038
# Admin CMS → http://localhost:4038/admin
```

### Commandes Supabase utiles

```bash
supabase start    # démarrer le stack local
supabase stop     # arrêter (libère la RAM)
supabase status   # voir les URLs et clés en cours
```

### Services locaux

| Service | URL |
|---|---|
| Application | `http://localhost:4038` |
| Admin CMS | `http://localhost:4038/admin` |
| Supabase Studio | `http://127.0.0.1:54323` |
| API Supabase | `http://127.0.0.1:54321` |
| PostgreSQL | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |

---

## Build de production

```bash
npm run build     # sortie → dist/
npm run serve     # prévisualiser le build
```

---

## Déploiement

### Vercel (recommandé)

Le fichier `vercel.json` est préconfiguré. Connecter le dépôt sur Vercel puis ajouter les variables d'environnement dans le dashboard Vercel :

```
VITE_SUPABASE_URL      → URL du projet Supabase cloud
VITE_SUPABASE_ANON_KEY → Clé publique du projet Supabase cloud
```

### Docker (auto-hébergement)

```bash
docker build -t lynxa-tech .
docker run -p 80:80 lynxa-tech
```

L'image multi-stage utilise `node:18-alpine` pour le build puis `nginx:alpine` pour servir les assets statiques.

---

## Pages & routes

| Route | Page |
|---|---|
| `/` ou `/home` | Accueil |
| `/about` | À propos |
| `/service` | Services |
| `/portfolio` | Portfolio |
| `/partnership` | Partenariats |
| `/contact` | Contact |
| `/join-us` | Rejoindre l'équipe |
| `/about/teamspotlight1` | Spotlight équipe |
| `/admin/login` | Connexion admin CMS |
| `/admin/*` | Panel d'administration CMS |
| `*` | 404 |

---

## CMS — Panel d'administration

Le site dispose d'un CMS headless complet basé sur **Supabase**.

### Sections gérables

| Section | Route admin | Contenu |
|---|---|---|
| Hero Sections | `/admin/hero` | Titres, sous-titres, CTA par page |
| Services | `/admin/services` | Offres, technologies, highlights |
| Portfolio | `/admin/portfolio` | Projets, études de cas, témoignages |
| Équipe | `/admin/team` | Membres, biographies, photos |
| Tarifs | `/admin/pricing` | Plans et grilles tarifaires |
| Timeline | `/admin/timeline` | Historique de l'entreprise |
| Métriques | `/admin/metrics` | Compteurs de la page d'accueil |
| Témoignages | `/admin/testimonials` | Citations clients |
| Paramètres | `/admin/settings` | Contact, réseaux sociaux, infos entreprise |

### Architecture

- **`src/lib/cms.js`** — Fonctions CRUD (get/save/delete) pour chaque table
- **`src/hooks/useContent.js`** — Hooks React (`useServices`, `useTeamMembers`, etc.)
- Les composants chargent d'abord le contenu Supabase ; en l'absence de données, ils affichent le contenu statique (fallback)
- Upload de médias via Supabase Storage (bucket `cms-media`)

### Variables d'environnement

| Variable | Dev (`.env.local`) | Prod (Vercel) |
|---|---|---|
| `VITE_SUPABASE_URL` | `http://127.0.0.1:54321` | URL projet Supabase cloud |
| `VITE_SUPABASE_ANON_KEY` | Clé locale (`sb_publishable_…`) | Clé publique cloud |

---

## Services proposés

- **Développement mobile** — Applications iOS, Android, React Native, Flutter, PWA
- **Infrastructure réseau** — Design, sécurité, monitoring, optimisation
- **Développement web** — Sites vitrine, e-commerce, CMS, SEO
- **Cybersécurité** — Audits, conformité, supervision des menaces *(à venir)*

---

## Contact

- Conakry, République de Guinée
- +224 621 724 657
- contact@lynxatech.com
