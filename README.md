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
│   │   └── sections/        # 1 admin par entité (HeroAdmin…) + *ContentAdmin par page
│   ├── Home/
│   ├── About/
│   ├── Services/
│   ├── Portfolio/
│   ├── Partnership/
│   ├── Contact/
│   ├── join-us/
│   ├── insights-knowledge-leadership/   # route /insights active — lien menu masqué (sans contenu)
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
└── schema.sql               # Schéma CMS (tables + seeds + RLS + buckets Storage)
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

### 2. Configurer l'environnement et démarrer Supabase

Créer un fichier `.env.local` à la racine :

```bash
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<clé anon locale affichée par `supabase status`>
```

Puis démarrer le stack Supabase local (Docker requis) :

```bash
supabase start
```

### 3. Appliquer le schéma CMS

Le schéma (tables + données initiales + RLS) est versionné dans `supabase/schema.sql`. Il n'y a pas de dossier `migrations/` : on l'applique directement en base.

```bash
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres -f supabase/schema.sql
```

### 4. Créer le premier compte propriétaire

Le login `/admin` s'appuie sur **Supabase Auth** (`signInWithPassword`). Lors de l'application du schéma, le plus ancien compte Auth devient automatiquement le propriétaire du CMS.

#### Méthode recommandée (local ou cloud) — via Studio / dashboard

Authentication → Users → **Add user → Create new user** : saisir email + mot de passe et bien cocher **Auto Confirm User** (sans confirmation, le login échoue avec un 400).

#### Alternative en local — via l'API

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

#### Réinitialiser un mot de passe

