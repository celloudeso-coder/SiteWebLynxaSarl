import React, { useState, useEffect } from "react";
import {
  getJobApplications, updateApplicationStatus, deleteJobApplication,
  getJobOpenings, saveJobOpening, deleteJobOpening,
} from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import {
  Users, Briefcase, Download, RefreshCw, Trash2,
  ExternalLink, ChevronDown, ChevronUp, Plus,
} from "lucide-react";

// ─── Statuts candidature ──────────────────────────────────────────────────────
const STATUSES = {
  pending:  { label: "En attente",  cls: "bg-yellow-100 text-yellow-700" },
  reviewed: { label: "Examinée",    cls: "bg-blue-100 text-blue-700"    },
  accepted: { label: "Acceptée",    cls: "bg-green-100 text-green-700"  },
  rejected: { label: "Refusée",     cls: "bg-red-100 text-red-700"      },
};

const CONTRACT_TYPES = ["Stage", "Temps plein", "Temps partiel", "Freelance"];
const DEPARTMENTS    = ["Développement", "Infrastructure", "Design", "Business", "Support"];

const emptyOpening = {
  sort_order: 0, active: true, title: "", department: "", type: "Temps plein",
  location: "Conakry, Guinée", description: "", requirements: [], is_urgent: false,
};

// ─── Onglet Candidatures ──────────────────────────────────────────────────────
function ApplicationsTab() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [expanded, setExpanded] = useState(null);
  const [editNotes, setEditNotes] = useState({});
  const [saving, setSaving]     = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await getJobApplications()); }
    finally { setLoading(false); }
  }

  async function changeStatus(id, status) {
    const notes = editNotes[id] ?? items.find((i) => i.id === id)?.admin_notes ?? "";
    setSaving(id);
    try {
      const updated = await updateApplicationStatus(id, status, notes);
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } finally { setSaving(null); }
  }

  async function saveNotes(id) {
    const item   = items.find((i) => i.id === id);
    const notes  = editNotes[id] ?? item?.admin_notes ?? "";
    setSaving(id);
    try {
      const updated = await updateApplicationStatus(id, item.status, notes);
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } finally { setSaving(null); }
  }

  async function remove(id) {
    if (!confirm("Supprimer cette candidature ?")) return;
    await deleteJobApplication(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function exportCSV() {
    const rows = filtered.map((i) => [
      i.name, i.email, i.phone || "", i.position || "",
      i.contract_type || "", i.availability || "",
      STATUSES[i.status]?.label || i.status,
      new Date(i.submitted_at).toLocaleDateString("fr-FR"),
      i.cv_url || "", i.letter_url || "",
    ]);
    const csv = [
      ["Nom", "Email", "Téléphone", "Poste", "Contrat", "Disponibilité", "Statut", "Date", "CV", "Lettre"],
      ...rows,
    ].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
      download: `candidatures-${new Date().toISOString().slice(0, 10)}.csv`,
    });
    a.click();
  }

  const filtered = items.filter((i) => {
    const matchFilter = filter === "all" || i.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || i.name?.toLowerCase().includes(q) || i.email?.toLowerCase().includes(q) || i.position?.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = Object.fromEntries(
    Object.keys(STATUSES).map((s) => [s, items.filter((i) => i.status === s).length])
  );

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total",      value: items.length,       cls: "bg-gray-50 text-gray-700"    },
          { label: "En attente", value: counts.pending || 0, cls: "bg-yellow-50 text-yellow-700" },
          { label: "Acceptées",  value: counts.accepted || 0, cls: "bg-green-50 text-green-700"  },
          { label: "Refusées",   value: counts.rejected || 0, cls: "bg-red-50 text-red-600"      },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl px-4 py-3 ${s.cls}`}>
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs mt-0.5 opacity-75">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text" placeholder="Rechercher par nom, email, poste…"
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <div className="flex gap-2 flex-wrap">
          {["all", ...Object.keys(STATUSES)].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                filter === f ? "bg-orange-500 text-white" : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? "Toutes" : STATUSES[f]?.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-xs">
            <RefreshCw size={13} /> Actualiser
          </button>
          <button onClick={exportCSV} disabled={filtered.length === 0} className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-xs font-medium">
            <Download size={13} /> CSV
          </button>
        </div>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="py-16 text-center text-gray-400 text-sm">Chargement…</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-400 text-sm">Aucune candidature.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* En-tête ligne */}
              <div className="flex items-center gap-3 px-5 py-4">
                <button
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="flex-1 flex items-center gap-3 text-left"
                >
                  {expanded === item.id ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 truncate">{item.position || "—"} · {item.email}</p>
                  </div>
                </button>
                <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${STATUSES[item.status]?.cls || "bg-gray-100 text-gray-600"}`}>
                  {STATUSES[item.status]?.label || item.status}
                </span>
                <p className="text-xs text-gray-400 flex-shrink-0 hidden sm:block">
                  {new Date(item.submitted_at).toLocaleDateString("fr-FR")}
                </p>
                <button onClick={() => remove(item.id)} className="text-gray-300 hover:text-red-500 flex-shrink-0">
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Détail */}
              {expanded === item.id && (
                <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                    {[
                      ["Email",         item.email],
                      ["Téléphone",     item.phone],
                      ["Genre",         item.gender],
                      ["Âge",           item.age],
                      ["Niveau études", item.education],
                      ["Expérience",    item.experience ? `${item.experience} an(s)` : "—"],
                      ["Contrat",       item.contract_type],
                      ["Disponibilité", item.availability],
                      ["Adresse",       item.address],
                    ].map(([label, val]) => val && (
                      <div key={label}>
                        <span className="text-gray-400 text-xs">{label}</span>
                        <p className="text-gray-800 font-medium">{val}</p>
                      </div>
                    ))}
                  </div>

                  {item.motivation && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Motivation</p>
                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">{item.motivation}</p>
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    {item.cv_url && (
                      <a href={item.cv_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline border border-blue-200 rounded-lg px-3 py-1.5">
                        <ExternalLink size={12} /> Voir CV
                      </a>
                    )}
                    {item.letter_url && (
                      <a href={item.letter_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline border border-blue-200 rounded-lg px-3 py-1.5">
                        <ExternalLink size={12} /> Voir Lettre
                      </a>
                    )}
                  </div>

                  {/* Changer statut */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-gray-500">Statut :</span>
                    {Object.entries(STATUSES).map(([key, { label, cls }]) => (
                      <button
                        key={key}
                        disabled={saving === item.id}
                        onClick={() => changeStatus(item.id, key)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                          item.status === key ? cls + " border-transparent" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Notes admin */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Notes internes</p>
                    <textarea
                      rows={2}
                      value={editNotes[item.id] ?? item.admin_notes ?? ""}
                      onChange={(e) => setEditNotes((p) => ({ ...p, [item.id]: e.target.value }))}
                      placeholder="Notes internes (non visible par le candidat)…"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <SaveButton loading={saving === item.id} saved={false} onClick={() => saveNotes(item.id)} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {filtered.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 text-right">{filtered.length} résultat(s)</p>
      )}
    </div>
  );
}

// ─── Onglet Postes ouverts ────────────────────────────────────────────────────
function OpeningsTab() {
  const [items, setItems]       = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving]     = useState(null);
  const [saved, setSaved]       = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getJobOpenings(false);
    setItems(data || []);
  }

  function update(id, field, value) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    setSaved(null);
  }

  async function save(item) {
    setSaving(item.id);
    try {
      const reqs = Array.isArray(item.requirements) ? item.requirements : item.requirements.split("\n").filter(Boolean);
      const updated = await saveJobOpening({ ...item, requirements: reqs });
      setItems((prev) => prev.map((p) => (p.id === item.id ? updated : p)));
      setSaved(item.id);
      setTimeout(() => setSaved(null), 2500);
    } finally { setSaving(null); }
  }

  async function addNew() {
    const created = await saveJobOpening({ ...emptyOpening, sort_order: items.length + 1 });
    setItems((prev) => [...prev, created]);
    setExpanded(created.id);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce poste ?")) return;
    await deleteJobOpening(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={15} /> Ajouter un poste
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const reqs = Array.isArray(item.requirements) ? item.requirements : [];
          return (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4">
                <button
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="flex-1 flex items-center gap-3 text-left"
                >
                  {expanded === item.id ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.title || "Nouveau poste"}</p>
                    <p className="text-xs text-gray-500">{item.type} · {item.department || "—"}</p>
                  </div>
                </button>
                {item.is_urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Urgent</span>}
                <Toggle checked={item.active} onChange={(v) => update(item.id, "active", v)} />
                <button onClick={() => remove(item.id)} className="text-gray-300 hover:text-red-500 ml-1">
                  <Trash2 size={15} />
                </button>
              </div>

              {expanded === item.id && (
                <div className="border-t border-gray-100 px-5 py-5 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Intitulé du poste">
                      <TextInput value={item.title} onChange={(v) => update(item.id, "title", v)} placeholder="Développeur Mobile React Native" />
                    </FormField>
                    <FormField label="Département">
                      <select
                        value={item.department || ""}
                        onChange={(e) => update(item.id, "department", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="">Sélectionner…</option>
                        {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Type de contrat">
                      <select
                        value={item.type || "Temps plein"}
                        onChange={(e) => update(item.id, "type", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        {CONTRACT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Localisation">
                      <TextInput value={item.location} onChange={(v) => update(item.id, "location", v)} placeholder="Conakry, Guinée" />
                    </FormField>
                  </div>

                  <FormField label="Description">
                    <TextArea value={item.description} onChange={(v) => update(item.id, "description", v)} rows={2} placeholder="Description du poste…" />
                  </FormField>

                  <FormField label="Exigences / compétences requises" hint="Une par ligne">
                    <textarea
                      rows={4}
                      value={reqs.join("\n")}
                      onChange={(e) => update(item.id, "requirements", e.target.value.split("\n"))}
                      placeholder={"2+ ans d'expérience React Native\nConnaissance iOS & Android\n…"}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    />
                  </FormField>

                  <div className="flex items-center gap-3">
                    <Toggle checked={!!item.is_urgent} onChange={(v) => update(item.id, "is_urgent", v)} />
                    <span className="text-sm text-gray-600">Marquer comme urgent</span>
                  </div>

                  <div className="flex justify-end pt-2">
                    <SaveButton loading={saving === item.id} saved={saved === item.id} onClick={() => save(item)} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucun poste ouvert.</div>
        )}
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function JoinUsAdmin() {
  const [tab, setTab] = useState("applications");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Rejoindre l'équipe</h1>
          <p className="text-gray-500 text-sm mt-0.5">Candidatures reçues et postes ouverts</p>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {[
          { key: "applications", label: "Candidatures",   icon: Users     },
          { key: "openings",     label: "Postes ouverts", icon: Briefcase },
        ].map(({ key, label, icon: Ic }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === key ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Ic size={15} />
            {label}
          </button>
        ))}
      </div>

      {tab === "applications" ? <ApplicationsTab /> : <OpeningsTab />}
    </div>
  );
}
