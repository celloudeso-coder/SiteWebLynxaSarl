import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

const InnovationLab = () => {
  const innovations = [ {/*
   {
      id: 1,
      title: "Optimisation Réseau par IA",
      description:
        "Algorithmes d'apprentissage automatique qui optimisent automatiquement les performances du réseau et prévoient les besoins de maintenance pour les infrastructures télécom.",
      status: "En Développement",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      technologies: ["Python", "TensorFlow", "Analyse Réseau", "IoT"],
      impact: "Réduction potentielle de 40% des interruptions réseau",
    },
    {
      id: 2,
      title: "Vérification d'Identité Blockchain",
      description:
        "Système d'identité décentralisé pour une authentification sécurisée et respectueuse de la vie privée sur plusieurs plateformes et services.",
      status: "Phase de Recherche",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      technologies: ["Blockchain", "Smart Contracts", "Cryptographie", "React"],
      impact: "Sécurité renforcée pour plus de 100 000 utilisateurs",
    },
    {
      id: 3,
      title: "Surveillance Agricole IoT",
      description:
        "Solution agricole intelligente utilisant des capteurs IoT pour surveiller les conditions du sol, les conditions météorologiques et la santé des cultures pour les agriculteurs guinéens.",
      status: "Test Pilote",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop",
      technologies: [
        "IoT",
        "React Native",
        "Cloud Computing",
        "Analyse de Données",
      ],
      impact: "Augmentation de 20% des rendements agricoles",
    }, */}
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "En Développement":
        return "text-warning bg-warning/10";
      case "Test Pilote":
        return "text-success bg-success/10";
      case "Phase de Recherche":
        return "text-primary bg-primary/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       {/* <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Beaker" size={16} />
            <span>Laboratoire d'Innovation</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Pionniers des Solutions de Demain
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nos initiatives R&D repoussent les limites de la technologie,
            développant des solutions de pointe qui répondent aux défis
            émergents en Afrique et au-delà.
          </p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {innovations?.map((innovation) => (
            <div
              key={innovation?.id}
              className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 card-hover"
            >
             {/* <div className="relative overflow-hidden h-48">
                <Image
                  src={innovation?.image}
                  alt={innovation?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      innovation?.status
                    )}`}
                  >
                    {innovation?.status}
                  </span>
                </div>
              </div> */}

             {/* <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-secondary mb-3">
                  {innovation?.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {innovation?.description}
                </p>

                Progress Bar 

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-secondary">
                      Progression
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {innovation?.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${innovation?.progress}%` }}
                    ></div>
                  </div>
                </div> 

                Technologies 

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {innovation?.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div> 

                Impact 

                <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">
                      Impact Attendu
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {innovation?.impact}
                  </p>
                </div> 

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  En Savoir Plus
                </Button> 
              </div> */} 
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Icon
              name="Lightbulb"
              size={48}
              className="text-primary mx-auto mb-4"
            />
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
              Une Idée Innovante ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nous explorons toujours de nouvelles frontières en technologie. Si
              vous avez un projet ambitieux ou un concept innovant, collaborons
              pour le concrétiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="default"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="glow-orange"
                >
                  Discuter de Votre Idée
                </Button>
              </Link>
              {/* <Link to="/portfolio">
                <Button
                  variant="outline"
                  iconName="FileText"
                  iconPosition="left"
                >
                  Voir les Publications
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
