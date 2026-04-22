import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import BlogSection from "./components/BlogSection";
import WhitepapersSection from "./components/WhitepapersSection";
import TechTalksSection from "./components/TechTalksSection";
import IndustryReportsSection from "./components/IndustryReportsSection";
import NewsletterSection from "./components/NewsletterSection";
import ContentFilters from "./components/ContentFilters";

const InsightsKnowledgeLeadership = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
          Perspectives & Leadership en Connaissances | Lynxa Tech Guinée -
          Innovation Technologique Africaine
        </title>
        <meta
          name="description"
          content="Restez à la pointe grâce aux perspectives sectorielles de Lynxa Tech, au contenu de leadership éclairé et aux analyses d’experts sur l’innovation technologique africaine, les tendances en cybersécurité et les meilleures pratiques en développement mobile."
        />
        <meta
          name="keywords"
          content="perspectives tech africaines, tendances technologiques Guinée, analyse cybersécurité, développement mobile, infrastructure réseau, leadership technologique, rapports d’innovation, transformation digitale Afrique de l’Ouest"
        />
        <meta
          property="og:title"
          content="Perspectives & Leadership en Connaissances | Lynxa Tech Guinée"
        />
        <meta
          property="og:description"
          content="Découvrez des perspectives de pointe et du contenu de leadership éclairé de Lynxa Tech Guinée. Analyses expertes sur les tendances technologiques africaines, la cybersécurité et l’innovation digitale."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/insights-knowledge-leadership" />
        <link rel="canonical" href="/insights-knowledge-leadership" />
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

          {/* Content Filters */}
          <div className="reveal-animation">
            <ContentFilters
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Blog Section */}
          <div className="reveal-animation">
            <BlogSection
              activeCategory={activeCategory}
              searchQuery={searchQuery}
            />
          </div>

          {/* Whitepapers Section */}
          <div className="reveal-animation">
            <WhitepapersSection
              activeCategory={activeCategory}
              searchQuery={searchQuery}
            />
          </div>

          {/* Tech Talks Section */}
          <div className="reveal-animation">
            <TechTalksSection
              activeCategory={activeCategory}
              searchQuery={searchQuery}
            />
          </div>

          {/* Industry Reports Section */}
          <div className="reveal-animation">
            <IndustryReportsSection
              activeCategory={activeCategory}
              searchQuery={searchQuery}
            />
          </div>

          {/* Newsletter Section */}
          <div className="reveal-animation">
            <NewsletterSection />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-secondary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">CT</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">
                      Lynxa Tech
                    </h3>
                    <p className="text-sm text-gray-400">Guinea</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Construire l'avenir de la technologie de la Guinée vers le
                  monde. Nous fournissons des solutions de classe mondiale avec
                  une compréhension locale approfondie, démontrant que
                  l'innovation ne connaît pas de frontières.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>🇬🇳</span>
                  <span>Basé fièrement à Conakry, Guinée</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-heading font-bold mb-4">Liens Rapides</h4>
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
                      Partenariah
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-heading font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>Conakry, Guinea</li>
                  <li>+224 123 456 789</li>
                  <li>hello@lynxatech.gn</li>
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
                  Politique de confidentialité
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Conditions d'utilisation
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Sécurité
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InsightsKnowledgeLeadership;
