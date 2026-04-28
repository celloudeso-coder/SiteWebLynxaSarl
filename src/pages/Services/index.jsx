import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import ServiceHero from "./components/ServiceHero";
import ServiceCard from "./components/ServiceCard";
import ServiceDetails from "./components/ServiceDetails";
import ProcessTimeline from "./components/ProcessTimeline";
import TechnologyStack from "./components/TechnologyStack";
import PricingFramework from "./components/PricingFramework";
import Icon from "../../components/AppIcon";
import { useServices } from "../../hooks/useContent";
import logoIco from "../../../public/LYNXA.ico";

// ── Skeleton while CMS loads ─────────────────────────────────────────────────
const SkeletonTab = () => (
  <div className="h-12 w-40 bg-gray-200 rounded-2xl animate-pulse" />
);

const SkeletonDetail = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200" />
    <div className="p-8 space-y-4">
      <div className="h-4 bg-gray-100 rounded-full w-3/4" />
      <div className="h-4 bg-gray-100 rounded-full w-1/2" />
      <div className="grid grid-cols-2 gap-3 mt-6">
        {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-xl" />)}
      </div>
    </div>
  </div>
);

// ── Normalize CMS row ─────────────────────────────────────────────────────────
function normalize(s) {
  return {
    id:           s.id,
    title:        s.title,
    subtitle:     s.subtitle,
    icon:         s.icon,
    description:  s.description,
    highlights:   Array.isArray(s.highlights)   ? s.highlights   : [],
    technologies: Array.isArray(s.technologies) ? s.technologies : [],
    metrics:      Array.isArray(s.metrics)      ? s.metrics.filter((m) => m?.label || m?.value) : [],
    projects:     Array.isArray(s.projects)     ? s.projects     : [],
    projectCount: s.project_count ?? 0,
  };
}

const ServicesPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: cmsServices, loading } = useServices();

  const services = Array.isArray(cmsServices) ? cmsServices.map(normalize) : [];

  useEffect(() => {
    document.title = "Services | Lynxa Tech Guinea";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ── */}
      <ServiceHero />

      {/* ── Services section ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
              Nos Domaines d'Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque service incarne un savoir-faire solide et une approche orientée résultats,
              conçus pour transformer votre entreprise.
            </p>
          </motion.div>

          {/* Loading */}
          {loading && (
            <>
              <div className="flex flex-wrap gap-3 mb-8">
                {[...Array(3)].map((_, i) => <SkeletonTab key={i} />)}
              </div>
              <SkeletonDetail />
            </>
          )}

          {/* Empty state */}
          {!loading && services.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Layers" size={36} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-secondary mb-3">
                Services en cours de configuration
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Les détails de nos services arrivent bientôt. Contactez-nous pour
                discuter de vos besoins dès maintenant.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 glow-orange"
                >
                  <Icon name="MessageCircle" size={18} />
                  Nous contacter
                </Link>
                <Link
                  to="/admin/services"
                  className="inline-flex items-center gap-2 border border-border text-secondary hover:border-primary hover:text-primary font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm"
                >
                  <Icon name="Settings" size={16} />
                  Gérer les services
                </Link>
              </div>
            </motion.div>
          )}

          {/* Services loaded */}
          {!loading && services.length > 0 && (
            <>
              {/* Tab selector */}
              <div className="flex flex-wrap gap-3 mb-8">
                {services.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isActive={activeIndex === i}
                    onActivate={() => setActiveIndex(i)}
                    index={i}
                  />
                ))}
              </div>

              {/* Detail panel */}
              <AnimatePresence mode="wait">
                <ServiceDetails
                  key={services[activeIndex]?.id}
                  service={services[activeIndex]}
                />
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      {/* ── Process Timeline ── */}
      <ProcessTimeline />

      {/* ── Technology Stack ── */}
      <TechnologyStack />

      {/* ── Pricing ── */}
      <PricingFramework />

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-secondary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discutons de la manière dont notre expertise peut vous aider à atteindre
              vos objectifs technologiques en Guinée et au-delà.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-white/90 font-semibold px-7 py-3 rounded-xl transition-all duration-200 glow-orange"
                >
                  <Icon name="MessageCircle" size={18} />
                  Obtenir un devis
                </motion.span>
              </Link>
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-xl transition-all duration-200"
                >
                  <Icon name="Calendar" size={18} />
                  Planifier une consultation
                </motion.span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} color="#10B981" />
                <span>Consultation gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} color="#FFA500" />
                <span>Réponse sous 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} color="#3B82F6" />
                <span>Protection NDA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={logoIco} alt="Lynxa Tech" className="w-8 h-8 object-cover rounded-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold">Lynxa Tech</h3>
                  <p className="text-sm text-gray-400">Guinea</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md text-sm leading-relaxed">
                Construire l'avenir de la technologie en Guinée avec des solutions innovantes,
                compétitives à l'échelle mondiale et au service des communautés locales.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Développement Mobile</li>
                <li>Infrastructures Réseau</li>
                <li>Développement Web</li>
                <li>Cybersécurité</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Lynxa</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-primary transition-colors">À propos</Link></li>
                <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                <li><Link to="/partnership" className="hover:text-primary transition-colors">Partenariats</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Lynxa Tech Guinea. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
