import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import FounderStory from "./components/FounderStory";
import CompanyTimeline from "./components/CompanyTimeline";
import TeamSpotlight from "./components/TeamSpotlight";
import WhyGuinea from "./components/WhyGuinea";
import CompanyValues from "./components/CompanyValues";
import VisionRoadmap from "./components/VisionRoadmap";
import Icon from "../../components/AppIcon";
import logoIco from "../../../public/LYNXA.ico";

const AboutInnovationStoryVision = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "À propos | Lynxa Tech Guinée";
  }, []);

  return (
    <>
      <Helmet>
        <title>À propos - Histoire de l'Innovation & Vision | Lynxa Tech Guinée</title>
        <meta name="description" content="Découvrez le parcours inspirant de Lynxa Tech, d'une petite startup guinéenne au principal hub d'innovation technologique en Afrique de l'Ouest." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* ── Hero ── */}
        <section className="pt-24 pb-20 bg-gradient-sunset text-white relative overflow-hidden">
          {/* Decorative blobs */}
          <motion.div
            className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Icon name="MapPin" size={16} />
                Conakry, Guinée
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-heading font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Innovation
                <span className="block text-accent"> Sans frontières </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                L'histoire inspirante d'une équipe visionnaire née en Guinée, qui bâtit pas à pas une entreprise
                technologique capable de rivaliser avec les standards internationaux. Avec LYNXA Tech, nous ne nous
                contentons pas de rêver : nous développons des solutions concrètes.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a href="/assets/docs/Fiche_Entreprise_Lynxa_Tech.pdf" download>
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 border border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    <Icon name="Download" size={18} />
                    Profil de l'entreprise
                  </motion.span>
                </a>
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-white/90 font-semibold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    <Icon name="MessageCircle" size={18} />
                    Nous contacter
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Main Content ── */}
        <FounderStory />
        <CompanyTimeline />
        <TeamSpotlight />
        <WhyGuinea />
        <CompanyValues />
        <VisionRoadmap />

        {/* ── Final CTA ── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                Prêt à collaborer avec les leaders technologiques de Guinée ?
              </h2>
              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                Maintenant que vous connaissez mieux Lynxa, écrivons ensemble le prochain chapitre.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/service">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 glow-orange cursor-pointer"
                  >
                    <Icon name="ArrowRight" size={18} />
                    Découvrez nos services
                  </motion.span>
                </Link>
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    className="inline-flex items-center gap-2 border border-gray-200 text-secondary hover:border-primary hover:text-primary font-semibold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    <Icon name="MessageCircle" size={18} />
                    Lancer une conversation
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={logoIco} alt="Lynxa Tech" className="w-8 h-8 object-cover rounded-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">Lynxa Tech</h3>
                    <p className="text-sm text-gray-400">Guinea</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 max-w-md text-sm leading-relaxed">
                  Construire l'avenir de la technologie depuis le cœur de l'Afrique de l'Ouest.
                </p>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/company/lynxatech" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                    <Icon name="Linkedin" size={18} />
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                    <Icon name="Twitter" size={18} />
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                    <Icon name="Facebook" size={18} />
                  </a>
                  <a href="mailto:contact@lynxatech.com" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                    <Icon name="Mail" size={18} />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Développement Mobile</li>
                  <li>Infrastructures Réseau</li>
                  <li>Développement Web</li>
                  <li>Cybersécurité</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Lynxa</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link to="/about" className="hover:text-primary transition-colors">À propos</Link></li>
                  <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                  <li><Link to="/partnership" className="hover:text-primary transition-colors">Partenariats</Link></li>
                  <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Lynxa Tech Guinea. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutInnovationStoryVision;
