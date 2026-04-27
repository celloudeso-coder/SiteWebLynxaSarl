import React, { useState, useEffect } from "react";
import { getTimelineEvents, saveTimelineEvent, deleteTimelineEvent } from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle, JsonArrayEditor } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const emptyEvent = {
  sort_order: 0, active: true, year: "", title: "", description: "", achievements: [],
};

export default function TimelineAdmin() {
  const [events, setEvents] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getTimelineEvents(false);
    setEvents(data || []);
  }

  function update(id, field, value) {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, [field]: value } : e));
    setSaved(null);
  }

  async function save(event) {
    setSaving(event.id);
    try {
      const updated = await saveTimelineEvent(event);
      setEvents((prev) => prev.map((e) => e.id === event.id ? updated : e));
      setSaved(event.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveTimelineEvent({ ...emptyEvent, sort_order: events.length + 1 });
    setEvents((prev) => [...prev, created]);
    setExpanded(created.id);
  }

  async function remove(id) {
    if (!confirm("Supprimer cet événement ?")) return;
    await deleteTimelineEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Timeline</h1>
          <p className="text-gray-500 text-sm mt-0.5">Historique et jalons de l'entreprise</p>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                onClick={() => setExpanded(expanded === event.id ? null : event.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                {expanded === event.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                <span className="text-orange-500 font-bold text-sm w-12">{event.year}</span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{event.title || "Nouvel événement"}</p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">{event.description}</p>
                </div>
              </button>
              <Toggle checked={event.active} onChange={(v) => update(event.id, "active", v)} />
              <button onClick={() => remove(event.id)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 size={16} />
              </button>
            </div>

            {expanded === event.id && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Année">
                    <TextInput value={event.year} onChange={(v) => update(event.id, "year", v)} placeholder="2025" />
                  </FormField>
                  <FormField label="Titre">
                    <TextInput value={event.title} onChange={(v) => update(event.id, "title", v)} placeholder="Fondation & Premiers Pas" />
                  </FormField>
                </div>
                <FormField label="Description">
                  <TextArea value={event.description} onChange={(v) => update(event.id, "description", v)} rows={3} />
                </FormField>
                <FormField label="Réalisations">
                  <JsonArrayEditor
                    value={event.achievements}
                    onChange={(v) => update(event.id, "achievements", v)}
                    placeholder="Ajouter une réalisation"
                  />
                </FormField>
                <div className="flex justify-end pt-2">
                  <SaveButton loading={saving === event.id} saved={saved === event.id} onClick={() => save(event)} />
                </div>
              </div>
            )}
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucun événement.</div>
        )}
      </div>
    </div>
  );
}
