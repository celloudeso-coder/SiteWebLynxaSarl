import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";

const INQUIRY_TYPES = [
  { value: "new-project",   label: "Développement de nouveau projet" },
  { value: "partnership",   label: "Partenariat commercial"           },
  { value: "career",        label: "Opportunités de carrière"         },
  { value: "support",       label: "Support technique"                },
  { value: "consultation",  label: "Consultation gratuite"            },
  { value: "other",         label: "Autre"                            },
];

const BUDGET_RANGES = [
  { value: "under-5k",  label: "Moins de 5 000 $"        },
  { value: "5k-15k",    label: "5 000 $ – 15 000 $"      },
  { value: "15k-50k",   label: "15 000 $ – 50 000 $"     },
  { value: "over-50k",  label: "Plus de 50 000 $"         },
  { value: "discuss",   label: "Préfère en discuter"      },
];

const CONTACT_METHODS = [
  { value: "email",     label: "Email"              },
  { value: "phone",     label: "Appel téléphonique" },
  { value: "whatsapp",  label: "WhatsApp"            },
];

const EMPTY = {
  name: "", email: "", phone: "", company: "",
  inquiryType: "", contactMethod: "", budget: "", message: "",
};

const ContactForm = () => {
  const [form, setForm]           = useState(EMPTY);
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]       = useState(null); // "success" | "error"

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
    if (status) setStatus(null);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Votre nom complet est requis.";
    if (!form.email.trim()) e.email = "Votre adresse email est requise.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Adresse email invalide.";
    if (!form.inquiryType)  e.inquiryType = "Veuillez choisir un type de demande.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Le message doit contenir au moins 10 caractères.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1800));
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-border bg-white"
    }`;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Parlez-nous de votre projet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plus vous fournirez de détails, mieux nous pourrons comprendre vos besoins
            et vous proposer une solution adaptée.
          </p>
        </motion.div>

        <motion.div
          className="bg-surface rounded-2xl p-8 shadow-soft"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl px-5 py-4"
              >
                <Icon name="CheckCircle" size={20} className="mt-0.5 flex-shrink-0 text-green-600" />
                <div>
                  <p className="font-semibold mb-0.5">Message envoyé !</p>
                  <p className="text-sm">Nous vous répondrons sous 24h. Merci de votre confiance.</p>
                </div>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl px-5 py-4"
              >
                <Icon name="AlertCircle" size={20} className="mt-0.5 flex-shrink-0 text-red-600" />
                <div>
                  <p className="font-semibold mb-0.5">Erreur d'envoi</p>
                  <p className="text-sm">Une erreur s'est produite. Contactez-nous directement par WhatsApp.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mamadou Diallo"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputClass("name")}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Adresse email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass("email")}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Téléphone
                </label>
                <input
                  type="tel"
                  placeholder="+224 XXX XXX XXX"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputClass("phone")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Entreprise / Organisation
                </label>
                <input
                  type="text"
                  placeholder="Nom de votre organisation (optionnel)"
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  className={inputClass("company")}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Type de demande <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.inquiryType}
                  onChange={(e) => set("inquiryType", e.target.value)}
                  className={inputClass("inquiryType")}
                >
                  <option value="">Sélectionner…</option>
                  {INQUIRY_TYPES.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.inquiryType && <p className="mt-1 text-xs text-red-500">{errors.inquiryType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Mode de contact préféré
                </label>
                <select
                  value={form.contactMethod}
                  onChange={(e) => set("contactMethod", e.target.value)}
                  className={inputClass("contactMethod")}
                >
                  <option value="">Sélectionner…</option>
                  {CONTACT_METHODS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                Budget estimé
              </label>
              <select
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                className={inputClass("budget")}
              >
                <option value="">Sélectionner une fourchette…</option>
                {BUDGET_RANGES.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                Détails du projet <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Décrivez vos besoins, objectifs, délais souhaités et toute contrainte technique…"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className={`${inputClass("message")} resize-none`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              <p className="mt-1.5 text-xs text-muted-foreground">
                Minimum 10 caractères. Incluez les exigences techniques et le calendrier souhaité.
              </p>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Lock" size={15} />
                <span>Vos informations restent strictement confidentielles.</span>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 glow-orange min-w-[200px] justify-center"
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
                    <Icon name="Send" size={16} />
                    Envoyer le message
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Bottom assurances */}
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { icon: "Clock",     title: "Réponse rapide",          desc: "Nous répondons à toutes les demandes dans un délai de 24h." },
            { icon: "Users",     title: "Consultation gratuite",    desc: "Échangez 30 min avec nos experts techniques sans engagement." },
            { icon: "FileText",  title: "Proposition détaillée",    desc: "Devis complet avec calendrier et tarification claire." },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={item.icon} size={22} color="var(--color-primary)" />
              </div>
              <h3 className="font-semibold text-secondary">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
