import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import MetricsDashboard from "./components/MetricsDashboard";
import ServiceGalaxies from "./components/ServiceGalaxies";
import TestimonialCarousel from "./components/TestimonialCarousel";
import Icon from "../../components/AppIcon";
import logoIco from "../../../public/LYNXA.ico";

const COMMITMENTS = [
  { icon: "Flag",        label: "100 % Guinéen",        sub: "Ancré localement"           },
  { icon: "Zap",         label: "Réponse en 24h",        sub: "Support ultra-réactif"      },
  { icon: "Globe",       label: "Standards mondiaux",    sub: "Qualité internationale"     },
  { icon: "ShieldCheck", label: "Sécurité by design",   sub: "Confiance garantie"         },
];

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lynxa Tech Guinée - Innovation Sans Frontières | Hub Technologique Africain</title>
        <meta
          name="description"
          content="Solutions technologiques leader de la Guinée au monde. Développement mobile, cybersécurité, infrastructure réseau et solutions web avec une qualité mondiale et une compréhension locale."
        />
        <meta name="keywords" content="technologie Guinée, innovation technologique africaine, développement mobile, cybersécurité, solutions réseau, développement web, Lynxa Tech Guinée" />
        <meta property="og:title" content="Lynxa Tech Guinée - Innovation Sans Frontières" />
        <meta property="og:description" content="Transformer les entreprises à travers la Guinée et l'Afrique de l'Ouest avec des solutions technologiques de pointe." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/home" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="pt-16">
          {/* ── Hero ── */}
          <HeroSection />

          {/* ── Bande Engagements ── */}
          <section className="bg-secondary py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {COMMITMENTS.map((c, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center text-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-1">
                      <Icon name={c.icon} size={20} color="#FF8C00" />
                    </div>
                    <p className="text-white font-semibold text-sm">{c.label}</p>
                    <p className="text-gray-400 text-xs">{c.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Métriques ── */}
          <MetricsDashboard />

          {/* ── Services ── */}
          <ServiceGalaxies />

          {/* ── Témoignages ── */}
          <TestimonialCarousel />

          {/* ── CTA ── */}
          <section className="py-20 bg-gradient-to-br from-secondary via-gray-900 to-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
                  Prêt à transformer <span className="text-gradient-orange">votre entreprise ?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Discutons de votre projet. Notre équipe est disponible pour une consultation gratuite sous 24h.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 glow-orange"
                  >
                    <Icon name="MessageCircle" size={20} color="white" />
                    Lancer votre projet
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                  >
                    <Icon name="Eye" size={20} color="white" />
                    Voir nos réalisations
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="bg-secondary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <img src={logoIco} alt="Lynxa Tech logo" className="w-8 h-8 object-cover rounded-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">Lynxa Tech</h3>
                    <p className="text-sm text-gray-400">Guinea</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Construire l'avenir technologique de la Guinée vers le monde.
                  Nous offrons des solutions de classe mondiale avec une compréhension locale approfondie.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>🇬🇳</span>
                  <span>Fièrement basé à Conakry, Guinée</span>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold mb-4">Navigation</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  {[
                    { href: "/about",       label: "À Propos"    },
                    { href: "/service",     label: "Services"    },
                    { href: "/portfolio",   label: "Portfolio"   },
                    { href: "/partnership", label: "Partenariat" },
                    { href: "/join-us",     label: "Rejoindre"   },
                  ].map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>Conakry, Guinée</li>
                  <li>+224 621 724 657</li>
                  <li>contact@lynxatech.com</li>
                  <li>
                    <a href="/contact" className="text-primary hover:text-accent transition-colors">
                      Nous contacter →
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Lynxa Tech Guinea. Tous droits réservés.
              </p>
              <div className="flex space-x-6">
                {["Confidentialité", "CGU", "Sécurité"].map((t) => (
                  <a key={t} href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">{t}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
