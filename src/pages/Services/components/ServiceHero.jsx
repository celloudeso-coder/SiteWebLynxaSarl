import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import { useHeroSection } from "../../../hooks/useContent";

const ServiceHero = () => {
  const { data: hero } = useHeroSection("services");
  const title       = hero?.title       || "Nos";
  const subtitle    = hero?.subtitle    || "Services";
  const description = hero?.description || "Des solutions technologiques complètes conçues pour les entreprises africaines avec des ambitions mondiales.";

  return (
    <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 text-white overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        className="absolute top-16 left-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-12 w-44 h-44 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary rounded-full px-5 py-2 mb-6">
            <Icon name="Layers" size={16} />
            <span className="text-sm font-medium text-white/90">Univers de Solutions</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            {title}
            <span className="text-gradient-orange block">{subtitle}</span>
          </h1>

          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 glow-orange"
          >
            <Icon name="ArrowDown" size={18} />
            Explorer les Services
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-xl transition-all duration-200"
          >
            <Icon name="MessageCircle" size={18} />
            Discuter de Votre Projet
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
