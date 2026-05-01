import React, { useState, useEffect } from "react";
import {
  getServiceProcessSteps, saveServiceProcessStep, deleteServiceProcessStep,
  getServiceTechItems, saveServiceTechItem, deleteServiceTechItem,
  getServiceTechCategories,
} from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, GitBranch, Cpu } from "lucide-react";

const ICON_OPTIONS = [
  "Search","Layers","Code","Rocket","Star","Flag","Zap","Globe","ShieldCheck",
  "Award","MapPin","Users","Clock","Handshake","Lock","Heart","CheckCircle",
  "Lightbulb","TrendingUp","BarChart2","Cpu","Wifi","Server","Database","Phone",
  "Mail","MessageSquare","Target","Compass","Briefcase","Building","DollarSign",
  "CreditCard","Smartphone","Shield","Monitor","Package","Cloud","GitBranch",
  "Activity","Apple","Android","Coffee","HardDrive","Palette","Box","Settings",
  "ArrowUpRight","Code2",
];

function IconPicker({ value, onChange }) {
  return (
    <select
      value={value || "Star"}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      {ICON_OPTIONS.map((name) => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
  );
}

// ── Process Steps ─────────────────────────────────────────────────────────────
function ProcessSection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getServiceProcessSteps().then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  function updateDeliverables(id, text) {
    update(id, "deliverables", text.split("\n").filter(Boolean));
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveServiceProcessStep(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveServiceProcessStep({
      sort_order: items.length + 1, active: true,
      title: "Nouvelle étape", description: "Description...",
      icon: "Star", duration: "1–2 semaines", deliverables: [],
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cette étape ?")) return;
    await deleteServiceProcessStep(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <GitBranch size={14} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Processus — Étapes</h2>
            <p className="text-xs text-gray-500">Timeline alternée sur la page Services</p>
          </div>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          <Plus size={14} /> Ajouter
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-4 gap-3 mb-3">
              <FormField label="Icône">
                <IconPicker value={item.icon} onChange={(v) => update(item.id, "icon", v)} />
              </FormField>
              <FormField label="Titre">
                <TextInput value={item.title} onChange={(v) => update(item.id, "title", v)} placeholder="Découverte & Analyse" />
              </FormField>
              <FormField label="Durée">
                <TextInput value={item.duration || ""} onChange={(v) => update(item.id, "duration", v)} placeholder="1–2 semaines" />
              </FormField>
              <FormField label="Ordre">
                <input
                  type="number"
                  value={item.sort_order || 0}
                  onChange={(e) => update(item.id, "sort_order", parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <FormField label="Description">
                <TextArea value={item.description} onChange={(v) => update(item.id, "description", v)} rows={3} placeholder="Description de l'étape..." />
              </FormField>
              <FormField label="Livrables clés (un par ligne)">
                <TextArea
                  value={(Array.isArray(item.deliverables) ? item.deliverables : []).join("\n")}
                  onChange={(v) => updateDeliverables(item.id, v)}
                  rows={3}
                  placeholder={"Document des Exigences\nSpécification Technique\nCalendrier du Projet"}
                />
              </FormField>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} label="Visible" />
              <div className="flex items-center gap-2">
                <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} label="Sauver" />
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1.5">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-xl border border-dashed border-gray-200">
            Aucune étape. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tech Stack ────────────────────────────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { key: "frontend",       title: "Développement Frontend"  },
  { key: "backend",        title: "Développement Backend"   },
  { key: "mobile",         title: "Développement Mobile"    },
  { key: "infrastructure", title: "Infrastructure & DevOps" },
];

function TechStackSection() {
  const [categories, setCategories]   = useState(DEFAULT_CATEGORIES);
  const [activeKey, setActiveKey]     = useState("frontend");
  const [allItems, setAllItems]       = useState([]);
  const [saving, setSaving]           = useState(null);
  const [saved, setSaved]             = useState(null);

  useEffect(() => {
    getServiceTechCategories()
      .then((d) => { if (d?.length) setCategories(d); })
      .catch(() => {});
    getServiceTechItems()
      .then((d) => setAllItems(d || []))
      .catch(() => {});
  }, []);

  const visibleItems = allItems.filter((i) => i.category_key === activeKey);

  function update(id, field, value) {
    setAllItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveServiceTechItem(item);
      setAllItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveServiceTechItem({
      category_key: activeKey,
      sort_order: visibleItems.length + 1, active: true,
      name: "Nouvelle techno", icon: "Star", description: "Description...", link: "",
    });
    setAllItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cette technologie ?")) return;
    await deleteServiceTechItem(id);
    setAllItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center">
            <Cpu size={14} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Stack Technologique</h2>
            <p className="text-xs text-gray-500">Technologies par catégorie avec onglets</p>
          </div>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          <Plus size={14} /> Ajouter
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveKey(cat.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeKey === cat.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visibleItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-4 gap-3 mb-2">
              <FormField label="Icône">
                <IconPicker value={item.icon} onChange={(v) => update(item.id, "icon", v)} />
              </FormField>
              <FormField label="Nom">
                <TextInput value={item.name} onChange={(v) => update(item.id, "name", v)} placeholder="React" />
              </FormField>
              <FormField label="Description">
                <TextInput value={item.description || ""} onChange={(v) => update(item.id, "description", v)} placeholder="Framework progressif" />
              </FormField>
              <FormField label="Ordre">
                <input
                  type="number"
                  value={item.sort_order || 0}
                  onChange={(e) => update(item.id, "sort_order", parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </FormField>
            </div>
            <FormField label="Lien (optionnel)">
              <TextInput value={item.link || ""} onChange={(v) => update(item.id, "link", v)} placeholder="https://react.dev/" />
            </FormField>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} label="Visible" />
              <div className="flex items-center gap-2">
                <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} label="Sauver" />
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1.5">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {visibleItems.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm bg-white rounded-xl border border-dashed border-gray-200">
            Aucune technologie dans cette catégorie. Cliquez sur "Ajouter".
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "process", label: "Processus"       },
  { id: "tech",    label: "Stack Technique" },
];

export default function ServicesContentAdmin() {
  const [tab, setTab] = useState("process");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Contenu Services</h1>
        <p className="text-gray-500 text-sm mt-0.5">Sections dynamiques de la page Services</p>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "process" && <ProcessSection />}
      {tab === "tech"    && <TechStackSection />}
    </div>
  );
}
