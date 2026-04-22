import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const WhyGuinea = () => {
  const advantages = [
    {
      icon: "MapPin",
      title: "Emplacement Stratégique",
      description:
        "La position de la Guinée en Afrique de l'Ouest donne accès à plus de 400 millions de personnes dans la région CEDEAO, en faisant un hub idéal pour l'expansion régionale.",
      stats: "400M+ personnes dans la région",
    },
    {
      icon: "Users",
      title: "Réservoir de Talents Émergents",
      description:
        "Accueil d’esprits brillants désireux de se faire remarquer sur la scène mondiale. Nos développeurs combinent formation internationale et connaissance du marché local.",
      stats: "60% de la population jeune",
    },
    {
      icon: "Zap",
      title: "Esprit d'Innovation",
      description:
        "Les Guinéens sont des résolveurs de problèmes naturels, ayant su s'adapter à des défis uniques. Cette résilience peut se traduir par des solutions technologiques créatives et efficaces.",
      stats: "Écosystème technologique en croissance",
    },
    {
      icon: "DollarSign",
      title: "Efficacité des Coûts",
      description:
        "Fournir une qualité premium à des tarifs compétitifs. Nos coûts opérationnels nous permettent d’offrir une valeur exceptionnelle sans compromettre la qualité.",
      stats: "Économie de 20-40%",
    },
    {
      icon: "Clock",
      title: "Avantage Fuseau Horaire",
      description:
        "Le fuseau GMT s’aligne parfaitement avec les heures de travail européennes tout en offrant une couverture étendue pour les clients américains.",
      stats: "Fuseau horaire GMT+0",
    },
    {
      icon: "Globe",
      title: "Pont Culturel",
      description:
        "Maîtrise du français et de l'anglais, plus la compréhension des cultures commerciales africaines et internationales, faisant de nous des partenaires idéaux pour des projets globaux.",
      stats: "3+ langues parlées",
    },
  ];

  const ecosystemStats = [
    {
      label: "Startups Technologiques",
      value: "150+",
      growth: "2025",
      icon: "TrendingUp",
    },
    {
      label: "Taux de Pénétration Internet",
      value: "52%",
      growth: "2025",
      icon: "Wifi",
    },
    {
      label: "Utilisateurs Mobiles",
      value: "14M",
      growth: "2024",
      icon: "Smartphone",
    },
    {
      label: "Croissance des Paiements Numériques",
      value: "15%",
      growth: "Afrique 2024",
      icon: "CreditCard",
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
             Pourquoi la Guinée ? Pourquoi maintenant ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
             Découvrez les avantages uniques qui font de la Guinée la base
            idéale pour créer des solutions technologiques de classe mondiale
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
            <Image
              src="/aboutpole.png"
              alt="Modern office in Conakry, Guinea"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-primary/60 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Pôle d'innovation de l'Afrique de l'Ouest 
                </h3>
                <p className="text-lg opacity-90">
                  Conakry, Guinée – Où les standards mondiaux rencontrent
                  l’innovation locale
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {advantages?.map((advantage, index) => (
            <div key={index} className="bg-white rounded-xl p-6 card-hover">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon
                    name={advantage?.icon}
                    size={24}
                    color="var(--color-primary)"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">
                    {advantage?.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {advantage?.stats}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {advantage?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Guinea Tech Ecosystem Stats */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              L’écosystème technologique en pleine expansion de la Guinée 
            </h3>
            <p className="text-muted-foreground">
              Indicateurs clés illustrant la transformation numérique rapide
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemStats?.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-surface rounded-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon
                    name={stat?.icon}
                    size={24}
                    color="var(--color-primary)"
                  />
                </div>
                <div className="text-2xl font-bold text-secondary mb-1">
                  {stat?.value}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {stat?.label}
                </div>
                <div className="text-xs text-success font-medium">
                  {stat?.growth}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-4">
               Hub stratégique en Afrique de l’Ouest 
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
               La position de la Guinée offre un accès inégalé au marché
              ouest-africain tout en maintenant de solides connexions avec
              l’Europe et les Amériques. Notre situation nous permet de servir
              efficacement des clients sur plusieurs fuseaux horaires. 
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="Plane" size={20} color="var(--color-primary)" />
                <span className="text-muted-foreground">
                  6 heures de vol vers l’Europe
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Globe" size={20} color="var(--color-primary)" />
                <span className="text-muted-foreground">
                   Porte d’accès à un marché CEDEAO de plus de 400 millions de
                  personnes
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Languages" size={20} color="var(--color-primary)" />
                <span className="text-muted-foreground">
                  Français, anglais et langues locales
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Handshake" size={20} color="var(--color-primary)" />
                <span className="text-muted-foreground">
                   Solides relations commerciales à travers les régions
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-medium">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Guinea Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=9.6412,-13.5784&z=8&output=embed"
                className="border-0"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-semibold text-secondary">
                République de Guinée 
              </h4>
              <p className="text-sm text-muted-foreground">
                 La porte d’entrée de l’innovation en Afrique de l’Ouest 
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-sunset rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à découvrir l’avantage de la Guinée ?
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Rejoignez le nombre croissant de clients de Lynxa.{" "}
              {/* internationaux qui ont
              découvert la valeur unique de s’associer à la principale
              entreprise technologique de Guinée. */}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <button className="inline-flex items-center px-6 py-3 bg-white text-secondary rounded-lg font-medium hover:bg-white/90 transition-colors duration-200">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Commencer une conversation
                </button>
              </Link>
              {/*<button className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200">
                <Icon name="Download" size={20} className="mr-2" />
                Télécharger le profil de l’entreprise
              </button>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGuinea;
