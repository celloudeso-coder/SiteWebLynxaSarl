import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CompanyValues = () => {
  const values = [
    {
      title: "Vision au-delà de la technologie",
      icon: "Globe",
      description:
        "Nous croyons que de grandes idées peuvent venir de partout et atteindre partout. Nos solutions transcendent les frontières géographiques.",
      examples: [
        {
          title: "Portefeuille Client Global",
          description:
            "Servir des clients sur plusieurs continents avec une qualité constante",
          image:
            "/portefeuilcli.png",
          metrics: "+ pays desservis",
        },
        {
          title: "Collaboration Priorité au Remote",
          description:
            "Livraison de projets fluide, peu importe la localisation",
          image:
            "/remotecolab.png",
          metrics: "99,5 % de disponibilité",
        },
      ],
      color: "bg-primary",
    },
    
    {/*{
      title: "Impact Local",
      icon: "Heart",
      description:
        "Même si nous pensons globalement, nous agissons localement. Notre succès se mesure à l’impact positif que nous créons dans notre communauté.",
      examples: [
        {
          title: "Programmes d'Éducation Technologique",
          description:
            "Bootcamps de codage gratuits pour les jeunes défavorisés",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
          metrics: "500+ étudiants formés",
        },
        {
          title: "Digitalisation des Entreprises Locales",
          description: "Aider les PME à adopter la transformation numérique",
          image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
          metrics: "200+ entreprises aidées",
        },
      ],
      color: "bg-success",
    },
    {
      title: "Normes Internationales",
      icon: "Award",
      description:
        "Nous respectons les normes de qualité internationales tout en comprenant les contextes et besoins locaux.",
      examples: [
        {
          title: "Certification ISO 27001",
          description: "Normes internationales de gestion de la sécurité",
          image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
          metrics: "100 % de conformité",
        },
        {
          title: "Partenariats Industriels",
          description:
            "Partenariats certifiés avec des leaders technologiques mondiaux",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
          metrics: "10+ certifications",
        },
      ],
      color: "bg-warning",
    },*/}
  ];

  const coreValues = [
    {
      icon: "Lightbulb",
      title: "Innovation",
      description:
        "Repousser constamment les limites et explorer de nouvelles possibilités",
    },
    {
      icon: "Users",
      title: "Collaboration",
      description:
        "Travailler ensemble pour obtenir des résultats extraordinaires",
    },
    {
      icon: "Shield",
      title: "Intégrité",
      description:
        "Maintenir les normes éthiques les plus élevées dans tout notre travail",
    },
    {
      icon: "Target",
      title: "Excellence",
      description: "Fournir une qualité qui dépasse les attentes à chaque fois",
    },
    {
      icon: "Compass",
      title: "Objectif",
      description: "Guidé par un impact significatif et un changement positif",
    },
    {
      icon: "Zap",
      title: "Agilité",
      description:
        "S’adapter rapidement aux besoins et opportunités changeants",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Nos valeurs en action 
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Plus que de simples mots sur un mur – ce sont les principes qui
            guident chaque décision et animent chaque projet
          </p>
        </div>

        {/* Main Values with Examples */}
        <div className="space-y-16 mb-16">
          {values?.map((value, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } lg:flex lg:items-center lg:space-x-12`}
            >
              {/* Value Description */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`w-12 h-12 ${value?.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon name={value?.icon} size={24} color="white" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">
                    {value?.title}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {value?.description}
                </p>

                {/* Value Examples */}
                <div className="space-y-4">
                  {value?.examples?.map((example, exampleIndex) => (
                    <div
                      key={exampleIndex}
                      className="bg-surface rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-secondary mb-1">
                            {example?.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {example?.description}
                          </p>
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                            {example?.metrics}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> 
              </div>

              {/* Value Images */}
              <div className="lg:w-1/2">
                <div className="grid grid-cols-1 gap-4">
                  {value?.examples?.map((example, exampleIndex) => (
                    <div
                      key={exampleIndex}
                      className="relative rounded-xl overflow-hidden card-hover"
                    >
                      <div className="aspect-video">
                        <Image
                          src={example?.image}
                          alt={example?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h4 className="font-semibold mb-1">
                            {example?.title}
                          </h4>
                          <p className="text-sm text-white/80">
                            {example?.metrics}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Values Grid */}
        <div className="bg-surface rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              Nos valeurs fondamentales
            </h3>
            <p className="text-muted-foreground">
              Les principes fondamentaux qui façonnent notre culture et guident
              nos décisions 
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues?.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center card-hover"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name={value?.icon}
                    size={24}
                    color="var(--color-primary)"
                  />
                </div>
                <h4 className="font-bold text-secondary mb-2">
                  {value?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {value?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values in Numbers */}
        {/*<div className="mt-16 bg-gradient-sunset rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              Des valeurs reflétées dans les résultats 
            </h3>
            <p className="text-white/80">
               Impact mesurable de notre approche guidée par nos valeurs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">%</div>
              <div className="text-sm text-white/80">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">+</div>
              <div className="text-sm text-white/80">Vies impactées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">+</div>
              <div className="text-sm text-white/80"> Pays desservis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm text-white/80">
                 Conformité aux normes
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    </section>
  );
};

export default CompanyValues;
