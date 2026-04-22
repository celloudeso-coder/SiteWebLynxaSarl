import React from "react";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import CollaborationPathways from "./components/CollaborationPathways";
import ProjectRequestForm from "./components/ProjectRequestForm";
import WhatsAppIntegration from "./components/WhatsAppIntegration";
import ProcessOverview from "./components/ProcessOverview";
import TrustSignals from "./components/TrustSignals";
import ContactMethods from "./components/ContactMethods";
import logoIco from "../../../public/LYNXA.ico";

const PartnershipCollaborationGateway = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <CollaborationPathways />
        <ProjectRequestForm />
        <WhatsAppIntegration />
        {/* <ProcessOverview /> */}
        <TrustSignals />
        <ContactMethods /> 
      </main>
      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">

                <img
                  src={logoIco}
                  alt="Lynxa Tech logo"
                  className="w-8 h-8 object-cover rounded-lg"
                />

                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Lynxa Tech</h3>
                  <p className="text-sm text-gray-400">Guinea</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Construire l’avenir de la technologie en Guinée et au-delà.
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
                <li>Collaboration avec les Startups</li>
                <li>Solutions pour Entreprises</li>
                <li>Projets Internationaux</li>
                <li>Partenariats Technologiques</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contact@lynxatech.com</li>
                <li>+224 621 724 657</li>
                <li>Conakry,</li>
                <li>Guinea</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date()?.getFullYear()} Lynxa Tech Guinea. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PartnershipCollaborationGateway;
