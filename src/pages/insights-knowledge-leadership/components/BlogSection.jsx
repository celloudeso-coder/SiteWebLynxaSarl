import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { getBlogPosts } from "../../../lib/cms";
import SectionLoadError from "../../../components/SectionLoadError";


const BlogSection = ({ activeCategory, searchQuery }) => {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [blogPosts, setBlogPosts]       = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    getBlogPosts()
      .then((data) => {
        setBlogPosts((data || []).map((p) => ({
          ...p,
          readTime: p.read_time ?? p.readTime ?? "",
          tags: Array.isArray(p.tags) ? p.tags : [],
        })));
      })
      .catch(() => setLoadError(true));
  }, []);

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
  }, [activeCategory, searchQuery, blogPosts]);

  const displayedPosts = filteredPosts?.slice(0, visiblePosts);

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  if (loadError) return <SectionLoadError title="Dernières perspectives" />;

  // Aucun article en base → section masquée (le CMS fait autorité)
  if (blogPosts.length === 0) {
    return null;
  }

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
          {displayedPosts?.map((post, index) => (
            <motion.article
              key={post?.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={post?.image}
                  alt={post?.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold capitalize">
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
                  {post?.url ? (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {post?.title}
                    </a>
                  ) : (
                    post?.title
                  )}
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

                {/* Read More — seulement si un lien externe est défini */}
                {post?.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-accent transition-colors font-medium"
                  >
                    <span>Lire la suite</span>
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </a>
                )}
              </div>
            </motion.article>
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
              className="px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
