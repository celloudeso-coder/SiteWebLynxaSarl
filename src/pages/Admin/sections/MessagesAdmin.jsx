import React, { useState, useEffect } from "react";
import { getContactMessages, updateMessageStatus, deleteContactMessage } from "../../../lib/cms";
import {
  Inbox, Mail, MailOpen, Reply, Archive, Trash2,
  ChevronDown, ChevronUp, Clock, Phone, Building2,
  DollarSign, MessageSquare, Tag, Search, RefreshCw,
} from "lucide-react";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  new:      { label: "Nouveau",   color: "bg-blue-100 text-blue-700",   dot: "bg-blue-500"   },
  read:     { label: "Lu",        color: "bg-gray-100 text-gray-600",   dot: "bg-gray-400"   },
  replied:  { label: "Répondu",   color: "bg-green-100 text-green-700", dot: "bg-green-500"  },
  archived: { label: "Archivé",   color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500"},
};

const INQUIRY_LABELS = {
  "new-project":  "Nouveau projet",
  "partnership":  "Partenariat",
  "career":       "Carrière",
  "support":      "Support",
  "consultation": "Consultation",
  "other":        "Autre",
};

const BUDGET_LABELS = {
  "under-5k": "< 5 000 $",
  "5k-15k":   "5k – 15k $",
  "15k-50k":  "15k – 50k $",
  "over-50k": "> 50 000 $",
  "discuss":  "À discuter",
};

const CONTACT_LABELS = {
  "email":    "Email",
  "phone":    "Téléphone",
  "whatsapp": "WhatsApp",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}

// ── Message row ───────────────────────────────────────────────────────────────
function MessageRow({ msg, onStatusChange, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes]       = useState(msg.admin_notes || "");
  const [saving, setSaving]     = useState(false);

  const st = STATUS_CONFIG[msg.status] || STATUS_CONFIG.new;

  async function changeStatus(newStatus) {
    setSaving(true);
    try {
      await onStatusChange(msg.id, newStatus, notes);
    } finally {
      setSaving(false);
    }
  }

  async function saveNotes() {
    setSaving(true);
    try {
      await onStatusChange(msg.id, msg.status, notes);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={`bg-white rounded-xl border overflow-hidden ${msg.status === "new" ? "border-blue-200" : "border-gray-200"}`}>
      {/* Header row */}
      <div className="flex items-center gap-3 px-5 py-4">
        {/* Unread dot */}
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${st.dot}`} />

        {/* Main info */}
        <button
          onClick={() => {
            setExpanded((v) => !v);
            if (msg.status === "new") changeStatus("read");
          }}
          className="flex-1 flex items-start gap-3 text-left min-w-0"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-gray-900 text-sm">{msg.name}</p>
              {msg.company && (
                <span className="text-xs text-gray-400">· {msg.company}</span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}>
                {st.label}
              </span>
              {msg.inquiry_type && (
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {INQUIRY_LABELS[msg.inquiry_type] || msg.inquiry_type}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{msg.email}</p>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{msg.message}</p>
          </div>
        </button>

        {/* Date + toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-400 hidden sm:block">{formatDate(msg.submitted_at)}</span>
          <button
            onClick={() => {
              setExpanded((v) => !v);
              if (msg.status === "new") changeStatus("read");
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-5 space-y-5">
          {/* Contact info */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} className="text-gray-400 flex-shrink-0" />
              <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors truncate">{msg.email}</a>
            </div>
            {msg.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} className="text-gray-400 flex-shrink-0" />
                <a href={`tel:${msg.phone}`} className="hover:text-primary transition-colors">{msg.phone}</a>
              </div>
            )}
            {msg.company && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 size={14} className="text-gray-400 flex-shrink-0" />
                <span>{msg.company}</span>
              </div>
            )}
            {msg.budget && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign size={14} className="text-gray-400 flex-shrink-0" />
                <span>{BUDGET_LABELS[msg.budget] || msg.budget}</span>
              </div>
            )}
            {msg.contact_method && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Tag size={14} className="text-gray-400 flex-shrink-0" />
                <span>Via {CONTACT_LABELS[msg.contact_method] || msg.contact_method}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock size={14} className="flex-shrink-0" />
              <span>{formatDate(msg.submitted_at)}</span>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
          </div>

          {/* Notes admin */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes internes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajouter une note interne…"
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-gray-100">
            <div className="flex gap-2 flex-wrap">
              <a
                href={`mailto:${msg.email}?subject=Re: ${INQUIRY_LABELS[msg.inquiry_type] || "Votre message"}`}
                onClick={() => changeStatus("replied")}
                className="inline-flex items-center gap-1.5 text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                <Reply size={13} /> Répondre par email
              </a>
              {msg.status !== "archived" && (
                <button
                  onClick={() => changeStatus("archived")}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 hover:border-yellow-400 hover:text-yellow-600 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  <Archive size={13} /> Archiver
                </button>
              )}
              {msg.status === "archived" && (
                <button
                  onClick={() => changeStatus("read")}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  <MailOpen size={13} /> Désarchiver
                </button>
              )}
              <button
                onClick={saveNotes}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500 px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                {saving ? "Sauvegarde…" : "Sauvegarder notes"}
              </button>
            </div>
            <button
              onClick={() => onDelete(msg.id)}
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

// ── Main admin component ──────────────────────────────────────────────────────
export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");   // all | new | read | replied | archived
  const [search, setSearch]     = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await getContactMessages();
      setMessages(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, status, admin_notes) {
    const updated = await updateMessageStatus(id, status, admin_notes);
    setMessages((prev) => prev.map((m) => m.id === id ? updated : m));
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce message définitivement ?")) return;
    await deleteContactMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  // Counts
  const counts = {
    all:      messages.length,
    new:      messages.filter((m) => m.status === "new").length,
    read:     messages.filter((m) => m.status === "read").length,
    replied:  messages.filter((m) => m.status === "replied").length,
    archived: messages.filter((m) => m.status === "archived").length,
  };

  // Filtered & searched
  const visible = messages.filter((m) => {
    if (filter !== "all" && m.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.company?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 text-sm mt-0.5">Soumissions du formulaire de contact</p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Actualiser
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        {[
          { key: "all",      label: "Tous",     icon: Inbox       },
          { key: "new",      label: "Nouveaux",  icon: Mail        },
          { key: "read",     label: "Lus",       icon: MailOpen    },
          { key: "replied",  label: "Répondus",  icon: Reply       },
          { key: "archived", label: "Archivés",  icon: Archive     },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === key
                ? "bg-orange-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
            }`}
          >
            <Icon size={13} />
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === key ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par nom, email, message…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        />
      </div>

      {/* Content */}
      {loading && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 px-5 py-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded-full w-1/4" />
                  <div className="h-2 bg-gray-100 rounded-full w-1/3" />
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
            {search ? "Aucun message ne correspond à votre recherche." : "Aucun message dans cette catégorie."}
          </p>
        </div>
      )}

      {!loading && visible.length > 0 && (
        <div className="space-y-3">
          {visible.map((msg) => (
            <MessageRow
              key={msg.id}
              msg={msg}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
