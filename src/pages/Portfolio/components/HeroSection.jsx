import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import { useHeroSection } from "../../../hooks/useContent";

const HeroSection = () => {
  const { data: hero } = useHeroSection("portfolio");
  const title       = hero?.title       || "Transformer les idées en";
  const subtitle    = hero?.subtitle    || "Réalité Digitale";
  const description = hero?.description || "Découvrez nos projets transformateurs qui ont eu un impact réel en Guinée et en Afrique de l'Ouest.";
  const ctaSecLink  = hero?.cta_secondary_link || "/contact";
  const ctaSecText  = hero?.cta_secondary_text || "Démarrer Votre Projet";

  return (
    <section className="relative bg-gradient-sunset overflow-hidden py-24 md:py-32">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Award" size={16} />
            <span>Vitrine du Portfolio</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            {title}
            <span className="block text-gradient-orange">{subtitle}</span>
          </h1>

          <p className="text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="#projets"
            className="inline-flex items-center justify-center gap-2 bg-white text-secondary hover:bg-white/90 font-semibold px-6 py-3 rounded-xl transition-all duration-200 glow-orange"
          >
            <Icon name="ArrowDown" size={18} />
            Explorer les Projets
          </a>
          <Link
            to={ctaSecLink}
            className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-secondary font-semibold px-6 py-3 rounded-xl transition-all duration-200"
          >
            <Icon name="MessageCircle" size={18} />
            {ctaSecText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
