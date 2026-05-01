import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { getTechTalks } from "../../../lib/cms";

const STATIC_TECH_TALKS = [
    {
      id: 1,
      title: "L'avenir de la cybersécurité en Afrique",
      speaker: "Dr. Aminata Kone, CTO",
      event: "Africa Tech Summit 2024",
      duration: "28:45",
      views: 15420,
      category: "cybersecurity",
      publishDate: "2024-12-10",
      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&h=400",
      videoId: "dQw4w9WgXcQ",
      description:
        "Exploration des menaces émergentes en cybersécurité et des stratégies de défense innovantes pour les entreprises africaines à l'ère numérique.",
      tags: [
        "Cybersécurité",
        "Afrique",
        "Transformation Numérique",
        "Innovation",
      ],
    },
    {
      id: 2,
      title: "Révolution des paiements mobiles en Afrique de l'Ouest",
      speaker: "Ibrahima Diallo, Lead Developer",
      event: "Fintech West Africa Conference",
      duration: "32:18",
      views: 22100,
      category: "mobile",
      publishDate: "2024-11-25",
      thumbnail:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=400",
      videoId: "dQw4w9WgXcQ",
      description:
        "Analyse approfondie des systèmes de paiement mobile et de leur impact transformateur sur l'inclusion financière en Afrique de l'Ouest.",
      tags: [
        "Paiements Mobiles",
        "Fintech",
        "Inclusion Financière",
        "Afrique de l'Ouest",
      ],
    },
    {
      id: 3,
      title: "Construire une infrastructure réseau résiliente",
      speaker: "Mohamed Bah, Network Architect",
      event: "Infrastructure Africa Symposium",
      duration: "25:30",
      views: 8750,
      category: "network",
      publishDate: "2024-11-15",
      thumbnail:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=600&h=400",
      videoId: "dQw4w9WgXcQ",
      description:
        "Stratégies pour développer une infrastructure réseau robuste capable de relever les défis spécifiques aux marchés africains.",
      tags: ["Infrastructure Réseau", "Résilience", "Scalabilité", "Afrique"],
    },
    {
      id: 4,
      title: "Croissance de l'écosystème startup en Guinée",
      speaker: "Fatoumata Camara, Directrice Innovation",
      event: "Guinea Digital Forum 2024",
      duration: "35:12",
      views: 12300,
      category: "ecosystem",
      publishDate: "2024-10-30",
      thumbnail:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400",
      videoId: "dQw4w9WgXcQ",
      description:
        "Analyse de la croissance rapide de l'écosystème startup en Guinée et des opportunités de collaboration internationale.",
      tags: ["Startups", "Guinée", "Écosystème", "Innovation"],
    },
    {
      id: 5,
      title: "IA et apprentissage automatique dans la santé en Afrique",
      speaker: "Dr. Aminata Kone, CTO",
      event: "Digital Health Africa Summit",
      duration: "42:15",
      views: 18900,
      category: "ecosystem",
      publishDate: "2024-09-20",
      thumbnail:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=600&h=400",
      videoId: "dQw4w9WgXcQ",
      description:
        "Exploration du potentiel des technologies d'IA et de ML pour transformer la prestation des soins de santé dans les communautés africaines.",
      tags: ["IA", "Apprentissage Automatique", "Santé", "Santé Numérique"],
    },
    {
      id: 6,
      title: "Défis de mise en œuvre de la 5G dans les zones rurales",
      speaker: "Mamadou Sow, Responsable Infrastructure",
      event: "Telecommunications Africa Conference",
      duration: "29:50",
      views: 9200,
      category: "network",
      publishDate: "2024-08-15",
      thumbnail:
        "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=600&h=400",
      videoId: "dQw4w9WgXcQ",
      description:
        "Aborder les défis uniques du déploiement des réseaux 5G dans les communautés rurales africaines et proposer des solutions innovantes.",
      tags: [
        "5G",
        "Connectivité Rurale",
        "Télécommunications",
        "Infrastructure",
      ],
    },
];

