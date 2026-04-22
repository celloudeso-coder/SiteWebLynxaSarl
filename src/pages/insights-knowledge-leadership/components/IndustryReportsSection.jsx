import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const IndustryReportsSection = ({ activeCategory, searchQuery }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const industryReports = [
    {
      id: 1,
      title:
        "Rapport sur la Croissance de l'Écosystème Technologique en Guinée 2024",
      subtitle: "Analyse complète du développement du secteur technologique",
      category: "ecosystem",
      publishDate: "2024-12-01",
      pages: 89,
      downloads: 3250,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400",
      keyInsights: [
        "Croissance de 45 % d'une année sur l'autre des startups technologiques",
        "12,5 M$ d'investissements totaux levés en 2024",
        "Augmentation de 78 % des téléchargements d'applications mobiles",
        "32 nouvelles entreprises technologiques créées",
      ],
      executiveSummary:
        "L'écosystème technologique de la Guinée a connu une croissance sans précédent en 2024, stimulée par l'adoption accrue du mobile, les initiatives gouvernementales numériques et l'intérêt croissant des investisseurs internationaux.",
      sections: [
        "Vue d'ensemble du marché",
        "Paysage des startups",
        "Analyse des investissements",
        "Initiatives gouvernementales",
        "Développement des infrastructures",
        "Compétences et talents",
        "Prévisions futures",
      ],
      tags: ["Analyse du Marché", "Startups", "Investissement", "Guinée"],
    },
    {
      id: 2,
      title: "Panorama des Menaces de Cybersécurité en Afrique de l'Ouest 2024",
      subtitle: "Défis régionaux de sécurité et stratégies d'atténuation",
      category: "cybersecurity",
      publishDate: "2024-11-20",
      pages: 67,
      downloads: 2890,
      image:
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&h=400",
      keyInsights: [
        "Augmentation de 67 % des attaques par ransomware",
        "Menaces sur la banque mobile en hausse de 124 %",
        "85 % des PME ne disposent pas d'une protection adéquate",
        "Impact économique estimé à 2,3 milliards $",
      ],
      executiveSummary:
        "L'Afrique de l'Ouest fait face à une augmentation des menaces de cybersécurité, avec des attaques sophistiquées ciblant les institutions financières, les agences gouvernementales et les infrastructures critiques de la région.",
      sections: [
        "Vue d'ensemble des menaces",
        "Analyse des vecteurs d'attaque",
        "Risques par secteur",
        "Collaboration régionale",
        "Stratégies d'atténuation",
        "Recommandations politiques",
        "Perspectives futures",
      ],
      tags: [
        "Cybersécurité",
        "Menaces",
        "Évaluation des Risques",
        "Afrique de l'Ouest",
      ],
    },
    {
      id: 3,
      title: "Indice de l’Innovation Mobile : Afrique 2024",
      subtitle: "Indicateurs principaux de l’avancement technologique mobile",
      category: "mobile",
      publishDate: "2024-10-15",
      pages: 94,
      downloads: 4120,
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=400",
      keyInsights: [
        "Le Nigeria domine le classement de l'innovation mobile",
        "Taux d’adoption des paiements mobiles de 63 %",
        "Couverture 5G dans 15 grandes villes",
        "L’approche mobile-first représente 78 % des applications",
      ],
      executiveSummary:
        "Le paysage de l'innovation mobile en Afrique continue d'évoluer rapidement, avec le Nigeria, le Kenya et l'Afrique du Sud en tête de l'avancement technologique et de l’adoption par les utilisateurs à travers le continent.",
      sections: [
        "Classement de l'innovation",
        "Évolution des paiements mobiles",
        "Déploiement de la 5G",
        "Tendances du développement d'applications",
        "Analyse du comportement des utilisateurs",
        "Impact des infrastructures",
        "Comparaison régionale",
      ],
      tags: ["Innovation Mobile", "Classements", "5G", "Paiements Mobiles"],
    },
    {
      id: 4,
      title: "Rapport sur les Investissements en Infrastructure Numérique 2024",
      subtitle:
        "Flux de capitaux et développement des infrastructures à travers l'Afrique",
      category: "network",
      publishDate: "2024-09-30",
      pages: 112,
      downloads: 1850,
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=600&h=400",
      keyInsights: [
        "8,7 milliards $ investis dans les infrastructures fibre",
        "Amélioration de 23 % de la connectivité rurale",
        "15 nouveaux centres de données opérationnels",
        "Connectivité transfrontalière en hausse de 34 %",
      ],
      executiveSummary:
        "D'importants investissements dans les infrastructures transforment le paysage numérique de l'Afrique, avec des améliorations significatives de la connectivité, de la capacité des centres de données et des infrastructures réseau transfrontalières.",
      sections: [
        "Vue d'ensemble des investissements",
        "Expansion du réseau fibre",
        "Développement des centres de données",
        "Programmes de connectivité rurale",
        "Infrastructure transfrontalière",
        "Partenariats public-privé",
        "Analyse du retour sur investissement",
      ],
      tags: [
        "Infrastructure",
        "Investissement",
        "Connectivité",
        "Centres de Données",
      ],
    },
  ];

  const filteredReports = industryReports?.filter((report) => {
    const matchesCategory =
      activeCategory === "all" || report?.category === activeCategory;
    const matchesSearch =
      !searchQuery?.trim() ||
      report?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      report?.subtitle?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      report?.executiveSummary
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      report?.tags?.some((tag) =>
        tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  if (filteredReports?.length === 0) {
    return null;
  }

  const handleReportPreview = (report) => {
    setSelectedReport(report);
  };

  const closeReportModal = () => {
    setSelectedReport(null);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
            Rapports <span className="text-gradient-orange">Industrie</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des analyses basées sur les données sur les marchés technologiques
            africains, les tendances d'investissement et les opportunités de
            croissance. Nos rapports complets fournissent une intelligence
            stratégique aux décideurs.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredReports?.map((report) => (
            <div
              key={report?.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
            >
              <div className="md:flex h-full">
                {/* Report Image */}
                <div className="md:w-2/5">
                  <Image
                    src={report?.image}
                    alt={report?.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Report Content */}
                <div className="md:w-3/5 p-6 flex flex-col">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {report?.category?.replace("-", " ")}
                    </span>
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-xl font-heading font-bold text-secondary mb-2">
                    {report?.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {report?.subtitle}
                  </p>

                  {/* Key Insights Preview */}
                  <div className="mb-4 flex-grow">
                    <h4 className="font-semibold text-secondary text-sm mb-2">
                      Points Clés:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {report?.keyInsights
                        ?.slice(0, 2)
                        ?.map((insight, index) => (
                          <li key={index} className="flex items-start">
                            <Icon
                              name="TrendingUp"
                              size={14}
                              className="text-primary mt-0.5 mr-2 flex-shrink-0"
                            />
                            <span>{insight}</span>
                          </li>
                        ))}
                      {report?.keyInsights?.length > 2 && (
                        <li className="text-primary text-xs font-medium">
                          +{report?.keyInsights?.length - 2} more insights
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Report Stats */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Icon name="FileText" size={16} className="mr-2" />
                    <span className="mr-4">{report?.pages} pages</span>
                    <Icon name="Download" size={16} className="mr-2" />
                    <span className="mr-4">
                      {report?.downloads?.toLocaleString()} downloads
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <Button
                      onClick={() => handleReportPreview(report)}
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Aperçu
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      className="flex-1 glow-orange"
                    >
                      Telecharger
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Preview Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-heading font-bold text-secondary">
                    {selectedReport?.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedReport?.subtitle}
                  </p>
                </div>
                <button
                  onClick={closeReportModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <h4 className="font-semibold text-secondary mb-4">
                      Résumé Exécutif
                    </h4>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedReport?.executiveSummary}
                    </p>

                    <h4 className="font-semibold text-secondary mb-4">
                      Sections du Rapport
                    </h4>

                    <ul className="space-y-2">
                      {selectedReport?.sections?.map((section, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <Icon
                            name="ChevronRight"
                            size={16}
                            className="text-primary mr-2"
                          />
                          <span>{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column */}
                  <div>
                    <h4 className="font-semibold text-secondary mb-4">
                      Points Clés
                    </h4>
                    <ul className="space-y-3 mb-6">
                      {selectedReport?.keyInsights?.map((insight, index) => (
                        <li key={index} className="flex items-start">
                          <Icon
                            name="TrendingUp"
                            size={16}
                            className="text-primary mt-0.5 mr-3 flex-shrink-0"
                          />
                          <span className="text-gray-600">{insight}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-semibold text-secondary mb-4">
                      Details Rapport
                    </h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Icon
                          name="Calendar"
                          size={16}
                          className="mr-3 text-gray-400"
                        />
                        <span>
                          Publiée:{" "}
                          {new Date(
                            selectedReport?.publishDate
                          )?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Icon
                          name="FileText"
                          size={16}
                          className="mr-3 text-gray-400"
                        />
                        <span>Pages: {selectedReport?.pages}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon
                          name="Download"
                          size={16}
                          className="mr-3 text-gray-400"
                        />
                        <span>
                          Téléchargements:{" "}
                          {selectedReport?.downloads?.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {selectedReport?.tags?.map((tag) => (
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

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                  <Button
                    onClick={closeReportModal}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Fermer Aperçu
                  </Button>
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Download"
                    iconPosition="left"
                    className="flex-1 glow-orange"
                  >
                    Telecharger le rapport complet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subscription CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-white">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Restez en avance avec nos rapports premium
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Obtenez un accès exclusif à nos rapports de recherche premium et à
              notre veille stratégique. Abonnez-vous pour recevoir les dernières
              analyses directement dans votre boîte mail.
            </p>
            <Button
              variant="outline"
              size="lg"
              iconName="Star"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Passer à Premium
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryReportsSection;
