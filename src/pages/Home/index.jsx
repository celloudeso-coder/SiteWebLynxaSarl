import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import MetricsDashboard from "./components/MetricsDashboard";
import ServiceGalaxies from "./components/ServiceGalaxies";
import logoIco from "../../../public/LYNXA.ico";
import TestimonialCarousel from "./components/TestimonialCarousel";
import FounderSpotlight from "./components/FounderSpotlight";
import SocialProofSection from "./components/SocialProofSection";

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Add reveal animation to elements
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    // Observe all sections with reveal animation
    const revealElements = document.querySelectorAll(".reveal-animation");
    revealElements?.forEach((el) => observer?.observe(el));

    return () => {
      revealElements?.forEach((el) => observer?.unobserve(el));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Lynxa Tech Guinée - Innovation Sans Frontières | Hub Technologique
          Africain
        </title>
        <meta
          name="description"
          content="Solutions technologiques leader de la Guinée au monde. Développement mobile, cybersécurité, infrastructure réseau et solutions web avec une qualité mondiale et une compréhension locale."
        />
        <meta
          name="keywords"
          content="technologie Guinée, innovation technologique africaine, développement mobile, cybersécurité, solutions réseau, développement web, Lynxa Tech Guinée"
        />
        <meta
          property="og:title"
          content="Lynxa Tech Guinée - Innovation Sans Frontières"
        />
        <meta
          property="og:description"
          content="Transformer les entreprises à travers la Guinée et l'Afrique de l'Ouest avec des solutions technologiques de pointe. Des applications mobiles à la cybersécurité, nous offrons une innovation de classe mondiale."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="/home"
        />
        <link rel="canonical" href="/home" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <div className="reveal-animation">
            <HeroSection />
          </div>

          {/* Metrics Dashboard */}
          <div className="reveal-animation">
            <MetricsDashboard />
          </div>

          {/* Service Galaxies */}
          <div className="reveal-animation">
            <ServiceGalaxies />
          </div>

          {/* Testimonial Carousel */}
          {/*<div className="reveal-animation">
            <TestimonialCarousel />
          </div>*/}

          {/* Founder Spotlight */}
          {/*<div className="reveal-animation">
            <FounderSpotlight />
          </div>*/}

          {/* Social Proof Section */}
          {/*<div className="reveal-animation">
            <SocialProofSection />
          </div>*/}
        </main>

        {/* Footer */}
        <footer className="bg-secondary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-black from-primary to-accent rounded-lg flex items-center justify-center">

                    <img
                        src={logoIco}
                        alt="Lynxa Tech logo"
                        className="w-8 h-8 object-cover rounded-lg"
                    />

                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">
                      Lynxa Tech
                    </h3>
                    <p className="text-sm text-gray-400">Guinea</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Construire l'avenir technologique de la Guinée vers le monde.
                  Nous offrons des solutions de classe mondiale avec une
                  compréhension locale approfondie, prouvant que l'innovation
                  n'a pas de frontières.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>🇬🇳</span>
                  <span>Fièrement basé a Conakry, Guinea</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-heading font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <a
                      href="/about"
                      className="hover:text-primary transition-colors"
                    >
                      A Propos
                    </a>
                  </li>
                  <li>
                    <a
                      href="/service"
                      className="hover:text-primary transition-colors"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="/portfolio"
                      className="hover:text-primary transition-colors"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a
                      href="/partnership"
                      className="hover:text-primary transition-colors"
                    >
                      Partenariat
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-heading font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>Conakry, Guinea</li>
                  <li>+224 621 724 657</li>
                  <li>contact@lynxatech.com</li>
                  <li>
                    <a
                      href="/contact"
                      className="text-primary hover:text-accent transition-colors"
                    >
                      Get in Touch →
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date()?.getFullYear()} Lynxa Tech Guinea. All rights
                reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Politique de Confidentialité
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Conditions d'Utilisation
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Securité
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
