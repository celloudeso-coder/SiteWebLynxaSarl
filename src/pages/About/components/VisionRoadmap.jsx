import React from "react";
import Icon from "../../../components/AppIcon";

const VisionRoadmap = () => {
  const roadmapPhases = [
    {
      phase: "Phase 1",
      timeline: "2025 - 2027",
      title: "Expansion en Afrique de l'Ouest",
      status: "En cours",
      description:
        "Établir des partenariats stratégiques et des bureaux dans les principaux marchés d'Afrique de l'Ouest pour servir la région CEDEAO.",
      goals: [
        "Ouvrir des bureaux au Sénégal et en Côte d'Ivoire",
        "S'associer à 10+ entreprises technologiques locales",
        "Lancer des services en français et en anglais",
        "Atteindre 100... 500 clients régionaux et internationaux",
      ],
      markets: ["Sénégal", "Côte d'Ivoire", "Mali"],
      icon: "MapPin",
      color: "bg-primary",
    },
    {
      phase: "Phase 2",
      timeline: "2027 - 2028",
      title: "Présence Continentale",
      status: "Planifiée",
      description:
        "S'étendre à travers l'Afrique en mettant l'accent sur les marchés de l'Est et du Sud de l'Afrique, établissant Lynxa Tech comme un leader technologique panafricain.",
      goals: [
        "Entrer sur 5 nouveaux marchés africains",
        "Lancer une plateforme d'intégration de mobile money",
        "Établir des laboratoires d'innovation dans 3 pays",
        "Atteindre 500+ clients continentaux",
      ],
      markets: ["Kenya", "Nigeria", "Ghana", "Afrique du Sud", "Maroc"],
      icon: "Globe",
      color: "bg-accent",
    },
    {
      phase: "Phase 3",
      timeline: "2028 - 2030",
      title: "Reconnaissance Globale",
      status: "Vision",
      description:
        "Obtenir une reconnaissance internationale en tant qu'entreprise technologique leader d'Afrique, en concurrence mondiale tout en conservant nos racines africaines.",
      goals: [
        "IPO ou opportunité d'acquisition majeure",
        "Clients Fortune 500 à l'international",
        "Prix internationaux d'innovation",
        "1000+ employés à travers les continents",
      ],
      markets: ["Europe", "Amérique du Nord", "Asie", "Moyen-Orient"],
      icon: "Trophy",
      color: "bg-success",
    },
  ];

  const visionPillars = [
    {
      icon: "Rocket",
      title: "Leadership en Innovation",
      description:
        "Devenir l'entreprise technologique la plus innovante d'Afrique, définissant les standards pour l'industrie tech mondiale.",
    },
    {
      icon: "Users",
      title: "Développement des Talents",
      description:
        "Créer 1000+ emplois technologiques de qualité et former 10 000+ développeurs à travers l'Afrique d'ici 2030.",
    },
    {
      icon: "Building",
      title: "Construction d'Écosystème",
      description:
        "Établir des hubs technologiques et des centres d'innovation qui nourrissent la prochaine génération d'entrepreneurs africains.",
    },
    {
      icon: "Handshake",
      title: "Partenariats Globaux",
      description:
        "Former des alliances stratégiques avec des géants technologiques internationaux tout en conservant notre identité et nos valeurs africaines.",
    },
  ];

  const impactMetrics = [
    {
      current: "7+",
      target: "25+",
      label: "Membres de l'équipe",
      icon: "Users",
    },
    {
      current: "1",
      target: "20+",
      label: "Pays",
      icon: "MapPin",
    },
    {
      current: "6+",
      target: "500+",
      label: "Clients",
      icon: "Briefcase",
    },
    {
      current: "0+",
      target: "1K+",
      label: "Vies impactées",
      icon: "Heart",
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Vision 2027 : Construire l’avenir technologique de l’Afrique
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Notre feuille de route stratégique pour devenir l'entreprise
            technologique leader en Afrique tout en conservant nos racines et
            valeurs guinéennes 
          </p>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-sunset rounded-2xl p-8 text-white mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
            <blockquote className="text-xl italic mb-6 max-w-4xl mx-auto">
              " Être le pont qui relie l'expertise africaine aux opportunités
              mondiales, prouvant que des entreprises technologiques de classe
              mondiale peuvent émerger de n'importe où et concurrencer
              partout. "
            </blockquote>
            {/*<p className="text-white/80 max-w-2xl mx-auto">
              D'ici 2030, Lynxa Tech sera reconnue comme la principale
              entreprise technologique d'Afrique de l'Ouest, servant des clients à
              l'échelle mondiale tout en créant des milliers d'opportunités à
              travers le continent.
            </p>*/}
          </div>
        </div>

        {/* Roadmap Phases */}
        <div className="space-y-12 mb-16">
          {roadmapPhases?.map((phase, index) => (
            <div key={index} className="relative">
              {/* Timeline Line */}
              {index < roadmapPhases?.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-32 bg-primary/20"></div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                {/* Phase Icon & Timeline */}
                <div className="flex-shrink-0 mb-6 lg:mb-0">
                  <div
                    className={`w-12 h-12 ${phase?.color} rounded-full flex items-center justify-center mb-2`}
                  >
                    <Icon name={phase?.icon} size={24} color="white" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-primary">
                      {phase?.phase}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {phase?.timeline}
                    </div>
                  </div>
                </div>

                {/* Phase Content */}
                <div className="flex-1 bg-white rounded-xl p-6 shadow-medium">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-secondary">
                      {phase?.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        phase?.status === "In Progress"
                          ? "bg-primary/10 text-primary"
                          : phase?.status === "Planned"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {phase?.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {phase?.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Goals */}
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">
                         Objectifs clés 
                      </h4>
                      <div className="space-y-2">
                        {phase?.goals?.map((goal, goalIndex) => (
                          <div
                            key={goalIndex}
                            className="flex items-start space-x-2"
                          >
                            <Icon
                              name="CheckCircle"
                              size={16}
                              color="var(--color-success)"
                              className="mt-0.5 flex-shrink-0"
                            />
                            <span className="text-sm text-muted-foreground">
                              {goal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Markets */}
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">
                         Marchés cibles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {phase?.markets?.map((market, marketIndex) => (
                          <span
                            key={marketIndex}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vision Pillars */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary mb-2">
               Les quatre piliers de notre vision
            </h3>
            <p className="text-muted-foreground">
               Les éléments fondamentaux qui guideront notre succès 
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionPillars?.map((pillar, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center card-hover"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name={pillar?.icon}
                    size={24}
                    color="var(--color-primary)"
                  />
                </div>
                <h4 className="font-bold text-secondary mb-3">
                  {pillar?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {pillar?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="bg-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              Trajectoire de croissance
            </h3>
            <p className="text-muted-foreground">
              De notre situation actuelle à nos ambitions pour 2027 
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics?.map((metric, index) => (
              <div
                key={index}
                className="text-center p-4 bg-surface rounded-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon
                    name={metric?.icon}
                    size={24}
                    color="var(--color-primary)"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-lg font-bold text-muted-foreground">
                      {metric?.current}
                    </div>
                    <div className="text-xs text-muted-foreground">Current</div>
                  </div>
                  <Icon
                    name="ArrowDown"
                    size={16}
                    color="var(--color-primary)"
                    className="mx-auto"
                  />
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {metric?.target}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Objectif 2027
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-secondary mt-2">
                  {metric?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
       {/* <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Rejoignez notre aventure
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Faites partie de l’histoire technologique la plus ambitieuse
              d’Afrique. Que vous soyez client, partenaire ou membre de
              l’équipe, il y a une place pour vous dans notre vision
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                <Icon name="Users" size={20} className="mr-2" />
                Rejoignez notre équipe 
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors duration-200">
                <Icon name="Handshake" size={20} className="mr-2" />
                 Devenez notre partenaire
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors duration-200">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                 Investissez dans notre vision 
              </button>
            </div>
          </div>
        </div>*/}
      </div>
    </section>
  );
};

export default VisionRoadmap;