Dans le **SQL Editor** (nécessite l'extension `pgcrypto`) :

```sql
UPDATE auth.users
SET encrypted_password = crypt('NouveauMotDePasse', gen_salt('bf')),
    email_confirmed_at  = COALESCE(email_confirmed_at, now())
WHERE email = 'ton@email.com';
```

#### Ajouter les autres administrateurs

Après connexion avec le compte propriétaire, ouvrir **Administration → Utilisateurs** (`/admin/users`), choisir le rôle puis créer un lien d'invitation. Le lien reste valide 7 jours et doit être transmis au collaborateur.

Rôles disponibles :

- **Propriétaire** : accès total et gestion des utilisateurs ;
- **Administrateur** : contenu et données confidentielles ;
- **Éditeur** : gestion du contenu public ;
- **Lecture seule** : consultation sans modification.

Le propriétaire choisit ensuite les sections accessibles à chaque collaborateur et, pour chaque section, les actions **Voir**, **Créer**, **Modifier** et **Supprimer**. Le rôle reste un plafond : un éditeur ne peut pas supprimer et un compte en lecture seule ne peut jamais écrire, même si une permission incompatible est enregistrée.

Les permissions sont appliquées dans PostgreSQL par RLS et filtrent aussi les menus, le tableau de bord et les routes du CMS. La désactivation ou la rétrogradation du dernier propriétaire actif est refusée automatiquement.

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

Le fichier `vercel.json` est préconfiguré. Connecter le dépôt sur Vercel puis ajouter les variables d'environnement dans le dashboard Vercel (Settings → Environment Variables) :

```
VITE_SUPABASE_URL      → URL du projet Supabase cloud (ex. https://uavhrkujdyeyjunqessv.supabase.co)
VITE_SUPABASE_ANON_KEY → Clé anon/publishable du projet Supabase cloud
```

⚠️ Ces deux variables sont **obligatoires** : le client Supabase (`src/lib/supabase.js`) n'a plus de valeurs de repli et le build échoue volontairement si elles manquent. Comme Vite les gèle au moment du build, il faut **redéployer** après toute modification.

#### Domaine personnalisé

Domaine de production : **`www.lynxatech.com`** (principal) ; `lynxatech.com` redirige (308) vers `www`. Configuration DNS chez le registrar (GoDaddy), en utilisant les **valeurs exactes affichées dans Vercel → Domains** :

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `<id>.vercel-dns-017.com` |

Supprimer les anciens enregistrements de parking (A `@` « Parked ») qui entrent en conflit, et **ne pas toucher aux `MX`** (email `contact@lynxatech.com`). Vercel émet le certificat HTTPS automatiquement une fois le DNS propagé.

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
| `/confidentialite` | Politique de confidentialité |
| `/cgu` | Conditions générales d'utilisation |
| `/securite` | Sécurité et signalement responsable |
| `/insights` | Insights & Knowledge *(alias `/insights-knowledge-leadership` ; lien menu masqué — sans contenu pour l'instant)* |
| `/about/teamspotlight1` | Spotlight équipe |
| `/admin/login` | Connexion admin CMS |
| `/admin/subscriptions` | Tracker privé des abonnements clients |
| `/admin/*` | Panel d'administration CMS |
| `*` | 404 |

---

## CMS — Panel d'administration

Le site dispose d'un CMS headless complet basé sur **Supabase**.

### Installation PWA du CMS

L'administration possède son propre manifeste et un service worker limité au périmètre `/admin`. Sur Chrome, Edge et Android, utiliser le bouton **Installer l'app** dans la barre du CMS ou sous le formulaire de connexion. Sur iPhone/iPad, ouvrir le menu **Partager** de Safari puis choisir **Sur l'écran d'accueil**.

L'interface installée conserve son shell hors ligne et signale la perte de connexion. Les données Supabase et les modifications restent disponibles uniquement avec une connexion réseau.

### Sections gérables

Le panel est monté dans `src/pages/Admin/index.jsx`. Toutes les routes sont préfixées par `/admin`.

#### Entités globales

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
| Partenariats | `/admin/partnership` | Voies de collaboration |
| Recrutement | `/admin/join-us` | Offres d'emploi |
| Abonnements | `/admin/subscriptions` | Échéances, paiements, impayés, historique et export CSV |
| Utilisateurs | `/admin/users` | Invitations, rôles et suspension des accès administratifs |

#### Contenu détaillé par page

| Section | Route admin |
|---|---|
| Accueil | `/admin/home-content` |
| À propos | `/admin/about-content` |
| Services | `/admin/services-content` |
| Portfolio | `/admin/portfolio-content` |
| Contact | `/admin/contact-content` |
| Partenariats | `/admin/partnership-content` |
| Rejoindre l'équipe | `/admin/join-us-content` |
| Insights | `/admin/insights-content` |

Chaque page dispose aussi d'un éditeur de visibilité des sections via `/admin/pages/<page>` (`PageSectionsAdmin`).

#### Soumissions & configuration

| Section | Route admin | Contenu |
|---|---|---|
| Messages | `/admin/messages` | Messages reçus via le formulaire de contact |
| Newsletter | `/admin/newsletter` | Abonnés à la newsletter |
| Paramètres | `/admin/settings` | Contact, réseaux sociaux, infos entreprise |

### Architecture

- **`src/lib/cms.js`** — Fonctions CRUD (get/save/delete) pour chaque table
- **`src/hooks/useContent.js`** — Hooks React (`useServices`, `useTeamMembers`, etc.)
- Les composants chargent d'abord le contenu Supabase ; en l'absence de données, la plupart affichent un contenu statique (fallback). Les sections de la page **Insights** font autorité sur le CMS : vide en base ⇒ section masquée (le statique ne sert plus que de secours en cas d'erreur réseau)
- Upload de médias via Supabase Storage : bucket `cms-media` (images / PDF gérés depuis l'admin — photos équipe, images, livres blancs, rapports) et bucket `Cv_lettredemotivation_joinus` (CV & lettres déposés via le formulaire public « Rejoindre », PDF ≤ 10 Mo)

### Images téléversées depuis l'admin

Toute image envoyée via l'admin (photo d'équipe, illustration de projet, etc.) passe par `src/lib/imageCompression.js` **dans le navigateur, avant l'upload** vers le bucket `cms-media` — c'est ce qui a évité de reproduire le problème des photos d'équipe de plusieurs milliers de pixels de large affichées dans des vignettes de 80px.

Règle appliquée (`compressImageForUpload()`) :

1. **Fichier > 20 Mo** → rejeté avant même d'être décodé, avec un message d'erreur explicite (`UploadTooLargeError`) affiché dans l'admin.
2. **Image déjà légère** (< 300 Ko **et** < 1600px de large) → envoyée telle quelle, aucun retraitement.
3. **Sinon** → redimensionnée à 1600px de large maximum (jamais agrandie), puis réencodée en **WebP** (qualité 0.88 — pas de compression agressive) avec repli automatique en **JPEG** si le navigateur ne sait pas encoder de WebP (`canvas.toBlob` retombe sur un autre type dans ce cas).
4. Si la compression ne réduit pas le poids du fichier (rare), l'original est conservé plutôt qu'un remplaçant plus lourd.

Les champs d'upload de l'admin (`ImageUpload`, `ImageField` dans `src/pages/Admin/components/FormField.jsx`) affichent le poids avant → après (et les dimensions finales) une fois l'upload terminé, pour que l'équipe voie le gain directement.

Cette compression est indépendante du pipeline de variantes WebP/srcset du site public (`scripts/generate-image-variants.mjs`, qui ne traite que les images statiques de `public/`) : les deux se complètent, l'un empêchant les fichiers surdimensionnés d'entrer dans le CMS, l'autre servant des tailles adaptées à chaque affichage pour les images déjà présentes dans le dépôt.

### Variables d'environnement

| Variable | Dev (`.env.local`) | Prod (Vercel) |
|---|---|---|
| `VITE_SUPABASE_URL` | `http://127.0.0.1:54321` | URL projet Supabase cloud |
| `VITE_SUPABASE_ANON_KEY` | Clé locale (`sb_publishable_…`) | Clé publique cloud |

> **Obligatoires dans les deux environnements** : `src/lib/supabase.js` n'a plus de valeurs de repli, l'application lève une erreur explicite (et le build échoue) si elles manquent.

---

## Services proposés

- **Développement mobile** — Applications iOS, Android, React Native, Flutter, PWA
- **Infrastructure réseau** — Design, sécurité, monitoring, optimisation
- **Développement web** — Sites vitrine, e-commerce, CMS, SEO
- **Cybersécurité** — Audits, conformité, supervision des menaces *(à venir)*

---

## Contact

- Conakry, République de Guinée
- +224 614 666 680
- contact@lynxatech.com
