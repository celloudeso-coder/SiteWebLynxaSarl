import React, { useState, useEffect } from "react";
import {
  getBlogPosts,       saveBlogPost,       deleteBlogPost,
  getWhitepapers,     saveWhitepaper,     deleteWhitepaper,
  getTechTalks,       saveTechTalk,       deleteTechTalk,
  getIndustryReports, saveIndustryReport, deleteIndustryReport,
  getInsightsCategories, saveInsightsCategories,
} from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, BookOpen, FileText, Video, BarChart2, Grid } from "lucide-react";

const CATEGORY_OPTIONS = ["cybersecurity","mobile","network","ecosystem"];

// ── Shared helpers ────────────────────────────────────────────────────────────
function TagsInput({ value, onChange }) {
  return (
    <TextArea
      value={(value || []).join("\n")}
      onChange={(v) => onChange(v.split("\n").map((s) => s.trim()).filter(Boolean))}
      rows={3}
      placeholder="Un tag par ligne..."
    />
  );
}

function LineListInput({ value, onChange, placeholder }) {
  return (
    <TextArea
      value={(value || []).join("\n")}
      onChange={(v) => onChange(v.split("\n").map((s) => s.trim()).filter(Boolean))}
      rows={4}
      placeholder={placeholder || "Une valeur par ligne..."}
    />
  );
}

function CategorySelect({ value, onChange }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      <option value="">— Catégorie —</option>
      {CATEGORY_OPTIONS.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}

function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
    >
      <Plus size={14} /> Ajouter
    </button>
  );
}

function EmptyState({ message }) {
  return (
    <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-xl border border-dashed border-gray-200">
      {message}
    </div>
  );
}

