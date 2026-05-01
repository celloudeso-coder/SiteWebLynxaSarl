import React, { useState, useEffect } from "react";
import {
  getJoinUsProcessSteps, saveJoinUsProcessStep, deleteJoinUsProcessStep,
} from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, Users } from "lucide-react";

const ICON_OPTIONS = [
  "FileText","MessageSquare","Code","PartyPopper","Mail","Phone","User","Briefcase",
  "CheckCircle","Clock","Star","Rocket","ArrowRight","Send","Search","Edit","Award",
  "Zap","Target","Globe","Heart","BookOpen","Calendar","Play","Laptop","Video",
  "Handshake","UserCheck","Smile","ThumbsUp","Flag","Coffee",
];

const COLOR_OPTIONS = [
  { label: "Orange (Primary)",   value: "bg-primary"   },
  { label: "Sombre (Accent)",    value: "bg-accent"    },
  { label: "Secondaire",         value: "bg-secondary" },
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

function ColorPicker({ value, onChange }) {
  return (
    <select
      value={value || "bg-primary"}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      {COLOR_OPTIONS.map((c) => (
        <option key={c.value} value={c.value}>{c.label}</option>
      ))}
    </select>
  );
}

export default function JoinUsContentAdmin() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getJoinUsProcessSteps().then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveJoinUsProcessStep(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveJoinUsProcessStep({
      sort_order: items.length + 1, active: true,
      icon: "FileText", color: "bg-primary",
      title: "Nouvelle étape",
      desc: "Description de l'étape...",
      detail: "Délai...",
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cette étape ?")) return;
    await deleteJoinUsProcessStep(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Processus de Recrutement</h1>
        <p className="text-gray-500 text-sm mt-0.5">Étapes du processus affichées sur la page Rejoindre</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Users size={14} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Étapes du Recrutement</h2>
            <p className="text-xs text-gray-500">Affichées en grille de 4 colonnes</p>
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
              <FormField label="Couleur">
                <ColorPicker value={item.color} onChange={(v) => update(item.id, "color", v)} />
              </FormField>
              <FormField label="Titre">
                <TextInput value={item.title || ""} onChange={(v) => update(item.id, "title", v)} placeholder="Postulez" />
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
              <TextArea value={item.desc || ""} onChange={(v) => update(item.id, "desc", v)} rows={2} placeholder="Description de l'étape..." />
            </FormField>

            <div className="mt-3">
              <FormField label="Détail / Délai (ex: ~5 minutes, Sous 48h)">
                <TextInput value={item.detail || ""} onChange={(v) => update(item.id, "detail", v)} placeholder="~5 minutes" />
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
