import React, { useState, useEffect } from "react";
import {
  getPortfolioInnovations, savePortfolioInnovation, deletePortfolioInnovation,
  getPortfolioFilterOptions, savePortfolioFilterOptions,
} from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, FlaskConical, Filter } from "lucide-react";
import { DEFAULT_SERVICE_CATEGORIES, normalizeCategories } from "../../../lib/portfolioCategories";

const ICON_OPTIONS = [
  "Cpu","Lock","Leaf","Rocket","Star","Zap","Globe","Shield","Award","Lightbulb",
  "TrendingUp","BarChart2","Layers","Code","Wifi","Server","Database","Phone",
  "MessageSquare","Target","Compass","Briefcase","Building","Smartphone","Heart",
  "FlaskConical","Microscope","Bot","Satellite","Fingerprint","Network",
];

const STATUS_PRESETS = [
  { label: "En Développement",  value: "En Développement",  color: "text-amber-600 bg-amber-50"    },
  { label: "Phase de Recherche", value: "Phase de Recherche", color: "text-blue-600 bg-blue-50"      },
  { label: "Test Pilote",        value: "Test Pilote",        color: "text-emerald-600 bg-emerald-50" },
  { label: "Terminé",            value: "Terminé",            color: "text-gray-600 bg-gray-100"     },
  { label: "En Pause",           value: "En Pause",           color: "text-red-600 bg-red-50"        },
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

// ── Innovation Lab Section ────────────────────────────────────────────────────
function InnovationLabSection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getPortfolioInnovations(false).then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  function applyStatusPreset(id, preset) {
    setItems((prev) => prev.map((m) =>
      m.id === id ? { ...m, status: preset.value, status_color: preset.color } : m
    ));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await savePortfolioInnovation(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await savePortfolioInnovation({
      sort_order: items.length + 1, active: true,
      icon: "Rocket", title: "Nouveau projet R&D",
      description: "Description de l'initiative...",
      status: "Phase de Recherche", status_color: "text-blue-600 bg-blue-50",
      impact: "Impact attendu...",
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce projet R&D ?")) return;
    await deletePortfolioInnovation(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <FlaskConical size={14} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Initiatives R&D</h2>
            <p className="text-xs text-gray-500">3 projets affichés en grille sur la page Portfolio</p>
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
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <FormField label="Icône">
                <IconPicker value={item.icon} onChange={(v) => update(item.id, "icon", v)} />
              </FormField>
              <FormField label="Titre">
                <TextInput value={item.title} onChange={(v) => update(item.id, "title", v)} placeholder="Optimisation Réseau par IA" />
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
              <TextArea value={item.description} onChange={(v) => update(item.id, "description", v)} rows={2} placeholder="Description du projet R&D..." />
            </FormField>

            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <FormField label="Impact (résultat attendu)">
                <TextInput value={item.impact || ""} onChange={(v) => update(item.id, "impact", v)} placeholder="Réduction de 40% des interruptions réseau" />
              </FormField>
              <FormField label="Statut">
                <div className="flex gap-2 flex-wrap">
                  {STATUS_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => applyStatusPreset(item.id, p)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        item.status === p.value
                          ? "border-orange-400 ring-1 ring-orange-400"
                          : "border-gray-200 hover:border-gray-400"
                      } ${p.color}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
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
            Aucun projet R&D. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Filter Options Section ────────────────────────────────────────────────────
// Catégories de service : la clé est stable (stockée dans chaque projet et
// comparée par le code), le libellé est ce que voit le visiteur. Une clé
// existante n'est pas modifiable ; pour une nouvelle catégorie, laissée
// vide, elle est déduite du libellé.
const slugify = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function CategoryListEditor({ items, onChange }) {
  function update(index, field, value) {
    onChange(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-xs text-gray-500">
        <span>Libellé affiché</span><span>Clé (stable, invisible)</span><span />
      </div>
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <input
            type="text"
            value={item.label}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder="Ex : Cybersécurité"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            value={item.key}
            onChange={(e) => update(i, "key", e.target.value)}
            disabled={!item.isNew}
            placeholder={item.isNew ? slugify(item.label || "") || "cybersecurity" : ""}
            title={item.isNew ? "Laisser vide pour la déduire du libellé" : "La clé d'une catégorie existante ne se modifie pas"}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 p-2" aria-label={`Supprimer ${item.label || "cette catégorie"}`}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, { key: "", label: "", isNew: true }])}
        className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium"
      >
        <Plus size={14} /> Ajouter une catégorie
      </button>
    </div>
  );
}

function FilterOptionsSection() {
  const [services, setServices]     = useState(DEFAULT_SERVICE_CATEGORIES);
  const [error, setError]           = useState("");
  // Filtre par secteur retiré du site (trop peu de projets) : la liste
  // existante est conservée telle quelle à l'enregistrement, pour le jour où
  // il reviendra avec le modèle clé + libellé.
  const [industries, setIndustries] = useState([]);
  const [saving, setSaving]         = useState(false);
  const [saved, setSaved]           = useState(false);

  useEffect(() => {
    getPortfolioFilterOptions()
      .then((opts) => {
        if (opts?.services?.length)   setServices(normalizeCategories(opts.services));
        if (opts?.industries?.length) setIndustries(opts.industries);
      })
      .catch(() => {});
  }, []);

  async function save() {
    const cleaned = services
      .map((c) => ({ key: (c.key || slugify(c.label || "")).trim(), label: (c.label || "").trim() }))
      .filter((c) => c.key || c.label);
    const invalid = cleaned.find((c) => !c.label || !/^[a-z0-9-]+$/.test(c.key));
    const keys = cleaned.map((c) => c.key);
    if (invalid) { setError("Chaque catégorie doit avoir un libellé et une clé en minuscules, chiffres et tirets."); return; }
    if (new Set(keys).size !== keys.length) { setError("Deux catégories ont la même clé."); return; }
    setError("");
    setSaving(true);
    try {
      await savePortfolioFilterOptions({ services: cleaned, industries });
      setServices(cleaned);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center">
          <Filter size={14} color="white" />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">Filtres Portfolio</h2>
          <p className="text-xs text-gray-500">Options de filtrage affichées au-dessus des projets</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-6">
        <FormField label="Catégories de service" hint="Le libellé s'affiche sur le site et se modifie librement ; la clé relie les projets à leur catégorie et ne change pas.">
          <CategoryListEditor items={services} onChange={setServices} />
        </FormField>


        <div className="pt-2 border-t border-gray-100">
          {error && <p className="text-xs text-red-600 mr-auto" role="alert">{error}</p>}
          <SaveButton loading={saving} saved={saved} onClick={save} label="Sauvegarder les filtres" />
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "lab",     label: "Laboratoire d'innovation" },
  { id: "filters", label: "Filtres"        },
];

export default function PortfolioContentAdmin() {
  const [tab, setTab] = useState("lab");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Contenu Portfolio</h1>
        <p className="text-gray-500 text-sm mt-0.5">Sections dynamiques de la page Portfolio</p>
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

      {tab === "lab"     && <InnovationLabSection />}
      {tab === "filters" && <FilterOptionsSection />}
    </div>
  );
}
