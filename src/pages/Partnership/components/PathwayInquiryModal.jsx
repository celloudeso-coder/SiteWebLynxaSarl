import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { submitInquiry } from "../../../lib/inquiries";
import { useSiteSettings } from "../../../hooks/useContent";
import { formatPathwayBudget } from "../../../data/pricing";

const PathwayInquiryModal = ({ pathway, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { data: settings } = useSiteSettings();
  const budget = formatPathwayBudget(pathway);
  const fallbackPhone = settings?.contact?.phone || "+224 621 724 657";
  const fallbackEmail = settings?.contact?.email || "contact@lynxatech.com";
  const fallbackWhatsapp = `https://wa.me/${fallbackPhone.replace(/\s/g, "").replace("+", "")}?text=${encodeURIComponent(`Bonjour, je suis intéressé par : ${pathway?.title || "une voie de collaboration"}.`)}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const budgetLabel = [budget?.primary, budget?.secondary && `(${budget.secondary})`].filter(Boolean).join(" ");
    const { received } = await submitInquiry({
      source: "partnership_pathway",
      sourceLabel: `Voie de collaboration : ${pathway?.title || "—"}`,
      inquiryType: "partnership",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      budget: budgetLabel,
      message: formData.message.trim() || `Intérêt pour la voie de collaboration « ${pathway?.title} » (sans message).`,
      details: {
        pathwayTitle: pathway?.title,
        budgetLabel,
        timeline: pathway?.timeline,
      },
    });
    setSubmitting(false);
    if (received) {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-secondary mb-2">
            Intéressé par : {pathway?.title}
          </h3>
          <p className="text-gray-500">
            Budget estimé : <strong>{budget?.primary}</strong>
            {budget?.secondary && <span className="text-xs"> ({budget.secondary})</span>} • Durée :{" "}
            <strong>{pathway?.timeline}</strong>
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nom Complet"
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />
            <Input
              label="E-mail"
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />
            <Input
              label="Téléphone"
              type="tel"
              name="phone"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none"
              rows="4"
            ></textarea>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-accent transition disabled:opacity-60"
            >
              {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
            </Button>
          </form>
        </div>

        {status === "success" && (
          <p className="text-green-600 text-center mt-4">
            ✅ Demande reçue ! Nous vous recontactons sous 24 h.
          </p>
        )}
        {status === "error" && (
          <div className="text-center mt-4 text-sm">
            <p className="text-red-500 mb-2">
              Notre service est momentanément injoignable. Contactez-nous directement pour ne pas perdre votre demande :
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-medium">
              <a href={fallbackWhatsapp} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                WhatsApp ({fallbackPhone})
              </a>
              <a href={`mailto:${fallbackEmail}`} className="text-primary underline hover:no-underline">
                {fallbackEmail}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PathwayInquiryModal;
