import React, { useEffect, useMemo, useState } from "react";
import {
  getTrackedSubscriptions,
  getSubscriptionPayments,
  saveTrackedSubscription,
  deleteTrackedSubscription,
} from "../../../lib/cms";
import { FormField, TextArea, TextInput, Toggle } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import SubscriptionPaymentsPanel from "./components/SubscriptionPaymentsPanel";
import {
  AlertCircle,
  AlertTriangle,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Download,
  Gift,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Server,
  Trash2,
  WalletCards,
} from "lucide-react";

const EMPTY_SUBSCRIPTION = {
  client_name: "",
  vercel_supabase_account: "",
  managed_server_account: "",
  billing_cycle: "annual",
  free_months: 0,
  start_date: "",
  payment_start_date: "",
  end_date: "",
  amount_gnf: "",
  notes: "",
  active: true,
};

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent";

function formatMoney(value) {
  if (value === null || value === undefined || value === "") return "À définir";
  return `${new Intl.NumberFormat("fr-FR").format(Number(value))} GNF`;
}

function formatFreeMonths(value) {
  const months = Number(value || 0);
  if (months === 0) return "aucun mois offert";
  return `${months} mois offert${months > 1 ? "s" : ""}`;
}

function parseLocalDate(value) {
  if (!value) return null;
  return new Date(`${value}T00:00:00`);
}

function addMonthsToDate(dateValue, monthsToAdd) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-").map(Number);
  const targetMonth = month - 1 + monthsToAdd;
  const lastDay = new Date(year, targetMonth + 1, 0).getDate();
  const result = new Date(year, targetMonth, Math.min(day, lastDay));
  const resultYear = result.getFullYear();
  const resultMonth = String(result.getMonth() + 1).padStart(2, "0");
  const resultDay = String(result.getDate()).padStart(2, "0");
  return `${resultYear}-${resultMonth}-${resultDay}`;
}

function calculateSchedule(subscription) {
  if (!subscription.start_date) return { paymentStartDate: "", endDate: "" };
  const paymentStartDate = addMonthsToDate(subscription.start_date, Number(subscription.free_months || 0));
  const paidMonths = subscription.billing_cycle === "monthly" ? 1 : 12;
  return {
    paymentStartDate,
    endDate: addMonthsToDate(paymentStartDate, paidMonths),
  };
}

function formatDate(value) {
  if (!value) return "À calculer";
  return new Intl.DateTimeFormat("fr-FR").format(parseLocalDate(value));
}

function todayValue() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getNextPaymentDate(subscription, payments) {
  const schedule = calculateSchedule(subscription);
  const pending = payments
    .filter((payment) => payment.status === "pending")
    .sort((a, b) => a.due_date.localeCompare(b.due_date));
  if (pending.length) return pending[0].due_date;

  const paid = payments
    .filter((payment) => payment.status === "paid")
    .sort((a, b) => b.due_date.localeCompare(a.due_date));
  if (paid.length) return addMonthsToDate(paid[0].due_date, subscription.billing_cycle === "monthly" ? 1 : 12);
  return subscription.payment_start_date || schedule.paymentStartDate || "";
}

function getFinancialStatus(subscription, payments) {
  if (!subscription.active) return { id: "archived", label: "Archivé", className: "bg-gray-100 text-gray-600", priority: 7 };
  if (!subscription.start_date || subscription.amount_gnf == null) return { id: "incomplete", label: "À compléter", className: "bg-amber-50 text-amber-700", priority: 1 };

  const today = todayValue();
  const schedule = calculateSchedule(subscription);
  const paymentStart = subscription.payment_start_date || schedule.paymentStartDate;
  if (paymentStart && today < paymentStart) return { id: "offer", label: "Période offerte", className: "bg-pink-50 text-pink-700", priority: 6 };

  const nextDue = getNextPaymentDate(subscription, payments);
  if (!nextDue) return { id: "incomplete", label: "À compléter", className: "bg-amber-50 text-amber-700", priority: 1 };
  const days = Math.ceil((parseLocalDate(nextDue) - parseLocalDate(today)) / 86400000);
  if (days < 0) return { id: "overdue", label: `${Math.abs(days)} j de retard`, className: "bg-red-50 text-red-700", priority: 0 };
  if (days === 0) return { id: "due", label: "À facturer aujourd’hui", className: "bg-orange-50 text-orange-700", priority: 1 };
  if (days <= 7) return { id: "soon", label: `Échéance J-${days}`, className: "bg-orange-50 text-orange-700", priority: 2 };
  if (days <= 15) return { id: "soon", label: `Échéance J-${days}`, className: "bg-yellow-50 text-yellow-700", priority: 3 };
  if (days <= 30) return { id: "soon", label: `Échéance J-${days}`, className: "bg-blue-50 text-blue-700", priority: 4 };
  return { id: "active", label: "Actif", className: "bg-green-50 text-green-700", priority: 5 };
}

