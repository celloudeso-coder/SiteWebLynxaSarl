-- =====================================================================
-- Corrections de contenu 2026-11-27 : lignes d'exemple à chiffres inventés
-- =====================================================================
--
-- NON APPLIQUÉ. À exécuter par Cellou dans l'éditeur SQL Supabase, après
-- la sauvegarde (PROTOCOLE-TRAVAIL-LYNXA, règle 9). L'agent ne le lance pas.
--
-- Nom de fichier : le nom demandé, content-corrections-2026-11-27.sql, est
-- déjà pris par le lot A, dont trois corrections ont été appliquées en
-- production le 27/11/2026 vers 01h25. Ce script porte donc un suffixe, pour
-- ne pas écraser un script déjà appliqué.
--
-- CE QUE CE SCRIPT SUPPRIME
-- Les trois projets d'exemple semés dans portfolio_innovations (section
-- « Nos produits ») : ils n'ont jamais existé et portaient des chiffres
-- inventés, actifs par défaut. Le seed a été vidé du dépôt le 21/10/2026
-- (commit 1b0808e) et le repli du code le 29/09/2026 (commit 86fd62c) ; les
-- lignes semées avant ces dates peuvent subsister en base.
--
-- Texte d'origine, repris mot pour mot du seed retiré par 1b0808e :
--   1. « Optimisation Réseau par IA »  — impact « Réduction de 40% des
--      interruptions réseau »
--   2. « Identité Blockchain »         — impact « Sécurité pour +100 000
--      utilisateurs »
--   3. « Agriculture IoT »             — impact « +20% de rendements
--      agricoles »
--
-- DOUBLE GARDE
-- Une ligne n'est supprimée que si :
--   a) elle est inactive (active = false) : une ligne encore affichée sur le
--      site n'est pas touchée, c'est une décision d'édition, pas un nettoyage ;
--   b) elle porte encore mot pour mot le titre, la description, le statut et
--      l'impact d'origine : toute ligne retouchée dans l'admin est laissée
--      intacte.
-- status_color n'est pas contrôlé : c'est une classe CSS, pas du contenu. Un
-- changement de couleur ne doit pas protéger un texte inventé.
--
-- Si les trois lignes sont encore actives, ce script supprime 0 ligne et
-- affiche 0 partout : c'est le résultat attendu, pas un échec. Il faut alors
-- les désactiver dans l'admin d'abord, puis relancer.
--
-- Une seule requête, sans table temporaire : l'éditeur SQL de Supabase
-- n'exécute pas toujours un script comme une seule session (erreur
-- « relation "_corrections" does not exist »).
--
-- Relançable sans effet : au second passage, 0 ligne supprimée.
-- Aucune publication nécessaire si 0 ligne : rien n'a changé pour le site.
-- =====================================================================

WITH a AS (
  DELETE FROM portfolio_innovations
  WHERE active = false
    AND title = 'Optimisation Réseau par IA'
    AND description = 'Algorithmes d''apprentissage automatique pour optimiser automatiquement les performances réseau et prévenir les pannes.'
    AND status = 'En Développement'
    AND impact = 'Réduction de 40% des interruptions réseau'
  RETURNING 1
), b AS (
  DELETE FROM portfolio_innovations
  WHERE active = false
    AND title = 'Identité Blockchain'
    AND description = 'Système d''identité décentralisé pour une authentification sécurisée et respectueuse de la vie privée.'
    AND status = 'Phase de Recherche'
    AND impact = 'Sécurité pour +100 000 utilisateurs'
  RETURNING 1
), c AS (
  DELETE FROM portfolio_innovations
  WHERE active = false
    AND title = 'Agriculture IoT'
    AND description = 'Capteurs IoT pour surveiller conditions du sol, météo et santé des cultures pour les agriculteurs guinéens.'
    AND status = 'Test Pilote'
    AND impact = '+20% de rendements agricoles'
  RETURNING 1
)
SELECT 'portfolio_innovations : Optimisation Réseau par IA' AS ligne,
       (SELECT count(*) FROM a) AS lignes_supprimees
UNION ALL SELECT 'portfolio_innovations : Identité Blockchain', (SELECT count(*) FROM b)
UNION ALL SELECT 'portfolio_innovations : Agriculture IoT',     (SELECT count(*) FROM c);

-- Contrôle avant exécution (lecture seule), pour voir ce qui existe encore :
--   SELECT title, active, status, impact FROM portfolio_innovations
--   ORDER BY sort_order;
--
-- Contrôle après exécution : les trois titres ci-dessus ne doivent plus
-- apparaître dans ce SELECT, ou rester présents avec active = true s'ils
-- n'ont pas été désactivés.
