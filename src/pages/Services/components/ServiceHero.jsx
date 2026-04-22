import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

import { Link } from "react-router-dom";

import logoIco from "../../../../public/LYNXA.ico";


const ServiceHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary min-h-screen via-secondary/95 to-primary/20 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
 
            <img
              src={logoIco}
              alt="Lynxa Tech logo"
              className="w-8 h-8 object-cover rounded-lg"
            />

            <span className="text-sm font-medium text-primary">
              Univers de Solutions
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
            Deux Galaxies de
            <span className="text-gradient-orange block">Services</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            <br />
            Découvrez nos solutions technologiques complètes, conçues pour les
            entreprises africaines ayant des ambitions mondiales.{" "}
            {/*Chaque domaine
            de service représente des années d'expertise et des résultats
            éprouvés.*/}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              iconName="Rocket"
              iconPosition="left"
              className="glow-orange"
            >
              Explorer les Services
            </Button>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Discuter de Votre Projet
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default ServiceHero;
