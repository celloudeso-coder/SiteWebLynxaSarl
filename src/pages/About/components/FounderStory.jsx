import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const FounderStory = () => {
  const founderData = {
    name: "Mamadou Cellou Kante",
    title: "Fondateur & CEO",
    image:
      "",
    quote: `« Je m’appelle Mamadou Cellou Kante. J’aurais pu choisir la France, les États-Unis ou d’autres pays où l’informatique est plus avancée et davantage valorisée, comme l’ont fait beaucoup de mes promotionnaires. Mais j’ai décidé de rester en Guinée. Pourquoi ? Parce que je crois que la prochaine grande vague d’innovation viendra d’Afrique. Ici, nous avons des talents exceptionnels, une créativité débordante et la volonté de résoudre des problèmes concrets. Avec LYNXA Tech, je veux démontrer qu’une technologie de classe mondiale peut émerger de partout, et surtout d’ici, en Afrique. »`,
    story: `Né à Kamsar et diplômé en informatique à l’IPG-ISTI de Dakar. Administrateur réseaux et systèmes, certifié en cybersécurité, j’ai eu l’opportunité de travailler sur plusieurs projets d’infrastructure et de solutions technologiques pour des entreprises privées, et je contribue aujourd’hui à un projet d’État d’envergure : la Cité des Sciences et de l’Innovation de Guinée.

    Ces expériences m’ont permis de constater une réalité frappante : malgré leur expertise et leur créativité, les talents africains restent trop souvent sous-évalués sur la scène internationale.

    C’est de ce constat qu’est née cette vision. Avec LYNXA Tech, mon ambition est claire : créer un pont entre l’innovation africaine et les opportunités mondiales. `,
    linkedinUrl: "https://www.linkedin.com/in/mamadou-cellou-kante",

    /*achievements: [
      "Dirigé plusieurs projets réussis",
      "Créé la première entreprise technologique certifiée ISO 27001 en Guinée",
      "Mentoré plus de 100 jeunes développeurs en Afrique de l'Ouest",
      "Mis en avant au Sommet Africain de l'Innovation Technologique 2023",
    ],*/
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
             Le parcours de l'un des fondateurs de Lynxa Tech
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Rencontrez un visionnaire qui a choisi de construire l’avenir depuis
            la Guinée
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Founder Image & Video */}
          <div className="space-y-6">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glow-orange">
                <Image
                  src={founderData?.image}
                  alt={founderData?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-xl shadow-lg">
                <Icon name="MapPin" size={24} />
                <p className="text-sm font-medium mt-1">Conakry, Guinea</p>
              </div>
            </div>

            {/* Video Message Placeholder */}
            <div className="bg-surface rounded-xl p-6 border-2 border-dashed border-primary/30">
              {/*<div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                   <Icon name="Play" size={24} color="white" /> 
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">
                   Message personnel
                  </h4>
                 <p className="text-sm text-muted-foreground">3:42 minutes</p>
                </div>
              </div>*/}
              <p className="text-sm text-muted-foreground text-center">
                {/* Regardez le message personnel de Mamadou sur la création de
                Lynxa Tech en Guinée */}
              </p>
            </div>
          </div>
      
          {/* Story Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-2">
                {founderData?.name}
              </h3>
              <p className="text-primary font-medium mb-4">
                {founderData?.title}
              </p>

              <blockquote className="text-lg text-text-primary italic border-l-4 border-primary pl-6 mb-6">
                "{founderData?.quote}"
              </blockquote>
            </div>

            <div className="space-y-4">
              {founderData?.story?.split("\n\n")?.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Achievements */}
            <div>
              <h4 className="font-semibold text-secondary mb-4">
              {/*  Principales réalisations */}
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {founderData?.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon
                        name="Check"
                        size={14}
                        color="var(--color-primary)"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="default"
                iconName="MessageCircle"
                iconPosition="left"
              >
                 Connectez-vous avec Mamadou
              </Button>
              <Button variant="outline" iconName="Linkedin" iconPosition="left">
                 Profil LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
