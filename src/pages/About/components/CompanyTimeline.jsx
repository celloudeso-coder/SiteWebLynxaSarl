import React from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";

const CompanyTimeline = () => {
  const timelineEvents = [
    {
      year: "2025",
      title: "Fondation & Premiers Pas",
      description:
        "Lynxa Tech a été fondée à Conakry avec pour vision de relier l'innovation africaine aux opportunités mondiales. Commencé avec 4 informaticiens passionnés.",
      icon: "Rocket",
      achievements: [
        "Enregistrement de l'entreprise",
        "Plateformes numériques réalisées",
        "Équipe initiale de 4",
      ],
      color: "bg-primary",
    },
    {
      /*{
      year: "2020",
      title: "Lancement de la Première Application Mobile",
      description:
        "Lancement réussi de notre première application mobile pour une ONG locale, établissant notre réputation pour le développement mobile de qualité.",
      icon: "Smartphone",
      achievements: [
        "5 applications mobiles livrées",
        "Premier client international",
        "Équipe portée à 8",
      ],
      color: "bg-accent",
    },
    {
      year: "2021",
      title: "Gains de Clients Majeurs",
      description:
        "Partenariats sécurisés avec trois grandes organisations internationales, prouvant notre capacité à fournir des solutions de niveau entreprise.",
      icon: "Trophy",
      achievements: [
        "15+ projets d'entreprise",
        "Certification ISO 27001",
        "Équipe portée à 15",
      ],
      color: "bg-success",
    },
    {
      year: "2022",
      title: "Expansion de l'Équipe & Reconnaissance",
      description:
        "Doublement de la taille de notre équipe et reconnaissance au Sommet Africain de l'Innovation Technologique pour notre contribution exceptionnelle à l'écosystème tech de Guinée.",
      icon: "Users",
      achievements: [
        "25+ membres dans l'équipe",
        "Prix de l'industrie",
        "Spécialisation en cybersécurité",
      ],
      color: "bg-warning",
    },
    {
      year: "2023",
      title: "Reconnaissance Internationale",
      description:
        "Mis en avant dans les principales publications tech et établi des partenariats en Afrique de l'Ouest, se positionnant pour une expansion régionale.",
      icon: "Globe",
      achievements: [
        "Base client sur 3 continents",
        "Partenariats régionaux",
        "Leadership d'opinion",
      ],
      color: "bg-primary",
    },
    {
      year: "2024",
      title: "Statut de Hub d'Innovation",
      description:
        "Devenu le principal hub d'innovation technologique de Guinée, lançant des programmes de mentorat et contribuant à l'écosystème local des startups.",
      icon: "Lightbulb",
      achievements: [
        "100+ développeurs mentorés",
        "Programmes d'innovation",
        "Impact communautaire",
      ],
      color: "bg-accent",
    }, */
    },
    // }
    // {/*{
    //   year: "2020",
    //   title: "Lancement de la Première Application Mobile",
    //   description:
    //     "Lancement réussi de notre première application mobile pour une ONG locale, établissant notre réputation pour le développement mobile de qualité.",
    //   icon: "Smartphone",
    //   achievements: [
    //     "5 applications mobiles livrées",
    //     "Premier client international",
    //     "Équipe portée à 8",
    //   ],
    //   color: "bg-accent",
    // },
    // {
    //   year: "2021",
    //   title: "Gains de Clients Majeurs",
    //   description:
    //     "Partenariats sécurisés avec trois grandes organisations internationales, prouvant notre capacité à fournir des solutions de niveau entreprise.",
    //   icon: "Trophy",
    //   achievements: [
    //     "15+ projets d'entreprise",
    //     "Certification ISO 27001",
    //     "Équipe portée à 15",
    //   ],
    //   color: "bg-success",
    // },
    // {
    //   year: "2022",
    //   title: "Expansion de l'Équipe & Reconnaissance",
    //   description:
    //     "Doublement de la taille de notre équipe et reconnaissance au Sommet Africain de l'Innovation Technologique pour notre contribution exceptionnelle à l'écosystème tech de Guinée.",
    //   icon: "Users",
    //   achievements: [
    //     "25+ membres dans l'équipe",
    //     "Prix de l'industrie",
    //     "Spécialisation en cybersécurité",
    //   ],
    //   color: "bg-warning",
    // },
    // {
    //   year: "2023",
    //   title: "Reconnaissance Internationale",
    //   description:
    //     "Mis en avant dans les principales publications tech et établi des partenariats en Afrique de l'Ouest, se positionnant pour une expansion régionale.",
    //   icon: "Globe",
    //   achievements: [
    //     "Base client sur 3 continents",
    //     "Partenariats régionaux",
    //     "Leadership d'opinion",
    //   ],
    //   color: "bg-primary",
    // },
    // {
    //   year: "2024",
    //   title: "Statut de Hub d'Innovation",
    //   description:
    //     "Devenu le principal hub d'innovation technologique de Guinée, lançant des programmes de mentorat et contribuant à l'écosystème local des startups.",
    //   icon: "Lightbulb",
    //   achievements: [
    //     "100+ développeurs mentorés",
    //     "Programmes d'innovation",
    //     "Impact communautaire",
    //   ],
    //   color: "bg-accent",
    // }, */}
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Notre parcours d'innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
             Lynxa Tech
            {/*D’une petite startup au principal hub d’innovation technologique de
            Guinée */}
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-px"></div>

          <div className="space-y-12">
            {timelineEvents?.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 transform md:-translate-x-4 z-10">
                  <div
                    className={`w-8 h-8 ${event?.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <Icon name={event?.icon} size={16} color="white" />
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-white rounded-xl p-6 shadow-medium hover:shadow-large transition-shadow duration-300 card-hover">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl font-bold text-primary">
                        {event?.year}
                      </span>
                      <div className="h-px bg-primary/20 flex-1"></div>
                    </div>

                    <h3 className="text-xl font-bold text-secondary mb-3">
                      {event?.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {event?.description}
                    </p>

                    <div className="space-y-2">
                      {/* <h4 className="font-semibold text-secondary text-sm">
                        Principales réalisations:
                      </h4> */}
                      <div className="flex flex-wrap gap-2">
                        {event?.achievements?.map(
                          (achievement, achievementIndex) => (
                            <span
                              key={achievementIndex}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                            >
                              {achievement}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 shadow-medium">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Prêt(e) à faire partie de notre histoire ?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Rejoignez-nous alors que nous continuons à construire l’avenir de
              la technologie en Afrique et au-delà. Que vous soyez client,
              partenaire ou développeur talentueux, il y a une place pour vous
              dans notre aventure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join-us">
                <button className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                  <Icon name="Briefcase" size={20} className="mr-2" />
                  Rejoignez notre équipe
                </button>
              </Link>
              <Link to="/partnership">
                <button className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors duration-200">
                  <Icon name="Handshake" size={20} className="mr-2" />
                  Devenez notre partenaire
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;
