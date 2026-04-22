import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-gray-900 to-primary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&h=1080"
          alt="African tech innovation and digital transformation"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Orange Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/30"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(15)]?.map((_, i) => (
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            <span className="block text-gradient-orange mb-2">
              Perspectives &
            </span>
            <span className="block">Leadership de Savoir</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 font-medium max-w-4xl mx-auto">
            Pionnier de l’innovation technologique africaine grâce à l’analyse
            experte et au leadership éclairé
          </p>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Restez à la pointe avec les analyses complètes de Lynxa Tech sur les
            tendances de cybersécurité en Afrique de l’Ouest, les meilleures
            pratiques de développement mobile pour les marchés émergents et les
            innovations en infrastructure réseau à travers la Guinée et au-delà.
          </p>

          {/* Key Topics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {[
              { icon: "Shield", label: "Cybersecurity" },
              { icon: "Smartphone", label: "Mobile Innovation" },
              { icon: "Network", label: "Network Solutions" },
              { icon: "TrendingUp", label: "African Tech Ecosystem" },
            ]?.map((topic) => (
              <div
                key={topic?.label}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <Icon
                  name={topic?.icon}
                  size={32}
                  color="#FF6B35"
                  className="mx-auto mb-2"
                />
                <p className="text-white text-sm font-medium">{topic?.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="#blog-section">
              <Button
                variant="default"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                className="glow-orange text-lg px-8 py-4 min-w-[200px]"
              >
                Explorez les articles
              </Button>
            </Link>

            <Link to="#newsletter">
              <Button
                variant="outline"
                size="lg"
                iconName="Mail"
                iconPosition="left"
                className="text-white border-white hover:bg-white hover:text-secondary text-lg px-8 py-4 min-w-[200px]"
              >
                Souscrire aux mises a jour
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
