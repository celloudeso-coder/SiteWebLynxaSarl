// Demandes commerciales entrantes (demande de projet Partenariat, modale
// "voie de collaboration", modale "plan tarifaire").
//
// Supabase est le canal principal : une demande enregistrée en base est une
// demande reçue, visible dans /admin/messages, que l'email parte ou non.
// EmailJS n'est qu'une notification envoyée en arrière-plan ; s'il n'est pas
// configuré (identifiants absents ou factices), il est simplement ignoré.
import emailjs from "@emailjs/browser";
import { supabase } from "./supabase";
import { logUnrecordedSubmission } from "./cms";

// Valeurs par défaut = identifiants déjà utilisés en production par la
// demande de projet Partenariat (clé publique EmailJS, visible dans le
// bundle par conception). Surchargeables par variables d'environnement.
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_nru6i81",
  templateId: import.meta.env.VITE_EMAILJS_INQUIRY_TEMPLATE_ID || "template_jje294m",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "RE-vtDTXpbEbLN8jl",
};

const PLACEHOLDER = /x{4,}|your_|changeme|^\s*$/i;

export function isEmailNotificationConfigured(config = EMAILJS_CONFIG) {
  return [config.serviceId, config.templateId, config.publicKey].every(
    (v) => typeof v === "string" && !PLACEHOLDER.test(v)
  );
}

// Ne lève jamais : renvoie true si l'email est parti.
async function sendNotification(params) {
  if (!isEmailNotificationConfigured()) return false;
  try {
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, params, EMAILJS_CONFIG.publicKey);
    return true;
  } catch (err) {
    console.warn("Notification email non envoyée (la demande reste enregistrée) :", err?.text || err?.message || err);
    return false;
  }
}

// Paramètres envoyés au template EmailJS de la demande de projet
// (template_jje294m), dont les variables sont les champs de ce formulaire :
// les deux modales s'y projettent pour réutiliser le même template.
function toTemplateParams(inquiry, { recorded }) {
  const d = inquiry.details || {};
  const warning = recorded ? "" : "⚠️ NON ENREGISTRÉE EN BASE — à ressaisir dans l'admin.\n\n";
  return {
    source: inquiry.sourceLabel,
    projectType: d.projectType || inquiry.sourceLabel,
    budget: d.budgetLabel || "",
    timeline: d.timeline || "",
    companyName: inquiry.company || "",
    contactName: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || "",
    projectDescription: warning + inquiry.message,
    requirements: Array.isArray(d.requirements) ? d.requirements.join(", ") : "",
    preferredContact: inquiry.contactMethod || "",
  };
}

/**
 * Enregistre une demande puis notifie l'équipe.
 *
 * inquiry = { source, sourceLabel, inquiryType, name, email, phone, company,
 *             contactMethod, budget, message, details }
 *
 * Renvoie { received: boolean, channel: "database" | "fallback" | "email" | null }.
 * received=false uniquement si rien n'a pu être enregistré NI envoyé : c'est
 * le seul cas où le visiteur doit voir une erreur.
 */
export async function submitInquiry(inquiry) {
  const row = {
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || null,
    company: inquiry.company || null,
    inquiry_type: inquiry.inquiryType,
    contact_method: inquiry.contactMethod || null,
    budget: inquiry.budget || null,
    message: inquiry.message,
    source: inquiry.source,
    details: inquiry.details || {},
  };

  let channel = null;
  let dbError = null;
  try {
    // Pas de .select() : l'anonyme peut insérer mais pas relire (RLS).
    const { error } = await supabase.from("contact_messages").insert(row);
    if (error) throw error;
    channel = "database";
  } catch (err) {
    dbError = err?.message || String(err);
    console.error(`Enregistrement de la demande (${inquiry.source}) échoué :`, dbError);
  }

  if (!channel) {
    const logged = await logUnrecordedSubmission({ form: inquiry.source, payload: row, dbError, emailSent: false });
    if (logged) channel = "fallback";
  }

  if (channel) {
    // Notification en arrière-plan : n'affecte jamais le résultat affiché.
    sendNotification(toTemplateParams(inquiry, { recorded: true }));
    return { received: true, channel };
  }

  // Base injoignable : l'email devient le seul moyen de ne pas perdre la demande.
  const sent = await sendNotification(toTemplateParams(inquiry, { recorded: false }));
  return { received: sent, channel: sent ? "email" : null };
}
