import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const FounderSpotlight = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const founderData = {
    name: "Mamadou Cellou Kante",
    title: "Fondateur & CEO",
    location: "Conakry, Guinée",
    experience: "1+ ans",
    education: "MIT Informatique",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    coverImage:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200",
    quote:
      "La technologie n’a pas de frontières, mais l’impact commence localement. Nous prouvons que l’innovation de classe mondiale peut émerger de n’importe où, y compris de Guinée.",
    achievements: [
      {
        icon: "Award",
        title: "Innovateur Tech de l’Année",
        description: "West Africa Tech Awards 2023",
      },
      {
        icon: "Users",
        title: "50+ Membres d'Équipe",
        description: "Développement des talents technologiques en Guinée",
      },
      {
        icon: "Globe",
        title: "Reconnaissance Internationale",
        description: "Présenté dans TechCrunch Africa",
      },
      {
        icon: "Heart",
        title: "Impact Communautaire",
        description: "Mentorat de 100+ jeunes développeurs",
      },
    ],
    vision: `Lorsque j'ai lancé Lynxa Tech en 2025, beaucoup se demandaient si la Guinée pouvait produire des solutions technologiques de classe mondiale. Aujourd'hui, nous ne nous contentons pas de rivaliser à l'échelle mondiale – nous menons l'innovation en cybersécurité, développement mobile et infrastructure réseau.\n\nNotre mission va au-delà du succès commercial. Nous construisons un écosystème où les talents africains peuvent prospérer, où les solutions locales répondent aux défis mondiaux, et où la prochaine génération de développeurs guinéens peut rêver sans limites.\n\nChaque projet que nous livrons, chaque client que nous servons et chaque développeur que nous mentorons contribue à réécrire le récit sur les capacités technologiques africaines.`,
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6">
            Rencontrez notre{" "}
            <span className="text-gradient-orange">Leader visionnaire</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
             L’histoire derrière la mission de Lynxa Tech visant à transformer
            la Guinée en un hub technologique mondial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Video/Image */}
          <div className="relative">
            {/* Main Image/Video Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-large group">
              <Image
                src={founderData?.coverImage}
                alt="Ibrahim Konaté - Founder of Company Tech"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Video Overlay */}
              {!isVideoPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={handleVideoPlay}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
                    aria-label="Play founder message video"
                  >
                    <Icon name="Play" size={32} className="text-primary ml-1" />
                  </button>
                </div>
              )}

              {/* Founder Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={founderData?.avatar}
                    alt={founderData?.name}
                    className="w-16 h-16 rounded-full border-2 border-white object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">
                      {founderData?.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {founderData?.title}
                    </p>
                    <p className="text-white/80 text-sm flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{founderData?.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-surface rounded-xl p-4 text-center">
                <div className="text-2xl font-heading font-bold text-primary mb-1">
                  {founderData?.experience}
                </div>
                <p className="text-sm text-muted-foreground">Experience</p>
              </div>
              <div className="bg-surface rounded-xl p-4 text-center">
                <div className="text-2xl font-heading font-bold text-primary mb-1">
                  MIT
                </div>
                <p className="text-sm text-muted-foreground">Education</p>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            {/* Quote */}
            <div className="mb-8">
              <Icon name="Quote" size={32} className="text-primary mb-4" />
              <blockquote className="text-xl lg:text-2xl text-secondary font-medium leading-relaxed italic">
                "{founderData?.quote}"
              </blockquote>
            </div>

            {/* Vision */}
            <div className="mb-8">
              <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
                Notre vision pour la technologie africaine 
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {founderData?.vision?.split("\n\n")?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h3 className="text-xl font-heading font-bold text-secondary mb-4">
                 Réalisations clés
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {founderData?.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon
                        name={achievement?.icon}
                        size={16}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary text-sm">
                        {achievement?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {achievement?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about">
                <Button
                  variant="default"
                  iconName="BookOpen"
                  iconPosition="left"
                  className="glow-orange"
                >
                  Lire l’histoire complète
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="outline"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                   Se connecter avec Ibrahim 
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
              Construisons le futur Ensemble
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Rejoignez-nous dans notre mission visant à établir la Guinée comme
              un hub reconnu pour l’innovation technologique. Que vous soyez
              client, partenaire ou développeur en herbe, il y a une place pour
              vous dans notre écosystème en pleine expansion.
            </p>
            <Link to="/partnership">
              <Button
                variant="default"
                size="lg"
                iconName="Handshake"
                iconPosition="left"
                className="glow-orange"
              >
                Rejoindre Notre Mission
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlight;
