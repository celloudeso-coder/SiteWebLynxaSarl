import React, { useState, useEffect } from "react";
import { getMetrics, saveMetric, deleteMetric } from "../../../lib/cms";
import { FormField, TextInput, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2 } from "lucide-react";

const emptyMetric = {
  sort_order: 0, active: true, label: "", value: 0, suffix: "+", description: "", page: "home",
};

export default function MetricsAdmin() {
  const [metrics, setMetrics] = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getMetrics("home");
    setMetrics(data || []);
  }

  function update(id, field, value) {
    setMetrics((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(metric) {
    setSaving(metric.id);
    try {
      const updated = await saveMetric(metric);
      setMetrics((prev) => prev.map((m) => m.id === metric.id ? updated : m));
      setSaved(metric.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveMetric({ ...emptyMetric, sort_order: metrics.length + 1 });
    setMetrics((prev) => [...prev, created]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cette métrique ?")) return;
    await deleteMetric(id);
    setMetrics((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Métriques</h1>
          <p className="text-gray-500 text-sm mt-0.5">Compteurs et statistiques affichés sur le site</p>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="grid sm:grid-cols-4 gap-4 items-end">
              <FormField label="Libellé">
                <TextInput value={metric.label} onChange={(v) => update(metric.id, "label", v)} placeholder="Applications Mobiles" />
              </FormField>
              <FormField label="Valeur">
                <input
                  type="number"
                  value={metric.value || 0}
                  onChange={(e) => update(metric.id, "value", parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </FormField>
              <FormField label="Suffixe">
                <TextInput value={metric.suffix} onChange={(v) => update(metric.id, "suffix", v)} placeholder="+" />
              </FormField>
              <div className="flex items-center gap-3">
                <Toggle checked={metric.active} onChange={(v) => update(metric.id, "active", v)} />
                <SaveButton loading={saving === metric.id} saved={saved === metric.id} onClick={() => save(metric)} label="Sauver" />
                <button onClick={() => remove(metric.id)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="mt-3">
              <FormField label="Description courte">
                <TextInput value={metric.description} onChange={(v) => update(metric.id, "description", v)} placeholder="Projets livrés avec succès" />
              </FormField>
            </div>
          </div>
        ))}
        {metrics.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucune métrique.</div>
        )}
      </div>
    </div>
  );
}
