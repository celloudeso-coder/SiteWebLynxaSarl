import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/3769146/pexels-photo-3769146.jpeg?_gl=1*t5gfgb*_ga*NzY2MTU2NDkwLjE3NjMwODkwMjc.*_ga_8JE65Q40S6*czE3NjMwODkwMjYkbzEkZzEkdDE3NjMwODkwOTIkajU5JGwwJGgw",
      title: "Innovation Sans Frontières",
      subtitle: "Construire l’Avenir depuis la Guinée",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/15652233/pexels-photo-15652233.jpeg?_gl=1*18fuy8z*_ga*NzY2MTU2NDkwLjE3NjMwODkwMjc.*_ga_8JE65Q40S6*czE3NjMwODkwMjYkbzEkZzEkdDE3NjMwODk0NjEkajQ5JGwwJGgw",
      title: "Qualité Globale, Compréhension Locale",
      subtitle: "Transformer le paysage technologique africain",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?_gl=1*1t8hw1l*_ga*NzY2MTU2NDkwLjE3NjMwODkwMjc.*_ga_8JE65Q40S6*czE3NjMwODkwMjYkbzEkZzEkdDE3NjMwODkyNTAkajUwJGwwJGgw",
      title: "Solutions de Classe Mondiale",
      subtitle: "De l’Afrique de l’Ouest vers le Monde",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-gray-900 to-primary">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroSlides?.map((slide, index) => (
          <div
            key={slide?.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-30" : "opacity-0"
            }`}
          >
            <Image
              src={slide?.image}
              alt={`Guinea tech landscape ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Orange Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20"></div>
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white mb-6">
            <span className="block text-gradient-orange">
              {heroSlides?.[currentSlide]?.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-8 font-medium">
            {heroSlides?.[currentSlide]?.subtitle}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
             Donner aux entreprises de Guinée et d’Afrique de l’Ouest les moyens de réussir 
            grâce à des solutions technologiques de pointe. Des applications mobiles aux 
            services réseaux, nous offrons une innovation de classe mondiale avec une 
            compréhension locale approfondie.

          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/contact">
              <Button
                variant="default"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="glow-orange text-lg px-8 py-4 min-w-[200px]"
              >
                Lancez votre projet 
              </Button>
            </Link>

            <Link to="/portfolio">
              <Button
                variant="outline"
                size="lg"
                iconName="TrendingUp"
                iconPosition="left"
                className="text-white border-white hover:bg-white hover:text-secondary text-lg px-8 py-4 min-w-[200px]"
              >
                 Découvrez notre impact 
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm mb-2">Discover More</p>
            <div className="animate-bounce">
              <Icon name="ChevronDown" size={24} color="white" />
            </div>
          </div>
        </div>
      </div>
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides?.map((_, index) => (
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
    </section>
  );
};

export default HeroSection;
