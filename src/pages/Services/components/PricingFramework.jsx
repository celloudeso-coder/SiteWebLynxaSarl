import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import PlanInquiryModal from "./PlanInquiryModal";
import { usePricingPlans } from "../../../hooks/useContent";
import { PRICING_PLANS, ADDITIONAL_SERVICES, formatDualPrice, formatDualRange } from "../../../data/pricing";

const PricingFramework = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planInfo, setPlanInfo] = useState(null);
  const { data: cmsPricing } = usePricingPlans();

  const handleStart = (plan) => {
    setPlanInfo(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPlanInfo(null);
  };

  // Les plans CMS ("pricing_plans") portent leur prix en GNF (price_gnf) ;
  // l'équivalent USD est dérivé à l'affichage. À défaut (lignes existantes
  // non encore renseignées, ou "Sur devis"), on retombe sur le texte brut
  // déjà stocké dans "price" plutôt que d'afficher un montant inventé.
  const pricingPlans = cmsPricing && cmsPricing.length > 0
    ? cmsPricing.map((p) => ({
        id: p.id,
        name: p.name,
        priceGnf: p.price_gnf != null ? Number(p.price_gnf) : null,
        priceFallbackText: p.price,
        period: p.price_note || "À partir de",
        description: "",
        features: Array.isArray(p.features) ? p.features : [],
        popular: p.is_popular,
        color: p.is_popular ? "primary" : "gray",
      }))
    : PRICING_PLANS;

  const additionalServices = ADDITIONAL_SERVICES;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Tarification Transparente
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des tarifs clairs et compétitifs sans coûts cachés. Tous les
            forfaits incluent un support complet et une documentation.
          </p>
        </div>

        {/* Main Pricing Plans */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans?.map((plan) => {
            const dual = plan?.priceGnf != null ? formatDualPrice(plan.priceGnf) : null;
            const isQuote = !dual && !plan?.priceFallbackText?.match(/\d/); // "Sur devis" ou équivalent, sans chiffre
            return (
            <div
              key={plan?.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                selectedPlan === plan.id
                  ? "border-primary shadow-2xl glow-orange scale-105"
                  : "border-gray-200 hover:border-primary/50 hover:shadow-xl"
              }`}
              onClick={() => setSelectedPlan(plan?.id)}
            >
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold">
                    Le Plus Populaire
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-heading font-bold text-secondary mb-2">
                    {plan?.name}
                  </h3>
                  <div className="mb-4">
                    {dual ? (
                      <>
                        <div className="text-3xl font-bold text-primary-strong">{dual.primary}</div>
                        <div className="text-sm text-gray-500">{dual.secondary}</div>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-primary-strong">
                        {plan?.priceFallbackText || plan?.price || "Sur devis"}
                      </span>
                    )}
                    <span className="text-gray-500 ml-2 block mt-1">{plan?.period}</span>
                  </div>
                  <p className="text-gray-600">{plan?.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon name="CheckCircle" size={20} color="#10B981" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={selectedPlan === plan?.id ? "default" : "outline"}
                  size="lg"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  className={plan?.popular ? "glow-orange" : ""}
                  onClick={() => handleStart(plan)}
                >
                  {isQuote ? "Obtenir un devis" : "Demarrer"}
                </Button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-6 text-center">
            Services Additionnels
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices?.map((service, index) => {
              const dual = formatDualRange(service.priceMinGnf, service.priceMaxGnf);
              return (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={service?.icon} size={24} color="#FF8C00" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">
                    {service?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {dual.primary}{service.priceNote ? ` ${service.priceNote}` : ""}
                  </p>
                  <p className="text-xs text-gray-400">{dual.secondary}</p>
                  {service?.el?.filter(Boolean).length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-xs text-gray-500">
                      {service.el.filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Payment Terms */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
              Modalités de Paiement Flexibles
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center space-x-3">
                <Icon name="CreditCard" size={24} color="#FF8C00" />
                <div>
                  <h4 className="font-semibold text-secondary">
                    50% d'Acompte
                  </h4>
                  <p className="text-sm text-gray-600">Lancement du projet</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={24} color="#FF8C00" />
                <div>
                  <h4 className="font-semibold text-secondary">
                    Paiements par Étapes
                  </h4>
                  <p className="text-sm text-gray-600">
                    Facturation basée sur la progression
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={24} color="#FF8C00" />
                <div>
                  <h4 className="font-semibold text-secondary">
                    Paiement Final
                  </h4>
                  <p className="text-sm text-gray-600">À la fin du projet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal du formulaire */}
      {isModalOpen && <PlanInquiryModal plan={planInfo} onClose={closeModal} />}
    </section>
  );
};

export default PricingFramework;
