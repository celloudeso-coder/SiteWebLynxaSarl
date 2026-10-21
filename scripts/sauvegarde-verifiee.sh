#!/usr/bin/env bash
# =====================================================================
# Sauvegarde de la base de production, vérifiée (CLAUDE.md, règle 9)
# =====================================================================
#
# 1. Dump du schéma et des données (supabase db dump), droits 600.
# 2. Somme de contrôle SHA-256, vérifiée.
# 3. Restauration complète dans une instance Supabase locale jetable
#    (Docker, ports 58xxx), puis comparaison du nombre de lignes table par
#    table entre le fichier de dump et la base restaurée. Une sauvegarde
#    jamais restaurée n'est pas une sauvegarde.
#
# Usage, depuis la racine du dépôt :
#   bash scripts/sauvegarde-verifiee.sh
#   bash scripts/sauvegarde-verifiee.sh --restaurer-seulement <schema.sql> <data.sql>
#
# L'URL de connexion (mot de passe compris) est lue ici dans .env.local
# (DIRECT_URL, session pooler) : elle n'apparaît jamais dans l'historique du
# shell. Elle reste visible dans la liste des processus pendant le dump.
#
# Limites, à connaître :
#   - le dump contient les tables, pas les fichiers stockés (CV, images du
#     bucket Storage) : seules leurs métadonnées (storage.objects) y sont ;
#   - le schéma storage est géré par Supabase. Si la version de Storage
#     embarquée par le CLI local est plus ancienne que celle de la
#     production, ses tables (buckets, objects) ne se restaurent pas
#     localement : elles sont signalées en avertissement. Le verdict porte
#     sur les schémas public (contenu du site) et auth (comptes).
#
# Prérequis : supabase CLI, Docker, psql, python3, sha256sum.

set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$HOME/Sauvegardes-Lynxa"

compter_lignes_du_dump() {
  # Nombre de lignes insérées par table dans un dump --data-only, en suivant
  # les chaînes SQL (une valeur peut contenir des retours à la ligne).
  python3 - "$1" <<'PY'
import re, sys
src = open(sys.argv[1], encoding="utf-8").read()
counts = {}
for m in re.finditer(r'INSERT INTO ("[^"]+"\."[^"]+")\s*(?:\([^)]*\))?\s*VALUES', src):
    table = m.group(1).replace('"', '')
    i, depth, rows, in_str = m.end(), 0, 0, False
    while i < len(src):
        c = src[i]
        if in_str:
            if c == "'":
                if src[i + 1:i + 2] == "'":
                    i += 1
                else:
                    in_str = False
        elif c == "'":
            in_str = True
        elif c == "(":
            if depth == 0:
                rows += 1
            depth += 1
        elif c == ")":
            depth -= 1
        elif c == ";" and depth == 0:
            break
        i += 1
    counts[table] = counts.get(table, 0) + rows
for table in sorted(counts):
    print(table, counts[table])
PY
}

restaurer_et_comparer() {
  local schema_file="$1" data_file="$2"
  local tmp; tmp="$(mktemp -d)"
  mkdir -p "$tmp/supabase"
  sed -E 's/^project_id = .*/project_id = "lynxa-restore-test"/; s/\b54([0-9]{3})\b/58\1/g' \
    "$REPO/supabase/config.toml" > "$tmp/supabase/config.toml"
  # Arrêt et nettoyage de l'instance jetable, même en cas d'échec.
  trap '(cd "'"$tmp"'" && supabase stop --no-backup >/dev/null 2>&1) ; rm -rf "'"$tmp"'"' EXIT

  echo "== Instance jetable (ports 58xxx)"
  (cd "$tmp" && supabase start -x studio,imgproxy,mailpit,inbucket,edge-runtime,logflare,vector,realtime,supavisor,postgres-meta >/dev/null)
  local db="postgresql://postgres:postgres@127.0.0.1:58322/postgres"

  echo "== Restauration du schéma puis des données"
  psql "$db" -X -q -v ON_ERROR_STOP=1 -f "$schema_file" >/dev/null
  # Pas d'arrêt à la première erreur : chaque échec doit apparaître dans la
  # comparaison ci-dessous, table par table, au lieu de masquer la suite.
  psql "$db" -X -q -v ON_ERROR_STOP=0 -f "$data_file" >/dev/null 2>"$tmp/erreurs.log" || true
  if grep -q "ERROR" "$tmp/erreurs.log"; then
    echo "Erreurs de restauration :"
    grep "ERROR" "$tmp/erreurs.log" | sed -E 's/^psql:[^:]*:([0-9]+):/  ligne \1 du dump :/'
  fi

  echo "== Comparaison du nombre de lignes, table par table"
  local ecarts=0 avertissements=0 total=0
  printf "%-48s %10s %10s\n" "table" "dump" "restauré"
  while read -r table attendu; do
    local reel marque=""
    reel="$(psql "$db" -X -At -c "SELECT count(*) FROM ${table%%.*}.\"${table#*.}\"")"
    if [ "$reel" != "$attendu" ]; then
      if [ "${table%%.*}" = "storage" ]; then
        marque="  <-- avertissement (schéma storage, voir en tête)"; avertissements=$((avertissements + 1))
      else
        marque="  <-- ÉCART"; ecarts=$((ecarts + 1))
      fi
    fi
    printf "%-48s %10s %10s%s\n" "$table" "$attendu" "$reel" "$marque"
    total=$((total + 1))
  done < <(compter_lignes_du_dump "$data_file")

  if [ "$ecarts" -ne 0 ]; then
    echo "ÉCHEC : $ecarts table(s) des schémas public/auth ne correspondent pas. La sauvegarde n'est PAS validée."
    exit 1
  fi
  echo "OK : $((total - avertissements)) tables public/auth restaurées, nombre de lignes identique au dump pour chacune."
  if [ "$avertissements" -ne 0 ]; then
    echo "AVERTISSEMENT : $avertissements table(s) storage non restaurables localement (version de Storage du CLI)."
  fi
}

if [ "${1:-}" = "--restaurer-seulement" ]; then
  restaurer_et_comparer "$2" "$3"
  exit 0
fi

url="$(grep -E '^DIRECT_URL=' "$REPO/.env.local" | sed -E 's/^DIRECT_URL=//; s/^"//; s/"$//')"
if [ -z "$url" ]; then
  echo "DIRECT_URL introuvable dans .env.local" >&2
  exit 1
fi

ts="$(date -u +%Y%m%d-%H%M%SZ)"
mkdir -p "$DEST"
cd "$DEST"
echo "== Dump du schéma et des données ($ts)"
supabase db dump --db-url "$url" -f "lynxa-schema-$ts.sql"
supabase db dump --db-url "$url" --data-only -f "lynxa-data-$ts.sql"
unset url
chmod 600 "lynxa-schema-$ts.sql" "lynxa-data-$ts.sql"
sha256sum "lynxa-schema-$ts.sql" "lynxa-data-$ts.sql" > "lynxa-$ts.sha256"
chmod 600 "lynxa-$ts.sha256"
echo "== Somme de contrôle"
sha256sum -c "lynxa-$ts.sha256"

restaurer_et_comparer "$DEST/lynxa-schema-$ts.sql" "$DEST/lynxa-data-$ts.sql"
echo "Sauvegarde validée : $DEST/lynxa-{schema,data}-$ts.sql"
