import React, { useState, useEffect } from "react";
import { getSettings, saveSetting } from "../../../lib/cms";
import { FormField, TextInput, TextArea } from "../components/FormField";
import SaveButton from "../components/SaveButton";

export default function SettingsAdmin() {
  const [contact, setContact] = useState({});
  const [social, setSocial] = useState({});
  const [company, setCompany] = useState({});
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    getSettings().then((data) => {
      setContact(data.contact || {});
      setSocial(data.social || {});
      setCompany(data.company || {});
    });
  }, []);

  async function saveSection(key, value, label) {
    setSaving(key);
    setSaved(null);
    try {
      await saveSetting(key, value);
      setSaved(key);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Paramètres du site</h1>
        <p className="text-gray-500 text-sm mt-0.5">Informations générales, contact et réseaux sociaux</p>
      </div>

      {/* Informations de l'entreprise */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Informations de l'entreprise</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Nom de l'entreprise">
            <TextInput value={company.name} onChange={(v) => setCompany((p) => ({ ...p, name: v }))} placeholder="Lynxa Tech Guinea" />
          </FormField>
          <FormField label="Slogan">
            <TextInput value={company.tagline} onChange={(v) => setCompany((p) => ({ ...p, tagline: v }))} placeholder="Innovation Sans Frontières" />
          </FormField>
        </div>
        <FormField label="Description">
          <TextArea
            value={company.description}
            onChange={(v) => setCompany((p) => ({ ...p, description: v }))}
            rows={3}
            placeholder="Construire l'avenir technologique de la Guinée vers le monde."
          />
        </FormField>
        <div className="flex justify-end">
          <SaveButton loading={saving === "company"} saved={saved === "company"} onClick={() => saveSection("company", company)} />
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Informations de contact</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Téléphone">
            <TextInput value={contact.phone} onChange={(v) => setContact((p) => ({ ...p, phone: v }))} placeholder="+224 621 724 657" />
          </FormField>
          <FormField label="Email">
            <TextInput value={contact.email} onChange={(v) => setContact((p) => ({ ...p, email: v }))} placeholder="contact@lynxatech.com" />
          </FormField>
          <FormField label="Adresse">
            <TextInput value={contact.address} onChange={(v) => setContact((p) => ({ ...p, address: v }))} placeholder="Conakry, République de Guinée" />
          </FormField>
          <FormField label="Horaires d'ouverture">
            <TextInput value={contact.hours} onChange={(v) => setContact((p) => ({ ...p, hours: v }))} placeholder="Lun-Ven 8h-18h, Sam 9h-14h" />
          </FormField>
        </div>
        <div className="flex justify-end">
          <SaveButton loading={saving === "contact"} saved={saved === "contact"} onClick={() => saveSection("contact", contact)} />
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Réseaux sociaux</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="LinkedIn">
            <TextInput value={social.linkedin} onChange={(v) => setSocial((p) => ({ ...p, linkedin: v }))} placeholder="https://linkedin.com/company/lynxatech" />
          </FormField>
          <FormField label="Twitter / X">
            <TextInput value={social.twitter} onChange={(v) => setSocial((p) => ({ ...p, twitter: v }))} placeholder="https://twitter.com/LynxaTechGuinea" />
          </FormField>
          <FormField label="Facebook">
            <TextInput value={social.facebook} onChange={(v) => setSocial((p) => ({ ...p, facebook: v }))} placeholder="https://facebook.com/LynxaTechGuinea" />
          </FormField>
          <FormField label="WhatsApp">
            <TextInput value={social.whatsapp} onChange={(v) => setSocial((p) => ({ ...p, whatsapp: v }))} placeholder="https://wa.me/224621724657" />
          </FormField>
        </div>
        <div className="flex justify-end">
          <SaveButton loading={saving === "social"} saved={saved === "social"} onClick={() => saveSection("social", social)} />
        </div>
      </div>
    </div>
  );
}
