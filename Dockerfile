# ---- Build stage ----
FROM node:18-alpine AS build

WORKDIR /app

# Chromium pour l'étape de prerendering (scripts/prerender.mjs pilote Puppeteer
# en fin de "npm run build"). On saute le téléchargement de Puppeteer et on
# pointe vers le binaire système, plus léger et fiable en environnement Alpine.
RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json ./
# vite, @vitejs/plugin-react, tailwindcss, postcss et autoprefixer sont des
# devDependencies : "npm run build" (vite build + prerender) en a besoin, donc
# on installe tout l'arbre de dépendances, pas seulement les dépendances de
# production.
RUN npm ci

COPY . .
RUN npm run build

# ---- Production stage ----
FROM nginx:alpine

# Copie des assets construits depuis le stage de build
COPY --from=build /app/dist /usr/share/nginx/html

# Configuration nginx pour le routage SPA
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
