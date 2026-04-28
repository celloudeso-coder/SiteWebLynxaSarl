import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
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

// Deterministic particle positions to avoid re-render jitter
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${((i * 37 + 11) % 97)}%`,
  top: `${((i * 53 + 7) % 93)}%`,
  delay: `${(i * 0.3) % 3}s`,
  duration: `${2 + (i % 3)}s`,
  size: i % 3 === 0 ? "w-3 h-3" : "w-2 h-2",
  opacity: i % 4 === 0 ? "opacity-40" : "opacity-60",
}));

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { data: cmsHero } = useHeroSection("home");

  const title = cmsHero?.title ?? "Innovation Sans Frontières";
  const subtitle = cmsHero?.subtitle ?? "Construire l'Avenir depuis la Guinée";
  const description =
    cmsHero?.description ??
    "Donner aux entreprises de Guinée et d'Afrique de l'Ouest les moyens de réussir grâce à des solutions technologiques de pointe. Des applications mobiles aux services réseaux, nous offrons une innovation de classe mondiale avec une compréhension locale approfondie.";
  const ctaPrimaryText = cmsHero?.cta_primary_text ?? "Lancez votre projet";
  const ctaPrimaryLink = cmsHero?.cta_primary_link ?? "/contact";
  const ctaSecondaryText = cmsHero?.cta_secondary_text ?? "Découvrez notre impact";
  const ctaSecondaryLink = cmsHero?.cta_secondary_link ?? "/portfolio";

  useEffect(() => {
    setIsVisible(true);

    const bgInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BG_IMAGES.length);
    }, 5000);

    const taglineInterval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(taglineInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-gray-900 to-primary">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {BG_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-30" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Guinea tech landscape ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Orange Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className={`absolute ${p.size} bg-primary rounded-full ${p.opacity} animate-pulse`}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Animated Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium animate-pulse">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping inline-block" />
              🇬🇳 Hub Technologique · Conakry, Guinée
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white mb-6">
            <span className="block text-gradient-orange">{title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-4 font-medium">
            {subtitle}
          </p>

          {/* Rotating Tagline */}
          <div className="h-8 mb-8 flex items-center justify-center overflow-hidden">
            <p
              key={taglineIdx}
              className="text-base text-primary font-semibold tracking-wide transition-all duration-500 animate-fadeIn"
              style={{ animation: "fadeSlideUp 0.5s ease" }}
            >
              {TAGLINES[taglineIdx]}
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={ctaPrimaryLink}>
              <Button
                variant="default"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="glow-orange text-lg px-8 py-4 min-w-[200px]"
              >
                {ctaPrimaryText}
              </Button>
            </Link>
            <Link to={ctaSecondaryLink}>
              <Button
                variant="outline"
                size="lg"
                iconName="TrendingUp"
                iconPosition="left"
                className="text-white border-white hover:bg-white hover:text-secondary text-lg px-8 py-4 min-w-[200px]"
              >
                {ctaSecondaryText}
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm mb-2">Découvrir</p>
            <div className="animate-bounce">
              <Icon name="ChevronDown" size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {BG_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
