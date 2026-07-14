import React, { useMemo, useState } from "react";
import {
  deleteSubscriptionPayment,
  saveSubscriptionPayment,
} from "../../../../lib/cms";
import {
  Banknote,
  Check,
  CircleAlert,
  Clock3,
  Loader2,
  Plus,
  ReceiptText,
  Trash2,
  X,
} from "lucide-react";

const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400";

function todayValue() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatMoney(value) {
  return `${new Intl.NumberFormat("fr-FR").format(Number(value || 0))} GNF`;
}

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR").format(new Date(`${value}T00:00:00`));
}

function paymentState(payment) {
  if (payment.status === "paid") return { label: "Payé", classes: "bg-green-50 text-green-700", icon: Check };
  if (payment.status === "cancelled") return { label: "Annulé", classes: "bg-gray-100 text-gray-600", icon: X };
  const today = todayValue();
  if (payment.due_date < today) return { label: "En retard", classes: "bg-red-50 text-red-700", icon: CircleAlert };
  if (payment.due_date === today) return { label: "À facturer", classes: "bg-orange-50 text-orange-700", icon: Clock3 };
  return { label: "Planifié", classes: "bg-blue-50 text-blue-700", icon: Clock3 };
}

export default function SubscriptionPaymentsPanel({
  subscription,
  payments,
  suggestedDueDate,
  onUpsert,
  onDelete,
  onError,
}) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [form, setForm] = useState({
    due_date: suggestedDueDate || "",
    amount_gnf: subscription.amount_gnf ?? "",
    status: "paid",
    paid_at: todayValue(),
    payment_method: "",
    reference: "",
    notes: "",
  });

  const sortedPayments = useMemo(
    () => [...payments].sort((a, b) => b.due_date.localeCompare(a.due_date)),
    [payments],
  );

  function openForm() {
    setForm({
      due_date: suggestedDueDate || "",
      amount_gnf: subscription.amount_gnf ?? "",
      status: "paid",
      paid_at: todayValue(),
      payment_method: "",
      reference: "",
      notes: "",
    });
    setShowForm(true);
  }

  async function addPayment() {
    if (!form.due_date) return onError("La date d’échéance du paiement est obligatoire.");
    if (form.amount_gnf === "" || Number(form.amount_gnf) < 0) return onError("Le montant du paiement est invalide.");
    setSaving(true);
    try {
      const created = await saveSubscriptionPayment({ ...form, subscription_id: subscription.id });
      onUpsert(created);
      setShowForm(false);
    } catch (error) {
      onError(error?.code === "23505" ? "Un paiement existe déjà pour cette échéance." : (error?.message || "Impossible d’enregistrer le paiement."));
    } finally {
      setSaving(false);
    }
  }

  async function markPaid(payment) {
    setBusyId(payment.id);
    try {
      const updated = await saveSubscriptionPayment({ ...payment, status: "paid", paid_at: todayValue() });
      onUpsert(updated);
    } catch (error) {
      onError(error?.message || "Impossible de marquer ce paiement comme payé.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(payment) {
    if (!window.confirm("Supprimer cette ligne de paiement ?")) return;
    setBusyId(payment.id);
    try {
      await deleteSubscriptionPayment(payment.id);
      onDelete(payment.id);
    } catch (error) {
      onError(error?.message || "Impossible de supprimer ce paiement.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50/70 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <ReceiptText size={16} className="text-orange-500" /> Historique des paiements
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">Prochaine échéance suggérée : {formatDate(suggestedDueDate)}</p>
        </div>
        <button type="button" onClick={showForm ? () => setShowForm(false) : openForm} className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50">
          {showForm ? <X size={14} /> : <Plus size={14} />} {showForm ? "Annuler" : "Enregistrer un paiement"}
        </button>
      </div>

      {showForm && (
        <div className="mt-4 space-y-4 rounded-xl border border-orange-200 bg-white p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <label className="space-y-1 text-xs font-medium text-gray-600">
              <span>Échéance concernée</span>
              <input type="date" value={form.due_date} onChange={(event) => setForm((prev) => ({ ...prev, due_date: event.target.value }))} className={inputClass} />
            </label>
            <label className="space-y-1 text-xs font-medium text-gray-600">
              <span>Montant (GNF)</span>
              <input type="number" min="0" value={form.amount_gnf} onChange={(event) => setForm((prev) => ({ ...prev, amount_gnf: event.target.value }))} className={inputClass} />
            </label>
            <label className="space-y-1 text-xs font-medium text-gray-600">
              <span>État</span>
              <select value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))} className={inputClass}>
                <option value="paid">Payé</option>
                <option value="pending">Planifié / non payé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </label>
            <label className="space-y-1 text-xs font-medium text-gray-600">
              <span>Date d’encaissement</span>
              <input type="date" value={form.status === "paid" ? form.paid_at : ""} disabled={form.status !== "paid"} onChange={(event) => setForm((prev) => ({ ...prev, paid_at: event.target.value }))} className={`${inputClass} disabled:bg-gray-100`} />
            </label>
            <label className="space-y-1 text-xs font-medium text-gray-600">
              <span>Moyen de paiement</span>
              <select value={form.payment_method} onChange={(event) => setForm((prev) => ({ ...prev, payment_method: event.target.value }))} className={inputClass}>
                <option value="">Non renseigné</option>
                <option value="cash">Espèces</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="bank_transfer">Virement bancaire</option>
                <option value="card">Carte</option>
                <option value="other">Autre</option>
              </select>
            </label>
            <label className="space-y-1 text-xs font-medium text-gray-600 lg:col-span-1">
              <span>Référence</span>
              <input type="text" value={form.reference} onChange={(event) => setForm((prev) => ({ ...prev, reference: event.target.value }))} placeholder="Reçu, transaction…" className={inputClass} />
            </label>
            <label className="space-y-1 text-xs font-medium text-gray-600 md:col-span-2">
              <span>Note</span>
              <input type="text" value={form.notes} onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))} placeholder="Information interne facultative" className={inputClass} />
            </label>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={addPayment} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Banknote size={15} />} Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {sortedPayments.map((payment) => {
          const state = paymentState(payment);
          const StateIcon = state.icon;
          return (
            <div key={payment.id} className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white px-3 py-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{formatMoney(payment.amount_gnf)}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${state.classes}`}><StateIcon size={11} /> {state.label}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Échéance : {formatDate(payment.due_date)}{payment.paid_at ? ` · Encaissé le ${formatDate(payment.paid_at)}` : ""}</p>
                {(payment.reference || payment.payment_method || payment.notes) && (
                  <p className="mt-0.5 truncate text-xs text-gray-400">{[payment.payment_method, payment.reference, payment.notes].filter(Boolean).join(" · ")}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {payment.status === "pending" && (
                  <button type="button" onClick={() => markPaid(payment)} disabled={busyId === payment.id} className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50">
                    {busyId === payment.id ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Marquer payé
                  </button>
                )}
                <button type="button" onClick={() => remove(payment)} disabled={busyId === payment.id} aria-label="Supprimer le paiement" className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
        {sortedPayments.length === 0 && <p className="py-4 text-center text-xs text-gray-400">Aucun paiement enregistré pour cet abonnement.</p>}
      </div>
    </section>
  );
}
