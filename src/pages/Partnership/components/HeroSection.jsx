import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-gray-900 to-primary min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-accent rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-primary rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center glow-orange">
                <Icon name="Handshake" size={24} color="white" />
              </div>
              <span className="text-accent font-medium">
                Passerelle de Partenariat
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Construisons
              <span className="text-gradient-orange block">
                l'Avenir Ensemble
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Des startups aux grandes entreprises, des commerces locaux aux
              organisations internationales – nous créons des parcours de
              collaboration sur mesure qui transforment votre vision en réalité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                className="glow-orange"
              >
                Commencez une collaboration
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-secondary"
              >
                Planifier une consultation
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          {/* <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3 glow-orange">
                    <Icon name="Users" size={24} color="white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">50+ Clients</h3>
                  <p className="text-gray-300 text-sm">Partenariats réussis</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="Globe" size={24} color="white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">
                    15+ Countries
                  </h3>
                  <p className="text-gray-300 text-sm">Portée mondiale</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3 glow-orange">
                    <Icon name="Award" size={24} color="white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">
                    98% de succès
                  </h3>
                  <p className="text-gray-300 text-sm">Projets achevés</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="Clock" size={24} color="white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">
                    24/7 Support
                  </h3>
                  <p className="text-gray-300 text-sm">Toujours Disponible</p>
                </div>
              </div>
            </div>

             Floating Elements 
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full blur-xl"></div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
