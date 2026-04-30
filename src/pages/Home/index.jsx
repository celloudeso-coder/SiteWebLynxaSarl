import React, { useEffect, useState } from "react";
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
import { getHomeEngagements, getHomeWhyItems } from "../../lib/cms";

const STATIC_COMMITMENTS = [
  { icon: "Flag",        label: "100 % Guinéen",       sub_label: "Ancré localement"       },
  { icon: "Zap",         label: "Réponse en 24h",       sub_label: "Support ultra-réactif"  },
  { icon: "Globe",       label: "Standards mondiaux",   sub_label: "Qualité internationale" },
  { icon: "ShieldCheck", label: "Sécurité by design",   sub_label: "Confiance garantie"     },
];

const STATIC_WHY = [
  { icon: "MapPin",    title: "Expertise locale",              description: "Nous comprenons les défis uniques des marchés africains et concevons des solutions parfaitement adaptées." },
  { icon: "Award",     title: "Qualité internationale",        description: "Nos solutions respectent les standards mondiaux tout en étant calibrées pour les réalités locales." },
  { icon: "Users",     title: "Équipe pluridisciplinaire",     description: "Mobile, réseau, cybersécurité, web — toutes les compétences réunies sous un même toit." },
  { icon: "Clock",     title: "Réactivité garantie",           description: "Consultation gratuite, réponse sous 24h et suivi continu tout au long de votre projet." },
  { icon: "Handshake", title: "Partenariat sur le long terme", description: "Nous construisons des relations durables, pas des contrats. Votre succès est notre succès." },
  { icon: "Lock",      title: "Sécurité by design",            description: "La sécurité n'est pas une option : elle est intégrée dès la conception de chaque solution." },
];

const Homepage = () => {
  const [commitments, setCommitments] = useState(STATIC_COMMITMENTS);
  const [whyItems, setWhyItems]       = useState(STATIC_WHY);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Lynxa Tech Guinée - Innovation Sans Frontières";
    getHomeEngagements().then((d) => { if (d?.length) setCommitments(d); }).catch(() => {});
    getHomeWhyItems().then((d)    => { if (d?.length) setWhyItems(d);    }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Lynxa Tech Guinée - Innovation Sans Frontières | Hub Technologique Africain</title>
        <meta name="description" content="Solutions technologiques leader de la Guinée au monde. Développement mobile, cybersécurité, infrastructure réseau et solutions web avec une qualité mondiale et une compréhension locale." />
        <meta name="keywords" content="technologie Guinée, innovation technologique africaine, développement mobile, cybersécurité, solutions réseau, développement web, Lynxa Tech Guinée" />
        <meta property="og:title" content="Lynxa Tech Guinée - Innovation Sans Frontières" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
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
                {commitments.map((c, i) => (
                  <motion.div
                    key={c.id || i}
                    className="flex flex-col items-center text-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-1">
                      <Icon name={c.icon} size={20} color="#FF8C00" />
                    </div>
                    <p className="text-white font-semibold text-sm">{c.label}</p>
                    <p className="text-gray-400 text-xs">{c.sub_label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Métriques ── */}
          <MetricsDashboard />

          {/* ── Services ── */}
          <ServiceGalaxies />

          {/* ── Pourquoi Lynxa ? ── */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-14"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Icon name="Sparkles" size={16} />
                  <span>Notre différence</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
                  Pourquoi choisir <span className="text-gradient-orange">Lynxa Tech ?</span>
                </h2>
                <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                  Nous combinons expertise technique de pointe et compréhension profonde du marché africain pour des résultats concrets.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyItems.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    className="bg-white rounded-2xl p-6 hover:shadow-medium transition-shadow duration-300"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon name={item.icon} size={22} color="var(--color-primary)" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-secondary mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/about">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    className="inline-flex items-center gap-2 border border-gray-200 text-secondary hover:border-primary hover:text-primary font-semibold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm"
                  >
                    En savoir plus sur nous
                    <Icon name="ArrowRight" size={16} />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* ── Témoignages ── */}
          <TestimonialCarousel />

          {/* ── CTA ── */}
          <section className="py-20 bg-gradient-to-br from-secondary via-gray-900 to-primary relative overflow-hidden">
            <motion.div
              className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
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
                  <Link to="/contact">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 glow-orange cursor-pointer"
                    >
                      <Icon name="MessageCircle" size={20} color="white" />
                      Lancer votre projet
                    </motion.span>
                  </Link>
                  <Link to="/portfolio">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 cursor-pointer"
                    >
                      <Icon name="Eye" size={20} color="white" />
                      Voir nos réalisations
                    </motion.span>
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
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={logoIco} alt="Lynxa Tech logo" className="w-8 h-8 object-cover rounded-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">Lynxa Tech</h3>
                    <p className="text-sm text-gray-400">Guinea</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-5 leading-relaxed text-sm">
                  Construire l'avenir technologique de la Guinée vers le monde.
                  Solutions de classe mondiale avec une compréhension locale approfondie.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
                  <span>🇬🇳</span>
                  <span>Fièrement basé à Conakry, Guinée</span>
                </div>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/company/lynxatech" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                    <Icon name="Linkedin" size={16} />
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                    <Icon name="Twitter" size={16} />
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                    <Icon name="Facebook" size={16} />
                  </a>
                  <a href="mailto:contact@lynxatech.com" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200">
                    <Icon name="Mail" size={16} />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold mb-4">Navigation</h4>
                <ul className="space-y-2.5 text-sm text-gray-300">
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
                <ul className="space-y-2.5 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Icon name="MapPin" size={14} className="text-primary flex-shrink-0" />
                    Conakry, Guinée
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Phone" size={14} className="text-primary flex-shrink-0" />
                    +224 621 724 657
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Mail" size={14} className="text-primary flex-shrink-0" />
                    contact@lynxatech.com
                  </li>
                  <li className="pt-1">
                    <a href="/contact" className="text-primary hover:text-accent transition-colors font-medium">
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
              <div className="flex gap-6">
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
