import React, { useState, useEffect } from "react";
import {
  getAboutCoreValues, saveAboutCoreValue, deleteAboutCoreValue,
  getAboutAdvantages, saveAboutAdvantage, deleteAboutAdvantage,
  getAboutVisionPillars, saveAboutVisionPillar, deleteAboutVisionPillar,
  getAboutRoadmapPhases, saveAboutRoadmapPhase, deleteAboutRoadmapPhase,
  getAboutFounder, saveAboutFounder,
  getAboutEcosystemStats, saveAboutEcosystemStats,
  getAboutImpactMetrics, saveAboutImpactMetrics,
} from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, User, Heart, MapPin, Rocket } from "lucide-react";

const ICON_OPTIONS = [
  "Flag","Zap","Globe","ShieldCheck","Star","Award","MapPin","Users","Clock",
  "Handshake","Lock","Rocket","Heart","CheckCircle","Lightbulb","TrendingUp",
  "BarChart2","Layers","Code","Cpu","Wifi","Server","Database","Phone","Mail",
  "MessageSquare","Target","Compass","Briefcase","Building","DollarSign",
  "CreditCard","Smartphone","Shield","User","Trophy","Plane","Languages",
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

// ── Fondateur ─────────────────────────────────────────────────────────────────
const STATIC_FOUNDER = {
  name: "Mamadou Cellou Kante",
  title: "Fondateur & CEO",
  image: "/Cellou.png",
  linkedinUrl: "https://www.linkedin.com/in/mamadou-cellou-kante",
  quote: "« Je m'appelle Mamadou Cellou Kante... »",
  story: ["", "", ""],
  tags: ["Administrateur Réseaux & Systèmes", "Certifié Cybersécurité", "Entrepreneur Tech"],
};

function FounderSection() {
  const [data, setData]       = useState(null);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    getAboutFounder()
      .then((d) => setData(d || STATIC_FOUNDER))
      .catch(() => setData(STATIC_FOUNDER));
  }, []);

  function update(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function updateStory(i, value) {
    setData((prev) => {
      const story = [...(prev.story || [])];
      story[i] = value;
      return { ...prev, story };
    });
    setSaved(false);
  }

  function addParagraph() {
    setData((prev) => ({ ...prev, story: [...(prev.story || []), ""] }));
  }

  function removeParagraph(i) {
    setData((prev) => ({ ...prev, story: prev.story.filter((_, idx) => idx !== i) }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    try {
      await saveAboutFounder(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  if (!data) return <div className="text-gray-400 text-sm py-8 text-center">Chargement...</div>;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Informations de base</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Nom">
            <TextInput value={data.name || ""} onChange={(v) => update("name", v)} placeholder="Mamadou Cellou Kante" />
          </FormField>
          <FormField label="Titre / Poste">
            <TextInput value={data.title || ""} onChange={(v) => update("title", v)} placeholder="Fondateur & CEO" />
          </FormField>
          <FormField label="Chemin image (ex: /Cellou.png)">
            <TextInput value={data.image || ""} onChange={(v) => update("image", v)} placeholder="/Cellou.png" />
          </FormField>
          <FormField label="URL LinkedIn">
            <TextInput value={data.linkedinUrl || ""} onChange={(v) => update("linkedinUrl", v)} placeholder="https://linkedin.com/in/..." />
          </FormField>
        </div>
        <div className="mt-4">
          <FormField label="Citation">
            <TextArea value={data.quote || ""} onChange={(v) => update("quote", v)} rows={3} placeholder="« Citation... »" />
          </FormField>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Paragraphes de l'histoire</h3>
          <button
            onClick={addParagraph}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium"
          >
            <Plus size={12} /> Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {(data.story || []).map((para, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1">
                <TextArea value={para} onChange={(v) => updateStory(i, v)} rows={2} placeholder={`Paragraphe ${i + 1}...`} />
              </div>
              <button onClick={() => removeParagraph(i)} className="text-red-400 hover:text-red-600 p-1.5 mt-1 flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <FormField label="Tags (un par ligne)">
          <TextArea
            value={(data.tags || []).join("\n")}
            onChange={(v) => update("tags", v.split("\n").filter(Boolean))}
            rows={3}
            placeholder={"Administrateur Réseaux & Systèmes\nCertifié Cybersécurité\nEntrepreneur Tech"}
          />
        </FormField>
      </div>

      <div className="flex justify-end">
        <SaveButton loading={saving} saved={saved} onClick={save} label="Sauvegarder le fondateur" />
      </div>
    </div>
  );
}

// ── Valeurs ───────────────────────────────────────────────────────────────────
function ValuesSection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getAboutCoreValues().then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveAboutCoreValue(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveAboutCoreValue({
      sort_order: items.length + 1, active: true,
      icon: "Star", title: "Nouvelle valeur", description: "Description...",
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cette valeur ?")) return;
    await deleteAboutCoreValue(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Heart size={14} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Valeurs fondamentales</h2>
            <p className="text-xs text-gray-500">Grille de 6 valeurs sur la page À propos</p>
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
                <TextInput value={item.title} onChange={(v) => update(item.id, "title", v)} placeholder="Innovation" />
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
              <TextArea value={item.description} onChange={(v) => update(item.id, "description", v)} rows={2} placeholder="Description de la valeur..." />
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
            Aucune valeur. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Pourquoi Guinée ? ─────────────────────────────────────────────────────────
function WhyGuineaSection() {
  const [advantages, setAdvantages]         = useState([]);
  const [savingAdv, setSavingAdv]           = useState(null);
  const [savedAdv, setSavedAdv]             = useState(null);
  const [ecoStats, setEcoStats]             = useState([]);
  const [savingEco, setSavingEco]           = useState(false);
  const [savedEco, setSavedEco]             = useState(false);

  useEffect(() => {
    getAboutAdvantages().then((d) => setAdvantages(d || [])).catch(() => {});
    getAboutEcosystemStats().then((d) => setEcoStats(d || [])).catch(() => {});
  }, []);

  function updateAdv(id, field, value) {
    setAdvantages((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSavedAdv(null);
  }

  async function saveAdv(item) {
    setSavingAdv(item.id);
    try {
      const updated = await saveAboutAdvantage(item);
      setAdvantages((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSavedAdv(item.id);
      setTimeout(() => setSavedAdv(null), 2500);
    } finally {
      setSavingAdv(null);
    }
  }

  async function addAdv() {
    const created = await saveAboutAdvantage({
      sort_order: advantages.length + 1, active: true,
      icon: "MapPin", title: "Nouvel avantage", stats: "Statistique", description: "Description...",
    });
    setAdvantages((prev) => [...prev, created]);
  }

  async function removeAdv(id) {
    if (!confirm("Supprimer cet avantage ?")) return;
    await deleteAboutAdvantage(id);
    setAdvantages((prev) => prev.filter((m) => m.id !== id));
  }

  function updateEcoStat(i, field, value) {
    setEcoStats((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
    setSavedEco(false);
  }

  async function saveEco() {
    setSavingEco(true);
    try {
      await saveAboutEcosystemStats(ecoStats);
      setSavedEco(true);
      setTimeout(() => setSavedEco(false), 2500);
    } finally {
      setSavingEco(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Advantages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center">
              <MapPin size={14} color="white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Avantages de la Guinée</h2>
              <p className="text-xs text-gray-500">6 avantages en grille sur la page À propos</p>
            </div>
          </div>
          <button
            onClick={addAdv}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>
        <div className="space-y-3">
          {advantages.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="grid sm:grid-cols-4 gap-3 mb-3">
                <FormField label="Icône">
                  <IconPicker value={item.icon} onChange={(v) => updateAdv(item.id, "icon", v)} />
                </FormField>
                <FormField label="Titre">
                  <TextInput value={item.title} onChange={(v) => updateAdv(item.id, "title", v)} placeholder="Emplacement Stratégique" />
                </FormField>
                <FormField label="Statistique">
                  <TextInput value={item.stats || ""} onChange={(v) => updateAdv(item.id, "stats", v)} placeholder="400M+ personnes" />
                </FormField>
                <FormField label="Ordre">
                  <input
                    type="number"
                    value={item.sort_order || 0}
                    onChange={(e) => updateAdv(item.id, "sort_order", parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </FormField>
              </div>
              <FormField label="Description">
                <TextArea value={item.description} onChange={(v) => updateAdv(item.id, "description", v)} rows={2} placeholder="Description de l'avantage..." />
              </FormField>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <Toggle checked={item.active} onChange={(v) => updateAdv(item.id, "active", v)} label="Visible" />
                <div className="flex items-center gap-2">
                  <SaveButton loading={savingAdv === item.id} saved={savedAdv === item.id} onClick={() => saveAdv(item)} label="Sauver" />
                  <button onClick={() => removeAdv(item.id)} className="text-red-400 hover:text-red-600 p-1.5">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Statistiques écosystème</h2>
            <p className="text-xs text-gray-500">4 indicateurs affichés en grille</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          {ecoStats.map((stat, i) => (
            <div key={i} className="grid sm:grid-cols-4 gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <FormField label="Icône">
                <IconPicker value={stat.icon} onChange={(v) => updateEcoStat(i, "icon", v)} />
              </FormField>
              <FormField label="Valeur">
                <TextInput value={stat.value || ""} onChange={(v) => updateEcoStat(i, "value", v)} placeholder="150+" />
              </FormField>
              <FormField label="Label">
                <TextInput value={stat.label || ""} onChange={(v) => updateEcoStat(i, "label", v)} placeholder="Startups Technologiques" />
              </FormField>
              <FormField label="Croissance">
                <TextInput value={stat.growth || ""} onChange={(v) => updateEcoStat(i, "growth", v)} placeholder="2025" />
              </FormField>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-3">
          <SaveButton loading={savingEco} saved={savedEco} onClick={saveEco} label="Sauvegarder les stats" />
        </div>
      </div>
    </div>
  );
}

// ── Vision & Roadmap ──────────────────────────────────────────────────────────
function VisionSection() {
  const [phases, setPhases]           = useState([]);
  const [savingP, setSavingP]         = useState(null);
  const [savedP, setSavedP]           = useState(null);
  const [pillars, setPillars]         = useState([]);
  const [savingPi, setSavingPi]       = useState(null);
  const [savedPi, setSavedPi]         = useState(null);
  const [metrics, setMetrics]         = useState([]);
  const [savingM, setSavingM]         = useState(false);
  const [savedM, setSavedM]           = useState(false);

  useEffect(() => {
    getAboutRoadmapPhases().then((d) => setPhases(d || [])).catch(() => {});
    getAboutVisionPillars().then((d) => setPillars(d || [])).catch(() => {});
    getAboutImpactMetrics().then((d) => setMetrics(d || [])).catch(() => {});
  }, []);

  // --- Phases ---
  function updatePhase(id, field, value) {
    setPhases((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSavedP(null);
  }

  function updatePhaseGoals(id, text) {
    const goals = text.split("\n").filter(Boolean);
    updatePhase(id, "goals", goals);
  }

  function updatePhaseMarkets(id, text) {
    const markets = text.split("\n").filter(Boolean);
    updatePhase(id, "markets", markets);
  }

  async function savePhase(item) {
    setSavingP(item.id);
    try {
      const updated = await saveAboutRoadmapPhase(item);
      setPhases((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSavedP(item.id);
      setTimeout(() => setSavedP(null), 2500);
    } finally {
      setSavingP(null);
    }
  }

  async function addPhase() {
    const created = await saveAboutRoadmapPhase({
      sort_order: phases.length + 1, active: true,
      phase: `Phase ${phases.length + 1}`, timeline: "2025 – 2026",
      title: "Nouvelle phase", status: "Planifiée",
      description: "Description...", goals: [], markets: [],
      icon: "MapPin", color: "bg-primary", status_color: "bg-gray-100 text-gray-500",
    });
    setPhases((prev) => [...prev, created]);
  }

  async function removePhase(id) {
    if (!confirm("Supprimer cette phase ?")) return;
    await deleteAboutRoadmapPhase(id);
    setPhases((prev) => prev.filter((m) => m.id !== id));
  }

  // --- Pillars ---
  function updatePillar(id, field, value) {
    setPillars((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSavedPi(null);
  }

  async function savePillar(item) {
    setSavingPi(item.id);
    try {
      const updated = await saveAboutVisionPillar(item);
      setPillars((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSavedPi(item.id);
      setTimeout(() => setSavedPi(null), 2500);
    } finally {
      setSavingPi(null);
    }
  }

  async function addPillar() {
    const created = await saveAboutVisionPillar({
      sort_order: pillars.length + 1, active: true,
      icon: "Rocket", title: "Nouveau pilier", description: "Description...",
    });
    setPillars((prev) => [...prev, created]);
  }

  async function removePillar(id) {
    if (!confirm("Supprimer ce pilier ?")) return;
    await deleteAboutVisionPillar(id);
    setPillars((prev) => prev.filter((m) => m.id !== id));
  }

  // --- Impact metrics ---
  function updateMetric(i, field, value) {
    setMetrics((prev) => prev.map((m, idx) => idx === i ? { ...m, [field]: value } : m));
    setSavedM(false);
  }

  async function saveMetricsData() {
    setSavingM(true);
    try {
      await saveAboutImpactMetrics(metrics);
      setSavedM(true);
      setTimeout(() => setSavedM(false), 2500);
    } finally {
      setSavingM(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Roadmap phases */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Rocket size={14} color="white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Phases de la Roadmap</h2>
              <p className="text-xs text-gray-500">3 phases de développement stratégique</p>
            </div>
          </div>
          <button
            onClick={addPhase}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>
        <div className="space-y-4">
          {phases.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                <FormField label="Phase (ex: Phase 1)">
                  <TextInput value={item.phase || ""} onChange={(v) => updatePhase(item.id, "phase", v)} placeholder="Phase 1" />
                </FormField>
                <FormField label="Timeline">
                  <TextInput value={item.timeline || ""} onChange={(v) => updatePhase(item.id, "timeline", v)} placeholder="2025 – 2027" />
                </FormField>
                <FormField label="Titre">
                  <TextInput value={item.title || ""} onChange={(v) => updatePhase(item.id, "title", v)} placeholder="Expansion en Afrique" />
                </FormField>
              </div>
              <div className="grid sm:grid-cols-4 gap-3 mb-3">
                <FormField label="Statut">
                  <TextInput value={item.status || ""} onChange={(v) => updatePhase(item.id, "status", v)} placeholder="En cours" />
                </FormField>
                <FormField label="Classe CSS statut">
                  <TextInput value={item.status_color || ""} onChange={(v) => updatePhase(item.id, "status_color", v)} placeholder="bg-primary/10 text-primary" />
                </FormField>
                <FormField label="Icône">
                  <IconPicker value={item.icon} onChange={(v) => updatePhase(item.id, "icon", v)} />
                </FormField>
                <FormField label="Couleur bg (CSS)">
                  <TextInput value={item.color || ""} onChange={(v) => updatePhase(item.id, "color", v)} placeholder="bg-primary" />
                </FormField>
              </div>
              <FormField label="Description">
                <TextArea value={item.description || ""} onChange={(v) => updatePhase(item.id, "description", v)} rows={2} placeholder="Description de la phase..." />
              </FormField>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <FormField label="Objectifs (un par ligne)">
                  <TextArea
                    value={(Array.isArray(item.goals) ? item.goals : []).join("\n")}
                    onChange={(v) => updatePhaseGoals(item.id, v)}
                    rows={4}
                    placeholder={"Ouvrir des bureaux au Sénégal\nS'associer à 10+ entreprises"}
                  />
                </FormField>
                <FormField label="Marchés cibles (un par ligne)">
                  <TextArea
                    value={(Array.isArray(item.markets) ? item.markets : []).join("\n")}
                    onChange={(v) => updatePhaseMarkets(item.id, v)}
                    rows={4}
                    placeholder={"Sénégal\nCôte d'Ivoire\nMali"}
                  />
                </FormField>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <Toggle checked={item.active} onChange={(v) => updatePhase(item.id, "active", v)} label="Visible" />
                <div className="flex items-center gap-2">
                  <SaveButton loading={savingP === item.id} saved={savedP === item.id} onClick={() => savePhase(item)} label="Sauver" />
                  <button onClick={() => removePhase(item.id)} className="text-red-400 hover:text-red-600 p-1.5">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vision pillars */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Piliers de la Vision</h2>
            <p className="text-xs text-gray-500">4 piliers affichés en grille</p>
          </div>
          <button
            onClick={addPillar}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>
        <div className="space-y-3">
          {pillars.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                <FormField label="Icône">
                  <IconPicker value={item.icon} onChange={(v) => updatePillar(item.id, "icon", v)} />
                </FormField>
                <FormField label="Titre">
                  <TextInput value={item.title} onChange={(v) => updatePillar(item.id, "title", v)} placeholder="Leadership en Innovation" />
                </FormField>
                <FormField label="Ordre">
                  <input
                    type="number"
                    value={item.sort_order || 0}
                    onChange={(e) => updatePillar(item.id, "sort_order", parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </FormField>
              </div>
              <FormField label="Description">
                <TextArea value={item.description} onChange={(v) => updatePillar(item.id, "description", v)} rows={2} placeholder="Description du pilier..." />
              </FormField>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <Toggle checked={item.active} onChange={(v) => updatePillar(item.id, "active", v)} label="Visible" />
                <div className="flex items-center gap-2">
                  <SaveButton loading={savingPi === item.id} saved={savedPi === item.id} onClick={() => savePillar(item)} label="Sauver" />
                  <button onClick={() => removePillar(item.id)} className="text-red-400 hover:text-red-600 p-1.5">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Trajectoire de croissance</h2>
            <p className="text-xs text-gray-500">4 métriques actuelles / objectif 2027</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          {metrics.map((m, i) => (
            <div key={i} className="grid sm:grid-cols-4 gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <FormField label="Icône">
                <IconPicker value={m.icon} onChange={(v) => updateMetric(i, "icon", v)} />
              </FormField>
              <FormField label="Valeur actuelle">
                <TextInput value={m.current || ""} onChange={(v) => updateMetric(i, "current", v)} placeholder="7+" />
              </FormField>
              <FormField label="Objectif 2027">
                <TextInput value={m.target || ""} onChange={(v) => updateMetric(i, "target", v)} placeholder="25+" />
              </FormField>
              <FormField label="Label">
                <TextInput value={m.label || ""} onChange={(v) => updateMetric(i, "label", v)} placeholder="Membres de l'équipe" />
              </FormField>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-3">
          <SaveButton loading={savingM} saved={savedM} onClick={saveMetricsData} label="Sauvegarder les métriques" />
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "founder",    label: "Fondateur"        },
  { id: "values",     label: "Valeurs"           },
  { id: "guinea",     label: "Pourquoi Guinée ?" },
  { id: "vision",     label: "Vision & Roadmap"  },
];

export default function AboutContentAdmin() {
  const [tab, setTab] = useState("founder");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Contenu À propos</h1>
        <p className="text-gray-500 text-sm mt-0.5">Sections dynamiques de la page À propos</p>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 flex-wrap">
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

      {tab === "founder" && <FounderSection />}
      {tab === "values"  && <ValuesSection />}
      {tab === "guinea"  && <WhyGuineaSection />}
      {tab === "vision"  && <VisionSection />}
    </div>
  );
}
