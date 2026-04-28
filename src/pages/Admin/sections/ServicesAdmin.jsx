import React, { useState, useEffect } from "react";
import { getServices, saveService, deleteService } from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle, JsonArrayEditor } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const ICON_OPTIONS = [
  "Smartphone", "Wifi", "Globe", "Shield", "Cloud", "Code", "Database",
  "Server", "Monitor", "Cpu", "Network", "Lock", "Layers", "Zap", "Settings",
];

// ── Metrics editor : { label, value } pairs ──────────────────────────────────
function MetricsEditor({ value = [], onChange }) {
  const items = Array.isArray(value) ? value : [];

  function add()              { onChange([...items, { label: "", value: "" }]); }
  function remove(i)          { onChange(items.filter((_, idx) => idx !== i)); }
  function update(i, f, v)    {
    const next = [...items];
    next[i] = { ...next[i], [f]: v };
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item.label || ""}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder="Libellé (ex: Taux de succès)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            value={item.value || ""}
            onChange={(e) => update(i, "value", e.target.value)}
            placeholder="Valeur (ex: 98%)"
            className="w-28 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 px-2 text-sm">✕</button>
        </div>
      ))}
      <button type="button" onClick={add} className="text-orange-500 hover:text-orange-700 text-sm font-medium">
        + Ajouter une métrique
      </button>
    </div>
  );
}

// ── Projects editor : { name, description, industry } objects ────────────────
function ProjectsEditor({ value = [], onChange }) {
  const items = Array.isArray(value) ? value : [];

  function add()           { onChange([...items, { name: "", description: "", industry: "" }]); }
  function remove(i)       { onChange(items.filter((_, idx) => idx !== i)); }
  function update(i, f, v) {
    const next = [...items];
    next[i] = { ...next[i], [f]: v };
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-gray-500">Projet {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs">Supprimer</button>
          </div>
          <input
            type="text"
            value={item.name || ""}
            onChange={(e) => update(i, "name", e.target.value)}
            placeholder="Nom du projet"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            value={item.description || ""}
            onChange={(e) => update(i, "description", e.target.value)}
            placeholder="Description courte"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
          <input
            type="text"
            value={item.industry || ""}
            onChange={(e) => update(i, "industry", e.target.value)}
            placeholder="Secteur (ex: Fintech, Santé…)"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      ))}
      <button type="button" onClick={add} className="text-orange-500 hover:text-orange-700 text-sm font-medium">
        + Ajouter un projet référence
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const emptyService = {
  sort_order: 0, active: true, slug: "", title: "", subtitle: "", icon: "",
  description: "", highlights: [], technologies: [], metrics: [], projects: [], project_count: 0,
};

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving]     = useState(null);
  const [saved, setSaved]       = useState(null);

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
            {/* Header row */}
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                onClick={() => setExpanded(expanded === service.id ? null : service.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                {expanded === service.id
                  ? <ChevronUp size={16} className="text-gray-400" />
                  : <ChevronDown size={16} className="text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{service.title || "Nouveau service"}</p>
                  <p className="text-xs text-gray-500">{service.subtitle} · {service.slug}</p>
                </div>
              </button>
              <Toggle checked={service.active} onChange={(v) => update(service.id, "active", v)} />
              <button onClick={() => remove(service.id)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 size={16} />
              </button>
            </div>

            {/* Expanded form */}
            {expanded === service.id && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                {/* Identity */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Titre">
                    <TextInput value={service.title} onChange={(v) => update(service.id, "title", v)} />
                  </FormField>
                  <FormField label="Slug (unique, sans espaces)">
                    <TextInput value={service.slug} onChange={(v) => update(service.id, "slug", v)} placeholder="mobile-development" />
                  </FormField>
                  <FormField label="Sous-titre">
                    <TextInput value={service.subtitle} onChange={(v) => update(service.id, "subtitle", v)} placeholder="Native & Cross-Platform" />
                  </FormField>
                  <FormField label="Icône Lucide">
                    <select
                      value={service.icon || ""}
                      onChange={(e) => update(service.id, "icon", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">— Choisir —</option>
                      {ICON_OPTIONS.map((ic) => <option key={ic}>{ic}</option>)}
                    </select>
                  </FormField>
                </div>

                <FormField label="Description">
                  <TextArea value={service.description} onChange={(v) => update(service.id, "description", v)} rows={3} />
                </FormField>

                <FormField label="Points forts" hint="Un point par ligne.">
                  <JsonArrayEditor value={service.highlights} onChange={(v) => update(service.id, "highlights", v)} placeholder="Ajouter un point fort" />
                </FormField>

                <FormField label="Technologies">
                  <JsonArrayEditor value={service.technologies} onChange={(v) => update(service.id, "technologies", v)} placeholder="Ajouter une technologie" />
                </FormField>

                <FormField label="Métriques de performance" hint="Paires libellé / valeur.">
                  <MetricsEditor value={service.metrics} onChange={(v) => update(service.id, "metrics", v)} />
                </FormField>

                <FormField label="Projets références">
                  <ProjectsEditor value={service.projects} onChange={(v) => update(service.id, "projects", v)} />
                </FormField>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <FormField label="Nombre de projets réalisés">
                    <input
                      type="number"
                      value={service.project_count || 0}
                      onChange={(e) => update(service.id, "project_count", parseInt(e.target.value) || 0)}
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
