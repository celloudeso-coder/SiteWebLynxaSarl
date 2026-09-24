import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Icon from "../../../components/AppIcon";
import { submitJobApplication, logUnrecordedSubmission } from "../../../lib/cms";
import { supabase } from "../../../lib/supabase";
import { useSiteSettings } from "../../../hooks/useContent";
import { validatePdfFile } from "../../../lib/fileValidation";

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
    .upload(path, file, { contentType: file.type || "application/pdf" });
  if (error) throw error;
  return supabase.storage.from("Cv_lettredemotivation_joinus").getPublicUrl(data.path).data.publicUrl;
}

const FIELD_ORDER = ["name", "email", "phone", "gender", "education", "position", "contractType", "cv", "motivation"];

const JoinUsForm = () => {
  const [form, setForm]         = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]     = useState(null); // "success" | "degraded" | "error"
  const { data: settings } = useSiteSettings();
  const fallbackPhone = settings?.contact?.phone || "+224 621 724 657";
  const fallbackEmail = settings?.contact?.email || "contact@lynxatech.com";
  const fallbackWhatsapp = `https://wa.me/${fallbackPhone.replace(/\s/g, "").replace("+", "")}?text=${encodeURIComponent("Bonjour, je viens d'essayer de soumettre ma candidature sur le site mais l'envoi a échoué.")}`;

  const fieldRefs = Object.fromEntries(FIELD_ORDER.map((field) => [field, useRef(null)]));

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  // Validation immédiate à la sélection du fichier : même limite que le
  // bucket Supabase Storage côté serveur (PDF, 10 Mo max) — évite un
  // aller-retour réseau inutile pour un fichier qui sera de toute façon
  // rejeté à l'upload.
  const setFile = (field, file, label) => {
    if (!file) { set(field, null); return; }
    const check = validatePdfFile(file, { label });
    if (!check.ok) {
      setErrors((p) => ({ ...p, [field]: check.message }));
      set(field, null);
      return;
    }
    set(field, file);
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
    if (Object.keys(e).length > 0) {
      const firstInvalidField = FIELD_ORDER.find((field) => e[field]);
      fieldRefs[firstInvalidField]?.current?.focus();
    }
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // 1. Upload du CV (obligatoire) — un échec doit être signalé, pas ignoré
      let cvUrl = "";
      try {
        cvUrl = await uploadFile(form.cv, "cv");
      } catch (err) {
        console.error("Upload CV échoué :", err.message);
        setErrors((p) => ({ ...p, cv: "Échec de l'envoi du CV. Vérifiez le fichier (PDF, max 10 Mo) et réessayez." }));
        setStatus("error");
        setSubmitting(false);
        return;
      }

      // Lettre de motivation (optionnelle) — non bloquant
      let letterUrl = "";
      try {
        letterUrl = await uploadFile(form.motivationLetter, "letters");
      } catch (err) {
        console.warn("Upload lettre échoué (optionnel) :", err.message);
      }

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

      // 2. Sauvegarder en BDD — attendu, l'échec est capturé mais ne bloque
      // pas la tentative d'email : c'est la combinaison des deux résultats
      // qui détermine ce que voit le candidat (voir plus bas).
      let dbOk = true;
      let dbError = null;
      try {
        await submitJobApplication(payload);
      } catch (err) {
        dbOk = false;
        dbError = err;
        console.error("Insertion de la candidature en base échouée :", err.message);
      }

      // 3. Notification email — également attendue, indépendamment du résultat de l'étape 2.
      let emailOk = true;
      try {
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
      } catch (err) {
        emailOk = false;
        console.error("Envoi de l'email de notification échoué :", err);
      }

      if (dbOk) {
        // La candidature est bel et bien enregistrée (visible dans
        // /admin/join-us) : succès réel, que l'email soit parti ou non.
        setStatus("success");
        setForm(EMPTY);
      } else if (emailOk) {
        // Rien en base, mais l'email est parti : on ne ment pas au candidat
        // (pas de "succès" complet) et on garde une trace consultable côté
        // admin, faute de quoi cette candidature serait purement et
        // simplement perdue.
        await logUnrecordedSubmission({ form: "join_us", payload, dbError: dbError?.message, emailSent: true });
        setStatus("degraded");
        setForm(EMPTY);
      } else {
        // Les deux échouent : rien n'a été transmis nulle part. On tente
        // quand même de journaliser (peut réussir même si job_applications
        // a échoué pour une raison spécifique à cette table), et on garde le
        // formulaire rempli pour que le candidat ne perde pas sa saisie.
        await logUnrecordedSubmission({ form: "join_us", payload, dbError: dbError?.message, emailSent: false });
        setStatus("error");
      }
    } catch (err) {
      // Filet ultime : une erreur inattendue dans notre propre code (pas
      // dans l'insertion ou l'envoi, déjà capturées ci-dessus).
      console.error("Erreur inattendue lors de la soumission :", err);
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

  if (status === "degraded") {
    return (
      <section className="py-20 bg-white" id="candidature">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Clock" size={40} color="#d97706" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
              Candidature reçue par email
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Votre candidature a bien été transmise par email, mais son enregistrement
              automatique n'a pas pu être vérifié. Notre équipe la traitera manuellement —
              vous pouvez aussi nous écrire directement pour confirmer sa bonne réception.
            </p>
            <div className="bg-surface rounded-2xl p-6 max-w-sm mx-auto text-left space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <Icon name="Mail" size={16} color="var(--color-primary)" />
                <a href={`mailto:${fallbackEmail}`} className="hover:underline">{fallbackEmail}</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icon name="MessageCircle" size={16} color="var(--color-primary)" />
                <a href={fallbackWhatsapp} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Confirmer par WhatsApp ({fallbackPhone})
                </a>
              </div>
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
              role="alert"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl px-5 py-4"
            >
              <Icon name="AlertCircle" size={18} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Échec de l'envoi</p>
                <p className="text-sm mb-2">
                  Ni l'enregistrement ni la notification par email n'ont abouti. Réessayez, ou
                  contactez-nous directement pour ne pas perdre votre candidature :
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                  <a href={fallbackWhatsapp} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                    WhatsApp ({fallbackPhone})
                  </a>
                  <a href={`mailto:${fallbackEmail}`} className="underline hover:no-underline">
                    {fallbackEmail}
                  </a>
                </div>
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
                { field: "name",    label: "Nom complet",     type: "text",   ph: "Mamadou Diallo",         req: true,  autoComplete: "name" },
                { field: "email",   label: "Adresse email",   type: "email",  ph: "vous@exemple.com",        req: true,  autoComplete: "email" },
                { field: "phone",   label: "Téléphone",       type: "tel",    ph: "+224 XXX XXX XXX",        req: true,  autoComplete: "tel" },
                { field: "address", label: "Adresse",         type: "text",   ph: "Quartier, Conakry",       req: false, autoComplete: "address-level2" },
                { field: "age",     label: "Âge",             type: "number", ph: "25",                      req: false, autoComplete: "off" },
              ].map((f) => {
                const id = `join-${f.field}`;
                const errorId = `${id}-error`;
                return (
                <div key={f.field}>
                  <label htmlFor={id} className="block text-sm font-medium text-secondary mb-1.5">
                    {f.label} {f.req && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    id={id}
                    name={f.field}
                    type={f.type}
                    required={f.req}
                    aria-required={f.req || undefined}
                    aria-invalid={Boolean(errors[f.field])}
                    aria-describedby={errors[f.field] ? errorId : undefined}
                    autoComplete={f.autoComplete}
                    ref={fieldRefs[f.field]}
                    placeholder={f.ph}
                    value={form[f.field]}
                    onChange={(e) => set(f.field, e.target.value)}
                    className={inp(errors[f.field])}
                  />
                  {errors[f.field] && <p id={errorId} role="alert" className="mt-1 text-xs text-red-500">{errors[f.field]}</p>}
                </div>
                );
              })}
              <div>
                <label htmlFor="join-gender" className="block text-sm font-medium text-secondary mb-1.5">
                  Genre <span className="text-red-500">*</span>
                </label>
                <select
                  id="join-gender"
                  name="gender"
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                  className={sel}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.gender)}
                  aria-describedby={errors.gender ? "join-gender-error" : undefined}
                  ref={fieldRefs.gender}
                >
                  <option value="">Sélectionner…</option>
                  {GENDERS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.gender && <p id="join-gender-error" role="alert" className="mt-1 text-xs text-red-500">{errors.gender}</p>}
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
                <label htmlFor="join-education" className="block text-sm font-medium text-secondary mb-1.5">
                  Niveau d'études <span className="text-red-500">*</span>
                </label>
                <select
                  id="join-education"
                  name="education"
                  value={form.education}
                  onChange={(e) => set("education", e.target.value)}
                  className={sel}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.education)}
                  aria-describedby={errors.education ? "join-education-error" : undefined}
                  ref={fieldRefs.education}
                >
                  <option value="">Sélectionner…</option>
                  {EDUCATIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.education && <p id="join-education-error" role="alert" className="mt-1 text-xs text-red-500">{errors.education}</p>}
              </div>
              <div>
                <label htmlFor="join-position" className="block text-sm font-medium text-secondary mb-1.5">
                  Poste souhaité <span className="text-red-500">*</span>
                </label>
                <input
                  id="join-position"
                  name="position"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.position)}
                  aria-describedby={errors.position ? "join-position-error" : undefined}
                  ref={fieldRefs.position}
                  placeholder="Ex : Développeur Mobile React Native"
                  value={form.position} onChange={(e) => set("position", e.target.value)}
                  className={inp(errors.position)}
                />
                {errors.position && <p id="join-position-error" role="alert" className="mt-1 text-xs text-red-500">{errors.position}</p>}
              </div>
              <div>
                <label htmlFor="join-experience" className="block text-sm font-medium text-secondary mb-1.5">Années d'expérience</label>
                <input
                  id="join-experience"
                  name="experience"
                  type="number" min={0} placeholder="0"
                  value={form.experience} onChange={(e) => set("experience", e.target.value)}
                  className={inp(false)}
                />
              </div>
              <div>
                <label htmlFor="join-contract-type" className="block text-sm font-medium text-secondary mb-1.5">
                  Type de contrat <span className="text-red-500">*</span>
                </label>
                <select
                  id="join-contract-type"
                  name="contractType"
                  value={form.contractType}
                  onChange={(e) => set("contractType", e.target.value)}
                  className={sel}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.contractType)}
                  aria-describedby={errors.contractType ? "join-contract-type-error" : undefined}
                  ref={fieldRefs.contractType}
                >
                  <option value="">Sélectionner…</option>
                  {CONTRACTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.contractType && <p id="join-contract-type-error" role="alert" className="mt-1 text-xs text-red-500">{errors.contractType}</p>}
              </div>
              <div>
                <label htmlFor="join-availability" className="block text-sm font-medium text-secondary mb-1.5">Disponibilité</label>
                <select id="join-availability" name="availability" value={form.availability} onChange={(e) => set("availability", e.target.value)} className={sel}>
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
                <label htmlFor="join-cv" className="block text-sm font-medium text-secondary mb-1.5">
                  CV (PDF) <span className="text-red-500">*</span>
                </label>
                <label className={`flex items-center gap-3 cursor-pointer border-2 border-dashed rounded-xl px-4 py-3 min-h-11 transition-colors ${errors.cv ? "border-red-400 bg-red-50" : "border-border hover:border-primary bg-white"}`}>
                  <Icon name="Upload" size={18} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">
                    {form.cv ? form.cv.name : "Choisir un fichier PDF…"}
                  </span>
                  <input
                    id="join-cv"
                    name="cv"
                    type="file"
                    accept=".pdf"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.cv)}
                    aria-describedby={errors.cv ? "join-cv-error" : undefined}
                    ref={fieldRefs.cv}
                    className="hidden"
                    onChange={(e) => setFile("cv", e.target.files?.[0] || null, "Le CV")} />
                </label>
                {errors.cv && <p id="join-cv-error" role="alert" className="mt-1 text-xs text-red-500">{errors.cv}</p>}
              </div>

              {/* Lettre */}
              <div>
                <label htmlFor="join-motivation-letter" className="block text-sm font-medium text-secondary mb-1.5">
                  Lettre de motivation (PDF) <span className="text-muted-foreground text-xs">(optionnel)</span>
                </label>
                <label className={`flex items-center gap-3 cursor-pointer border-2 border-dashed rounded-xl px-4 py-3 min-h-11 transition-colors ${errors.motivationLetter ? "border-red-400 bg-red-50" : "border-border hover:border-primary bg-white"}`}>
                  <Icon name="Upload" size={18} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">
                    {form.motivationLetter ? form.motivationLetter.name : "Choisir un fichier PDF…"}
                  </span>
                  <input
                    id="join-motivation-letter"
                    name="motivationLetter"
                    type="file"
                    accept=".pdf"
                    aria-invalid={Boolean(errors.motivationLetter)}
                    aria-describedby={errors.motivationLetter ? "join-motivation-letter-error" : undefined}
                    className="hidden"
                    onChange={(e) => setFile("motivationLetter", e.target.files?.[0] || null, "La lettre de motivation")} />
                </label>
                {errors.motivationLetter && <p id="join-motivation-letter-error" role="alert" className="mt-1 text-xs text-red-500">{errors.motivationLetter}</p>}
              </div>
            </div>

            {/* Motivation texte */}
            <div>
              <label htmlFor="join-motivation" className="block text-sm font-medium text-secondary mb-1.5">
                Pourquoi souhaitez-vous nous rejoindre ? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="join-motivation"
                name="motivation"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.motivation)}
                aria-describedby={errors.motivation ? "join-motivation-error" : undefined}
                ref={fieldRefs.motivation}
                rows={5}
                placeholder="Expliquez vos motivations, vos compétences et ce que vous pouvez apporter à l'équipe…"
                value={form.motivation}
                onChange={(e) => set("motivation", e.target.value)}
                className={`${inp(errors.motivation)} resize-none`}
              />
              {errors.motivation && <p id="join-motivation-error" role="alert" className="mt-1 text-xs text-red-500">{errors.motivation}</p>}
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
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold px-10 py-3.5 min-h-11 rounded-xl transition-all glow-orange min-w-[220px] justify-center"
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
                  <Icon name="Send" size={16} color="var(--color-primary-foreground)" />
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
