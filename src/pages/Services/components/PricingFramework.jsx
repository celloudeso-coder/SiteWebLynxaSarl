import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import PlanInquiryModal from "./PlanInquiryModal";

const PricingFramework = () => {
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planInfo, setPlanInfo] = useState(null);

  const handleStart = (plan) => {
    setPlanInfo(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPlanInfo(null);
  };

  const pricingPlans = [
    {
      id: "starter",
      name: "Pack Startup",
      price: " 700 $",
      period: "À partir de",
      description:
        "Parfait pour les petites entreprises et startups cherchant à établir leur présence numérique.",
      features: [
        "Site web ou application mobile de base",
        "Jusqu'à 5 pages/écrans",
        "Design responsive",
        "Optimisation SEO de base",
        "3 mois de support",
      ],
      popular: false,
      color: "gray",
    },
    {
      id: "professional",
      name: "Suite Professionnelle",
      price: "3 500 $",
      period: "À partir de",
      description:
        "Solution complète pour les entreprises en croissance avec des fonctionnalités avancées et des intégrations.",
      features: [
        "Application web/mobile personnalisée",
        "Fonctionnalités avancées",
        "Intégration de base de données",
        "Développement d'API",
        "Mise en œuvre de la sécurité",
        "6 mois de support",
        "Formation incluse",
        "Optimisation des performances",
      ],
      popular: true,
      color: "primary",
    },
    {
      id: "enterprise",
      name: "Solution Entreprise",
      price: "Sur devis",
      period: "Sur mesure",
      description:
        "Solutions sur mesure pour les grandes organisations avec des exigences complexes et des besoins d'évolutivité.",
      features: [
        "Développement de système à grande échelle",
        "Multiples intégrations",
        "Fonctionnalités de sécurité avancées",
        "Architecture évolutive",
        "Chef de projet dédié",
        "12 mois de support",
        "Programme de formation du personnel",
        "Maintenance continue",
      ],
      popular: false,
      color: "accent",
    },
  ];

  const additionalServices = [
    {
      name: "Installation d'Infrastructure Réseau",
      price: "1 500 $ - 5 000 $ ou plus",

      el: [
        "Câblage",
        "Installation des équipements",
        "Configuration",
        "Documentation",
      ],

      icon: "Wifi",
    },
    {
      name: "Mise en place d’un système complet de supervision et d’inventaire des équipements réseau",
      price: "900 $ - 2 500 $",
      el: [
        "Détection proactive des vulnérabilités et anomalies réseau.",
        "Recommandations techniques alignées sur vos priorités et votre budget.",
        "Rapports détaillés, clairs et immédiatement exploitables par vos équipes.",
        "",
      ],
      icon: "Activity",
    },
    {
      name: "Migration de Système",
      price: "1 250 $ - 4 000 $",
      el: [
        "Zéro perte de données.",
        "Transition rapide et planifiée.",
        "Formation pour faciliter l’adoption par vos équipes.",
        "",
      ],
      icon: "ArrowRightLeft",
    },
    {
      name: "Optimisation des Performances",
      price: "500 $ - 2 000 $",
      el: [
        "Temps de réponse améliorés.",
        "Moins de pannes et d’interruptions.",
        "Meilleure productivité pour vos équipes.",
        "",
      ],
      icon: "Zap",
    },
    {
      name: "Programme de Formation du Personnel",
      price: "350 $ - 1 500 $",
      el: [
        "Sessions adaptées à votre secteur.",
        "Modules pratiques et interactifs.",
        "Certificats de participation valorisants.",
        "",
      ],
      icon: "GraduationCap",
    },
    {
      name: "Maintenance Continue",
      price: "100 $ - 500 $/mois",
      el: [
        "100 $ (support email + basic updates)",
        "300 $ (monitoring + remote intervention)",
        "500 $ (support complet + on-site intervention)",
        "",
      ],
      icon: "Settings",
    },
  ];

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
          {pricingPlans?.map((plan) => (
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
                  <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold">
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
                    <span className="text-4xl font-bold text-primary">
                      {plan?.price}
                    </span>
                    <span className="text-gray-500 ml-2">{plan?.period}</span>
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
                  {plan?.price === "Custom" ? "Obtenir un devis" : "Demarrer"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-6 text-center">
            Services Additionnels
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices?.map((service, index) => (
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
                  <p className="text-sm text-gray-600">{service?.price}</p>
                  {/* Affichage des éléments de el */}
                  {service?.el?.filter(Boolean).length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-xs text-gray-500">
                      {service.el.filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
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
