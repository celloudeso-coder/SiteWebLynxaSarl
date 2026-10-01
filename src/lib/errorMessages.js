// Messages d'erreur affichés dans l'admin : toujours en français.
// - Erreurs levées par nos propres fonctions SQL (RAISE EXCEPTION, code
//   P0001) : déjà rédigées en français et précises, on les affiche telles quelles.
// - Erreurs de Supabase (Auth, PostgREST, réseau) : en anglais ; on affiche
//   un équivalent français pour les cas courants, sinon le message de
//   secours fourni par l'appelant. Le détail technique part dans la console.
const KNOWN = [
  [/invalid login credentials/i, "Email ou mot de passe incorrect."],
  [/email not confirmed/i, "Adresse e-mail non confirmée : ouvrez le lien reçu par e-mail."],
  [/already (been )?registered|user already exists/i, "Un compte existe déjà avec cette adresse e-mail."],
  [/password should be at least|weak password/i, "Le mot de passe est trop court ou trop faible."],
  [/rate limit|too many requests/i, "Trop de tentatives. Réessayez dans quelques minutes."],
  [/jwt expired|invalid jwt|session (expired|missing|not found)/i, "Votre session a expiré. Reconnectez-vous."],
  [/row-level security|permission denied/i, "Vous n'avez pas les droits nécessaires pour cette action."],
  [/duplicate key/i, "Cet élément existe déjà."],
  [/failed to fetch|networkerror|network request failed/i, "Connexion au serveur impossible. Vérifiez votre connexion internet."],
];

export function adminErrorMessage(err, fallback) {
  if (err) console.error(fallback, err);
  if (err?.code === "P0001" && err?.message) return err.message;
  const text = `${err?.message || ""} ${err?.error_description || ""}`;
  const known = KNOWN.find(([pattern]) => pattern.test(text));
  return known ? known[1] : fallback;
}

// Échec d'une écriture dans l'admin : jamais avalé silencieusement. Le
// message français est affiché, le détail technique part dans la console.
export function alertAdminError(err, fallback) {
  window.alert(adminErrorMessage(err, fallback));
}
