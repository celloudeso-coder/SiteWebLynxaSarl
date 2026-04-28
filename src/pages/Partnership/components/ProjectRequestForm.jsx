import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Icon from "../../../components/AppIcon";

const PROJECT_TYPES = [
  { value: "mobile",         label: "Application mobile (iOS/Android)" },
  { value: "web",            label: "Développement web"                 },
  { value: "network",        label: "Infrastructure réseau"             },
  { value: "cybersecurity",  label: "Solutions de cybersécurité"        },
  { value: "consultation",   label: "Consultation technique"            },
  { value: "maintenance",    label: "Maintenance système"               },
  { value: "integration",    label: "Intégration système"               },
  { value: "other",          label: "Autre"                             },
];

const BUDGETS = [
  { value: "under-1k",  label: "Moins de 1 000 $"   },
  { value: "1k-3k",     label: "1 000 $ – 3 000 $"  },
  { value: "3k-10k",    label: "3 500 $ – 10 000 $" },
  { value: "15k",       label: "15 000 $"            },
  { value: "over-15k",  label: "Plus de 15 000 $"    },
  { value: "discuss",   label: "Discutons-en"        },
];

const TIMELINES = [
  { value: "asap",       label: "Dès que possible (urgent)"  },
  { value: "1-2weeks",   label: "1-2 semaines"               },
  { value: "1-2months",  label: "1-2 mois"                   },
  { value: "3-5months",  label: "3-5 mois"                   },
  { value: "6months+",   label: "6 mois et plus"             },
  { value: "flexible",   label: "Calendrier flexible"        },
];

const CONTACT_PREFS = [
  { value: "email",    label: "Email"                  },
  { value: "phone",    label: "Appel téléphonique"     },
  { value: "whatsapp", label: "WhatsApp"               },
  { value: "video",    label: "Appel vidéo"            },
  { value: "meeting",  label: "Réunion à Conakry"      },
];

const REQUIREMENTS = [
  "Application mobile (iOS/Android)",
  "Application web",
  "Conception de base de données",
  "Développement d'API",
  "Conception UI/UX",
  "Implémentation sécurité",
  "Déploiement cloud",
  "Maintenance & support",
  "Formation & documentation",
  "Intégration avec systèmes existants",
];

const EMPTY = {
  projectType: "", budget: "", timeline: "", companyName: "",
  contactName: "", email: "", phone: "", projectDescription: "",
  requirements: [], preferredContact: "",
};

const inputCls = "w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors";
const selectCls = `${inputCls}`;

const ProjectRequestForm = () => {
  const [form, setForm]         = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]     = useState(null); // "success" | "error"

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const toggleReq = (req) =>
    set("requirements", form.requirements.includes(req)
      ? form.requirements.filter((r) => r !== req)
      : [...form.requirements, req]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await emailjs.send(
        "service_nru6i81",
        "template_jje294m",
        { ...form, requirements: form.requirements.join(", ") },
        "RE-vtDTXpbEbLN8jl"
      );
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <section className="py-20 bg-white" id="project-form">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} color="#16a34a" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
              Demande envoyée !
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Merci pour votre intérêt. Nous examinerons vos besoins et vous recontacterons
              sous 24 heures.
            </p>
            <div className="bg-surface rounded-2xl p-6 max-w-sm mx-auto text-left space-y-3 mb-8">
              {[
                { icon: "Clock",    text: "Revue initiale sous 24h" },
                { icon: "Phone",    text: "Appel de suivi pour les détails" },
                { icon: "FileText", text: "Proposition détaillée sous 3-5 jours" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm">
                  <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStatus(null)}
              className="text-primary font-medium hover:underline text-sm"
            >
              Soumettre une autre demande
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white" id="project-form">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Démarrez votre projet
          </h2>
          <p className="text-xl text-muted-foreground">
            Parlez-nous de votre projet et nous créerons une solution adaptée à vos besoins.
          </p>
        </motion.div>

        <AnimatePresence>
          {status === "error" && (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl px-5 py-4"
            >
              <Icon name="AlertCircle" size={18} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Erreur d'envoi</p>
                <p className="text-sm">Une erreur s'est produite. Contactez-nous directement par WhatsApp.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Aperçu du projet */}
          <div className="bg-surface rounded-2xl p-7">
            <h3 className="text-base font-semibold text-secondary mb-5 flex items-center gap-2">
              <Icon name="Briefcase" size={20} color="var(--color-primary)" />
              Aperçu du projet
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Type de projet <span className="text-red-500">*</span></label>
                <select required value={form.projectType} onChange={(e) => set("projectType", e.target.value)} className={selectCls}>
                  <option value="">Sélectionner…</option>
                  {PROJECT_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Budget estimé <span className="text-red-500">*</span></label>
                <select required value={form.budget} onChange={(e) => set("budget", e.target.value)} className={selectCls}>
                  <option value="">Sélectionner…</option>
                  {BUDGETS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Délai souhaité <span className="text-red-500">*</span></label>
                <select required value={form.timeline} onChange={(e) => set("timeline", e.target.value)} className={selectCls}>
                  <option value="">Sélectionner…</option>
                  {TIMELINES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Contact préféré</label>
                <select value={form.preferredContact} onChange={(e) => set("preferredContact", e.target.value)} className={selectCls}>
                  <option value="">Sélectionner…</option>
                  {CONTACT_PREFS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="bg-surface rounded-2xl p-7">
            <h3 className="text-base font-semibold text-secondary mb-5 flex items-center gap-2">
              <Icon name="User" size={20} color="var(--color-primary)" />
              Informations de contact
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { field: "companyName", label: "Entreprise / Organisation", type: "text", placeholder: "Nom de votre organisation", required: true },
                { field: "contactName", label: "Nom du contact",             type: "text", placeholder: "Votre nom complet",          required: true },
                { field: "email",       label: "Adresse email",              type: "email", placeholder: "vous@exemple.com",          required: true },
                { field: "phone",       label: "Téléphone",                  type: "tel",  placeholder: "+224 XXX XXX XXX",            required: false },
              ].map((f) => (
                <div key={f.field}>
                  <label className="block text-sm font-medium text-secondary mb-1.5">
                    {f.label} {f.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.field]}
                    onChange={(e) => set(f.field, e.target.value)}
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Exigences */}
          <div className="bg-surface rounded-2xl p-7">
            <h3 className="text-base font-semibold text-secondary mb-5 flex items-center gap-2">
              <Icon name="Settings" size={20} color="var(--color-primary)" />
              Exigences du projet
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Sélectionnez tout ce qui s'applique :</p>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {REQUIREMENTS.map((req) => (
                <label key={req} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggleReq(req)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                      form.requirements.includes(req)
                        ? "bg-primary border-primary"
                        : "border-border group-hover:border-primary"
                    }`}
                  >
                    {form.requirements.includes(req) && (
                      <Icon name="Check" size={12} color="white" />
                    )}
                  </div>
                  <span className="text-sm text-secondary">{req}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Description du projet <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={form.projectDescription}
                onChange={(e) => set("projectDescription", e.target.value)}
                placeholder="Décrivez votre projet en détail : objectifs, public cible, spécifications techniques, contexte…"
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          {/* Soumettre */}
          <div className="text-center">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold px-12 py-3.5 rounded-xl text-base transition-all glow-orange"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Icon name="Send" size={18} color="white" />
                  Soumettre la demande
                </>
              )}
            </motion.button>
            <p className="text-xs text-muted-foreground mt-3">
              En soumettant, vous acceptez notre politique de confidentialité. Réponse sous 24h.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ProjectRequestForm;
