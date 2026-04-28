import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import FilterBar from "./components/FilterBar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import InnovationLab from "./components/InnovationLab";
import Icon from "../../components/AppIcon";
import { useProjects } from "../../hooks/useContent";

// ── Skeleton card shown while CMS data is loading ──────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-soft overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-6 space-y-3">
      <div className="flex justify-between">
        <div className="h-3 w-24 bg-gray-200 rounded-full" />
        <div className="h-3 w-16 bg-gray-200 rounded-full" />
      </div>
      <div className="h-5 w-3/4 bg-gray-200 rounded-full" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded-full" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      </div>
      <div className="h-10 bg-gray-100 rounded-xl" />
      <div className="h-8 bg-gray-100 rounded-xl" />
    </div>
  </div>
);

// ── Normalize a CMS row to the component shape ─────────────────────────────
function normalize(p) {
  const metrics = Array.isArray(p.metrics)
    ? p.metrics.filter((m) => m && (m.label || m.value))
    : [];
  return {
    id:             p.id,
    title:          p.title,
    service:        p.service_type,
    industry:       p.industry,
    scale:          p.scale,
    impact:         p.impact,
    description:    p.description,
    image:          p.image_url,
    duration:       p.duration,
    metrics,
    challenge:      p.challenge,
    solution:       p.solution,
    implementation: Array.isArray(p.implementation_steps) ? p.implementation_steps : [],
    technologies:   Array.isArray(p.technologies) ? p.technologies : [],
    testimonial:    p.testimonial,
    projectUrl:     p.project_url,
  };
}

const PortfolioShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen]         = useState(false);
  const [activeService, setActiveService]     = useState("Tous");
  const [activeIndustry, setActiveIndustry]   = useState("Tous");
  const [searchTerm, setSearchTerm]           = useState("");
  const [visibleProjects, setVisibleProjects] = useState(6);

  const { data: cmsProjects, loading } = useProjects();
  const projects = Array.isArray(cmsProjects) ? cmsProjects.map(normalize) : [];

  const filteredProjects = projects.filter((p) => {
    const matchService  = activeService  === "Tous" || p.service  === activeService;
    const matchIndustry = activeIndustry === "Tous" || p.industry === activeIndustry;
    const matchSearch   = !searchTerm
      || p.title?.toLowerCase().includes(searchTerm.toLowerCase())
      || p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      || p.service?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchService && matchIndustry && matchSearch;
  });

  const hasActiveFilters =
    activeService !== "Tous" || activeIndustry !== "Tous" || !!searchTerm;

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleClearFilters = () => {
    setActiveService("Tous");
    setActiveIndustry("Tous");
    setSearchTerm("");
    setVisibleProjects(6);
  };

  useEffect(() => {
    document.title = "Portfolio – Nos Réalisations | Lynxa Tech Guinea";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />

        {/* ── Project grid ─────────────────────────────────────────────── */}
        <section id="projets" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Icon name="Briefcase" size={16} />
                <span>Nos Réalisations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
                Histoires de Succès Inspirantes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez nos projets transformateurs qui ont eu un impact réel
                en Guinée et en Afrique de l'Ouest.
              </p>
            </motion.div>

            {/* Loading skeletons */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* No projects in CMS yet */}
            {!loading && projects.length === 0 && (
              <motion.div
                className="text-center py-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="FolderOpen" size={36} className="text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-secondary mb-3">
                  Portfolio en cours de construction
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                  Nos études de cas arrivent bientôt. En attendant, contactez-nous
                  pour discuter de votre projet.
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
                    to="/admin/portfolio"
                    className="inline-flex items-center gap-2 border border-border text-secondary hover:border-primary hover:text-primary font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm"
                  >
                    <Icon name="Settings" size={16} />
                    Gérer le portfolio
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Projects loaded */}
            {!loading && projects.length > 0 && (
              <>
                <FilterBar
                  activeService={activeService}
                  setActiveService={(v) => { setActiveService(v); setVisibleProjects(6); }}
                  activeIndustry={activeIndustry}
                  setActiveIndustry={(v) => { setActiveIndustry(v); setVisibleProjects(6); }}
                  searchTerm={searchTerm}
                  setSearchTerm={(v) => { setSearchTerm(v); setVisibleProjects(6); }}
                  onClearFilters={handleClearFilters}
                />

                {filteredProjects.length > 0 ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-6">
                      {Math.min(visibleProjects, filteredProjects.length)} sur{" "}
                      {filteredProjects.length} projet
                      {filteredProjects.length > 1 ? "s" : ""}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                      {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onViewDetails={handleViewDetails}
                          index={index}
                        />
                      ))}
                    </div>

                    {visibleProjects < filteredProjects.length && (
                      <div className="text-center">
                        <motion.button
                          onClick={() => setVisibleProjects((prev) => prev + 6)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 border border-border bg-white text-secondary hover:border-primary hover:text-primary font-semibold px-7 py-3 rounded-xl transition-all duration-200"
                        >
                          <Icon name="Plus" size={18} />
                          Charger plus de projets
                        </motion.button>
                      </div>
                    )}
                  </>
                ) : (
                  /* Filters returned nothing */
                  <div className="text-center py-16">
                    <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-bold text-secondary mb-2">
                      Aucun projet ne correspond à vos filtres
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Essayez d'élargir votre recherche ou réinitialisez les filtres.
                    </p>
                    <motion.button
                      onClick={handleClearFilters}
                      whileHover={{ scale: 1.03 }}
                      className="inline-flex items-center gap-2 border border-border text-secondary px-5 py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all text-sm font-medium"
                    >
                      <Icon name="RotateCcw" size={16} />
                      Réinitialiser les filtres
                    </motion.button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <InnovationLab />

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Prêt à créer votre histoire à succès ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Discutons de la manière dont nous pouvons transformer vos idées
                en réalité numérique. Notre équipe est prête à relever vos
                projets les plus ambitieux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 glow-orange"
                  >
                    <Icon name="MessageCircle" size={18} />
                    Lancer Votre Projet
                  </motion.span>
                </Link>
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-secondary font-semibold px-7 py-3 rounded-xl transition-all duration-200"
                  >
                    <Icon name="Calendar" size={18} />
                    Planifier une Consultation
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PortfolioShowcase;
