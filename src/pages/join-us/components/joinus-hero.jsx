import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import { useHeroSection } from "../../../hooks/useContent";

const PERKS = [
  { icon: "Zap",        label: "Projets impactants",      sub: "Solutions qui changent des vies" },
  { icon: "Users",      label: "Équipe soudée",            sub: "Culture collaboration & bienveillance" },
  { icon: "TrendingUp", label: "Croissance rapide",        sub: "Formation continue, responsabilités réelles" },
  { icon: "Globe",      label: "Vision internationale",    sub: "Guinée vers le monde" },
];

const JoinUsHero = () => {
  const { data: hero } = useHeroSection("join-us");

  const title    = hero?.title       ?? "Rejoignez l'aventure";
  const subtitle = hero?.subtitle    ?? "Façonnons ensemble l'avenir tech africain";
  const desc     = hero?.description ?? "Nous croyons en l'innovation, la collaboration et l'impact. Faites partie d'une équipe qui construit le futur technologique de la Guinée.";
  const cta1     = hero?.cta_primary_text   ?? "Postuler maintenant";
  const cta2     = hero?.cta_secondary_text ?? "Voir les postes ouverts";

  return (
    <section className="relative bg-gradient-to-br from-secondary via-gray-900 to-primary/30 text-white overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #FF8C00 1px, transparent 1px)", backgroundSize: "48px 48px" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Gauche — texte */}
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
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              🇬🇳 Conakry · Nous recrutons !
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
                href="#candidature"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl font-semibold transition-all glow-orange"
              >
                <Icon name="Send" size={18} color="white" />
                {cta1}
              </motion.a>
              <motion.a
                href="#postes"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-7 py-3.5 rounded-xl font-semibold transition-all"
              >
                <Icon name="Briefcase" size={18} color="white" />
                {cta2}
              </motion.a>
            </div>
          </motion.div>

          {/* Droite — carte avantages */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-6">
                Pourquoi nous rejoindre
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {PERKS.map((p, i) => (
                  <motion.div
                    key={p.label}
                    className="bg-white/10 rounded-xl p-4 flex flex-col gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1 }}
                    whileHover={{ scale: 1.04 }}
                  >
                    <div className="w-10 h-10 bg-primary/30 rounded-lg flex items-center justify-center">
                      <Icon name={p.icon} size={20} color="#FF8C00" />
                    </div>
                    <p className="text-white font-semibold text-sm">{p.label}</p>
                    <p className="text-white/55 text-xs leading-snug">{p.sub}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-white/50 border-t border-white/10 pt-5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <span>Équipe de 7 passionnés · en pleine croissance</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default JoinUsHero;