const TechTalksSection = ({ activeCategory, searchQuery }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [techTalks, setTechTalks]         = useState(STATIC_TECH_TALKS);

  useEffect(() => {
    getTechTalks()
      .then((data) => {
        if (data?.length) {
          setTechTalks(data.map((t) => ({
            ...t,
            videoId:     t.video_id     ?? t.videoId     ?? "",
            publishDate: t.publish_date ?? t.publishDate ?? "",
            tags: Array.isArray(t.tags) ? t.tags : [],
          })));
        }
      })
      .catch(() => {});
  }, []);

  const filteredTechTalks = techTalks?.filter((talk) => {
    const matchesCategory =
      activeCategory === "all" || talk?.category === activeCategory;
    const matchesSearch =
      !searchQuery?.trim() ||
      talk?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      talk?.speaker?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      talk?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      talk?.tags?.some((tag) =>
        tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  if (filteredTechTalks?.length === 0) {
    return null;
  }

  const handleVideoPlay = (talk) => {
    setSelectedVideo(talk);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
            Tech <span className="text-gradient-orange">Talks</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Regardez nos experts partager leurs analyses lors de conférences et
            webinaires à travers le monde. Apprenez à partir d’expériences
            concrètes et de recherches de pointe.
          </p>
        </div>

        {/* Tech Talks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTechTalks?.map((talk) => (
            <div
              key={talk?.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
            >
              {/* Video Thumbnail */}
              <div
                className="relative group cursor-pointer"
                onClick={() => handleVideoPlay(talk)}
              >
                <Image
                  src={talk?.thumbnail}
                  alt={talk?.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon
                      name="Play"
                      size={24}
                      color="white"
                      className="ml-1"
                    />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {talk?.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {talk?.category?.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Video Content */}
              <div className="p-6">
                {/* Video Title */}
                <h3 className="text-lg font-heading font-bold text-secondary mb-2 line-clamp-2">
                  {talk?.title}
                </h3>

                {/* Speaker and Event */}
                <div className="text-sm text-gray-600 mb-3">
                  <p className="font-medium">{talk?.speaker}</p>
                  <p className="text-gray-500">{talk?.event}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {talk?.description}
                </p>

                {/* Video Stats */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Icon name="Eye" size={16} className="mr-2" />
                  <span className="mr-4">
                    {talk?.views?.toLocaleString()} vues
                  </span>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  <span>
                    {new Date(talk?.publishDate)?.toLocaleDateString()}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {talk?.tags?.slice(0, 3)?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Watch Button */}
                <Button
                  onClick={() => handleVideoPlay(talk)}
                  variant="default"
                  size="sm"
                  iconName="Play"
                  iconPosition="left"
                  className="w-full glow-orange"
                >
                  Regardez Maintenant
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-heading font-bold text-secondary">
                  {selectedVideo?.title}
                </h3>
                <button
                  onClick={closeVideoModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              {/* Video Player Placeholder */}
              <div className="p-6">
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center text-white">
                    <Icon
                      name="Play"
                      size={64}
                      className="mx-auto mb-4 opacity-50"
                    />
                    <p className="text-lg">Video Player</p>
                    <p className="text-sm text-gray-300">
                      Durée: {selectedVideo?.duration}
                    </p>
                  </div>
                </div>

                {/* Video Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-secondary mb-2">
                      Intervenant
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {selectedVideo?.speaker}
                    </p>

                    <h4 className="font-semibold text-secondary mb-2">
                      Événement
                    </h4>
                    <p className="text-gray-600 mb-4">{selectedVideo?.event}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {selectedVideo?.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {selectedVideo?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
              Vous souhaitez intervenir lors de nos événements ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Partagez votre expertise avec la communauté tech africaine. Nous
              recherchons toujours des intervenants innovants pour présenter
              lors de nos conférences et webinaires.
            </p>
            <Button
              variant="default"
              size="lg"
              iconName="Mic"
              iconPosition="left"
              className="glow-orange"
            >
              Postuler pour intervenir
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechTalksSection;
