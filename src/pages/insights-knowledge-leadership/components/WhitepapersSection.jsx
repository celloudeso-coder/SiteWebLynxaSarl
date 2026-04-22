import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const WhitepapersSection = ({ activeCategory, searchQuery }) => {
  const whitepapers = [
    {
      id: 1,
      title: "Cybersécurité pour les PME africaines : Guide complet",
      description:
        "Stratégies essentielles de cybersécurité et cadres de mise en œuvre spécialement conçus pour les petites et moyennes entreprises à travers l'Afrique.",
      category: "cybersecurity",
      pages: 42,
      downloadCount: 1250,
      publishDate: "2025-01-01",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&h=300",
      tags: ["Cybersécurité", "PME", "Gestion des Risques", "Mise en œuvre"],
    },
    {
      id: 2,
      title:
        "Développement Mobile-First dans des environnements à faible bande passante",
      description:
        "Meilleures pratiques et stratégies techniques pour créer des applications mobiles performantes dans des environnements à bande passante limitée.",
      category: "mobile",
      pages: 38,
      downloadCount: 890,
      publishDate: "2024-12-15",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&h=300",
      tags: [
        "Développement Mobile",
        "Bande Passante Limitée",
        "Performance",
        "Optimisation",
      ],
    },
    {
      id: 3,
      title:
        "Plan Directeur pour l’Infrastructure Numérique en Afrique de l’Ouest",
      description:
        "Feuille de route stratégique pour développer une infrastructure numérique durable dans les pays d'Afrique de l'Ouest, avec un focus sur l'évolutivité et l'accessibilité.",
      category: "network",
      pages: 56,
      downloadCount: 675,
      publishDate: "2024-11-30",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&h=300",
      tags: [
        "Infrastructure",
        "Stratégie Numérique",
        "Afrique de l’Ouest",
        "Évolutivité",
      ],
    },
    {
      id: 4,
      title:
        "Rapport sur l’Investissement dans l’Écosystème Tech Africain 2024",
      description:
        "Analyse complète des tendances d'investissement, des opportunités et de la dynamique du marché dans le secteur technologique en pleine évolution en Afrique.",
      category: "ecosystem",
      pages: 72,
      downloadCount: 2100,
      publishDate: "2024-10-20",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&h=300",
      tags: [
        "Investissement",
        "Analyse du Marché",
        "Startups",
        "Capital Risque",
      ],
    },
  ];

  const filteredWhitepapers = whitepapers?.filter((whitepaper) => {
    const matchesCategory =
      activeCategory === "all" || whitepaper?.category === activeCategory;
    const matchesSearch =
      !searchQuery?.trim() ||
      whitepaper?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      whitepaper?.description
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      whitepaper?.tags?.some((tag) =>
        tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  if (filteredWhitepapers?.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
            Whitepapers <span className="text-gradient-orange">Experts</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Téléchargez des guides complets et des rapports de recherche pour
            approfondir votre compréhension des tendances technologiques
            africaines et des stratégies de mise en œuvre.
          </p>
        </div>

        {/* Whitepapers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredWhitepapers?.map((whitepaper) => (
            <div
              key={whitepaper?.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
            >
              <div className="md:flex">
                {/* Whitepaper Image */}
                <div className="md:w-1/3">
                  <Image
                    src={whitepaper?.image}
                    alt={whitepaper?.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Whitepaper Content */}
                <div className="md:w-2/3 p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {whitepaper?.category?.replace("-", " ")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-secondary mb-3">
                    {whitepaper?.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {whitepaper?.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Icon name="FileText" size={16} className="mr-2" />
                    <span className="mr-4">{whitepaper?.pages} pages</span>
                    <Icon name="Download" size={16} className="mr-2" />
                    <span className="mr-4">
                      {whitepaper?.downloadCount?.toLocaleString()} downloads
                    </span>
                    <Icon name="Calendar" size={16} className="mr-2" />
                    <span>
                      {new Date(whitepaper?.publishDate)?.toLocaleDateString()}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {whitepaper?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Download Button */}
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    className="w-full md:w-auto glow-orange"
                  >
                    Télécharger PDF
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-white">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Besoin d’une recherche personnalisée ?
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Notre équipe peut créer des rapports de recherche et des
              whitepapers adaptés à vos besoins sectoriels et aux exigences
              régionales.
            </p>

            <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Demander une recherche personnalisée
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitepapersSection;