// ── Blog Posts ─────────────────────────────────────────────────────────────────
function BlogSection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getBlogPosts(false).then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveBlogPost(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally { setSaving(null); }
  }

  async function addNew() {
    const created = await saveBlogPost({
      sort_order: items.length + 1, active: true,
      title: "Nouvel article", excerpt: "Extrait...",
      category: "ecosystem", author: "Auteur", date: new Date().toISOString().slice(0, 10),
      read_time: "5 min de lecture", image: "", tags: [],
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cet article ?")) return;
    await deleteBlogPost(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center"><BookOpen size={14} color="white" /></div>
          <h2 className="text-base font-bold text-gray-900">Articles de Blog</h2>
        </div>
        <AddButton onClick={addNew} />
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <FormField label="Titre">
                <TextInput value={item.title || ""} onChange={(v) => update(item.id, "title", v)} placeholder="Titre de l'article" />
              </FormField>
              <FormField label="Catégorie">
                <CategorySelect value={item.category} onChange={(v) => update(item.id, "category", v)} />
              </FormField>
            </div>
            <FormField label="Extrait">
              <TextArea value={item.excerpt || ""} onChange={(v) => update(item.id, "excerpt", v)} rows={2} placeholder="Extrait de l'article..." />
            </FormField>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              <FormField label="Auteur">
                <TextInput value={item.author || ""} onChange={(v) => update(item.id, "author", v)} placeholder="Dr. Aminata Kone" />
              </FormField>
              <FormField label="Date (YYYY-MM-DD)">
                <TextInput value={item.date || ""} onChange={(v) => update(item.id, "date", v)} placeholder="2025-01-10" />
              </FormField>
              <FormField label="Temps de lecture">
                <TextInput value={item.read_time || ""} onChange={(v) => update(item.id, "read_time", v)} placeholder="8 min de lecture" />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <FormField label="URL Image">
                <TextInput value={item.image || ""} onChange={(v) => update(item.id, "image", v)} placeholder="https://..." />
              </FormField>
              <FormField label="Ordre">
                <input type="number" value={item.sort_order || 0} onChange={(e) => update(item.id, "sort_order", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Tags (un par ligne)">
                <TagsInput value={item.tags} onChange={(v) => update(item.id, "tags", v)} />
              </FormField>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} label="Visible" />
              <div className="flex items-center gap-2">
                <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} label="Sauver" />
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1.5"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <EmptyState message='Aucun article. Cliquez sur "Ajouter" pour commencer.' />}
      </div>
    </div>
  );
}

// ── Whitepapers ────────────────────────────────────────────────────────────────
function WhitepapersSection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getWhitepapers(false).then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveWhitepaper(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally { setSaving(null); }
  }

  async function addNew() {
    const created = await saveWhitepaper({
      sort_order: items.length + 1, active: true,
      title: "Nouveau whitepaper", description: "Description...",
      category: "ecosystem", pages: 40, download_count: 0,
      publish_date: new Date().toISOString().slice(0, 10), image: "", tags: [],
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce whitepaper ?")) return;
    await deleteWhitepaper(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center"><FileText size={14} color="white" /></div>
          <h2 className="text-base font-bold text-gray-900">Livres Blancs</h2>
        </div>
        <AddButton onClick={addNew} />
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <FormField label="Titre">
                <TextInput value={item.title || ""} onChange={(v) => update(item.id, "title", v)} placeholder="Titre du whitepaper" />
              </FormField>
              <FormField label="Catégorie">
                <CategorySelect value={item.category} onChange={(v) => update(item.id, "category", v)} />
              </FormField>
            </div>
            <FormField label="Description">
              <TextArea value={item.description || ""} onChange={(v) => update(item.id, "description", v)} rows={2} />
            </FormField>
            <div className="grid sm:grid-cols-4 gap-3 mt-3">
              <FormField label="Pages">
                <input type="number" value={item.pages || 0} onChange={(e) => update(item.id, "pages", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
              <FormField label="Téléchargements">
                <input type="number" value={item.download_count || 0} onChange={(e) => update(item.id, "download_count", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
              <FormField label="Date publi.">
                <TextInput value={item.publish_date || ""} onChange={(v) => update(item.id, "publish_date", v)} placeholder="2025-01-01" />
              </FormField>
              <FormField label="Ordre">
                <input type="number" value={item.sort_order || 0} onChange={(e) => update(item.id, "sort_order", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="URL Image">
                <TextInput value={item.image || ""} onChange={(v) => update(item.id, "image", v)} placeholder="https://..." />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Tags (un par ligne)">
                <TagsInput value={item.tags} onChange={(v) => update(item.id, "tags", v)} />
              </FormField>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} label="Visible" />
              <div className="flex items-center gap-2">
                <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} label="Sauver" />
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1.5"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <EmptyState message='Aucun whitepaper. Cliquez sur "Ajouter" pour commencer.' />}
      </div>
    </div>
  );
}

// ── Tech Talks ─────────────────────────────────────────────────────────────────
function TechTalksSection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getTechTalks(false).then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveTechTalk(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally { setSaving(null); }
  }

  async function addNew() {
    const created = await saveTechTalk({
      sort_order: items.length + 1, active: true,
      title: "Nouveau tech talk", speaker: "Intervenant",
      event: "Conférence", duration: "30:00", views: 0,
      category: "ecosystem", publish_date: new Date().toISOString().slice(0, 10),
      thumbnail: "", video_id: "", description: "", tags: [],
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce tech talk ?")) return;
    await deleteTechTalk(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center"><Video size={14} color="white" /></div>
          <h2 className="text-base font-bold text-gray-900">Tech Talks</h2>
        </div>
        <AddButton onClick={addNew} />
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <FormField label="Titre">
                <TextInput value={item.title || ""} onChange={(v) => update(item.id, "title", v)} placeholder="Titre du talk" />
              </FormField>
              <FormField label="Catégorie">
                <CategorySelect value={item.category} onChange={(v) => update(item.id, "category", v)} />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <FormField label="Intervenant">
                <TextInput value={item.speaker || ""} onChange={(v) => update(item.id, "speaker", v)} placeholder="Dr. Aminata Kone, CTO" />
              </FormField>
              <FormField label="Événement">
                <TextInput value={item.event || ""} onChange={(v) => update(item.id, "event", v)} placeholder="Africa Tech Summit 2024" />
              </FormField>
            </div>
            <FormField label="Description" className="mt-3">
              <TextArea value={item.description || ""} onChange={(v) => update(item.id, "description", v)} rows={2} />
            </FormField>
            <div className="grid sm:grid-cols-4 gap-3 mt-3">
              <FormField label="Durée (mm:ss)">
                <TextInput value={item.duration || ""} onChange={(v) => update(item.id, "duration", v)} placeholder="28:45" />
              </FormField>
              <FormField label="Vues">
                <input type="number" value={item.views || 0} onChange={(e) => update(item.id, "views", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
              <FormField label="Date publi.">
                <TextInput value={item.publish_date || ""} onChange={(v) => update(item.id, "publish_date", v)} placeholder="2024-12-10" />
              </FormField>
              <FormField label="Ordre">
                <input type="number" value={item.sort_order || 0} onChange={(e) => update(item.id, "sort_order", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <FormField label="URL Miniature">
                <TextInput value={item.thumbnail || ""} onChange={(v) => update(item.id, "thumbnail", v)} placeholder="https://..." />
              </FormField>
              <FormField label="ID Vidéo (YouTube)">
                <TextInput value={item.video_id || ""} onChange={(v) => update(item.id, "video_id", v)} placeholder="dQw4w9WgXcQ" />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Tags (un par ligne)">
                <TagsInput value={item.tags} onChange={(v) => update(item.id, "tags", v)} />
              </FormField>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} label="Visible" />
              <div className="flex items-center gap-2">
                <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} label="Sauver" />
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1.5"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <EmptyState message='Aucun tech talk. Cliquez sur "Ajouter" pour commencer.' />}
      </div>
    </div>
  );
}

// ── Industry Reports ───────────────────────────────────────────────────────────
function ReportsSection() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getIndustryReports(false).then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveIndustryReport(item);
      setItems((prev) => prev.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally { setSaving(null); }
  }

  async function addNew() {
    const created = await saveIndustryReport({
      sort_order: items.length + 1, active: true,
      title: "Nouveau rapport", subtitle: "Sous-titre...",
      category: "ecosystem", publish_date: new Date().toISOString().slice(0, 10),
      pages: 80, downloads: 0, image: "",
      key_insights: [], executive_summary: "", sections: [], tags: [],
    });
    setItems((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce rapport ?")) return;
    await deleteIndustryReport(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center"><BarChart2 size={14} color="white" /></div>
          <h2 className="text-base font-bold text-gray-900">Rapports Industrie</h2>
        </div>
        <AddButton onClick={addNew} />
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <FormField label="Titre">
                <TextInput value={item.title || ""} onChange={(v) => update(item.id, "title", v)} placeholder="Titre du rapport" />
              </FormField>
              <FormField label="Catégorie">
                <CategorySelect value={item.category} onChange={(v) => update(item.id, "category", v)} />
              </FormField>
            </div>
            <FormField label="Sous-titre">
              <TextInput value={item.subtitle || ""} onChange={(v) => update(item.id, "subtitle", v)} placeholder="Sous-titre descriptif" />
            </FormField>
            <FormField label="Résumé Exécutif" className="mt-3">
              <TextArea value={item.executive_summary || ""} onChange={(v) => update(item.id, "executive_summary", v)} rows={3} />
            </FormField>
            <div className="grid sm:grid-cols-4 gap-3 mt-3">
              <FormField label="Pages">
                <input type="number" value={item.pages || 0} onChange={(e) => update(item.id, "pages", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
              <FormField label="Téléchargements">
                <input type="number" value={item.downloads || 0} onChange={(e) => update(item.id, "downloads", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
              <FormField label="Date publi.">
                <TextInput value={item.publish_date || ""} onChange={(v) => update(item.id, "publish_date", v)} placeholder="2024-12-01" />
              </FormField>
              <FormField label="Ordre">
                <input type="number" value={item.sort_order || 0} onChange={(e) => update(item.id, "sort_order", parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="URL Image">
                <TextInput value={item.image || ""} onChange={(v) => update(item.id, "image", v)} placeholder="https://..." />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <FormField label="Points Clés (un par ligne)">
                <LineListInput value={item.key_insights} onChange={(v) => update(item.id, "key_insights", v)} placeholder="Croissance de 45%..." />
              </FormField>
              <FormField label="Sections du rapport (une par ligne)">
                <LineListInput value={item.sections} onChange={(v) => update(item.id, "sections", v)} placeholder="Vue d'ensemble du marché..." />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Tags (un par ligne)">
                <TagsInput value={item.tags} onChange={(v) => update(item.id, "tags", v)} />
              </FormField>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} label="Visible" />
              <div className="flex items-center gap-2">
                <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} label="Sauver" />
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1.5"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <EmptyState message='Aucun rapport. Cliquez sur "Ajouter" pour commencer.' />}
      </div>
    </div>
  );
}

// ── Categories ─────────────────────────────────────────────────────────────────
const ICON_OPTIONS = [
  "Grid","Shield","Smartphone","Network","Globe","Star","Zap","Layers","Code",
  "Server","Database","Wifi","Cpu","Lock","BarChart2","TrendingUp","Users","Rocket",
];

const STATIC_CATEGORIES = [
  { id: "all",          label: "All Content",            icon: "Grid"       },
  { id: "cybersecurity",label: "Cybersecurity",          icon: "Shield"     },
  { id: "mobile",       label: "Mobile Innovation",      icon: "Smartphone" },
  { id: "network",      label: "Network Solutions",      icon: "Network"    },
  { id: "ecosystem",    label: "African Tech Ecosystem", icon: "Globe"      },
];

function CategoriesSection() {
  const [cats, setCats]     = useState(STATIC_CATEGORIES);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  useEffect(() => {
    getInsightsCategories()
      .then((d) => { if (d?.length) setCats(d); })
      .catch(() => {});
  }, []);

  function updateCat(i, field, value) {
    setCats((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
    setSaved(false);
  }

  function addCat() {
    setCats((prev) => [...prev, { id: "", label: "", icon: "Star" }]);
    setSaved(false);
  }

  function removeCat(i) {
    setCats((prev) => prev.filter((_, idx) => idx !== i));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    try {
      await saveInsightsCategories(cats);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally { setSaving(false); }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center"><Grid size={14} color="white" /></div>
        <h2 className="text-base font-bold text-gray-900">Catégories de Filtrage</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        {cats.map((cat, i) => (
          <div key={i} className="grid sm:grid-cols-3 gap-3 items-end">
            <FormField label="ID (slug)">
              <TextInput value={cat.id} onChange={(v) => updateCat(i, "id", v)} placeholder="cybersecurity" />
            </FormField>
            <FormField label="Label affiché">
              <TextInput value={cat.label} onChange={(v) => updateCat(i, "label", v)} placeholder="Cybersecurity" />
            </FormField>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <FormField label="Icône">
                  <select
                    value={cat.icon || "Star"}
                    onChange={(e) => updateCat(i, "icon", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {ICON_OPTIONS.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </FormField>
              </div>
              <button onClick={() => removeCat(i)} className="text-red-400 hover:text-red-600 p-2 mb-0.5">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addCat}
          className="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium"
        >
          <Plus size={14} /> Ajouter une catégorie
        </button>

        <div className="pt-3 border-t border-gray-100">
          <SaveButton loading={saving} saved={saved} onClick={save} label="Sauvegarder les catégories" />
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "blog",        label: "Articles"      },
  { id: "whitepapers", label: "Livres Blancs" },
  { id: "techtalks",   label: "Tech Talks"    },
  { id: "reports",     label: "Rapports"      },
  { id: "categories",  label: "Catégories"    },
];

export default function InsightsAdmin() {
  const [tab, setTab] = useState("blog");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Insights & Knowledge</h1>
        <p className="text-gray-500 text-sm mt-0.5">Contenu de la page Insights — articles, rapports, vidéos et catégories</p>
      </div>

      <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
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

      {tab === "blog"        && <BlogSection />}
      {tab === "whitepapers" && <WhitepapersSection />}
      {tab === "techtalks"   && <TechTalksSection />}
      {tab === "reports"     && <ReportsSection />}
      {tab === "categories"  && <CategoriesSection />}
    </div>
  );
}
