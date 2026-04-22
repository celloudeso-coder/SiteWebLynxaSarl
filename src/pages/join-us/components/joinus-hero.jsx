import React from "react";
import Icon from "../../../components/AppIcon";

const JoinUsHero = () => {
  return (
    <section className="relative bg-gradient-to-br min-h-screen from-secondary via-secondary/95 to-primary/20 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-8 glow-orange">
            <Icon
              name="MessageCircle"
              size={40}
              color="white"
              strokeWidth={2}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Rejoignez l’aventure
            <span className="block text-gradient-orange">Lynxa Tech</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Nous croyons en l’innovation, la collaboration et l’impact. Faites
            partie d’une équipe qui façonne l’avenir technologique africain.
          </p>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default JoinUsHero;
