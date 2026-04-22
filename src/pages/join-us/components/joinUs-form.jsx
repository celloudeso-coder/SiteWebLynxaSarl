import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { supabase } from "./supabase";




const JoinUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    age: "",
    education: "",
    position: "",
    experience: "",
    contractType: "",
    availability: "",
    cv: null,
    motivationLetter: null,
    motivation: "",
  });

  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Options
  const genders = [
    { value: "male", label: "Homme" },
    { value: "female", label: "Femme" },
    { value: "other", label: "Autre" },
  ];

  const educationLevels = [
    { value: "highschool", label: "Lycée / Baccalauréat" },
    { value: "bachelor", label: "Licence" },
    { value: "master", label: "Master" },
    { value: "phd", label: "Doctorat" },
    { value: "other", label: "Autre" },
  ];

  const contractTypes = [
    { value: "internship", label: "Stage" },
    { value: "part-time", label: "Temps partiel" },
    { value: "full-time", label: "Temps plein" },
    { value: "freelance", label: "Freelance" },
  ];

  const availabilities = [
    { value: "immediate", label: "Immédiate" },
    { value: "1month", label: "Dans un mois" },
    { value: "3months", label: "Dans trois mois" },
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (error?.[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error?.[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Le nom complet est obligatoire.";
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse e-mail est requise.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un e-mail valide.";
    }

    if (!formData.phone.trim())
      newErrors.phone = "Le numéro de téléphone est requis.";
    if (!formData.gender)
      newErrors.gender = "Veuillez sélectionner votre genre.";
    if (!formData.education)
      newErrors.education = "Veuillez sélectionner votre niveau d’études.";
    if (!formData.position.trim())
      newErrors.position = "Veuillez indiquer le poste souhaité.";
    if (!formData.contractType)
      newErrors.contractType = "Veuillez sélectionner un type de contrat.";
    if (!formData.cv)
      newErrors.cv = "Veuillez téléverser votre CV (PDF uniquement).";
    if (!formData.motivation.trim() || formData.motivation.length < 20)
      newErrors.motivation =
        "Votre message doit contenir au moins 20 caractères.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    let cvUrl = "";
    let letterUrl = "";

    // 1. Upload du CV
    if (formData.cv) {
      const { data, error } = await supabase.storage
        .from("Cv_lettredemotivation_joinus")
        .upload(`cv/${Date.now()}_${formData.cv.name}`, formData.cv);

      if (error) throw error;

      cvUrl = `${supabase.storage.from("Cv_lettredemotivation_joinus").getPublicUrl(data.path).data.publicUrl}`;
    }

    // 2. Upload lettre de motivation
    if (formData.motivationLetter) {
      const { data, error } = await supabase.storage
        .from("Cv_lettredemotivation_joinus")
        .upload(`letters/${Date.now()}_${formData.motivationLetter.name}`, formData.motivationLetter);

      if (error) throw error;

      letterUrl = `${supabase.storage.from("Cv_lettredemotivation_joinus").getPublicUrl(data.path).data.publicUrl}`;
    }

    // 3. Envoi EmailJS (uniquement texte + URLs)
    await emailjs.send(
      "service_wj7gx89",
      "template_1hp49rv",
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        gender: formData.gender,
        age: formData.age,
        education: formData.education,
        position: formData.position,
        experience: formData.experience,
        contractType: formData.contractType,
        availability: formData.availability,
        motivation: formData.motivation,

        cv_link: cvUrl || "Non fourni",
        letter_link: letterUrl || "Non fournie",
      },
      "lj6YHCTOjLzZ77Bwu"
    );

    alert(`Merci ${formData.name} ! Votre candidature a été envoyée.`);

    e.target.reset();
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      age: "",
      education: "",
      position: "",
      experience: "",
      contractType: "",
      availability: "",
      cv: null,
      motivationLetter: null,
      motivation: "",
    });

  } catch (err) {
    console.error(err);
    alert("Erreur lors de l’envoi. Merci de réessayer.");
  }

  setIsSubmitting(false);
};


  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Rejoignez notre équipe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous sommes toujours à la recherche de personnes talentueuses et
            passionnées. Remplissez le formulaire ci-dessous pour postuler.
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1 - Infos personnelles */}
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nom complet"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={error.name}
                required
              />
              <Input
                label="Adresse email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={error.email}
                required
              />
              <Input
                label="Téléphone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={error.phone}
              />
              <Input
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Select
                label="Genre"
                name="gender"
                options={genders}
                value={formData.gender}
                onChange={(v) => handleSelectChange("gender", v)}
                error={error.gender}
              />
              <Input
                label="Âge"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            {/* Section 2 - Infos professionnelles */}
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Informations professionnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Niveau d’études"
                name="education"
                options={educationLevels}
                value={formData.education}
                onChange={(v) => handleSelectChange("education", v)}
                error={error.education}
              />
              <Input
                label="Poste souhaité"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                error={error.position}
              />
              <Input
                label="Années d’expérience"
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
              <Select
                label="Type de contrat souhaité"
                name="contractType"
                options={contractTypes}
                value={formData.contractType}
                onChange={(v) => handleSelectChange("contractType", v)}
                error={error.contractType}
              />
              <Select
                label="Disponibilité"
                name="availability"
                options={availabilities}
                value={formData.availability}
                onChange={(v) => handleSelectChange("availability", v)}
              />
            </div>

            {/* Section 3 - Fichiers et motivation */}
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Documents & motivation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="CV (PDF)"
                type="file"
                name="cv"
                accept=".pdf"
                onChange={handleInputChange}
                error={error.cv}
              />
              <Input
                label="Lettre de motivation (PDF)"
                type="file"
                name="motivationLetter"
                accept=".pdf"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Pourquoi souhaitez-vous nous rejoindre ?{" "}
                <span className="text-destructive">*</span>
              </label>
              <textarea
                name="motivation"
                rows={6}
                placeholder="Expliquez vos motivations, vos compétences, et ce que vous pouvez apporter à l’équipe..."
                value={formData.motivation}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none ${
                  error?.motivation ? "border-destructive" : "border-border"
                }`}
              />
              {error?.motivation && (
                <p className="mt-1 text-sm text-destructive">
                  {error.motivation}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Lock" size={16} />
                <span>Vos informations sont sécurisées et confidentielles</span>
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                className="glow-orange min-w-[200px]"
              >
                {isSubmitting
                  ? "Envoi en cours..."
                  : "Soumettre ma candidature"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinUsForm;
