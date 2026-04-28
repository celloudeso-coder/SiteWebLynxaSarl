import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Icon from "../../../components/AppIcon";
import { submitJobApplication } from "../../../lib/cms";
import { supabase } from "../../../lib/supabase";

const GENDERS      = [{ value: "male", label: "Homme" }, { value: "female", label: "Femme" }, { value: "other", label: "Autre" }];
const EDUCATIONS   = [{ value: "highschool", label: "Lycée / Baccalauréat" }, { value: "bachelor", label: "Licence" }, { value: "master", label: "Master" }, { value: "phd", label: "Doctorat" }, { value: "other", label: "Autre" }];
const CONTRACTS    = [{ value: "internship", label: "Stage" }, { value: "part-time", label: "Temps partiel" }, { value: "full-time", label: "Temps plein" }, { value: "freelance", label: "Freelance" }];
const AVAILABILITIES = [{ value: "immediate", label: "Immédiate" }, { value: "1month", label: "Dans 1 mois" }, { value: "3months", label: "Dans 3 mois" }];

const EMPTY = {
  name: "", email: "", phone: "", address: "", gender: "", age: "",
  education: "", position: "", experience: "", contractType: "",
  availability: "", motivation: "", cv: null, motivationLetter: null,
};

const sel = "w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors";
const inp = (err) => `w-full px-4 py-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${err ? "border-red-400 bg-red-50" : "border-border"}`;

async function uploadFile(file, folder) {
  if (!file) return "";
  const ext  = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage
    .from("Cv_lettredemotivation_joinus")
    .upload(path, file);
  if (error) {
    console.warn("Upload storage échoué (non bloquant) :", error.message);
    return "";
  }
  return supabase.storage.from("Cv_lettredemotivation_joinus").getPublicUrl(data.path).data.publicUrl;
}

