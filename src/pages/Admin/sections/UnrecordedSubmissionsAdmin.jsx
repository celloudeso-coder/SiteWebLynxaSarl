import React, { useState, useEffect } from "react";
import { getUnrecordedSubmissions, resolveUnrecordedSubmission, deleteUnrecordedSubmission } from "../../../lib/cms";
import { AlertTriangle, CheckCircle2, Mail, MailX, Trash2, ChevronDown, ChevronUp, RefreshCw, Inbox } from "lucide-react";

const FORM_LABELS = {
  join_us: "Candidature (Rejoindre)",
  partnership_project_request: "Demande de projet (Partenariat)",
  partnership_pathway: "Intérêt voie de collaboration (Partenariat)",
  services_plan_inquiry: "Demande d'information (Services)",
};

function formatDate(iso) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}

function Row({ item, onResolve, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(item.admin_notes || "");
  const [saving, setSaving] = useState(false);

  async function toggleResolved() {
    setSaving(true);
    try {
      await onResolve(item.id, !item.resolved, notes);
    } finally {
      setSaving(false);
    }
  }

  async function saveNotes() {
    setSaving(true);
    try {
      await onResolve(item.id, item.resolved, notes);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={`bg-white rounded-xl border overflow-hidden ${item.resolved ? "border-gray-200" : "border-amber-300"}`}>
      <div className="flex items-center gap-3 px-5 py-4">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.resolved ? "bg-gray-300" : "bg-amber-500"}`} />
        <button onClick={() => setExpanded((v) => !v)} className="flex-1 flex items-start gap-3 text-left min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-gray-900 text-sm">
                {FORM_LABELS[item.form] || item.form}
              </p>
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${item.email_sent ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {item.email_sent ? <Mail size={11} /> : <MailX size={11} />}
                {item.email_sent ? "Email envoyé" : "Email échoué"}
              </span>
              {item.resolved && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">
                  <CheckCircle2 size={11} /> Traité
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {item.payload?.name || item.payload?.contactName || item.payload?.email || "—"}
              {item.payload?.email ? ` · ${item.payload.email}` : ""}
            </p>
            {item.db_error && <p className="text-xs text-red-400 mt-0.5 truncate">Erreur BDD : {item.db_error}</p>}
          </div>
        </button>
        <span className="text-xs text-gray-400 hidden sm:block flex-shrink-0">{formatDate(item.created_at)}</span>
        <button onClick={() => setExpanded((v) => !v)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-5 py-5 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Données soumises</p>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">{JSON.stringify(item.payload, null, 2)}</pre>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes internes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex : recontacté par téléphone le 12/03, candidature ressaisie manuellement…"
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-gray-100">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={toggleResolved}
                disabled={saving}
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  item.resolved
                    ? "border border-gray-200 text-gray-600 hover:border-amber-400 hover:text-amber-600"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                <CheckCircle2 size={13} /> {item.resolved ? "Marquer non traité" : "Marquer traité"}
              </button>
              <button
                onClick={saveNotes}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500 px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                {saving ? "Sauvegarde…" : "Sauvegarder notes"}
              </button>
            </div>
            <button
              onClick={() => onDelete(item.id)}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 px-2 py-1.5 rounded-lg transition-colors"
            >
              <Trash2 size={13} /> Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UnrecordedSubmissionsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("open"); // open | resolved | all

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await getUnrecordedSubmissions());
    } finally {
      setLoading(false);
    }
  }

  async function handleResolve(id, resolved, notes) {
    const updated = await resolveUnrecordedSubmission(id, resolved, notes);
    setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette entrée définitivement ?")) return;
    await deleteUnrecordedSubmission(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const visible = items.filter((i) => {
    if (filter === "open") return !i.resolved;
    if (filter === "resolved") return i.resolved;
    return true;
  });
  const openCount = items.filter((i) => !i.resolved).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            Soumissions à vérifier
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Formulaires publics dont l'enregistrement normal a échoué (mais dont l'email est
            parti), ou qui n'ont pas de stockage dédié et reposent uniquement sur l'envoi
            d'email — candidatures, demandes de projet partenariat, demandes d'information.
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Actualiser
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {[
          { key: "open",     label: "À traiter", count: openCount },
          { key: "resolved", label: "Traités",   count: items.length - openCount },
          { key: "all",      label: "Tous",      count: items.length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === key ? "bg-orange-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
            }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === key ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 px-5 py-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded-full w-1/3" />
                  <div className="h-2 bg-gray-100 rounded-full w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && visible.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Inbox size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">
            {filter === "open" ? "Rien à traiter — tous les formulaires ont bien été enregistrés." : "Aucune entrée dans cette catégorie."}
          </p>
        </div>
      )}

      {!loading && visible.length > 0 && (
        <div className="space-y-3">
          {visible.map((item) => (
            <Row key={item.id} item={item} onResolve={handleResolve} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
