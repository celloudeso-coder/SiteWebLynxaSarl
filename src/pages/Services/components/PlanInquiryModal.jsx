import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import emailjs from "@emailjs/browser";
import { logUnrecordedSubmission } from "../../../lib/cms";
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

    // ⚠️ Identifiants EmailJS non configurés (placeholders) — cet envoi
    // échoue systématiquement aujourd'hui. On journalise quand même la
    // demande (voir /admin/unrecorded-submissions) pour ne pas la perdre
    // tant que ces identifiants ne sont pas remplacés par les vrais.
    const serviceId = "service_xxxxxx";
    const templateId = "template_xxxxxx";
    const publicKey = "your_public_key";

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      plan_name: plan?.name,
      plan_price: plan?.price,
    };

    try {
      await emailjs.send(serviceId, templateId, { to_email: "lynxa@gmail.com", ...payload }, publicKey);
      await logUnrecordedSubmission({ form: "services_plan_inquiry", payload, emailSent: true });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Envoi de la demande d'information échoué :", err);
      await logUnrecordedSubmission({ form: "services_plan_inquiry", payload, dbError: String(err?.text || err?.message || err), emailSent: false });
      setStatus("error");
    } finally {
      setSubmitting(false);
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
            ✅ Message envoyé avec succès !
          </p>
        )}
        {status === "error" && (
          <div className="text-center mt-4 text-sm">
            <p className="text-red-500 mb-2">
              ❌ L'envoi automatique n'a pas abouti. Contactez-nous directement pour ne pas perdre votre demande :
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
