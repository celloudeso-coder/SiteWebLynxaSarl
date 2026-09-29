import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { submitInquiry } from "../../../lib/inquiries";
import { formatDualPrice } from "../../../data/pricing";
import { useSiteSettings } from "../../../hooks/useContent";

const PlanInquiryModal = ({ plan, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { data: settings } = useSiteSettings();
  const fallbackPhone = settings?.contact?.phone || "+224 621 724 657";
  const fallbackEmail = settings?.contact?.email || "contact@lynxatech.com";
  const fallbackWhatsapp = `https://wa.me/${fallbackPhone.replace(/\s/g, "").replace("+", "")}?text=${encodeURIComponent(`Bonjour, je suis intéressé par le plan : ${plan?.name || "vos services"}.`)}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const dual = plan?.priceGnf != null ? formatDualPrice(plan.priceGnf) : null;
    const priceLabel = dual ? `${dual.primary} (${dual.secondary})` : (plan?.priceFallbackText || "Sur devis");
    const { received } = await submitInquiry({
      source: "services_plan_inquiry",
      sourceLabel: `Plan tarifaire : ${plan?.name || "—"}`,
      inquiryType: "plan",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      budget: priceLabel,
      message: formData.message.trim() || `Demande d'information sur le plan « ${plan?.name} » (sans message).`,
      details: {
        planName: plan?.name,
        budgetLabel: priceLabel,
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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold text-secondary mb-4 text-center">
          Demande d’information - {plan?.name}
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Merci de votre intérêt pour notre {plan?.name}! Veuillez remplir le
          formulaire ci-dessous.
        </p>

        <div className="bg-surface rounded-2xl p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nom Complet"
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <Input
              label="E-mail"
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <Input
              label="Téléphone "
              type="tel"
              name="phone"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Message <span className="text-destructive"></span>
              </label>
              <textarea
                name="message"
                placeholder="Message (facultatif)"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none"
                rows="4"
              ></textarea>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-accent transition disabled:opacity-60"
            >
              {submitting ? "Envoi en cours…" : "Envoyer la demande"}
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

export default PlanInquiryModal;
