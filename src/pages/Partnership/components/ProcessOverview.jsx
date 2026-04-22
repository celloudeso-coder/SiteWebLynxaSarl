import React from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";

const ProcessOverview = () => {
  const processSteps = [
    {
      id: 1,
      title: "Découverte et Consultation",
      description:
        "Nous commençons par une discussion approfondie pour comprendre vos besoins commerciaux, vos exigences techniques et les objectifs du projet.",
      icon: "Search",
      duration: "1-3 jours",
      deliverables: [
        "Analyse des besoins",
        "Étude de faisabilité technique",
        "Portée initiale du projet",
        "Évaluation des risques",
      ],
      color: "primary",
    },
    {
      id: 2,
      title: "Proposition et Planification",
      description:
        "Sur la base de notre découverte, nous créons une proposition détaillée avec calendrier, budget et spécifications techniques.",
      icon: "FileText",
      duration: "2-5 jours",
      deliverables: [
        "Proposition de projet détaillée",
        "Architecture technique",
        "Calendrier et jalons",
        "Répartition de l'investissement",
      ],
      color: "accent",
    },
    {
      id: 3,
      title: "Accord et Lancement",
      description:
        "Une fois approuvé, nous finalisons l'accord et lançons le projet avec votre équipe dédiée.",
      icon: "Handshake",
      duration: "1-2 jours",
      deliverables: [
        "Accord signé",
        "Réunion de lancement du projet",
        "Présentation de l'équipe",
        "Protocoles de communication",
      ],
      color: "primary",
    },
    {
      id: 4,
      title: "Développement et Mise en œuvre",
      description:
        "Notre équipe d'experts commence le développement avec des mises à jour régulières et des revues de jalons tout au long du processus.",
      icon: "Code",
      duration: "Selon le projet",
      deliverables: [
        "Mises à jour régulières de l'avancement",
        "Démonstrations des jalons",
        "Tests d'assurance qualité",
        "Intégration des retours clients",
      ],
      color: "accent",
    },
    {
      id: 5,
      title: "Tests et Assurance Qualité",
      description:
        "Des tests complets garantissent que votre solution répond à toutes les exigences et fonctionne de manière optimale.",
      icon: "CheckCircle",
      duration: "1-2 semaines",
      deliverables: [
        "Tests complets",
        "Optimisation des performances",
        "Validation de la sécurité",
        "Tests d'acceptation utilisateur",
      ],
      color: "primary",
    },
    {
      id: 6,
      title: "Déploiement et Support",
      description:
        "Nous prenons en charge le déploiement et fournissons un support continu pour garantir que votre solution continue de bien fonctionner.",
      icon: "Rocket",
      duration: "En cours",
      deliverables: [
        "Déploiement en production",
        "Formation des utilisateurs",
        "Documentation",
        "Plan de support continu",
      ],
      color: "accent",
    },
  ];

  const supportOptions = [
    {
      title: "Support d'Urgence 24/7",
      description: "Résolution des problèmes critiques sous 2 heures",
      icon: "AlertTriangle",
      included: ["Enterprise", "International"],
    },
    {
      title: "Maintenance Régulière",
      description: "Mises à jour programmées et optimisation des performances",
      icon: "Settings",
      included: ["Tous les forfaits"],
    },
    {
      title: "Mises à Jour Fonctionnalités",
      description: "Nouvelles fonctionnalités et améliorations",
      icon: "Plus",
      included: ["Enterprise", "International"],
    },
    {
      title: "Formation et Documentation",
      description: "Formation des utilisateurs et documentation complète",
      icon: "BookOpen",
      included: ["Tous les forfaits"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Notre Processus de Projet Éprouvé
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De la consultation initiale au support continu, nous suivons une
            approche structurée qui garantit le succès du projet et la
            satisfaction du client.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          {/* <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-20"></div> */}

          <div className="space-y-12">
            {processSteps?.map((step, index) => (
              <div
                key={step?.id}
                className={`flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1 lg:px-8">
                  <div
                    className={`bg-surface rounded-2xl p-8 ${
                      index % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                          step?.color === "primary" ? "bg-primary" : "bg-accent"
                        } glow-orange`}
                      >
                        <Icon name={step?.icon} size={28} color="white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">
                          Durée
                        </div>
                        <div className="font-semibold text-secondary">
                          {step?.duration}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-secondary mb-3">
                      {step?.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step?.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-secondary mb-3">
                        Livrables clés :
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {step?.deliverables?.map((deliverable, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <Icon
                              name="Check"
                              size={16}
                              color="var(--color-primary)"
                            />
                            <span className="text-sm text-muted-foreground">
                              {deliverable}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Number */}
                <div className="hidden lg:flex w-16 h-16 bg-white border-4 border-primary rounded-full items-center justify-center relative z-10 flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">
                    {step?.id}
                  </span>
                </div>

                {/* Mobile Step Number */}
                <div className="lg:hidden w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                  <span className="text-lg font-bold text-white">
                    {step?.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
              Support et maintenance continues
            </h3>
            <p className="text-lg text-muted-foreground">
              Votre succès ne s'arrête pas au déploiement. Nous offrons un
              support complet pour garantir que votre solution continue
              d'apporter de la valeur.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions?.map((option, index) => (
              <div
                key={index}
                className="bg-surface rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 glow-orange">
                  <Icon name={option?.icon} size={24} color="white" />
                </div>
                <h4 className="font-semibold text-secondary mb-2">
                  {option?.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {option?.description}
                </p>

                <div className="text-xs text-primary font-medium">
                  Inclus dans : {option?.included?.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Discutons de vos besoins et créons une solution personnalisée pour
              votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                  Planifier une consultation
                </button>
              </Link>
              <Link to="/portfolio">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200">
                  Voir le portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;
