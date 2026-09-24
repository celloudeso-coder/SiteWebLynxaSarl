import React, { useState, useEffect } from "react";
import { getPricingPlans, savePricingPlan, deletePricingPlan } from "../../../lib/cms";
import { FormField, TextInput, Toggle, JsonArrayEditor } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp, Star } from "lucide-react";
import { formatDualPrice, roundGnfToCommercialTier } from "../../../data/pricing";

const emptyPlan = {
  sort_order: 0, active: true, name: "", price: "", price_gnf: null, price_note: "",
  is_popular: false, features: [], cta_text: "Demander un devis",
};

export default function PricingAdmin() {
  const [plans, setPlans] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getPricingPlans(false);
    setPlans(data || []);
  }

  function update(id, field, value) {
    setPlans((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
    setSaved(null);
  }

  // Le toggle de la liste enregistre immédiatement (maj optimiste + rollback si échec)
  async function toggleActive(plan, value) {
    setPlans((prev) => prev.map((p) => (p.id === plan.id ? { ...p, active: value } : p)));
    setSaving(plan.id);
    try {
      const updated = await savePricingPlan({ ...plan, active: value });
      setPlans((prev) => prev.map((p) => (p.id === plan.id ? updated : p)));
    } catch (e) {
      setPlans((prev) => prev.map((p) => (p.id === plan.id ? { ...p, active: plan.active } : p)));
      alert("Échec de l'enregistrement du statut. Vérifiez la connexion à Supabase.");
    } finally {
      setSaving(null);
    }
  }

  async function save(plan) {
    setSaving(plan.id);
    try {
      const updated = await savePricingPlan({ ...plan, price_gnf: roundGnfToCommercialTier(plan.price_gnf) });
      setPlans((prev) => prev.map((p) => p.id === plan.id ? updated : p));
      setSaved(plan.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await savePricingPlan({ ...emptyPlan, sort_order: plans.length + 1 });
    setPlans((prev) => [...prev, created]);
    setExpanded(created.id);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce plan ?")) return;
    await deletePricingPlan(id);
    setPlans((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Tarifs</h1>
          <p className="text-gray-500 text-sm mt-0.5">Plans et grilles tarifaires</p>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                onClick={() => setExpanded(expanded === plan.id ? null : plan.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                {expanded === plan.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                {plan.is_popular && <Star size={14} className="text-orange-400 fill-orange-400" />}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{plan.name || "Nouveau plan"}</p>
                  <p className="text-xs text-gray-500">
                    {plan.price_gnf != null ? formatDualPrice(Number(plan.price_gnf))?.primary : (plan.price || "—")} {plan.price_note}
                  </p>
                </div>
              </button>
              <Toggle checked={plan.active} onChange={(v) => toggleActive(plan, v)} />
              <button onClick={() => remove(plan.id)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 size={16} />
              </button>
            </div>

            {expanded === plan.id && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Nom du plan">
                    <TextInput value={plan.name} onChange={(v) => update(plan.id, "name", v)} placeholder="Pack Startup" />
                  </FormField>
                  <FormField
                    label="Prix (GNF)"
                    hint="Arrondi à l'enregistrement : 100 000 GNF sous 5 M, 500 000 GNF au-dessus. L'équivalent USD est calculé. Vide = « Sur devis »."
                  >
                    <TextInput
                      type="number"
                      value={plan.price_gnf ?? ""}
                      onChange={(v) => update(plan.id, "price_gnf", v === "" ? null : Number(v))}
                      placeholder="4500000"
                    />
                    {plan.price_gnf != null && (
                      <p className="text-xs text-gray-400 mt-1">
                        Affiché : {formatDualPrice(roundGnfToCommercialTier(plan.price_gnf)).primary} ({formatDualPrice(roundGnfToCommercialTier(plan.price_gnf)).secondary})
                      </p>
                    )}
                  </FormField>
                  <FormField label="Prix (texte, repli)" hint="Affiché seulement si « Prix (GNF) » est vide, ex. Sur devis">
                    <TextInput value={plan.price} onChange={(v) => update(plan.id, "price", v)} placeholder="Sur devis" />
                  </FormField>
                  <FormField label="Note de prix" hint="Ex: prix de départ, par mois…">
                    <TextInput value={plan.price_note} onChange={(v) => update(plan.id, "price_note", v)} />
                  </FormField>
                  <FormField label="Texte du bouton">
                    <TextInput value={plan.cta_text} onChange={(v) => update(plan.id, "cta_text", v)} placeholder="Demander un devis" />
                  </FormField>
                </div>
                <Toggle
                  checked={plan.is_popular}
                  onChange={(v) => update(plan.id, "is_popular", v)}
                  label="Mettre en avant (badge Populaire)"
                />
                <FormField label="Fonctionnalités incluses">
                  <JsonArrayEditor
                    value={plan.features}
                    onChange={(v) => update(plan.id, "features", v)}
                    placeholder="Ajouter une fonctionnalité"
                  />
                </FormField>
                <div className="flex justify-end pt-2">
                  <SaveButton loading={saving === plan.id} saved={saved === plan.id} onClick={() => save(plan)} />
                </div>
              </div>
            )}
          </div>
        ))}
        {plans.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucun plan tarifaire.</div>
        )}
      </div>
    </div>
  );
}