function csvCell(value) {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function addDays(dateValue, days) {
  const date = parseLocalDate(dateValue);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function SummaryCard({ icon: Icon, label, value, detail, color }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${color}`}>
          <Icon size={19} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="mt-0.5 truncate text-lg font-bold text-gray-900">{value}</p>
          {detail && <p className="mt-0.5 text-xs text-gray-400">{detail}</p>}
        </div>
      </div>
    </div>
  );
}

export default function SubscriptionTrackerAdmin() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    setError("");
    setWarning("");
    try {
      const [subscriptionsResult, paymentsResult] = await Promise.allSettled([
        getTrackedSubscriptions(),
        getSubscriptionPayments(),
      ]);

      if (subscriptionsResult.status === "rejected") {
        throw subscriptionsResult.reason;
      }

      setSubscriptions(subscriptionsResult.value);

      if (paymentsResult.status === "fulfilled") {
        setPayments(paymentsResult.value);
      } else {
        setPayments([]);
        setWarning("Les abonnements sont affichés, mais l’historique des paiements n’a pas pu être chargé. Réessayez dans quelques instants.");
      }
    } catch (err) {
      setError(err?.message || "Impossible de charger les abonnements.");
    } finally {
      setLoading(false);
    }
  }

  const totals = useMemo(() => {
    const active = subscriptions.filter((item) => item.active);
    const annual = active.filter((item) => item.billing_cycle === "annual");
    const monthly = active.filter((item) => item.billing_cycle === "monthly");
    const annualAmount = annual.reduce((sum, item) => sum + Number(item.amount_gnf || 0), 0);
    const monthlyAmount = monthly.reduce((sum, item) => sum + Number(item.amount_gnf || 0), 0);
    const offered = active.filter((item) => Number(item.free_months || 0) > 0);
    return {
      annualCount: annual.length,
      monthlyCount: monthly.length,
      annualAmount,
      monthlyAmount,
      projectedAnnual: annualAmount + monthlyAmount * 12,
      offeredCount: offered.length,
      offeredMonths: offered.reduce((sum, item) => sum + Number(item.free_months || 0), 0),
    };
  }, [subscriptions]);

  const portfolio = useMemo(() => subscriptions.map((subscription) => {
    const subscriptionPayments = payments.filter((payment) => payment.subscription_id === subscription.id);
    return {
      subscription,
      payments: subscriptionPayments,
      nextDue: getNextPaymentDate(subscription, subscriptionPayments),
      status: getFinancialStatus(subscription, subscriptionPayments),
    };
  }), [subscriptions, payments]);

  const cashStats = useMemo(() => {
    const today = todayValue();
    const monthPrefix = today.slice(0, 7);
    const inThirtyDays = addDays(today, 30);
    const collected = payments
      .filter((payment) => payment.status === "paid" && payment.paid_at?.startsWith(monthPrefix))
      .reduce((sum, payment) => sum + Number(payment.amount_gnf || 0), 0);
    const upcoming = portfolio.filter((item) => item.subscription.active && item.nextDue && item.nextDue >= today && item.nextDue <= inThirtyDays);
    const overdue = portfolio.filter((item) => item.status.id === "overdue");
    return {
      collected,
      upcomingAmount: upcoming.reduce((sum, item) => sum + Number(item.subscription.amount_gnf || 0), 0),
      upcomingCount: upcoming.length,
      overdueAmount: overdue.reduce((sum, item) => sum + Number(item.subscription.amount_gnf || 0), 0),
      overdueCount: overdue.length,
      attentionCount: portfolio.filter((item) => ["overdue", "due", "soon", "incomplete"].includes(item.status.id)).length,
    };
  }, [payments, portfolio]);

  const visiblePortfolio = useMemo(() => {
    const term = search.trim().toLowerCase();
    return portfolio
      .filter(({ subscription, status }) => {
        const matchesSearch = !term || [
          subscription.client_name,
          subscription.vercel_supabase_account,
          subscription.managed_server_account,
        ].some((value) => value?.toLowerCase().includes(term));
        if (!matchesSearch) return false;
        if (filter === "all") return true;
        if (filter === "attention") return ["overdue", "due", "soon", "incomplete"].includes(status.id);
        return status.id === filter;
      })
      .sort((a, b) => a.status.priority - b.status.priority || (a.nextDue || "9999").localeCompare(b.nextDue || "9999"));
  }, [portfolio, search, filter]);

  function exportCsv() {
    const headers = ["Client", "Cycle", "Montant GNF", "Statut", "Prochaine échéance", "Déploiement", "Début paiement", "Fin", "Mois offerts", "Total encaissé GNF", "Nombre de paiements"];
    const rows = visiblePortfolio.map(({ subscription, payments: history, nextDue, status }) => [
      subscription.client_name,
      subscription.billing_cycle === "monthly" ? "Mensuel" : "Annuel",
      subscription.amount_gnf ?? "",
      status.label,
      nextDue,
      subscription.start_date,
      subscription.payment_start_date,
      subscription.end_date,
      subscription.free_months || 0,
      history.filter((payment) => payment.status === "paid").reduce((sum, payment) => sum + Number(payment.amount_gnf || 0), 0),
      history.filter((payment) => payment.status === "paid").length,
    ]);
    const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(csvCell).join(";")).join("\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `abonnements-${todayValue()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function upsertPayment(payment) {
    setPayments((previous) => {
      const exists = previous.some((item) => item.id === payment.id);
      return exists ? previous.map((item) => item.id === payment.id ? payment : item) : [payment, ...previous];
    });
    setError("");
  }

  function update(localKey, field, value) {
    setSubscriptions((previous) => previous.map((item) => (
      (item.id || item.localKey) === localKey ? { ...item, [field]: value } : item
    )));
    setSaved(null);
  }

  function addNew() {
    const localKey = `new-${Date.now()}`;
    setSubscriptions((previous) => [{ ...EMPTY_SUBSCRIPTION, localKey }, ...previous]);
    setExpanded(localKey);
    setError("");
  }

  async function save(subscription) {
    const key = subscription.id || subscription.localKey;
    if (!subscription.client_name?.trim()) {
      setError("Le nom du client est obligatoire.");
      return;
    }
    if (subscription.amount_gnf !== "" && Number(subscription.amount_gnf) < 0) {
      setError("Le montant ne peut pas être négatif.");
      return;
    }
    if (!Number.isInteger(Number(subscription.free_months)) || Number(subscription.free_months) < 0 || Number(subscription.free_months) > 6) {
      setError("Le nombre de mois offerts doit être compris entre 0 et 6.");
      return;
    }

    setSaving(key);
    setError("");
    try {
      const schedule = calculateSchedule(subscription);
      const updated = await saveTrackedSubscription({
        ...subscription,
        payment_start_date: schedule.paymentStartDate,
        end_date: schedule.endDate,
      });
      setSubscriptions((previous) => previous.map((item) => (
        (item.id || item.localKey) === key ? updated : item
      )));
      setExpanded(updated.id);
      setSaved(updated.id);
      window.setTimeout(() => setSaved(null), 2500);
    } catch (err) {
      setError(err?.message || "Échec de l’enregistrement dans Supabase.");
    } finally {
      setSaving(null);
    }
  }

  async function remove(subscription) {
    const key = subscription.id || subscription.localKey;
    if (!subscription.id) {
      setSubscriptions((previous) => previous.filter((item) => (item.id || item.localKey) !== key));
      return;
    }
    if (!window.confirm(`Supprimer l’abonnement de ${subscription.client_name} ?`)) return;
    setError("");
    try {
      await deleteTrackedSubscription(subscription.id);
      setSubscriptions((previous) => previous.filter((item) => item.id !== subscription.id));
      setPayments((previous) => previous.filter((payment) => payment.subscription_id !== subscription.id));
    } catch (err) {
      setError(err?.message || "Impossible de supprimer cet abonnement.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Tracker d’abonnements</h1>
          <p className="mt-0.5 text-sm text-gray-500">Suivez les comptes, échéances et revenus récurrents des solutions clients.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} /> Exporter CSV
          </button>
          <button onClick={addNew} className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
            <Plus size={16} /> Ajouter un abonnement
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={CircleDollarSign} label="Encaissé ce mois" value={formatMoney(cashStats.collected)} detail={`${payments.filter((payment) => payment.status === "paid" && payment.paid_at?.startsWith(todayValue().slice(0, 7))).length} paiement(s)`} color="bg-green-50 text-green-600" />
        <SummaryCard icon={CalendarClock} label="À encaisser sous 30 j" value={formatMoney(cashStats.upcomingAmount)} detail={`${cashStats.upcomingCount} échéance(s)`} color="bg-blue-50 text-blue-600" />
        <SummaryCard icon={AlertTriangle} label="Impayés" value={formatMoney(cashStats.overdueAmount)} detail={`${cashStats.overdueCount} abonnement(s) en retard`} color="bg-red-50 text-red-600" />
        <SummaryCard icon={WalletCards} label="Revenu contractuel" value={formatMoney(totals.projectedAnnual)} detail="Projection annualisée" color="bg-orange-50 text-orange-600" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={CalendarClock} label="Abonnements annuels" value={totals.annualCount} detail={formatMoney(totals.annualAmount)} color="bg-blue-50 text-blue-600" />
        <SummaryCard icon={RefreshCw} label="Abonnements mensuels" value={totals.monthlyCount} detail={`${formatMoney(totals.monthlyAmount)} / mois`} color="bg-purple-50 text-purple-600" />
        <SummaryCard icon={Gift} label="Périodes offertes" value={`${totals.offeredMonths} mois`} detail={`${totals.offeredCount} abonnement${totals.offeredCount === 1 ? "" : "s"} concerné${totals.offeredCount === 1 ? "" : "s"}`} color="bg-pink-50 text-pink-600" />
        <SummaryCard icon={AlertCircle} label="Actions requises" value={cashStats.attentionCount} detail="Retards, échéances ou données" color="bg-yellow-50 text-yellow-700" />
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        <div className="flex items-start gap-2">
          <AlertCircle size={17} className="mt-0.5 flex-shrink-0" />
          <p>Indiquez seulement le nom, l’e-mail ou l’URL du compte lié. Ne stockez jamais de mot de passe, token ou clé API dans ce tracker.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un client ou un compte…" className={`${inputClass} pl-9`} />
        </div>
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className={`${inputClass} sm:w-56`}>
          <option value="all">Tous les abonnements</option>
          <option value="attention">Action requise</option>
          <option value="overdue">En retard</option>
          <option value="soon">Échéance sous 30 jours</option>
          <option value="offer">Période offerte</option>
          <option value="active">Actifs</option>
          <option value="incomplete">À compléter</option>
          <option value="archived">Archivés</option>
        </select>
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={17} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {warning && (
        <div role="status" className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle size={17} className="mt-0.5 flex-shrink-0" />
          <span>{warning}</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-400">
          <Loader2 size={18} className="animate-spin" /> Chargement des abonnements…
        </div>
      ) : (
        <div className="space-y-3">
          {visiblePortfolio.map(({ subscription, payments: subscriptionPayments, nextDue, status }) => {
            const key = subscription.id || subscription.localKey;
            const schedule = calculateSchedule(subscription);
            const paymentStartDate = schedule.paymentStartDate;
            const endDate = schedule.endDate;
            const isExpanded = expanded === key;
            return (
              <div key={key} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-5">
                  <button onClick={() => setExpanded(isExpanded ? null : key)} className="flex min-w-[220px] flex-1 items-center gap-3 text-left">
                    {isExpanded ? <ChevronUp size={17} className="text-gray-400" /> : <ChevronDown size={17} className="text-gray-400" />}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{subscription.client_name || "Nouvel abonnement"}</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {subscription.billing_cycle === "monthly" ? "Mensuel" : "Annuel"} · {formatMoney(subscription.amount_gnf)}
                      </p>
                      {subscription.start_date && (
                        <p className="mt-0.5 text-xs text-gray-400">
                          Prochaine échéance : {formatDate(nextDue)} · Fin contractuelle : {formatDate(endDate)}
                        </p>
                      )}
                    </div>
                  </button>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}>{status.label}</span>
                  {Number(subscription.free_months || 0) > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700">
                      <Gift size={12} /> +{subscription.free_months} mois offert{Number(subscription.free_months) > 1 ? "s" : ""}
                    </span>
                  )}
                  <button onClick={() => remove(subscription)} aria-label={`Supprimer ${subscription.client_name || "l’abonnement"}`} className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="space-y-5 border-t border-gray-100 px-4 py-5 sm:px-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField label="Client / solution">
                        <TextInput value={subscription.client_name} onChange={(value) => update(key, "client_name", value)} placeholder="Ex. NassFit" />
                      </FormField>
                      <FormField label="Cycle de facturation">
                        <select value={subscription.billing_cycle} onChange={(event) => update(key, "billing_cycle", event.target.value)} className={inputClass}>
                          <option value="annual">Annuel</option>
                          <option value="monthly">Mensuel</option>
                        </select>
                      </FormField>
                      <FormField label="Mois offerts au démarrage" hint="Période gratuite comptée depuis le déploiement">
                        <select value={subscription.free_months ?? 0} onChange={(event) => update(key, "free_months", Number(event.target.value))} className={inputClass}>
                          {[0, 1, 2, 3, 4, 5, 6].map((months) => (
                            <option key={months} value={months}>{formatFreeMonths(months)}</option>
                          ))}
                        </select>
                      </FormField>
                      <div className="hidden md:block" />
                      <FormField label="Compte Vercel / Supabase lié" hint="Nom, e-mail ou URL — jamais de secret">
                        <div className="relative">
                          <Server size={15} className="absolute left-3 top-3 text-gray-400" />
                          <input type="text" value={subscription.vercel_supabase_account || ""} onChange={(event) => update(key, "vercel_supabase_account", event.target.value)} placeholder="Projet Vercel, Supabase ou URL" className={`${inputClass} pl-9`} />
                        </div>
                      </FormField>
                      <FormField label="Serveur hybride / managé lié" hint="Nom, e-mail ou URL — jamais de secret">
                        <div className="relative">
                          <Server size={15} className="absolute left-3 top-3 text-gray-400" />
                          <input type="text" value={subscription.managed_server_account || ""} onChange={(event) => update(key, "managed_server_account", event.target.value)} placeholder="Serveur ou hébergeur associé" className={`${inputClass} pl-9`} />
                        </div>
                      </FormField>
                      <FormField label="Date de déploiement" hint="Premier jour de la période offerte">
                        <input type="date" value={subscription.start_date || ""} onChange={(event) => update(key, "start_date", event.target.value)} className={inputClass} />
                      </FormField>
                      <FormField label="Début du paiement" hint={`${formatFreeMonths(subscription.free_months)} après le déploiement`}>
                        <input type="date" value={paymentStartDate} readOnly className={`${inputClass} cursor-not-allowed bg-orange-50 text-orange-800`} />
                      </FormField>
                      <FormField label="Date de fin" hint={`${subscription.billing_cycle === "monthly" ? "1 mois" : "12 mois"} après le début du paiement`}>
                        <input type="date" value={endDate} readOnly className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-700`} />
                      </FormField>
                      <FormField label="Montant (GNF)" hint="Saisissez le montant sans séparateur">
                        <input type="number" min="0" step="1" value={subscription.amount_gnf ?? ""} onChange={(event) => update(key, "amount_gnf", event.target.value)} placeholder="500000" className={inputClass} />
                      </FormField>
                      <div className="flex items-end pb-2">
                        <Toggle checked={subscription.active !== false} onChange={(value) => update(key, "active", value)} label="Abonnement actif et inclus dans les totaux" />
                      </div>
                    </div>
                    <FormField label="Notes internes">
                      <TextArea value={subscription.notes} onChange={(value) => update(key, "notes", value)} placeholder="Informations de suivi, renouvellement, contact…" rows={3} />
                    </FormField>
                    {subscription.id && (
                      <SubscriptionPaymentsPanel
                        subscription={subscription}
                        payments={subscriptionPayments}
                        suggestedDueDate={nextDue}
                        onUpsert={upsertPayment}
                        onDelete={(paymentId) => setPayments((previous) => previous.filter((payment) => payment.id !== paymentId))}
                        onError={(message) => setError(message)}
                      />
                    )}
                    <div className="flex justify-end border-t border-gray-100 pt-4">
                      <SaveButton loading={saving === key} saved={saved === key} onClick={() => save(subscription)} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {visiblePortfolio.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <CalendarClock size={30} className="mx-auto text-gray-300" />
              <p className="mt-3 text-sm font-medium text-gray-600">Aucun abonnement trouvé</p>
              <p className="mt-1 text-xs text-gray-400">Modifiez les filtres ou ajoutez un abonnement.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
