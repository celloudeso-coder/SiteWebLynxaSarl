import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const PathwayInquiryModal = ({ pathway, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_xxxxx";
    const templateId = "template_xxxxx";
    const publicKey = "public_xxxxx";

    const templateParams = {
      to_email: "lynxa@gmail.com",
      pathway_title: pathway?.title,
      pathway_budget: pathway?.budget,
      pathway_timeline: pathway?.timeline,
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
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
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-accent transition"
            >
              Envoyer ma demande
            </Button>
          </form>
        </div>

        {status === "success" && (
          <p className="text-green-600 text-center mt-4">
            ✅ Message envoyé avec succès !
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-center mt-4">
            ❌ Erreur lors de l’envoi. Réessayez.
          </p>
        )}
      </div>
    </div>
  );
};

export default PathwayInquiryModal;
