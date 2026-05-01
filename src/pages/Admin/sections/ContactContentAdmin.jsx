import React, { useState, useEffect } from "react";
import { getContactFormConfig, saveContactFormConfig, getOfficeDetails, saveOfficeDetails } from "../../../lib/cms";
import { FormField, TextInput, TextArea } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, Phone, FileText, MapPin } from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATIC_FORM_CONFIG = {
  inquiry_types: [
    { value: "new-project",  label: "Développement de nouveau projet" },
    { value: "partnership",  label: "Partenariat commercial" },
    { value: "career",       label: "Opportunités de carrière" },
    { value: "support",      label: "Support technique" },
    { value: "consultation", label: "Consultation gratuite" },
    { value: "other",        label: "Autre" },
  ],
  budget_ranges: [
    { value: "under-5k", label: "Moins de 5 000 $" },
    { value: "5k-15k",   label: "5 000 $ – 15 000 $" },
    { value: "15k-50k",  label: "15 000 $ – 50 000 $" },
    { value: "over-50k", label: "Plus de 50 000 $" },
    { value: "discuss",  label: "Préfère en discuter" },
  ],
  contact_methods: [
    { value: "email",    label: "Email" },
    { value: "phone",    label: "Appel téléphonique" },
    { value: "whatsapp", label: "WhatsApp" },
  ],
};

const STATIC_OFFICE = {
  address: "Quartier Almamya, Rue KA-028\nConakry, Guinée",
  coordinates: "9.5370,-13.6785",
  phone: "+224 622 123 456",
  email: "hello@lynxatech.gn",
  timezone: "GMT+0 (Heure de Guinée)",
  hours: {
    weekdays: "Lundi - Vendredi: 8:00 - 18:00",
    saturday: "Samedi: 9:00 - 14:00",
    sunday: "Dimanche: Fermé",
  },
  facilities: [
    { icon: "Car",           label: "Parking Gratuit Disponible" },
    { icon: "Wifi",          label: "Internet Haut Débit" },
    { icon: "Coffee",        label: "Rafraîchissements Offerts" },
    { icon: "Shield",        label: "Accès Sécurisé au Bâtiment" },
    { icon: "Users",         label: "Salles de Réunion" },
    { icon: "Accessibility", label: "Accès pour Personnes à Mobilité Réduite" },
  ],
  directions: [
    { landmark: "De l'Aéroport de Conakry", instruction: "Prendre la nationale N1 vers le centre-ville...", duration: "25 minutes en voiture" },
    { landmark: "Du Palais du Peuple",      instruction: "Prendre l'Avenue de la République vers le nord...", duration: "10 minutes en voiture" },
    { landmark: "Transport en Commun",      instruction: "Prendre les bus ligne 12 ou 15 jusqu'à l'arrêt Almamya...", duration: "45 minutes au total" },
  ],
};

// ── Option list editor (for inquiry_types, budget_ranges, contact_methods) ───

function OptionListEditor({ title, items, onChange }) {
  function update(idx, field, val) {
    const next = items.map((it, i) => (i === idx ? { ...it, [field]: val } : it));
    onChange(next);
  }
  function add() {
    onChange([...items, { value: "", label: "" }]);
  }
  function remove(idx) {
    onChange(items.filter((_, i) => i !== idx));
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <button
          onClick={add}
          className="inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-700 font-medium"
        >
          <Plus size={12} /> Ajouter
        </button>
      </div>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              value={it.value}
              onChange={(e) => update(idx, "value", e.target.value)}
              placeholder="valeur-interne"
              className="w-1/3 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              value={it.label}
              onChange={(e) => update(idx, "label", e.target.value)}
              placeholder="Libellé affiché"
              className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-600 flex-shrink-0">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-gray-400 py-2 text-center">Aucune option. Cliquez sur Ajouter.</p>
        )}
      </div>
    </div>
  );
}

// ── Tab: Formulaire ───────────────────────────────────────────────────────────

