import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Seo from "../../components/Seo";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import { useProjects } from "../../hooks/useContent";

// ── Normalize a CMS row to the component shape ─────────────────────────────
function normalize(p) {
  return {
    id:               p.id,
    title:            p.title,
    status:           p.status,
    industry:         p.industry,
    image:            p.image_url,
    gallery:          Array.isArray(p.gallery_urls) ? p.gallery_urls.slice(0, 2) : [],
    valueProposition: p.value_proposition,
    keyFeatures:      Array.isArray(p.key_features) ? p.key_features : [],
    complianceNotes:  p.compliance_notes,
    demoUrl:          p.demo_url,
    metrics:          Array.isArray(p.metrics) ? p.metrics.filter((m) => m && (m.label || m.value)) : [],
    testimonial:      p.testimonial,
    duration:         p.duration,
    description:      p.description,
  };
}

const SkeletonHero = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-pulse">
    <div className="h-8 w-48 bg-gray-200 rounded-full mb-6" />
    <div className="h-10 w-3/4 bg-gray-200 rounded-xl mb-4" />
    <div className="h-5 w-1/2 bg-gray-100 rounded-full" />
  </div>
);

const ProductPage = () => {
  const { slug } = useParams();
  const { data: cmsProjects, loading } = useProjects();

  const projects = Array.isArray(cmsProjects) ? cmsProjects : [];
  const row = projects.find((p) => p.is_flagship_product && p.product_slug === slug);
  const product = row ? normalize(row) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <SkeletonHero />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Search" size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-secondary mb-3">
            Produit introuvable
          </h1>
          <p className="text-muted-foreground mb-8">
            Cette fiche produit n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition-all duration-200"
          >
            <Icon name="ArrowLeft" size={18} />
            Voir le portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${product.title} | Lynxa Tech Guinée`}
        description={product.valueProposition || product.description || `Découvrez ${product.title}, une solution développée par Lynxa Tech Guinée.`}
        path={`/produits/${slug}`}
        ogTitle={`${product.title} | Lynxa Tech Guinée`}
        ogDescription={product.valueProposition || product.description}
        image={product.image}
      />

      <div className="min-h-screen bg-white">
        <Header />

        {/* ── Hero ── */}
        <section className="pt-16 bg-gradient-to-br from-secondary to-secondary/80 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {product.status && (
                  <span className="bg-white/15 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.status}
                  </span>
                )}
                {product.industry && (
                  <span className="bg-white/15 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.industry}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                {product.title}
              </h1>
              {product.valueProposition && (
                <p className="text-xl text-white/85 max-w-2xl leading-relaxed mb-8">
                  {product.valueProposition}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition-all duration-200 glow-orange"
                  >
                    <Icon name="Play" size={18} />
                    Voir la démo
                  </a>
                )}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                >
                  <Icon name="MessageCircle" size={18} />
                  Discuter du projet
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {product.image && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-72 sm:h-96 object-cover"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          </div>
        )}

        {/* ── Key features ── */}
        {product.keyFeatures.length > 0 && (
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-heading font-bold text-secondary mb-10 text-center">
                Fonctions Principales
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {product.keyFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-5">
                    <Icon name="CheckCircle" size={22} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SYSCOHADA compliance ── */}
        {product.complianceNotes && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl border border-border p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="FileCheck2" size={24} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-secondary">
                    Conformité SYSCOHADA
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.complianceNotes}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Metrics ── */}
        {product.metrics.length > 0 && (
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {product.metrics.map((metric, i) => (
                  <div key={i} className="text-center bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">{metric?.value}</div>
                    <div className="text-sm text-muted-foreground">{metric?.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Gallery ── */}
        {product.gallery.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-heading font-bold text-secondary mb-10 text-center">
                Aperçu
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {product.gallery.map((src, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-border shadow-soft">
                    <Image
                      src={src}
                      alt={`${product.title} — capture d'écran ${i + 1}`}
                      className="w-full h-64 object-cover"
                      sizes="(min-width: 640px) 480px, 100vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Testimonial ── */}
        {product.testimonial?.quote && (
          <section className="py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Icon name="MessageSquare" size={32} className="text-primary mx-auto mb-6" />
              <blockquote className="text-xl text-secondary italic leading-relaxed mb-6">
                "{product.testimonial.quote}"
              </blockquote>
              <div className="font-semibold text-secondary">
                {product.testimonial.author_name}
              </div>
              <div className="text-sm text-muted-foreground">
                {[product.testimonial.author_position, product.testimonial.author_company].filter(Boolean).join(" · ")}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-20 bg-gradient-to-br from-secondary to-primary/80 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Envie d'une solution comme {product.title} ?
            </h2>
            <p className="text-white/80 mb-8">
              Discutons de vos besoins et voyons comment nous pouvons vous accompagner.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-white/90 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                >
                  <Icon name="Play" size={18} />
                  Voir la démo
                </a>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                <Icon name="MessageCircle" size={18} />
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductPage;
