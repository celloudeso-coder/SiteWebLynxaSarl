import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";


const ProjectRequestForm = () => {
  const [formData, setFormData] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    projectDescription: "",
    requirements: [],
    urgency: "",
    preferredContact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const projectTypes = [
    { value: "mobile", label: "Développement d’application mobile" },
    { value: "web", label: "Développement web" },
    { value: "network", label: "Infrastructure réseau" },
    { value: "cybersecurity", label: "Solutions de cybersécurité" },
    { value: "consultation", label: "Consultation technique" },
    { value: "maintenance", label: "Maintenance système" },
    { value: "integration", label: "Intégration système" },
    { value: "other", label: "Autre (Veuillez préciser)" },
  ];

  const budgetRanges = [
    { value: "under-5k", label: "Moins de 1 000 $" },
    { value: "5k-15k", label: "1 500 $ - 3 000 $" },
    { value: "15k-50k", label: "3 500 $ - 10 000 $" },
    { value: "50k-100k", label: "15 000 $ " },
    { value: "over-100k", label: "Plus de 15 000 $" },
    { value: "discuss", label: "Discutons-en" },
  ];

  const timelineOptions = [
    { value: "asap", label: "Dès que possible (Projet urgent)" },
    { value: "1-2weeks", label: "1-2 semaines" },
    { value: "1month", label: "1-2 mois" },
    { value: "2-3months", label: "3-5 mois" },
    { value: "3-6months", label: "4-6 mois" },
    { value: "6months+", label: "6 mois et plus" },
    { value: "flexible", label: "Calendrier flexible" },
  ];

  const urgencyLevels = [
    { value: "low", label: "Faible - Phase de planification" },
    { value: "medium", label: "Moyen - Prêt à démarrer" },
    { value: "high", label: "Élevé - Besoin de commencer bientôt" },
    { value: "urgent", label: "Urgent - Besoin critique pour l’entreprise" },
  ];

  const contactPreferences = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Appel téléphonique" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "video", label: "Appel vidéo" },
    { value: "meeting", label: "Réunion en personne (Conakry)" },
  ];

  const requirements = [
    "Application mobile (iOS/Android)",
    "Application web",
    "Conception de base de données",
    "Développement d’API",
    "Conception UI/UX",
    "Implémentation de la sécurité",
    "Déploiement cloud",
    "Maintenance et support",
    "Formation et documentation",
    "Intégration avec les systèmes existants",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRequirementChange = (requirement, checked) => {
    setFormData((prev) => ({
      ...prev,
      requirements: checked
        ? [...prev?.requirements, requirement]
        : prev?.requirements?.filter((r) => r !== requirement),
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const templateParams = {
    projectType: formData.projectType,
    budget: formData.budget,
    timeline: formData.timeline,
    companyName: formData.companyName,
    contactName: formData.contactName,
    email: formData.email,
    phone: formData.phone,
    projectDescription: formData.projectDescription,
    requirements: formData.requirements.join(", "),
    urgency: formData.urgency,
    preferredContact: formData.preferredContact,
  };

  emailjs
    .send(
      "service_nru6i81",
      "template_jje294m",
      templateParams,
      "RE-vtDTXpbEbLN8jl"
    )
    .then(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      // reset
      setTimeout(() => {
        setSubmitStatus(null);
        setFormData({
          projectType: "",
          budget: "",
          timeline: "",
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          projectDescription: "",
          requirements: [],
          urgency: "",
          preferredContact: "",
        });
      }, 3000);
    })
    .catch((error) => {
      console.error("Erreur EmailJS:", error);
      setIsSubmitting(false);
      setSubmitStatus("error");
    });
};


  {/* Confirmation Message */}
  if (submitStatus === "success") {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} color="white" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
              Demande envoyée avec succès !
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Merci pour votre intérêt à collaborer avec Lynxa Tech. Nous
              examinerons vos besoins pour le projet et vous recontacterons dans
              les 24 heures.
            </p>

            <div className="bg-surface rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-secondary mb-4">
                Que se passe-t-il ensuite ?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} color="var(--color-primary)" />
                  <span className="text-sm">Revue initiale sous 24 heures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} color="var(--color-primary)" />
                  <span className="text-sm">
                    Appel de suivi pour discuter des détails
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon
                    name="FileText"
                    size={16}
                    color="var(--color-primary)"
                  />
                  <span className="text-sm">
                    Proposition détaillée sous 3 à 5 jours ouvrables
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Démarrez votre projet
          </h2>
          <p className="text-xl text-muted-foreground">
            Parlez-nous de votre projet et nous créerons une solution adaptée à
            vos besoins.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Aperçu du projet */}
          <div className="bg-surface rounded-2xl p-8">
            <h3 className="text-xl font-heading font-semibold text-secondary mb-6 flex items-center">
              <Icon name="Briefcase" size={24} className="mr-3 text-primary" />
              Aperçu du Projet
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label="Type de Projet"
                required
                options={projectTypes}
                value={formData?.projectType}
                onChange={(value) => handleInputChange("projectType", value)}
                placeholder="Sélectionnez le type de projet"
              />

              <Select
                label="Budget"
                required
                options={budgetRanges}
                value={formData?.budget}
                onChange={(value) => handleInputChange("budget", value)}
                placeholder="Sélectionnez la fourchette de budget"
              />

              <Select
                label="Délai"
                required
                options={timelineOptions}
                value={formData?.timeline}
                onChange={(value) => handleInputChange("timeline", value)}
                placeholder="Sélectionnez le délai"
              />

              <Select
                label="Urgence du Projet"
                required
                options={urgencyLevels}
                value={formData?.urgency}
                onChange={(value) => handleInputChange("urgency", value)}
                placeholder="Sélectionnez le niveau d'urgence"
              />
            </div>
          </div>

          {/* Informations de Contact */}
          <div className="bg-surface rounded-2xl p-8">
            <h3 className="text-xl font-heading font-semibold text-secondary mb-6 flex items-center">
              <Icon name="User" size={24} className="mr-3 text-primary" />
              Informations de Contact
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Nom de l'Entreprise/Organisation"
                type="text"
                required
                value={formData?.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e?.target?.value)
                }
                placeholder="Entrez le nom de l'entreprise"
              />

              <Input
                label="Nom du Contact"
                type="text"
                required
                value={formData?.contactName}
                onChange={(e) =>
                  handleInputChange("contactName", e?.target?.value)
                }
                placeholder="Entrez votre nom complet"
              />

              <Input
                label="Adresse Email"
                type="email"
                required
                value={formData?.email}
                onChange={(e) => handleInputChange("email", e?.target?.value)}
                placeholder="Entrez votre adresse email"
              />

              <Input
                label="Numéro de Téléphone"
                type="tel"
                required
                value={formData?.phone}
                onChange={(e) => handleInputChange("phone", e?.target?.value)}
                placeholder="+224 XXX XXX XXX"
              />
            </div>

            <div className="mt-6">
              <Select
                label="Méthode de Contact Préférée"
                required
                options={contactPreferences}
                value={formData?.preferredContact}
                onChange={(value) =>
                  handleInputChange("preferredContact", value)
                }
                placeholder="Comment souhaitez-vous que nous vous contactions ?"
              />
            </div>
          </div>

          {/* Exigences du Projet */}
          <div className="bg-surface rounded-2xl p-8">
            <h3 className="text-xl font-heading font-semibold text-secondary mb-6 flex items-center">
              <Icon name="Settings" size={24} className="mr-3 text-primary" />
              Exigences du Projet
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary mb-3">
                Sélectionnez tout ce qui s’applique à votre projet :
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {requirements?.map((requirement) => (
                  <Checkbox
                    key={requirement}
                    label={requirement}
                    checked={formData?.requirements?.includes(requirement)}
                    onChange={(e) =>
                      handleRequirementChange(requirement, e?.target?.checked)
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Description du Projet *
              </label>
              <textarea
                required
                value={formData?.projectDescription}
                onChange={(e) =>
                  handleInputChange("projectDescription", e?.target?.value)
                }
                placeholder="Veuillez décrire votre projet en détail. Incluez les exigences spécifiques, les objectifs, le public cible et toutes les spécifications techniques que vous avez en tête..."
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Bouton de Soumission */}
          <div className="text-center">
            <Button
              type="submit"
              variant="default"
              size="lg"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
              className="glow-orange px-12"
            >
              {isSubmitting
                ? "Envoi de la demande..."
                : "Soumettre la demande de projet"}
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              En soumettant ce formulaire, vous acceptez notre politique de
              confidentialité et nos conditions d’utilisation. Nous répondrons
              dans les 24 heures.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProjectRequestForm;
