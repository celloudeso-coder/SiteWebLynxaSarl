import React, { useState, useEffect } from "react";
import {
  getHomeEngagements, saveHomeEngagement, deleteHomeEngagement,
  getHomeWhyItems, saveHomeWhyItem, deleteHomeWhyItem,
} from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, Flag, Sparkles } from "lucide-react";

// Common lucide icon names available in the site
const ICON_OPTIONS = [
  "Flag","Zap","Globe","ShieldCheck","Star","Award","MapPin","Users","Clock",
  "Handshake","Lock","Rocket","Heart","Check","CheckCircle","Lightbulb",
  "TrendingUp","BarChart2","Layers","Code","Cpu","Wifi","Server","Database",
  "Phone","Mail","MessageSquare","Smile","Target","Compass",
];

function IconPicker({ value, onChange }) {
  return (
    <div className="space-y-1.5">
      <select
        value={value || "Star"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {ICON_OPTIONS.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <p className="text-xs text-gray-400">Nom d'icône Lucide (ex: "ShieldCheck")</p>
    </div>
  );
}

// ── Engagements section ───────────────────────────────────────────────────────
function EngagementsSection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getHomeEngagements();
    setItems(data || []);
  }

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveHomeEngagement(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveHomeEngagement({
      sort_order: items.length + 1, active: true,
      icon: "Star", label: "Nouvel engagement", sub_label: "Sous-titre",
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cet engagement ?")) return;
    await deleteHomeEngagement(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center">
            <Flag size={14} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Bande Engagements</h2>
            <p className="text-xs text-gray-500">4 engagements affichés sous le hero en fond sombre</p>
          </div>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          <Plus size={14} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-4 gap-3 items-end">
              <FormField label="Icône">
                <IconPicker value={item.icon} onChange={(v) => update(item.id, "icon", v)} />
              </FormField>
              <FormField label="Label principal">
                <TextInput value={item.label} onChange={(v) => update(item.id, "label", v)} placeholder="100 % Guinéen" />
              </FormField>
              <FormField label="Sous-label">
                <TextInput value={item.sub_label} onChange={(v) => update(item.id, "sub_label", v)} placeholder="Ancré localement" />
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
            Aucun engagement. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Why Items section ─────────────────────────────────────────────────────────
function WhySection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getHomeWhyItems();
    setItems(data || []);
  }

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveHomeWhyItem(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveHomeWhyItem({
      sort_order: items.length + 1, active: true,
      icon: "Star", title: "Nouvel avantage", description: "Description de l'avantage...",
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cet avantage ?")) return;
    await deleteHomeWhyItem(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles size={14} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Pourquoi Lynxa Tech ?</h2>
            <p className="text-xs text-gray-500">6 avantages affichés en grille sur fond gris</p>
          </div>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          <Plus size={14} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <FormField label="Icône">
                <IconPicker value={item.icon} onChange={(v) => update(item.id, "icon", v)} />
              </FormField>
              <FormField label="Titre">
                <TextInput value={item.title} onChange={(v) => update(item.id, "title", v)} placeholder="Expertise locale" />
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
            <FormField label="Description">
              <TextArea
                value={item.description}
                onChange={(v) => update(item.id, "description", v)}
                placeholder="Décrivez cet avantage..."
                rows={2}
              />
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
        {items.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-xl border border-dashed border-gray-200">
            Aucun avantage. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const TABS = [
  { id: "engagements", label: "Bande Engagements" },
  { id: "why",         label: "Pourquoi Lynxa ?" },
];

export default function HomeContentAdmin() {
  const [tab, setTab] = useState("engagements");

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Contenu Accueil</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Sections dynamiques de la page d'accueil
        </p>
      </div>

      {/* Tabs */}
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

      {tab === "engagements" && <EngagementsSection />}
      {tab === "why"         && <WhySection />}
    </div>
  );
}
