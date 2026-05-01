import React, { useState, useEffect } from "react";
import {
  getPartnershipProcessSteps, savePartnershipProcessStep, deletePartnershipProcessStep,
  getTrustSecurityItems, saveTrustSecurityItem, deleteTrustSecurityItem,
  getTrustCommitmentItems, saveTrustCommitmentItem, deleteTrustCommitmentItem,
} from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, Workflow, ShieldCheck } from "lucide-react";

// ── Icon options ──────────────────────────────────────────────────────────────

const ICON_OPTIONS = [
  "Search","FileText","Handshake","Code","CheckCircle","Rocket","Star","Zap",
  "Shield","Users","Clock","Settings","Globe","Database","Lock","Key",
  "Eye","UserCheck","Award","BarChart2","MessageSquare","Phone","Mail",
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

// ── Tab: Processus ────────────────────────────────────────────────────────────

function ProcessusTab() {
  const [items, setItems]   = useState([]);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved]   = useState(null);

  useEffect(() => {
    getPartnershipProcessSteps().then((d) => setItems(d || [])).catch(() => {});
  }, []);

  function update(id, field, value) {
    setItems((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const payload = {
        ...item,
        deliverables: Array.isArray(item.deliverables)
          ? item.deliverables
          : (item.deliverables || "").split("\n").map((s) => s.trim()).filter(Boolean),
      };
      const updated = await savePartnershipProcessStep(payload);
      setItems((prev) => prev.map((m) => m.id === item.id ? {
        ...updated,
        deliverables: Array.isArray(updated.deliverables) ? updated.deliverables : [],
      } : m));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await savePartnershipProcessStep({
      sort_order: items.length + 1, active: true,
      icon: "Star", color: "primary",
      title: "Nouvelle étape", description: "Description du processus...",
      duration: "", deliverables: [],
    });
    setItems((prev) => [...prev, { ...created, deliverables: [] }]);
  }

  async function remove(id) {
    if (!confirm("Supprimer cette étape ?")) return;
    await deletePartnershipProcessStep(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Workflow size={14} color="white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Étapes du processus</h2>
            <p className="text-xs text-gray-500">Timeline affiché sur la page Partenariat</p>
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
        {items.map((item) => {
          const delivText = Array.isArray(item.deliverables) ? item.deliverables.join("\n") : (item.deliverables || "");
          return (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="grid sm:grid-cols-4 gap-3 mb-3">
                <FormField label="Icône">
                  <IconPicker value={item.icon} onChange={(v) => update(item.id, "icon", v)} />
                </FormField>
                <FormField label="Couleur">
                  <div className="flex gap-2 mt-1">
                    {["primary", "accent"].map((c) => (
                      <button
                        key={c}
                        onClick={() => update(item.id, "color", c)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${
                          item.color === c
                            ? "border-orange-400 ring-1 ring-orange-400 bg-orange-50 text-orange-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </FormField>
                <FormField label="Durée">
                  <TextInput value={item.duration || ""} onChange={(v) => update(item.id, "duration", v)} placeholder="1-3 jours" />
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

              <FormField label="Titre">
                <TextInput value={item.title || ""} onChange={(v) => update(item.id, "title", v)} placeholder="Titre de l'étape" />
              </FormField>

              <div className="mt-3">
                <FormField label="Description">
                  <TextArea value={item.description || ""} onChange={(v) => update(item.id, "description", v)} rows={2} placeholder="Description détaillée..." />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Livrables (un par ligne)">
                  <TextArea
                    value={delivText}
                    onChange={(v) => update(item.id, "deliverables", v.split("\n").map((s) => s.trim()).filter(Boolean))}
                    rows={3}
                    placeholder={"Livrable 1\nLivrable 2\nLivrable 3"}
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
          );
        })}
        {items.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-xl border border-dashed border-gray-200">
            Aucune étape. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Generic CRUD list for security/commitment items ───────────────────────────

function TrustItemsList({ title, items, onSave, onAdd, onDelete, onUpdate, saving, saved }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-700 font-medium"
        >
          <Plus size={12} /> Ajouter
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <FormField label="Icône">
                <IconPicker value={item.icon} onChange={(v) => onUpdate(item.id, "icon", v)} />
              </FormField>
              <FormField label="Titre" className="sm:col-span-2">
                <TextInput value={item.title || ""} onChange={(v) => onUpdate(item.id, "title", v)} placeholder="Titre" />
              </FormField>
            </div>
            <FormField label="Description">
              <TextArea value={item.description || ""} onChange={(v) => onUpdate(item.id, "description", v)} rows={2} placeholder="Description brève..." />
            </FormField>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Toggle checked={item.active} onChange={(v) => onUpdate(item.id, "active", v)} label="Visible" />
              <div className="flex items-center gap-2">
                <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => onSave(item)} label="Sauver" />
                <button onClick={() => onDelete(item.id)} className="text-red-400 hover:text-red-600 p-1.5">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm bg-white rounded-xl border border-dashed border-gray-200">
            Aucun élément. Cliquez sur "Ajouter".
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tab: Signaux Confiance ────────────────────────────────────────────────────

function SignauxConfianceTab() {
  const [security, setSecurity]       = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [saving, setSaving]           = useState(null);
  const [saved,  setSaved]            = useState(null);

  useEffect(() => {
    getTrustSecurityItems().then((d) => setSecurity(d || [])).catch(() => {});
    getTrustCommitmentItems().then((d) => setCommitments(d || [])).catch(() => {});
  }, []);

  function updateSec(id, field, val) {
    setSecurity((p) => p.map((m) => m.id === id ? { ...m, [field]: val } : m));
    setSaved(null);
  }

  function updateCom(id, field, val) {
    setCommitments((p) => p.map((m) => m.id === id ? { ...m, [field]: val } : m));
    setSaved(null);
  }

  async function saveSec(item) {
    setSaving(item.id);
    try {
      const updated = await saveTrustSecurityItem(item);
      setSecurity((p) => p.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id); setTimeout(() => setSaved(null), 2500);
    } finally { setSaving(null); }
  }

  async function saveCom(item) {
    setSaving(item.id);
    try {
      const updated = await saveTrustCommitmentItem(item);
      setCommitments((p) => p.map((m) => m.id === item.id ? updated : m));
      setSaved(item.id); setTimeout(() => setSaved(null), 2500);
    } finally { setSaving(null); }
  }

  async function addSec() {
    const created = await saveTrustSecurityItem({ sort_order: security.length + 1, active: true, icon: "Shield", title: "Nouvel élément", description: "" });
    setSecurity((p) => [...p, created]);
  }

  async function addCom() {
    const created = await saveTrustCommitmentItem({ sort_order: commitments.length + 1, active: true, icon: "FileText", title: "Nouvel engagement", description: "" });
    setCommitments((p) => [...p, created]);
  }

  async function delSec(id) {
    if (!confirm("Supprimer ?")) return;
    await deleteTrustSecurityItem(id);
    setSecurity((p) => p.filter((m) => m.id !== id));
  }

  async function delCom(id) {
    if (!confirm("Supprimer ?")) return;
    await deleteTrustCommitmentItem(id);
    setCommitments((p) => p.filter((m) => m.id !== id));
  }

  return (
    <div>
      <TrustItemsList
        title="Sécurité & Protection des données"
        items={security}
        onSave={saveSec}
        onAdd={addSec}
        onDelete={delSec}
        onUpdate={updateSec}
        saving={saving}
        saved={saved}
      />
      <TrustItemsList
        title="Engagements légaux & contractuels"
        items={commitments}
        onSave={saveCom}
        onAdd={addCom}
        onDelete={delCom}
        onUpdate={updateCom}
        saving={saving}
        saved={saved}
      />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "processus",        label: "Processus",        icon: Workflow      },
  { id: "signaux-confiance", label: "Signaux Confiance", icon: ShieldCheck  },
];

export default function PartnershipContentAdmin() {
  const [tab, setTab] = useState("processus");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Page Partenariat</h1>
        <p className="text-gray-500 text-sm mt-0.5">Gérez le processus et les signaux de confiance</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {tab === "processus"         && <ProcessusTab />}
      {tab === "signaux-confiance" && <SignauxConfianceTab />}
    </div>
  );
}
