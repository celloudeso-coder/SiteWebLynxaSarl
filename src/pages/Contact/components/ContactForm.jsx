import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    urgency: "",
    preferredContact: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: "new-project", label: "Développement de Nouveau Projet" },
    { value: "partnership", label: "Partenariat Commercial" },
    { value: "career", label: "Opportunités de Carrière" },
    { value: "media", label: "Demandes Médias et Presse" },
    { value: "support", label: "Support Technique" },
    { value: "consultation", label: "Consultation Gratuite" },
  ];

  const urgencyLevels = [
    { value: "low", label: "Faible - Demande Générale" },
    { value: "medium", label: "Moyen - Sous 1 semaine" },
    { value: "high", label: "Élevé - Sous 2-3 jours" },
    { value: "urgent", label: "Urgent - Sous 24 heures" },
  ];

  const contactMethods = [
    { value: "email", label: "E-mail" },
    { value: "phone", label: "Appel Téléphonique" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "meeting", label: "Réunion en Personne" },
  ];

  const budgetRanges = [
    { value: "under-5k", label: "Moins de 5 000 $" },
    { value: "5k-15k", label: "5 000 $ - 15 000 $" },
    { value: "15k-50k", label: "15 000 $ - 50 000 $" },
    { value: "50k-100k", label: "50 000 $ - 100 000 $" },
    { value: "over-100k", label: "Plus de 100 000 $" },
    { value: "discuss", label: "Préfère discuter" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors((prev) => ({
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

    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData?.email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.inquiryType) {
      newErrors.inquiryType = "Please select an inquiry type";
    }

    if (!formData?.message?.trim()) {
      newErrors.message = "Message is required";
    } else if (formData?.message?.trim()?.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success message
      alert(
        `Thank you ${formData?.name}! Your ${formData?.inquiryType?.replace(
          "-",
          " "
        )} inquiry has been received. We'll respond within ${
          formData?.urgency === "urgent"
            ? "24 hours"
            : formData?.urgency === "high"
            ? "2-3 days"
            : "1 week"
        } via ${formData?.preferredContact || "email"}.`
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: "",
        urgency: "",
        preferredContact: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      alert(
        "There was an error sending your message. Please try again or contact us directly via WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Parlez-nous de votre projet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plus vous fournirez de détails, mieux nous pourrons comprendre vos
            besoins et fournir une proposition précise.
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData?.name}
                onChange={handleInputChange}
                error={errors?.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="your.email@lynxatech.com"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="+224 XXX XXX XXX"
                value={formData?.phone}
                onChange={handleInputChange}
                description="Include country code for international calls"
              />

              <Input
                label="Company/Organization"
                type="text"
                name="company"
                placeholder="Your company name (optional)"
                value={formData?.company}
                onChange={handleInputChange}
              />
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Inquiry Type"
                placeholder="Select inquiry type"
                options={inquiryTypes}
                value={formData?.inquiryType}
                onChange={(value) => handleSelectChange("inquiryType", value)}
                error={errors?.inquiryType}
                required
              />

              <Select
                label="Project Urgency"
                placeholder="Select urgency level"
                options={urgencyLevels}
                value={formData?.urgency}
                onChange={(value) => handleSelectChange("urgency", value)}
                description="Helps us prioritize your inquiry"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Preferred Contact Method"
                placeholder="How should we contact you?"
                options={contactMethods}
                value={formData?.preferredContact}
                onChange={(value) =>
                  handleSelectChange("preferredContact", value)
                }
              />

              <Select
                label="Project Budget Range"
                placeholder="Select budget range"
                options={budgetRanges}
                value={formData?.budget}
                onChange={(value) => handleSelectChange("budget", value)}
                description="Helps us provide appropriate solutions"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Details du Project <span className="text-destructive">*</span>
              </label>
              <textarea
                name="message"
                rows={6}
                placeholder="Please describe your project requirements, goals, timeline, and any specific technologies or features you need..."
                value={formData?.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none ${
                  errors?.message ? "border-destructive" : "border-border"
                }`}
              />
              {errors?.message && (
                <p className="mt-1 text-sm text-destructive">
                  {errors?.message}
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                Minimum 10 caractères. Inclure les exigences techniques, le
                calendrier préféré et tout système existant.
              </p>
            </div>

            {/* Submit Button */}
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
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={24} color="var(--color-primary)" />
            </div>
            <h3 className="font-semibold text-secondary">Réponse Rapide</h3>
            <p className="text-sm text-muted-foreground">
              Nous répondons à toutes les demandes dans un délai de 2 heures
              pendant les heures de bureau.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Users" size={24} color="var(--color-primary)" />
            </div>
            <h3 className="font-semibold text-secondary">
              Expert Consultation
            </h3>
            <p className="text-sm text-muted-foreground">
              Consultation gratuite de 30 minutes avec nos experts techniques
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="FileText" size={24} color="var(--color-primary)" />
            </div>
            <h3 className="font-semibold text-secondary">
              Proposition Détaillée
            </h3>
            <p className="text-sm text-muted-foreground">
              Proposition de projet détaillée avec calendrier et tarification
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
