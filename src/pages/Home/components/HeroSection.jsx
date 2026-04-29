import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import { useHeroSection } from "../../../hooks/useContent";

const BG_IMAGES = [
  "https://images.pexels.com/photos/3769146/pexels-photo-3769146.jpeg?_gl=1*t5gfgb*_ga*NzY2MTU2NDkwLjE3NjMwODkwMjc.*_ga_8JE65Q40S6*czE3NjMwODkwMjYkbzEkZzEkdDE3NjMwODkwOTIkajU5JGwwJGgw",
  "https://images.pexels.com/photos/15652233/pexels-photo-15652233.jpeg?_gl=1*18fuy8z*_ga*NzY2MTU2NDkwLjE3NjMwODkwMjc.*_ga_8JE65Q40S6*czE3NjMwODkwMjYkbzEkZzEkdDE3NjMwODk0NjEkajQ5JGwwJGgw",
  "https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?_gl=1*1t8hw1l*_ga*NzY2MTU2NDkwLjE3NjMwODkwMjc.*_ga_8JE65Q40S6*czE3NjMwODkwMjYkbzEkZzEkdDE3NjMwODkyNTAkajUwJGwwJGgw",
];

const TAGLINES = [
  "Développement Mobile · Infrastructure Réseau · Web",
  "De Conakry au reste du monde 🌍",
  "Innovation locale, impact global",
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${((i * 37 + 11) % 97)}%`,
  top: `${((i * 53 + 7) % 93)}%`,
  delay: (i * 0.3) % 3,
  duration: 2 + (i % 3),
  size: i % 3 === 0 ? 12 : 8,
}));

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const { data: cmsHero } = useHeroSection("home");

  const title       = cmsHero?.title            ?? "Innovation Sans Frontières";
  const subtitle    = cmsHero?.subtitle          ?? "Construire l'Avenir depuis la Guinée";
  const description = cmsHero?.description       ?? "Donner aux entreprises de Guinée et d'Afrique de l'Ouest les moyens de réussir grâce à des solutions technologiques de pointe. Des applications mobiles aux services réseaux, nous offrons une innovation de classe mondiale avec une compréhension locale approfondie.";
  const ctaPrimaryText    = cmsHero?.cta_primary_text    ?? "Lancez votre projet";
  const ctaPrimaryLink    = cmsHero?.cta_primary_link    ?? "/contact";
  const ctaSecondaryText  = cmsHero?.cta_secondary_text  ?? "Découvrez notre impact";
  const ctaSecondaryLink  = cmsHero?.cta_secondary_link  ?? "/portfolio";

  useEffect(() => {
    const bgInterval = setInterval(() => setCurrentSlide((p) => (p + 1) % BG_IMAGES.length), 5000);
    const taglineInterval = setInterval(() => setTaglineIdx((p) => (p + 1) % TAGLINES.length), 3000);
    return () => { clearInterval(bgInterval); clearInterval(taglineInterval); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-gray-900 to-primary">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {BG_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-30" : "opacity-0"
            }`}
          >
            <Image src={img} alt={`Tech background ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary rounded-full opacity-50"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping inline-block" />
            🇬🇳 Hub Technologique · Conakry, Guinée
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="block text-gradient-orange">{title}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-4 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {subtitle}
        </motion.p>

        {/* Rotating tagline */}
        <motion.div
          className="h-8 mb-8 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIdx}
              className="text-base text-primary font-semibold tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {TAGLINES[taglineIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <Link to={ctaPrimaryLink}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 glow-orange cursor-pointer min-w-[200px] justify-center"
            >
              <Icon name="Rocket" size={20} />
              {ctaPrimaryText}
            </motion.span>
          </Link>
          <Link to={ctaSecondaryLink}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 cursor-pointer min-w-[200px] justify-center"
            >
              <Icon name="TrendingUp" size={20} />
              {ctaSecondaryText}
            </motion.span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-400 text-sm mb-2">Découvrir</p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="ChevronDown" size={24} color="white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {BG_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary scale-125" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