const JoinUsForm = () => {
  const [form, setForm]         = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]     = useState(null); // "success" | "error"

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name     = "Le nom complet est obligatoire.";
    if (!form.email.trim())   e.email    = "L'adresse e-mail est requise.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "E-mail invalide.";
    if (!form.phone.trim())   e.phone    = "Le téléphone est requis.";
    if (!form.gender)         e.gender   = "Veuillez sélectionner votre genre.";
    if (!form.education)      e.education = "Veuillez sélectionner votre niveau.";
    if (!form.position.trim()) e.position = "Veuillez indiquer le poste souhaité.";
    if (!form.contractType)   e.contractType = "Veuillez choisir un type de contrat.";
    if (!form.cv)             e.cv       = "Le CV (PDF) est obligatoire.";
    if (!form.motivation.trim() || form.motivation.length < 20)
      e.motivation = "Votre message doit contenir au moins 20 caractères.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // 1. Upload fichiers (non bloquant — continue même si le bucket est absent)
      const [cvUrl, letterUrl] = await Promise.all([
        uploadFile(form.cv, "cv"),
        uploadFile(form.motivationLetter, "letters"),
      ]);

      const payload = {
        name:          form.name,
        email:         form.email,
        phone:         form.phone,
        address:       form.address,
        gender:        form.gender,
        age:           form.age,
        education:     form.education,
        position:      form.position,
        experience:    form.experience,
        contract_type: form.contractType,
        availability:  form.availability,
        motivation:    form.motivation,
        cv_url:        cvUrl,
        letter_url:    letterUrl,
      };

      // 2. Sauvegarder en BDD (non bloquant — EmailJS reste le filet de sécurité)
      submitJobApplication(payload).catch((err) =>
        console.warn("DB insert échoué (table manquante ?) :", err.message)
      );

      // 3. Notification email — c'est l'étape principale, on attend son résultat
      await emailjs.send(
        "service_wj7gx89",
        "template_1hp49rv",
        {
          name:         form.name,
          email:        form.email,
          phone:        form.phone,
          position:     form.position,
          contractType: form.contractType,
          motivation:   form.motivation,
          cv_link:      cvUrl      || "Non fourni",
          letter_link:  letterUrl  || "Non fournie",
        },
        "lj6YHCTOjLzZ77Bwu"
      );

      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      console.error("Erreur soumission candidature :", err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <section className="py-20 bg-white" id="candidature">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} color="#16a34a" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
              Candidature envoyée !
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Merci {form.name || ""} ! Votre dossier est bien reçu. Nous vous contacterons sous 48h.
            </p>
            <div className="bg-surface rounded-2xl p-6 max-w-sm mx-auto text-left space-y-3 mb-8">
              {[
                { icon: "Clock",    text: "Revue de votre candidature sous 48h" },
                { icon: "Phone",    text: "Appel de présentation avec notre équipe" },
                { icon: "Award",    text: "Décision et retour personnalisé" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm">
                  <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setStatus(null)} className="text-primary font-medium hover:underline text-sm">
              Soumettre une autre candidature
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white" id="candidature">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Déposez votre candidature
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous sommes toujours à la recherche de personnes talentueuses et passionnées.
          </p>
        </motion.div>

        <AnimatePresence>
          {status === "error" && (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl px-5 py-4"
            >
              <Icon name="AlertCircle" size={18} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Erreur d'envoi</p>
                <p className="text-sm">Une erreur s'est produite. Réessayez ou contactez-nous par WhatsApp.</p>
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
          noValidate
        >
          {/* Infos personnelles */}
          <div className="bg-surface rounded-2xl p-7">
            <h3 className="text-base font-semibold text-secondary mb-5 flex items-center gap-2">
              <Icon name="User" size={20} color="var(--color-primary)" />
              Informations personnelles
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { field: "name",    label: "Nom complet",     type: "text",   ph: "Mamadou Diallo",         req: true  },
                { field: "email",   label: "Adresse email",   type: "email",  ph: "vous@exemple.com",        req: true  },
                { field: "phone",   label: "Téléphone",       type: "tel",    ph: "+224 XXX XXX XXX",        req: true  },
                { field: "address", label: "Adresse",         type: "text",   ph: "Quartier, Conakry",       req: false },
                { field: "age",     label: "Âge",             type: "number", ph: "25",                      req: false },
              ].map((f) => (
                <div key={f.field}>
                  <label className="block text-sm font-medium text-secondary mb-1.5">
                    {f.label} {f.req && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={f.type} required={f.req} placeholder={f.ph}
                    value={form[f.field]}
                    onChange={(e) => set(f.field, e.target.value)}
                    className={inp(errors[f.field])}
                  />
                  {errors[f.field] && <p className="mt-1 text-xs text-red-500">{errors[f.field]}</p>}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Genre <span className="text-red-500">*</span>
                </label>
                <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className={sel} required>
                  <option value="">Sélectionner…</option>
                  {GENDERS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
              </div>
            </div>
          </div>

          {/* Infos professionnelles */}
          <div className="bg-surface rounded-2xl p-7">
            <h3 className="text-base font-semibold text-secondary mb-5 flex items-center gap-2">
              <Icon name="Briefcase" size={20} color="var(--color-primary)" />
              Informations professionnelles
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Niveau d'études <span className="text-red-500">*</span>
                </label>
                <select value={form.education} onChange={(e) => set("education", e.target.value)} className={sel} required>
                  <option value="">Sélectionner…</option>
                  {EDUCATIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.education && <p className="mt-1 text-xs text-red-500">{errors.education}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Poste souhaité <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" required placeholder="Ex : Développeur Mobile React Native"
                  value={form.position} onChange={(e) => set("position", e.target.value)}
                  className={inp(errors.position)}
                />
                {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Années d'expérience</label>
                <input
                  type="number" min={0} placeholder="0"
                  value={form.experience} onChange={(e) => set("experience", e.target.value)}
                  className={inp(false)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Type de contrat <span className="text-red-500">*</span>
                </label>
                <select value={form.contractType} onChange={(e) => set("contractType", e.target.value)} className={sel} required>
                  <option value="">Sélectionner…</option>
                  {CONTRACTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.contractType && <p className="mt-1 text-xs text-red-500">{errors.contractType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">Disponibilité</label>
                <select value={form.availability} onChange={(e) => set("availability", e.target.value)} className={sel}>
                  <option value="">Sélectionner…</option>
                  {AVAILABILITIES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Documents & motivation */}
          <div className="bg-surface rounded-2xl p-7">
            <h3 className="text-base font-semibold text-secondary mb-5 flex items-center gap-2">
              <Icon name="FileText" size={20} color="var(--color-primary)" />
              Documents & motivation
            </h3>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {/* CV */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  CV (PDF) <span className="text-red-500">*</span>
                </label>
                <label className={`flex items-center gap-3 cursor-pointer border-2 border-dashed rounded-xl px-4 py-3 transition-colors ${errors.cv ? "border-red-400 bg-red-50" : "border-border hover:border-primary bg-white"}`}>
                  <Icon name="Upload" size={18} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">
                    {form.cv ? form.cv.name : "Choisir un fichier PDF…"}
                  </span>
                  <input type="file" accept=".pdf" className="hidden"
                    onChange={(e) => set("cv", e.target.files?.[0] || null)} />
                </label>
                {errors.cv && <p className="mt-1 text-xs text-red-500">{errors.cv}</p>}
              </div>

              {/* Lettre */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1.5">
                  Lettre de motivation (PDF) <span className="text-muted-foreground text-xs">(optionnel)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-border hover:border-primary rounded-xl px-4 py-3 bg-white transition-colors">
                  <Icon name="Upload" size={18} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">
                    {form.motivationLetter ? form.motivationLetter.name : "Choisir un fichier PDF…"}
                  </span>
                  <input type="file" accept=".pdf" className="hidden"
                    onChange={(e) => set("motivationLetter", e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>

            {/* Motivation texte */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                Pourquoi souhaitez-vous nous rejoindre ? <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5} required
                placeholder="Expliquez vos motivations, vos compétences et ce que vous pouvez apporter à l'équipe…"
                value={form.motivation}
                onChange={(e) => set("motivation", e.target.value)}
                className={`${inp(errors.motivation)} resize-none`}
              />
              {errors.motivation && <p className="mt-1 text-xs text-red-500">{errors.motivation}</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Lock" size={15} />
              <span>Vos informations restent strictement confidentielles.</span>
            </div>
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold px-10 py-3.5 rounded-xl transition-all glow-orange min-w-[220px] justify-center"
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
                  <Icon name="Send" size={16} color="white" />
                  Soumettre ma candidature
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default JoinUsForm;
