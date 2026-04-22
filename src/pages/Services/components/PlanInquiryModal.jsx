import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import emailjs from "@emailjs/browser"; // 📧 à installer : npm install @emailjs/browser

const PlanInquiryModal = ({ plan, onClose }) => {
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

    const serviceId = "service_xxxxxx";
    const templateId = "template_xxxxxx";
    const publicKey = "your_public_key";

    const templateParams = {
      to_email: "lynxa@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      plan_name: plan?.name,
      plan_price: plan?.price,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => setStatus("error"));
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
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-accent transition"
            >
              Envoyer la demande
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
            ❌ Une erreur s’est produite. Réessayez.
          </p>
        )}
      </div>
    </div>
  );
};

export default PlanInquiryModal;
