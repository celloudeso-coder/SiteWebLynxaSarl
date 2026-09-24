import React, { useEffect } from "react";
import Header from "../../components/ui/Header";
import Seo from "../../components/Seo";
import ContactHero from "./components/ContactHero";
import QuickConnectCards from "./components/QuickConnectCards";
import ContactForm from "./components/ContactForm";
import OfficeLocation from "./components/OfficeLocation";
import SocialConnect from "./components/SocialConnect";
import { useSiteSettings } from "../../hooks/useContent";

const ContactMultiChannelConnection = () => {
  const { data: settings } = useSiteSettings();
  const contact = settings?.contact || {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        title="Contactez-Nous - Connexion Multi-Canal | Lynxa Tech Guinée"
        description="Connectez-vous avec Lynxa Tech Guinée via plusieurs canaux. WhatsApp, téléphone, email, ou visitez notre bureau de Conakry. Réponse rapide garantie pour toutes vos demandes de projets technologiques."
        keywords="contacter lynxa tech guinée, bureau conakry, whatsapp business, consultation technique, demande de projet, technologie guinée"
        path="/contact"
        ogTitle="Contactez Lynxa Tech Guinée - Votre Portail vers l'Innovation"
        ogDescription="Multiples façons de vous connecter avec le principal centre d'innovation technologique de Guinée. Contactez-nous pour votre prochain projet."
      />
      <div className="min-h-screen bg-background">
        <Header />
        

        <main className="pt-16">
          <ContactHero />
          <QuickConnectCards />
          <ContactForm />
          <SocialConnect />
        </main>

        {/* Footer */}
        <footer className="bg-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">

                <img
                  src="/icon-192.png"
                  alt="Lynxa Tech logo"
                  className="w-8 h-8 object-cover rounded-lg"
                />

                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">
                      Lynxa Tech
                    </h3>
                    <p className="text-sm text-white/70">Guinea</p>
                  </div>
                </div>
                <p className="text-white/80 mb-4 max-w-md">
                  Construire l'avenir de la technologie en Guinée et au-delà.
                  Innovation sans frontières, solutions sans limites.
                </p>
                <div className="text-sm text-white/60">
                  © {new Date()?.getFullYear()} Lynxa Tech Guinea. Tous droits réservés.
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Contact Rapide</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <div>{contact.phone || "+224 621 724 657"}</div>
                  <div>{contact.email || "contact@lynxatech.com"}</div>
                  {/* <div>Quartier Almamya, Conakry</div> */}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Heures d'Ouverture</h4>
                <div className="space-y-2 text-sm text-white/80">
                  {contact.hours ? (
                    <div>{contact.hours}</div>
                  ) : (
                    <>
                      <div>Lun-Ven: 8h-18h</div>
                      <div>Samedi: 9h-14h</div>
                    </>
                  )}
                  <div>Dimanche: Urgences uniquement</div>
                  <div className="text-primary">GMT+0 (Heure de Guinée)</div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactMultiChannelConnection;
