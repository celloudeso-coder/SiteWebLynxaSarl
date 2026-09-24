import React, { useState, useRef } from "react";
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

const REQUIRED_FIELDS = [
  ["projectType",   "Veuillez choisir un type de projet."],
  ["budget",        "Veuillez choisir un budget estimé."],
  ["timeline",      "Veuillez choisir un délai souhaité."],
  ["companyName",   "Le nom de votre organisation est requis."],
  ["contactName",   "Votre nom complet est requis."],
  ["email",         "Votre adresse email est requise."],
  ["projectDescription", "Merci de décrire votre projet (au moins 20 caractères)."],
];

const ProjectRequestForm = () => {
  const [form, setForm]         = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]     = useState(null); // "success" | "error"

  const fieldRefs = Object.fromEntries(REQUIRED_FIELDS.map(([field]) => [field, useRef(null)]));

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const toggleReq = (req) =>
    set("requirements", form.requirements.includes(req)
      ? form.requirements.filter((r) => r !== req)
      : [...form.requirements, req]
    );

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Votre adresse email est requise.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Adresse email invalide.";
    for (const [field, message] of REQUIRED_FIELDS) {
      if (field === "email") continue;
      const value = form[field];
      if (field === "projectDescription") {
        if (!value.trim() || value.trim().length < 20) e[field] = message;
      } else if (!value) {
        e[field] = message;
      }
    }
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const firstInvalidField = REQUIRED_FIELDS.map(([f]) => f).find((f) => e[f]);
      fieldRefs[firstInvalidField]?.current?.focus();
    }
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
              role="alert"
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
          noValidate
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
                <label htmlFor="prj-type" className="block text-sm font-medium text-secondary mb-1.5">Type de projet <span className="text-red-500">*</span></label>
                <select
                  id="prj-type" name="projectType" required aria-required="true"
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={errors.projectType ? "prj-type-error" : undefined}
                  ref={fieldRefs.projectType}
                  value={form.projectType} onChange={(e) => set("projectType", e.target.value)} className={selectCls}
                >
                  <option value="">Sélectionner…</option>
                  {PROJECT_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.projectType && <p id="prj-type-error" role="alert" className="mt-1 text-xs text-red-500">{errors.projectType}</p>}
              </div>
              <div>
                <label htmlFor="prj-budget" className="block text-sm font-medium text-secondary mb-1.5">Budget estimé <span className="text-red-500">*</span></label>
                <select
                  id="prj-budget" name="budget" required aria-required="true"
                  aria-invalid={Boolean(errors.budget)}
                  aria-describedby={errors.budget ? "prj-budget-error" : undefined}
                  ref={fieldRefs.budget}
                  value={form.budget} onChange={(e) => set("budget", e.target.value)} className={selectCls}
                >
                  <option value="">Sélectionner…</option>
                  {BUDGETS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.budget && <p id="prj-budget-error" role="alert" className="mt-1 text-xs text-red-500">{errors.budget}</p>}
              </div>
              <div>
                <label htmlFor="prj-timeline" className="block text-sm font-medium text-secondary mb-1.5">Délai souhaité <span className="text-red-500">*</span></label>
                <select
                  id="prj-timeline" name="timeline" required aria-required="true"
                  aria-invalid={Boolean(errors.timeline)}
                  aria-describedby={errors.timeline ? "prj-timeline-error" : undefined}
                  ref={fieldRefs.timeline}
                  value={form.timeline} onChange={(e) => set("timeline", e.target.value)} className={selectCls}
                >
                  <option value="">Sélectionner…</option>
                  {TIMELINES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.timeline && <p id="prj-timeline-error" role="alert" className="mt-1 text-xs text-red-500">{errors.timeline}</p>}
              </div>
              <div>
                <label htmlFor="prj-contact-pref" className="block text-sm font-medium text-secondary mb-1.5">Contact préféré</label>
                <select id="prj-contact-pref" name="preferredContact" value={form.preferredContact} onChange={(e) => set("preferredContact", e.target.value)} className={selectCls}>
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
                { field: "companyName", label: "Entreprise / Organisation", type: "text", placeholder: "Nom de votre organisation", required: true,  autoComplete: "organization" },
                { field: "contactName", label: "Nom du contact",             type: "text", placeholder: "Votre nom complet",          required: true,  autoComplete: "name" },
                { field: "email",       label: "Adresse email",              type: "email", placeholder: "vous@exemple.com",          required: true,  autoComplete: "email" },
                { field: "phone",       label: "Téléphone",                  type: "tel",  placeholder: "+224 XXX XXX XXX",            required: false, autoComplete: "tel" },
              ].map((f) => {
                const id = `prj-${f.field}`;
                const errorId = `${id}-error`;
                return (
                <div key={f.field}>
                  <label htmlFor={id} className="block text-sm font-medium text-secondary mb-1.5">
                    {f.label} {f.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    id={id}
                    name={f.field}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required={f.required}
                    aria-required={f.required || undefined}
                    aria-invalid={Boolean(errors[f.field])}
                    aria-describedby={errors[f.field] ? errorId : undefined}
                    ref={fieldRefs[f.field]}
                    placeholder={f.placeholder}
                    value={form[f.field]}
                    onChange={(e) => set(f.field, e.target.value)}
                    className={inputCls}
                  />
                  {errors[f.field] && <p id={errorId} role="alert" className="mt-1 text-xs text-red-500">{errors[f.field]}</p>}
                </div>
                );
              })}
            </div>
          </div>

          {/* Exigences */}
          <div className="bg-surface rounded-2xl p-7">
            <h3 className="text-base font-semibold text-secondary mb-5 flex items-center gap-2">
              <Icon name="Settings" size={20} color="var(--color-primary)" />
              Exigences du projet
            </h3>
            <p className="text-sm text-muted-foreground mb-4" id="prj-requirements-legend">Sélectionnez tout ce qui s'applique :</p>
            <div className="grid md:grid-cols-2 gap-3 mb-6" role="group" aria-labelledby="prj-requirements-legend">
              {REQUIREMENTS.map((req, i) => {
                const id = `prj-requirement-${i}`;
                return (
                <label key={req} htmlFor={id} className="flex items-center gap-3 cursor-pointer group min-h-11">
                  <span className="relative flex-shrink-0 w-5 h-5">
                    <input
                      id={id}
                      type="checkbox"
                      name="requirements"
                      value={req}
                      checked={form.requirements.includes(req)}
                      onChange={() => toggleReq(req)}
                      className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer before:absolute before:-inset-3 before:content-['']"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded border-2 flex items-center justify-center transition-colors border-border peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                    >
                      {form.requirements.includes(req) && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </span>
                  </span>
                  <span className="text-sm text-secondary">{req}</span>
                </label>
                );
              })}
            </div>

            <div>
              <label htmlFor="prj-description" className="block text-sm font-medium text-secondary mb-2">
                Description du projet <span className="text-red-500">*</span>
              </label>
              <textarea
                id="prj-description"
                name="projectDescription"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.projectDescription)}
                aria-describedby={errors.projectDescription ? "prj-description-error" : undefined}
                ref={fieldRefs.projectDescription}
                rows={5}
                value={form.projectDescription}
                onChange={(e) => set("projectDescription", e.target.value)}
                placeholder="Décrivez votre projet en détail : objectifs, public cible, spécifications techniques, contexte…"
                className={`${inputCls} resize-none`}
              />
              {errors.projectDescription && <p id="prj-description-error" role="alert" className="mt-1 text-xs text-red-500">{errors.projectDescription}</p>}
            </div>
          </div>

          {/* Soumettre */}
          <div className="text-center">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold px-12 py-3.5 min-h-11 rounded-xl text-base transition-all glow-orange"
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
