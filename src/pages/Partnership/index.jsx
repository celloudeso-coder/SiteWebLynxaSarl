import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import CollaborationPathways from "./components/CollaborationPathways";
import ProjectRequestForm from "./components/ProjectRequestForm";
import ProcessOverview from "./components/ProcessOverview";
import TrustSignals from "./components/TrustSignals";
import logoIco from "../../../public/LYNXA.ico";

const PartnershipCollaborationGateway = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Partenariat & Collaboration | Lynxa Tech Guinée</title>
        <meta
          name="description"
          content="Collaborez avec Lynxa Tech Guinée. Startups, entreprises, organisations internationales — des cadres de partenariat sur mesure pour transformer votre vision en réalité."
        />
        <meta
          name="keywords"
          content="partenariat technologique guinée, collaboration startup, solutions entreprises guinée, lynxa tech partenaire"
        />
        <meta property="og:title" content="Partenariat | Lynxa Tech Guinée" />
        <meta property="og:description" content="Des voies de collaboration adaptées à chaque organisation. Démarrez votre projet avec Lynxa Tech." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/partnership" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <HeroSection />
          <CollaborationPathways />
          <ProjectRequestForm />
          <ProcessOverview />
          <TrustSignals />
        </main>

        <footer className="bg-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <img src={logoIco} alt="Lynxa Tech logo" className="w-8 h-8 object-cover rounded-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">Lynxa Tech</h3>
                    <p className="text-sm text-gray-400">Guinea</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Construire l'avenir de la technologie en Guinée et au-delà.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Développement Mobile</li>
                  <li>Développement Web</li>
                  <li>Infrastructure Réseau</li>
                  <li>Cybersécurité</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Partenariat</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Startups & PME</li>
                  <li>Solutions Entreprises</li>
                  <li>Collaboration Internationale</li>
                  <li>Réseau Technologique</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>contact@lynxatech.com</li>
                  <li>+224 621 724 657</li>
                  <li>Conakry, Guinée 🇬🇳</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Lynxa Tech Guinea. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PartnershipCollaborationGateway;
