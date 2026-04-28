import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import { useHeroSection } from "../../../hooks/useContent";

const STATS = [
  { icon: "Rocket",     label: "Projets lancés",     value: "1+"  },
  { icon: "Globe",      label: "Présence africaine",  value: "🌍"  },
  { icon: "Award",      label: "Taux de réussite",    value: "98%" },
  { icon: "Clock",      label: "Support",             value: "24/7"},
];

const HeroSection = () => {
  const { data: hero } = useHeroSection("partnership");

  const title    = hero?.title       ?? "Construisons l'Avenir";
  const subtitle = hero?.subtitle    ?? "Collaborons Ensemble";
  const desc     = hero?.description ?? "Des startups aux grandes entreprises — nous créons des parcours de collaboration sur mesure qui transforment votre vision en réalité.";
  const cta1Text = hero?.cta_primary_text   ?? "Démarrer un projet";
  const cta1Link = hero?.cta_primary_link   ?? "#project-form";
  const cta2Text = hero?.cta_secondary_text ?? "Nous contacter";
  const cta2Link = hero?.cta_secondary_link ?? "/contact";

  return (
    <section className="relative bg-gradient-to-br from-secondary via-gray-900 to-primary/30 text-white overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      {/* Grid décoratif */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #FF8C00 1px, transparent 1px)", backgroundSize: "48px 48px" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Colonne gauche */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm mb-8"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Handshake" size={16} color="white" />
              </div>
              <span className="text-accent font-medium">Passerelle de Partenariat</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 leading-tight">
              {subtitle}
              <span className="block text-gradient-orange mt-2">{title}</span>
            </h1>

            <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-xl">
              {desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={cta1Link}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl font-semibold transition-all glow-orange"
              >
                <Icon name="MessageSquare" size={18} color="white" />
                {cta1Text}
              </motion.a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={cta2Link}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-7 py-3.5 rounded-xl font-semibold transition-all"
                >
                  <Icon name="Calendar" size={18} color="white" />
                  {cta2Text}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Colonne droite — carte stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-6">
                Pourquoi nous choisir
              </h2>
              <div className="grid grid-cols-2 gap-5">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="bg-white/10 rounded-xl p-5 flex flex-col items-center text-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <div className="w-12 h-12 bg-primary/30 rounded-lg flex items-center justify-center">
                      <Icon name={s.icon} size={22} color="#FF8C00" />
                    </div>
                    <span className="text-2xl font-bold text-white">{s.value}</span>
                    <span className="text-xs text-white/60">{s.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-white/50 border-t border-white/10 pt-5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <span>Équipe disponible · Conakry, Guinée 🇬🇳</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
