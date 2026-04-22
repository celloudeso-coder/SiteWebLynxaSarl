import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import FounderStory from "./components/FounderStory";
import CompanyTimeline from "./components/CompanyTimeline";
import TeamSpotlight from "./components/TeamSpotlight";
import TeamSpotlight1 from "./components/TeamSpotlight1";
import WhyGuinea from "./components/WhyGuinea";
import CompanyValues from "./components/CompanyValues";
import VisionRoadmap from "./components/VisionRoadmap";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

import { Link } from "react-router-dom";

import logoIco from "../../../public/LYNXA.ico";




const AboutInnovationStoryVision = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          À propos - Histoire de l'Innovation & Vision | Lynxa Tech Guinée
        </title>
        <meta
          name="description"
          content="Découvrez le parcours inspirant de Lynxa Tech, d'une petite startup guinéenne au principal hub d'innovation technologique en Afrique de l'Ouest. Rencontrez notre équipe, découvrez nos valeurs et explorez notre vision pour l'avenir."
        />
        <meta
          name="keywords"
          content="Lynxa Tech Guinée, à propos, histoire du fondateur, équipe, innovation, technologie Afrique de l'Ouest, technologie Guinée Lynxa, vision, mission, valeurs"
        />
        <meta
          property="og:title"
          content="À propos - Histoire de l'Innovation & Vision | Lynxa Tech Guinée"
        />
        <meta
          property="og:description"
          content="L'histoire inspirante de la manière dont Lynxa Tech est devenue le leader technologique en Guinée avec des ambitions globales et un impact local."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-sunset min-h-screen text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
                <Icon name="MapPin" size={16} className="mr-2" />
                 Conakry, Guinée
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Innovation
                <span className="block text-accent"> Sans frontières </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
                L’histoire inspirante d’une équipe visionnaire née en Guinée, qui bâtit pas à pas une entreprise 
                technologique capable de rivaliser avec les standards internationaux. Avec LYNXA Tech, nous ne nous 
                contentons pas de rêver : nous développons des solutions concrètes et offrons des services de qualité.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {/*<Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="bg-white text-secondary hover:bg-white/90"
                >
                  Regardez notre histoire
                </Button>*/}
                <a href="/assets/docs/Fiche_Entreprise_Lynxa_Tech.pdf" download>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Download"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white/10"
                >
                   Profil de l’entreprise
                </Button>
                </a>
              </div>

              {/* Quick Stats
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">2025</div>
                  <div className="text-sm text-white/80"> Fondée </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">4+</div>
                  <div className="text-sm text-white/80">
                    Membres de l’équipe
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="text-sm text-white/80">Continents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">+</div>
                  <div className="text-sm text-white/80">Projets</div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        {/*<FounderStory /> */}
        <CompanyTimeline />
        <TeamSpotlight />
        <WhyGuinea />
        <CompanyValues />
        <VisionRoadmap />
        

        {/* Final CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-surface rounded-2xl p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-secondary mb-4">
                  Prêt à collaborer avec les leaders technologiques de Guinée ?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Maintenant que vous connaissez mieux Lynxa, écrivons
                  ensemble le prochain chapitre. Découvrez comment on
                  peut transformer votre entreprise grâce à des solutions
                  technologiques innovantes.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/service">
                    <Button
                      variant="default"
                      size="lg"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="glow-orange"
                    >
                      Découvrez nos services 
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Lancer une conversation
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    Rejoignez la communauté croissante de clients qui font
                    confiance à Lynxa Tech pour leurs besoins technologiques 
                  </p>
                  {/*<div className="flex justify-center items-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="Star"
                        size={16}
                        color="var(--color-warning)"
                      />
                      <span className="text-sm font-medium">
                        Note client : 4,9/5
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="Shield"
                        size={16}
                        color="var(--color-success)"
                      />
                      <span className="text-sm font-medium">
                         Certifié ISO 27001 
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="Award"
                        size={16}
                        color="var(--color-primary)"
                      />
                      <span className="text-sm font-medium">
                         Reconnaissance dans l’industrie
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
           
                <img
                  src={logoIco}
                  alt="Lynxa Tech logo"
                  className="w-8 h-8 object-cover rounded-lg"
                />

                </div>
                <div>
                  <h3 className="text-xl font-bold">Lynxa Tech</h3>
                  <p className="text-sm text-white/70">Guinea</p>
                </div>
              </div>
              <p className="text-white/70 mb-6">
                Construire l’avenir de la technologie depuis le cœur de
                l’Afrique de l’Ouest
              </p>
              <div className="flex justify-center space-x-6">
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <Icon name="Linkedin" size={20} />
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <Icon name="X" size={20} />
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <Icon name="Facebook" size={20} />
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <Icon name="Mail" size={20} />
                </button>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/50">
                  © {new Date()?.getFullYear()} Lynxa Tech Guinea. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutInnovationStoryVision;
