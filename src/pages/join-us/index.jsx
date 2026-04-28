import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import JoinUsHero from "./components/joinus-hero";
import JoinUsProcess from "./components/joinus-process";
import JoinUsOpenings from "./components/joinus-openings";
import JoinUsForm from "./components/joinUs-form";
import logoIco from "../../../public/LYNXA.ico";

const JoinUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Rejoignez-nous | Lynxa Tech Guinée</title>
        <meta
          name="description"
          content="Rejoignez l'équipe Lynxa Tech et participez à la construction du futur technologique africain. Postes ouverts à Conakry, Guinée."
        />
        <meta
          name="keywords"
          content="emploi tech guinée, recrutement lynxa tech, développeur mobile guinée, stage informatique conakry, carrière technologie afrique"
        />
        <meta property="og:title" content="Carrières | Lynxa Tech Guinée" />
        <meta property="og:description" content="Faites partie d'une équipe qui façonne l'avenir technologique africain. Rejoignez Lynxa Tech à Conakry." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/join-us" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <JoinUsHero />
          <JoinUsProcess />
          <JoinUsOpenings />
          <JoinUsForm />
        </main>

        <footer className="bg-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <img src={logoIco} alt="Lynxa Tech logo" className="w-8 h-8 object-cover rounded-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">Lynxa Tech</h3>
                    <p className="text-sm text-white/70">Guinea</p>
                  </div>
                </div>
                <p className="text-white/80 mb-4 max-w-md">
                  Construire l'avenir de la technologie en Guinée et au-delà.
                  Innovation sans frontières, solutions sans limites.
                </p>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>🇬🇳</span>
                  <span>Fièrement basé à Conakry, Guinée</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Contact Rapide</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <div>+224 621 724 657</div>
                  <div>contact@lynxatech.com</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Heures d'Ouverture</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <div>Lun-Ven : 8h-18h</div>
                  <div>Samedi : 9h-14h</div>
                  <div>Dimanche : Fermé</div>
                  <div className="text-primary">GMT+0 (Heure de Guinée)</div>
                </div>
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

export default JoinUsPage;
