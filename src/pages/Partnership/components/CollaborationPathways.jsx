import React, { useState } from "react";

import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import PathwayInquiryModal from "./PathwayInquiryModal";

const CollaborationPathways = () => {
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (pathway) => {
    setSelectedPathway(pathway);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPathway(null);
  };

  const pathways = [
    {
      id: 1,
      title: "Partenariat Startup & PME",
      description:
        "Solutions sur mesure pour les entreprises en croissance avec des options de paiement flexibles et une technologie évolutive.",
      icon: "Rocket",
      features: [
        "Développement MVP",
        "Plans de Paiement Flexibles",
        "Solutions Axées sur la Croissance",
        "Support de Mentorat",
      ],
      idealFor: "Startups, Petites Entreprises, Entrepreneurs",
      timeline: "2-8 semaines estimées",
      budget: " 700 $ - 3 000 $",
      color: "primary",
    },
    {
      id: 2,
      title: "Solutions Entreprises",
      description:
        "Partenariats technologiques complets pour les grandes organisations avec des besoins complexes.",
      icon: "Building2",
      features: [
        "Systèmes Entreprises Personnalisés",
        "Support Prioritaire 24/7",
        "Chef de Projet Dédié",
        "Garanties SLA",
      ],
      idealFor: "Grandes Entreprises, Gouvernement, ONG",
      timeline: "3-12 mois estimés",
      budget: "3 500 $ - 10 000 $",
      color: "accent",
    },
    {
      id: 3,
      title: "Collaboration Internationale",
      description:
        "Partenariats transfrontaliers avec des organisations mondiales s’étendant sur les marchés africains.",
      icon: "Globe",
      features: [
        "Adaptation Culturelle",
        "Support Multilingue",
        "Expertise Marché Local",
        "Assistance Conformité",
      ],
      idealFor: "Entreprises Internationales, ONG Mondiales",
      timeline: "4-16 semaines estimées",
      budget: "15 000 $ - +",
      color: "primary",
    },
    {
      id: 4,
      title: "Réseau de Partenariat Technologique",
      description:
        "Alliances stratégiques avec d’autres entreprises technologiques pour une croissance et une collaboration mutuelles.",
      icon: "Network",
      features: [
        "Programmes de Revente",
        "Intégration Technologique",
        "Joint Ventures",
        "Partage de Connaissances",
      ],
      idealFor: "Entreprises Tech, Intégrateurs de Systèmes",
      timeline: "En Continu",
      budget: "Partage de Revenus",
      color: "accent",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Choisissez Votre Voie de Collaboration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous avons conçu des cadres de partenariat spécifiques pour répondre
            aux différents besoins des entreprises, aux tailles de projet et aux
            préférences de collaboration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {pathways?.map((pathway) => (
            <div
              key={pathway?.id}
              className="bg-white rounded-2xl p-8 shadow-medium hover:shadow-large transition-all duration-300 card-hover border border-border"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center ${pathway?.color === "primary" ? "bg-primary" : "bg-accent"
                    } glow-orange`}
                >
                  <Icon name={pathway?.icon} size={28} color="white" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">
                    Durée du projet
                  </div>
                  <div className="font-semibold text-secondary">
                    {pathway?.timeline}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-heading font-bold text-secondary mb-3">
                {pathway?.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {pathway?.description}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-secondary mb-2">
                    Fonctionnalités Clés:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pathway?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon
                          name="Check"
                          size={16}
                          color="var(--color-primary)"
                        />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Ideal Pour
                    </div>
                    <div className="text-sm font-medium text-secondary">
                      {pathway?.idealFor}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Plage de budget
                    </div>
                    <div className="text-sm font-medium text-secondary">
                      {pathway?.budget}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                className="glow-orange"
                onClick={() => openModal(pathway)}
              >
                Explorez cette voie
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Vous n’êtes pas sûr(e) du parcours qui correspond à vos besoins ?
            Discutons de vos besoins pour ce projet.
          </p>

          <Button
            variant="default"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            className="glow-orange"
          >
            Obtenez une consultation personnalisée
          </Button>
        </div>
      </div>

      {/*  Modal du formulaire */}
      {isModalOpen && (
        <PathwayInquiryModal pathway={selectedPathway} onClose={closeModal} />
      )}
    </section>
  );
};
export default CollaborationPathways;

