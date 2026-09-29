import React, { useEffect } from "react";
import Header from "../../components/ui/Header";
import Seo from "../../components/Seo";
import HeroSection from "./components/HeroSection";
import CollaborationPathways from "./components/CollaborationPathways";
import ProjectRequestForm from "./components/ProjectRequestForm";
import ProcessOverview from "./components/ProcessOverview";
import TrustSignals from "./components/TrustSignals";
import { useSiteSettings } from "../../hooks/useContent";

const PartnershipCollaborationGateway = () => {
  const { data: settings } = useSiteSettings();
  const contact = settings?.contact || {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        title="Partenariat & Collaboration | Lynxa Tech Guinée"
        description="Collaborez avec Lynxa Tech Guinée. Startups, entreprises, organisations internationales — des cadres de partenariat sur mesure pour transformer votre vision en réalité."
        keywords="partenariat technologique guinée, collaboration startup, solutions entreprises guinée, lynxa tech partenaire"
        path="/partnership"
        ogTitle="Partenariat | Lynxa Tech Guinée"
        ogDescription="Des voies de collaboration adaptées à chaque organisation. Démarrez votre projet avec Lynxa Tech."
      />

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
                    <img src="/icon-192.png" alt="Lynxa Tech logo" className="w-8 h-8 object-cover rounded-lg" />
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
                  <li>{contact.email || "contact@lynxatech.com"}</li>
                  <li>{contact.phone || "+224 621 724 657"}</li>
                  <li>{contact.address || "Conakry, Guinée"} 🇬🇳</li>
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
