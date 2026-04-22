import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const BlogSection = ({ activeCategory, searchQuery }) => {
  const [visiblePosts, setVisiblePosts] = useState(6);

  const blogPosts = [
    {
      id: 1,
      title:
        "Tendances de la Cybersécurité en Afrique de l'Ouest : Protéger les PME des Menaces Numériques",
      excerpt:
        "Explorez l'évolution du paysage de la cybersécurité en Afrique de l'Ouest et découvrez des stratégies pratiques pour que les petites et moyennes entreprises protègent leurs actifs numériques.",
      category: "cybersecurity",
      author: "Dr. Aminata Kone",
      date: "2025-01-10",
      readTime: "8 min de lecture",
      image:
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&h=400",
      tags: [
        "Cybersécurité",
        "PME",
        "Afrique de l'Ouest",
        "Protection Numérique",
      ],
    },
    {
      id: 2,
      title:
        "Meilleures Pratiques de Développement Mobile pour les Marchés Émergents",
      excerpt:
        "Apprenez à créer des applications mobiles robustes qui prospèrent dans des environnements à faible bande passante tout en offrant des expériences utilisateur exceptionnelles.",
      category: "mobile",
      author: "Ibrahima Diallo",
      date: "2025-01-08",
      readTime: "12 min de lecture",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&h=400",
      tags: [
        "Développement Mobile",
        "Marchés Émergents",
        "Faible Bande Passante",
        "Conception UX",
      ],
    },
    {
      id: 3,
      title: "Transformation Numérique de la Guinée : Opportunités et Défis",
      excerpt:
        "Une analyse approfondie du parcours de la Guinée vers la transformation numérique, mettant en lumière les principales opportunités d'innovation et de croissance.",
      category: "ecosystem",
      author: "Fatoumata Camara",
      date: "2025-01-05",
      readTime: "15 min de lecture",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=400",
      tags: [
        "Transformation Numérique",
        "Guinée",
        "Innovation",
        "Croissance Économique",
      ],
    },
    {
      id: 4,
      title: "Défis des Infrastructures Réseau en Guinée Rurale",
      excerpt:
        "Répondre aux lacunes de connectivité et construire des infrastructures réseau résilientes pour combler la fracture numérique dans les communautés rurales.",
      category: "network",
      author: "Mohamed Bah",
      date: "2025-01-03",
      readTime: "10 min de lecture",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&h=400",
      tags: [
        "Infrastructure Réseau",
        "Connectivité Rurale",
        "Fracture Numérique",
        "Télécommunications",
      ],
    },
    {
      id: 5,
      title:
        "L'Essor de la Fintech en Afrique de l'Ouest : Mobile Money et Au-Delà",
      excerpt:
        "Exploration de la révolution fintech en Afrique de l'Ouest et comment les solutions de mobile money transforment l'inclusion financière.",
      category: "mobile",
      author: "Aissatou Barry",
      date: "2024-12-28",
      readTime: "9 min de lecture",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=400",
      tags: [
        "Fintech",
        "Mobile Money",
        "Inclusion Financière",
        "Afrique de l'Ouest",
      ],
    },
    {
      id: 6,
      title: "Développement d'API Sécurisées pour les Startups Africaines",
      excerpt:
        "Pratiques de sécurité essentielles et modèles architecturaux pour développer des API robustes qui évoluent avec votre startup africaine.",
      category: "cybersecurity",
      author: "Ousmane Dieng",
      date: "2024-12-25",
      readTime: "11 min de lecture",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&h=400",
      tags: ["Sécurité API", "Startups", "Architecture Logicielle", "Afrique"],
    },
    {
      id: 7,
      title:
        "Feuille de Route pour l'Implémentation de la 5G dans le Secteur Télécom Guinéen",
      excerpt:
        "Perspectives stratégiques sur les défis et opportunités du déploiement de la 5G dans le paysage télécom de la Guinée.",
      category: "network",
      author: "Mamadou Sow",
      date: "2024-12-22",
      readTime: "13 min de lecture",
      image:
        "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=400",
      tags: ["5G", "Télécommunications", "Infrastructure", "Guinée"],
    },
    {
      id: 8,
      title: "Développement des Talents Tech en Afrique Sub-Saharienne",
      excerpt:
        "Stratégies pour construire et retenir les talents tech dans le secteur technologique en croissance rapide de l'Afrique Sub-Saharienne.",
      category: "ecosystem",
      author: "Kadiatou Conde",
      date: "2024-12-20",
      readTime: "14 min de lecture",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=400",
      tags: [
        "Développement des Talents",
        "Éducation",
        "Afrique Sub-Saharienne",
        "Compétences Tech",
      ],
    },
  ];

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered?.filter((post) => post?.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(
        (post) =>
          post?.title?.toLowerCase()?.includes(query) ||
          post?.excerpt?.toLowerCase()?.includes(query) ||
          post?.tags?.some((tag) => tag?.toLowerCase()?.includes(query)) ||
          post?.author?.toLowerCase()?.includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const displayedPosts = filteredPosts?.slice(0, visiblePosts);

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  if (filteredPosts?.length === 0) {
    return (
      <section id="blog-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Icon
              name="Search"
              size={64}
              color="#E5E7EB"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun article trouvé
            </h3>
            <p className="text-gray-500">
              Essayez d'ajuster vos termes de recherche ou parcourez différentes
              catégories.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
            Dernières <span className="text-gradient-orange">Perpectives</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Restez informé avec notre dernière analyse, tendances et
            perspectives d'experts sur l'innovation technologique africaine.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts?.map((post) => (
            <article
              key={post?.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={post?.image}
                  alt={post?.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {post?.category?.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Post Meta */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Icon name="User" size={16} className="mr-2" />
                  <span className="mr-4">{post?.author}</span>
                  <Icon name="Clock" size={16} className="mr-2" />
                  <span className="mr-4">{post?.readTime}</span>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  <span>{new Date(post?.date)?.toLocaleDateString()}</span>
                </div>

                {/* Post Title */}
                <h3 className="text-xl font-heading font-bold text-secondary mb-3 line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/blog/${post?.id}`} className="hover:underline">
                    {post?.title}
                  </Link>
                </h3>

                {/* Post Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post?.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post?.tags?.slice(0, 3)?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <Link
                  to={`/blog/${post?.id}`}
                  className="inline-flex items-center text-primary hover:text-accent transition-colors font-medium"
                >
                  <span>Lire la suite</span>
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < filteredPosts?.length && (
          <div className="text-center mt-12">
            <Button
              onClick={loadMorePosts}
              variant="outline"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              className="px-8 py-3 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Charger plus d'articles
            </Button>
          </div>
        )}

        {/* Results Counter */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Affichage {displayedPosts?.length} des {filteredPosts?.length}{" "}
          articles
          {searchQuery && ` for "${searchQuery}"`}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
