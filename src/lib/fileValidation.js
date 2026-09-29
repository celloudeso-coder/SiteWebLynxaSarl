// Validation côté formulaire des pièces jointes PDF (CV, lettre de
// motivation), avant tentative d'upload. Les limites doivent rester en phase
// avec celles imposées côté serveur sur le bucket Supabase Storage
// "Cv_lettredemotivation_joinus" (voir supabase/schema.sql :
// file_size_limit = 10485760, allowed_mime_types = ['application/pdf']) —
// un fichier rejeté ici l'aurait de toute façon été rejeté par Supabase,
// mais avec un aller-retour réseau et une erreur générique en plus.

export const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10 Mo — doit rester égal à file_size_limit du bucket

export function validatePdfFile(file, { label = "Le fichier" } = {}) {
  if (!file) return { ok: true };

  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
  if (!isPdf) {
    return { ok: false, message: `${label} doit être un fichier PDF.` };
  }

  if (file.size > MAX_PDF_BYTES) {
    return {
      ok: false,
      message: `${label} dépasse la taille maximale autorisée (${(file.size / 1024 / 1024).toFixed(1)} Mo, max 10 Mo).`,
    };
  }

  return { ok: true };
}
