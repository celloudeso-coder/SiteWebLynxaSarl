import React, { useState, useEffect } from "react";
import { getPartnershipPathways, savePartnershipPathway, deletePartnershipPathway } from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const ICONS = ["Rocket", "Building2", "Globe", "Network", "Handshake", "Star", "Zap", "Users", "Award", "Briefcase"];

const empty = {
  sort_order: 0, active: true, title: "", description: "",
  icon: "Handshake", features: [], ideal_for: "", timeline: "", budget: "", color: "primary",
};

function featuresFromValue(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val.split("\n").filter(Boolean); }
  }
  return [];
}

export default function PartnershipAdmin() {
  const [items, setItems]     = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving]   = useState(null);
  const [saved, setSaved]     = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getPartnershipPathways(false);
    setItems(data || []);
  }

  function update(id, field, value) {
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const payload = {
        ...item,
        features: Array.isArray(item.features) ? item.features : featuresFromValue(item.features),
      };
      const updated = await savePartnershipPathway(payload);
      setItems((prev) => prev.map((p) => p.id === item.id ? updated : p));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await savePartnershipPathway({ ...empty, sort_order: items.length + 1 });
    setItems((prev) => [...prev, created]);
    setExpanded(created.id);
  }

  async function remove(id) {
    if (!confirm("Supprimer cette voie de partenariat ?")) return;
    await deletePartnershipPathway(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Voies de partenariat</h1>
          <p className="text-gray-500 text-sm mt-0.5">Cartes affichées sur la page Partenariat</p>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const features = featuresFromValue(item.features);
          return (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* En-tête */}
              <div className="flex items-center gap-3 px-5 py-4">
                <button
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="flex-1 flex items-center gap-3 text-left"
                >
                  {expanded === item.id
                    ? <ChevronUp size={16} className="text-gray-400" />
                    : <ChevronDown size={16} className="text-gray-400" />
                  }
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.title || "Nouvelle voie"}</p>
                    <p className="text-xs text-gray-500">{item.timeline || "—"} · {item.budget || "—"}</p>
                  </div>
                </button>
                <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} />
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 ml-2">
                  <Trash2 size={16} />
                </button>
              </div>

              {expanded === item.id && (
                <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                  {/* Titre + icône + couleur */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <FormField label="Titre">
                      <TextInput value={item.title} onChange={(v) => update(item.id, "title", v)} placeholder="Partenariat Startup & PME" />
                    </FormField>
                    <FormField label="Icône">
                      <select
                        value={item.icon}
                        onChange={(e) => update(item.id, "icon", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Couleur">
                      <select
                        value={item.color}
                        onChange={(e) => update(item.id, "color", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="primary">Orange (primary)</option>
                        <option value="accent">Accent</option>
                      </select>
                    </FormField>
                  </div>

                  {/* Description */}
                  <FormField label="Description">
                    <TextArea value={item.description} onChange={(v) => update(item.id, "description", v)} rows={2} placeholder="Description de cette voie de partenariat…" />
                  </FormField>

                  {/* Fonctionnalités */}
                  <FormField label="Fonctionnalités incluses" hint="Une par ligne">
                    <textarea
                      rows={4}
                      value={features.join("\n")}
                      onChange={(e) => update(item.id, "features", e.target.value.split("\n"))}
                      placeholder={"Développement MVP\nPlans de paiement flexibles\n…"}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    />
                  </FormField>

                  {/* Méta */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <FormField label="Idéal pour">
                      <TextInput value={item.ideal_for} onChange={(v) => update(item.id, "ideal_for", v)} placeholder="Startups, PME, Entrepreneurs" />
                    </FormField>
                    <FormField label="Délai estimé">
                      <TextInput value={item.timeline} onChange={(v) => update(item.id, "timeline", v)} placeholder="2-8 semaines" />
                    </FormField>
                    <FormField label="Budget">
                      <TextInput value={item.budget} onChange={(v) => update(item.id, "budget", v)} placeholder="700 $ – 3 000 $" />
                    </FormField>
                  </div>

                  <FormField label="Ordre d'affichage">
                    <input
                      type="number" min={0}
                      value={item.sort_order || 0}
                      onChange={(e) => update(item.id, "sort_order", parseInt(e.target.value) || 0)}
                      className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </FormField>

                  <div className="flex justify-end pt-2">
                    <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucune voie de partenariat.</div>
        )}
      </div>
    </div>
  );
}
