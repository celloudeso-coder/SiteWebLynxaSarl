import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-sunset min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 mt-4">
            <Icon name="Award" size={16} /> 
            <span>Vitrine du Portfolio</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6">
            Transformer les idées en
            <span className="block text-gradient-orange">Réalité Digitale</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Nous aidons les organisations à réussir leur transformation digitale 
            grâce à des solutions technologiques innovantes et adaptées à leurs 
            besoins.
          </p>

          {/* Stats */}
          {/*s<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                0+
              </div>
              <div className="text-white/80 text-sm">Projets Livrés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                0+
              </div>
              <div className="text-white/80 text-sm">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                0%
              </div>
              <div className="text-white/80 text-sm">Taux de Réussite</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                0+
              </div>
              <div className="text-white/80 text-sm">Années d'Expérience</div>
            </div>
          </div> */}

          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="ArrowDown"
              iconPosition="right"
              className="bg-white text-secondary hover:bg-white/90 glow-orange"
            >
              Explorer les Projets
            </Button> */}
            {/* <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-secondary"
            >
              Démarrer Votre Projet
            </Button> */}
          {/* </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-white/60" />
      </div> */}
    </section>
  );
};

export default HeroSection;
