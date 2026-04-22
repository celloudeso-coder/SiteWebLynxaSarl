 import React from "react";
import Icon from "../../../components/AppIcon";

const ProcessTimeline = () => {
  const processSteps = [
    {
      id: 1,
      title: "Découverte & Analyse",
      description:
        "Nous plongeons en profondeur dans vos exigences commerciales, contraintes techniques et objectifs de croissance pour créer une feuille de route complète du projet.",
      icon: "Search",
      duration: "1-2 semaines",
      deliverables: [
        "Document des Exigences",
        "Spécification Technique",
        "Calendrier du Projet",
      ],
    },
    {
      id: 2,
      title: "Conception & Architecture",
      description:
        "Notre équipe crée une architecture système détaillée, des conceptions d'expérience utilisateur et des plans techniques adaptés à vos besoins spécifiques.",
      icon: "Layers",
      duration: "2-3 semaines",
      deliverables: [
        "Architecture Système",
        "Conceptions UI/UX",
        "Schéma de Base de Données",
      ],
    },
    {
      id: 3,
      title: "Développement & Tests",
      description:
        "Le développement Agile avec des tests continus assure des livrables de haute qualité avec des retours clients réguliers et des améliorations itératives.",
      icon: "Code",
      duration: "4-12 semaines",
      deliverables: [
        "Logiciel Fonctionnel",
        "Rapports de Test",
        "Documentation",
      ],
    },
    {
      id: 4,
      title: "Déploiement & Support",
      description:
        "Déploiement transparent avec formation complète et support continu pour garantir que votre équipe puisse maximiser le potentiel de la solution.",
      icon: "Rocket",
      duration: "1-2 semaines",
      deliverables: [
        "Système en Production",
        "Matériel de Formation",
        "Plan de Support",
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Notre Processus Éprouvé
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Du concept au déploiement, nous suivons une approche structurée qui
            assure le succès du projet et la satisfaction du client. À noter que la durée varie en fonction du type de projet.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full"></div>

          <div className="space-y-12 lg:space-y-16">
            {processSteps?.map((step, index) => (
              <div
                key={step?.id}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full lg:w-5/12 ${
                    index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 card-hover">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center glow-orange">
                        <Icon name={step?.icon} size={24} color="white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-secondary">
                          {step?.title}
                        </h3>
                        <span className="text-sm text-primary font-medium">
                          {step?.duration}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {step?.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-secondary mb-3">
                        Livrables Clés :
                      </h4>
                      <div className="space-y-2">
                        {step?.deliverables?.map((deliverable, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <Icon
                              name="CheckCircle"
                              size={16}
                              color="#10B981"
                            />
                            <span className="text-sm text-gray-700">
                              {deliverable}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:flex w-2/12 justify-start">
                  <div className="w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg glow-orange">
                    <span className="text-xl font-bold text-primary">
                      {step?.id}
                    </span>
                  </div>
                </div>

                {/* Mobile Timeline Node */}
                <div className="lg:hidden w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg glow-orange mb-6">
                  <span className="text-xl font-bold text-primary">
                    {step?.id}
                  </span>
                </div>

                {/* Spacer */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
