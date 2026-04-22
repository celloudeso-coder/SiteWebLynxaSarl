import React from "react";
import Icon from "../../../components/AppIcon";

const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-secondary/95 min-h-screen to-primary/20 text-white overflow-hidden">
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
            Construisons ensemble
            <span className="block text-gradient-orange">
              Incroyable Ensemble
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Prêt à transformer vos idées en réalité ? Connectez-vous avec Lynxa via votre canal de
            communication préféré.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Réponse sous 24 heures </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} />
              <span>Disponible en Anglais & Français</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Securisé & Confidentiel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ContactHero;
