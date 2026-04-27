import React, { useState, useEffect } from "react";
import { getServices, saveService, deleteService } from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle, JsonArrayEditor } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const emptyService = {
  sort_order: 0, active: true, slug: "", title: "", subtitle: "", icon: "",
  description: "", highlights: [], technologies: [], metrics: [], projects: [], project_count: 0,
};

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getServices(false);
    setServices(data || []);
  }

  function update(id, field, value) {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
    setSaved(null);
  }

  async function save(service) {
    setSaving(service.id);
    try {
      const updated = await saveService(service);
      setServices((prev) => prev.map((s) => s.id === service.id ? updated : s));
      setSaved(service.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveService({ ...emptyService, sort_order: services.length + 1 });
    setServices((prev) => [...prev, created]);
    setExpanded(created.id);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce service ?")) return;
    await deleteService(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gérez vos offres de services</p>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                onClick={() => setExpanded(expanded === service.id ? null : service.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                {expanded === service.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{service.title || "Nouveau service"}</p>
                  <p className="text-xs text-gray-500">{service.subtitle}</p>
                </div>
              </button>
              <Toggle checked={service.active} onChange={(v) => update(service.id, "active", v)} />
              <button onClick={() => remove(service.id)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 size={16} />
              </button>
            </div>

            {/* Form */}
            {expanded === service.id && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Titre">
                    <TextInput value={service.title} onChange={(v) => update(service.id, "title", v)} />
                  </FormField>
                  <FormField label="Slug (unique)">
                    <TextInput value={service.slug} onChange={(v) => update(service.id, "slug", v)} placeholder="mobile-development" />
                  </FormField>
                  <FormField label="Sous-titre">
                    <TextInput value={service.subtitle} onChange={(v) => update(service.id, "subtitle", v)} />
                  </FormField>
                  <FormField label="Icône (Lucide)">
                    <TextInput value={service.icon} onChange={(v) => update(service.id, "icon", v)} placeholder="Smartphone" />
                  </FormField>
                </div>
                <FormField label="Description">
                  <TextArea value={service.description} onChange={(v) => update(service.id, "description", v)} rows={3} />
                </FormField>
                <FormField label="Points forts">
                  <JsonArrayEditor value={service.highlights} onChange={(v) => update(service.id, "highlights", v)} placeholder="Ajouter un point fort" />
                </FormField>
                <FormField label="Technologies">
                  <JsonArrayEditor value={service.technologies} onChange={(v) => update(service.id, "technologies", v)} placeholder="Ajouter une technologie" />
                </FormField>
                <div className="flex justify-between items-center pt-2">
                  <FormField label="Nombre de projets">
                    <input
                      type="number"
                      value={service.project_count || 0}
                      onChange={(e) => update(service.id, "project_count", parseInt(e.target.value))}
                      className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </FormField>
                  <SaveButton loading={saving === service.id} saved={saved === service.id} onClick={() => save(service)} />
                </div>
              </div>
            )}
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            Aucun service. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}