function FormulaireTab() {
  const [config, setConfig] = useState(STATIC_FORM_CONFIG);
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  useEffect(() => {
    getContactFormConfig()
      .then((d) => { if (d) setConfig({ ...STATIC_FORM_CONFIG, ...d }); })
      .catch(() => {});
  }, []);

  function updateList(key, val) {
    setConfig((p) => ({ ...p, [key]: val }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContactFormConfig(config);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Personnalisez les options des listes déroulantes du formulaire de contact.
      </p>
      <OptionListEditor
        title="Types de demande"
        items={config.inquiry_types || []}
        onChange={(v) => updateList("inquiry_types", v)}
      />
      <OptionListEditor
        title="Fourchettes budgétaires"
        items={config.budget_ranges || []}
        onChange={(v) => updateList("budget_ranges", v)}
      />
      <OptionListEditor
        title="Modes de contact préférés"
        items={config.contact_methods || []}
        onChange={(v) => updateList("contact_methods", v)}
      />
      <div className="flex justify-end mt-2">
        <SaveButton loading={saving} saved={saved} onClick={handleSave} label="Sauvegarder le formulaire" />
      </div>
    </div>
  );
}

// ── Tab: Localisation ─────────────────────────────────────────────────────────

function LocalisationTab() {
  const [office, setOffice] = useState(STATIC_OFFICE);
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  useEffect(() => {
    getOfficeDetails()
      .then((d) => { if (d) setOffice(d); })
      .catch(() => {});
  }, []);

  function set(field, val) {
    setOffice((p) => ({ ...p, [field]: val }));
    setSaved(false);
  }

  function setHours(key, val) {
    setOffice((p) => ({ ...p, hours: { ...(p.hours || {}), [key]: val } }));
    setSaved(false);
  }

  function updateFacility(idx, field, val) {
    const next = (office.facilities || []).map((f, i) => (i === idx ? { ...f, [field]: val } : f));
    setOffice((p) => ({ ...p, facilities: next }));
    setSaved(false);
  }

  function addFacility() {
    setOffice((p) => ({ ...p, facilities: [...(p.facilities || []), { icon: "Star", label: "" }] }));
    setSaved(false);
  }

  function removeFacility(idx) {
    setOffice((p) => ({ ...p, facilities: (p.facilities || []).filter((_, i) => i !== idx) }));
    setSaved(false);
  }

  function updateDirection(idx, field, val) {
    const next = (office.directions || []).map((d, i) => (i === idx ? { ...d, [field]: val } : d));
    setOffice((p) => ({ ...p, directions: next }));
    setSaved(false);
  }

  function addDirection() {
    setOffice((p) => ({ ...p, directions: [...(p.directions || []), { landmark: "", instruction: "", duration: "" }] }));
    setSaved(false);
  }

  function removeDirection(idx) {
    setOffice((p) => ({ ...p, directions: (p.directions || []).filter((_, i) => i !== idx) }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveOfficeDetails(office);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  const hours = office.hours || {};

  return (
    <div className="space-y-5">
      {/* Coordonnées */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-sm font-semibold text-gray-800 mb-3">Coordonnées</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormField label="Adresse">
            <TextArea value={office.address || ""} onChange={(v) => set("address", v)} rows={2} placeholder="Rue, Quartier\nVille, Pays" />
          </FormField>
          <FormField label="Coordonnées GPS (lat,lng)">
            <TextInput value={office.coordinates || ""} onChange={(v) => set("coordinates", v)} placeholder="9.5370,-13.6785" />
          </FormField>
          <FormField label="Téléphone">
            <TextInput value={office.phone || ""} onChange={(v) => set("phone", v)} placeholder="+224 622 123 456" />
          </FormField>
          <FormField label="Email">
            <TextInput value={office.email || ""} onChange={(v) => set("email", v)} placeholder="hello@lynxatech.gn" />
          </FormField>
          <FormField label="Fuseau horaire">
            <TextInput value={office.timezone || ""} onChange={(v) => set("timezone", v)} placeholder="GMT+0 (Heure de Guinée)" />
          </FormField>
        </div>
      </div>

      {/* Horaires */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-sm font-semibold text-gray-800 mb-3">Horaires d'ouverture</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <FormField label="Lun – Ven">
            <TextInput value={hours.weekdays || ""} onChange={(v) => setHours("weekdays", v)} placeholder="Lundi - Vendredi: 8:00 - 18:00" />
          </FormField>
          <FormField label="Samedi">
            <TextInput value={hours.saturday || ""} onChange={(v) => setHours("saturday", v)} placeholder="Samedi: 9:00 - 14:00" />
          </FormField>
          <FormField label="Dimanche">
            <TextInput value={hours.sunday || ""} onChange={(v) => setHours("sunday", v)} placeholder="Dimanche: Fermé" />
          </FormField>
        </div>
      </div>

      {/* Équipements */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-800">Équipements du bureau</p>
          <button
            onClick={addFacility}
            className="inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-700 font-medium"
          >
            <Plus size={12} /> Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {(office.facilities || []).map((f, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                value={f.icon || ""}
                onChange={(e) => updateFacility(idx, "icon", e.target.value)}
                placeholder="Icône (ex: Wifi)"
                className="w-28 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                value={f.label || ""}
                onChange={(e) => updateFacility(idx, "label", e.target.value)}
                placeholder="Description de l'équipement"
                className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button onClick={() => removeFacility(idx)} className="text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Itinéraires */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-800">Comment nous trouver</p>
          <button
            onClick={addDirection}
            className="inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-700 font-medium"
          >
            <Plus size={12} /> Ajouter
          </button>
        </div>
        <div className="space-y-3">
          {(office.directions || []).map((d, idx) => (
            <div key={idx} className="border border-gray-100 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <input
                  value={d.landmark || ""}
                  onChange={(e) => updateDirection(idx, "landmark", e.target.value)}
                  placeholder="Point de départ"
                  className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  value={d.duration || ""}
                  onChange={(e) => updateDirection(idx, "duration", e.target.value)}
                  placeholder="Durée"
                  className="w-36 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button onClick={() => removeDirection(idx)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
              <textarea
                value={d.instruction || ""}
                onChange={(e) => updateDirection(idx, "instruction", e.target.value)}
                placeholder="Instructions détaillées..."
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton loading={saving} saved={saved} onClick={handleSave} label="Sauvegarder la localisation" />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "formulaire",   label: "Formulaire",  icon: FileText },
  { id: "localisation", label: "Localisation", icon: MapPin   },
];

export default function ContactContentAdmin() {
  const [tab, setTab] = useState("formulaire");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Page Contact</h1>
        <p className="text-gray-500 text-sm mt-0.5">Gérez le formulaire et les informations de localisation</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {tab === "formulaire"   && <FormulaireTab />}
      {tab === "localisation" && <LocalisationTab />}
    </div>
  );
}
