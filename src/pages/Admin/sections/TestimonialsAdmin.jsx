import React, { useState, useEffect } from "react";
import { getTestimonials, saveTestimonial, deleteTestimonial } from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const emptyTestimonial = {
  sort_order: 0, active: true, quote: "", author_name: "",
  author_position: "", author_company: "", author_image: "", rating: 5, project_ref: "",
};

export default function TestimonialsAdmin() {
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getTestimonials(false);
    setItems(data || []);
  }

  function update(id, field, value) {
    setItems((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const updated = await saveTestimonial(item);
      setItems((prev) => prev.map((t) => t.id === item.id ? updated : t));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveTestimonial({ ...emptyTestimonial, sort_order: items.length + 1 });
    setItems((prev) => [...prev, created]);
    setExpanded(created.id);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce témoignage ?")) return;
    await deleteTestimonial(id);
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Témoignages</h1>
          <p className="text-gray-500 text-sm mt-0.5">Citations et avis de clients</p>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                {expanded === item.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.author_name || "Nouveau témoignage"}</p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">"{item.quote?.slice(0, 60)}…"</p>
                </div>
              </button>
              <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} />
              <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 size={16} />
              </button>
            </div>

            {expanded === item.id && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                <FormField label="Citation">
                  <TextArea value={item.quote} onChange={(v) => update(item.id, "quote", v)} rows={3} placeholder="Ce projet a transformé notre organisation…" />
                </FormField>
                <div className="grid sm:grid-cols-3 gap-4">
                  <FormField label="Nom">
                    <TextInput value={item.author_name} onChange={(v) => update(item.id, "author_name", v)} />
                  </FormField>
                  <FormField label="Poste">
                    <TextInput value={item.author_position} onChange={(v) => update(item.id, "author_position", v)} />
                  </FormField>
                  <FormField label="Entreprise">
                    <TextInput value={item.author_company} onChange={(v) => update(item.id, "author_company", v)} />
                  </FormField>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Photo (URL)">
                    <TextInput value={item.author_image} onChange={(v) => update(item.id, "author_image", v)} />
                  </FormField>
                  <FormField label="Note (1-5)">
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={item.rating || 5}
                      onChange={(e) => update(item.id, "rating", parseInt(e.target.value))}
                      className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </FormField>
                </div>
                <div className="flex justify-end pt-2">
                  <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} />
                </div>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucun témoignage.</div>
        )}
      </div>
    </div>
  );
}
