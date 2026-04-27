import React, { useState, useEffect } from "react";
import { getAllHeroSections, saveHeroSection } from "../../../lib/cms";
import { FormField, TextInput, TextArea } from "../components/FormField";
import SaveButton from "../components/SaveButton";

const PAGES = ["home", "about", "services", "portfolio", "partnership", "contact"];

export default function HeroAdmin() {
  const [sections, setSections] = useState({});
  const [activePage, setActivePage] = useState("home");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAllHeroSections().then((data) => {
      const map = {};
      (data || []).forEach((s) => { map[s.page] = s; });
      setSections(map);
    });
  }, []);

  const current = sections[activePage] || { page: activePage };

  function update(field, value) {
    setSections((prev) => ({
      ...prev,
      [activePage]: { ...current, [field]: value },
    }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    try {
      const saved = await saveHeroSection({ ...current, page: activePage });
      setSections((prev) => ({ ...prev, [activePage]: saved }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hero Sections</h1>
          <p className="text-gray-500 text-sm mt-0.5">Titres et sous-titres d'introduction par page</p>
        </div>
        <SaveButton loading={saving} saved={saved} onClick={save} />
      </div>

      {/* Page tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {PAGES.map((p) => (
          <button
            key={p}
            onClick={() => { setActivePage(p); setSaved(false); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize
              ${activePage === p ? "bg-orange-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <FormField label="Titre principal">
          <TextInput value={current.title} onChange={(v) => update("title", v)} placeholder="Innovation Sans Frontières" />
        </FormField>
        <FormField label="Sous-titre">
          <TextInput value={current.subtitle} onChange={(v) => update("subtitle", v)} placeholder="Construire l'Avenir depuis la Guinée" />
        </FormField>
        <FormField label="Description">
          <TextArea value={current.description} onChange={(v) => update("description", v)} rows={3} placeholder="Texte de description affiché sous le titre…" />
        </FormField>
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Bouton principal — texte">
            <TextInput value={current.cta_primary_text} onChange={(v) => update("cta_primary_text", v)} placeholder="Découvrir nos services" />
          </FormField>
          <FormField label="Bouton principal — lien">
            <TextInput value={current.cta_primary_link} onChange={(v) => update("cta_primary_link", v)} placeholder="/service" />
          </FormField>
          <FormField label="Bouton secondaire — texte">
            <TextInput value={current.cta_secondary_text} onChange={(v) => update("cta_secondary_text", v)} placeholder="Notre portfolio" />
          </FormField>
          <FormField label="Bouton secondaire — lien">
            <TextInput value={current.cta_secondary_link} onChange={(v) => update("cta_secondary_link", v)} placeholder="/portfolio" />
          </FormField>
        </div>
        <FormField label="URL de l'image de fond" hint="Laisser vide pour garder l'image existante">
          <TextInput value={current.image_url} onChange={(v) => update("image_url", v)} placeholder="https://… ou /chemin/vers/image.jpg" />
        </FormField>
      </div>
    </div>
  );
}
