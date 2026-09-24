import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { logUnrecordedSubmission } from "../../../lib/cms";
import { useSiteSettings } from "../../../hooks/useContent";

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

    // ⚠️ Identifiants EmailJS non configurés (placeholders "_xxxxx") — cet
    // envoi échoue systématiquement aujourd'hui. On journalise quand même
    // la demande (voir /admin/unrecorded-submissions) pour ne pas la perdre
    // tant que ces identifiants ne sont pas remplacés par les vrais.
    const serviceId = "service_xxxxx";
    const templateId = "template_xxxxx";
    const publicKey = "public_xxxxx";

    const payload = {
      pathway_title: pathway?.title,
      pathway_budget: pathway?.budget,
      pathway_timeline: pathway?.timeline,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, { to_email: "lynxa@gmail.com", ...payload }, publicKey);
      await logUnrecordedSubmission({ form: "partnership_pathway", payload, emailSent: true });
      setStatus("success");
    } catch (err) {
      console.error("Envoi de la demande de voie de collaboration échoué :", err);
      await logUnrecordedSubmission({ form: "partnership_pathway", payload, dbError: String(err?.text || err?.message || err), emailSent: false });
      setStatus("error");
    } finally {
      setSubmitting(false);
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
            Budget estimé : <strong>{pathway?.budget}</strong> • Durée :{" "}
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

export default PathwayInquiryModal;
