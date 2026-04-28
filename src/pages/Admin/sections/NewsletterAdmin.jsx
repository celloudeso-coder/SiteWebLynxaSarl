import React, { useState, useEffect } from "react";
import { getNewsletterSubscriptions, deleteNewsletterSubscription, toggleNewsletterSubscription } from "../../../lib/cms";
import { Mail, Trash2, Download, RefreshCw, ToggleLeft, ToggleRight } from "lucide-react";

export default function NewsletterAdmin() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("all"); // "all" | "active" | "inactive"
  const [search, setSearch]   = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await getNewsletterSubscriptions();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cet abonné ?")) return;
    await deleteNewsletterSubscription(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleToggle(item) {
    const updated = await toggleNewsletterSubscription(item.id, !item.active);
    setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
  }

  function exportCSV() {
    const rows = filtered.map((i) => [
      i.email,
      i.active ? "Actif" : "Désabonné",
      new Date(i.subscribed_at).toLocaleDateString("fr-FR"),
    ]);
    const csv = [["Email", "Statut", "Date d'inscription"], ...rows]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = items.filter((i) => {
    const matchFilter =
      filter === "all" ||
      (filter === "active" && i.active) ||
      (filter === "inactive" && !i.active);
    const matchSearch = i.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const activeCount   = items.filter((i) => i.active).length;
  const inactiveCount = items.filter((i) => !i.active).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {activeCount} abonné{activeCount !== 1 ? "s" : ""} actif{activeCount !== 1 ? "s" : ""}
            {inactiveCount > 0 && ` · ${inactiveCount} désabonné${inactiveCount !== 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm"
          >
            <RefreshCw size={14} />
            Actualiser
          </button>
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Download size={14} />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total inscrits",  value: items.length,   color: "bg-blue-50 text-blue-700"  },
          { label: "Actifs",          value: activeCount,    color: "bg-green-50 text-green-700" },
          { label: "Désabonnés",      value: inactiveCount,  color: "bg-gray-50 text-gray-600"   },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl px-5 py-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm mt-0.5 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Rechercher par email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <div className="flex gap-2">
          {["all", "active", "inactive"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? "Tous" : f === "active" ? "Actifs" : "Désabonnés"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Mail size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm">Aucun abonné{search ? " pour cette recherche" : ""}.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Date d'inscription</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Statut</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-900">{item.email}</td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {new Date(item.subscribed_at).toLocaleDateString("fr-FR", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-green-500" : "bg-gray-400"}`} />
                      {item.active ? "Actif" : "Désabonné"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggle(item)}
                        title={item.active ? "Désabonner" : "Réactiver"}
                        className="text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        {item.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        title="Supprimer"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 text-right">
          {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
