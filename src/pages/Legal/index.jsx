import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import logoIco from "../../../public/LYNXA.ico";

const LAST_UPDATED = "14 juillet 2026";

const PAGES = {
  confidentialite: {
    eyebrow: "Vos données, en toute transparence",
    title: "Politique de confidentialité",
    description:
      "Découvrez quelles données Lynxa Tech collecte, pourquoi elles sont utilisées et comment vous pouvez exercer vos droits.",
    icon: "Fingerprint",
    sections: [
      {
        title: "1. Qui sommes-nous ?",
        paragraphs: [
          "Lynxa Tech Guinea est une entreprise technologique basée à Conakry, en République de Guinée. Dans le cadre de ce site, Lynxa Tech détermine les finalités et les moyens du traitement des données personnelles qui lui sont transmises.",
          "Pour toute question relative à vos données, vous pouvez écrire à contact@lynxatech.com.",
        ],
      },
      {
        title: "2. Données que nous collectons",
        paragraphs: ["Nous collectons uniquement les informations nécessaires au fonctionnement du site et au traitement de vos demandes."],
        bullets: [
          "Données d’identification et de contact : nom, prénom, adresse e-mail, téléphone et entreprise.",
          "Informations liées à votre demande : type de projet, budget indicatif, message, pièces ou précisions que vous choisissez de transmettre.",
          "Données de candidature : parcours, CV, compétences et disponibilités lorsque vous postulez.",
          "Données techniques minimales : adresse IP, type de navigateur, appareil, pages consultées et journaux nécessaires à la sécurité et au diagnostic.",
        ],
      },
      {
        title: "3. Pourquoi utilisons-nous ces données ?",
        bullets: [
          "Répondre à vos demandes de contact, de devis ou de partenariat.",
          "Étudier et gérer les candidatures reçues.",
          "Fournir les communications auxquelles vous avez choisi de vous inscrire.",
          "Assurer le fonctionnement, la prévention des abus et l’amélioration du site.",
          "Respecter nos obligations légales et défendre nos droits lorsque cela est nécessaire.",
        ],
        paragraphs: [
          "Selon le contexte, ces traitements reposent sur votre consentement, l’exécution de mesures précontractuelles, notre intérêt légitime à exploiter et sécuriser nos services, ou une obligation légale.",
        ],
      },
      {
        title: "4. Destinataires et prestataires",
        paragraphs: [
          "L’accès aux données est limité aux membres habilités de Lynxa Tech et aux prestataires techniques nécessaires à l’hébergement, la base de données, l’envoi de formulaires et la maintenance du site. Ces prestataires n’agissent que pour fournir leurs services et selon leurs propres engagements contractuels et de sécurité.",
          "Nous ne vendons pas vos données personnelles. Nous pouvons toutefois les communiquer si la loi l’exige, pour protéger nos droits ou dans le cadre d’une opération de restructuration encadrée.",
        ],
      },
      {
        title: "5. Conservation et transferts",
        paragraphs: [
          "Les données sont conservées pendant la durée nécessaire à la finalité annoncée, puis supprimées ou archivées lorsque la loi l’impose. Les demandes commerciales sans suite sont réévaluées régulièrement ; les candidatures ne sont pas conservées au-delà d’une période raisonnable sans votre accord.",
          "Certains prestataires peuvent traiter des données hors de Guinée. Dans ce cas, nous recherchons des garanties contractuelles et techniques adaptées au niveau de risque et à la réglementation applicable.",
        ],
      },
      {
        title: "6. Cookies et stockage local",
        paragraphs: [
          "Le site peut utiliser des cookies ou mécanismes similaires strictement nécessaires à son fonctionnement, notamment pour la sécurité et les sessions d’administration. Tout outil de mesure d’audience ou de communication non essentiel nécessitant un consentement devra être présenté comme tel avant son activation.",
          "Vous pouvez limiter ou supprimer les cookies depuis les réglages de votre navigateur ; certaines fonctionnalités peuvent alors ne plus fonctionner correctement.",
        ],
      },
      {
        title: "7. Vos droits",
        paragraphs: [
          "Sous réserve de la réglementation applicable, vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou l’opposition au traitement de vos données, ainsi que retirer un consentement donné.",
          "Envoyez votre demande à contact@lynxatech.com en précisant son objet. Une preuve d’identité pourra être demandée uniquement si elle est nécessaire pour éviter une divulgation à un tiers. Vous pouvez également saisir l’autorité compétente si vous estimez que vos droits ne sont pas respectés.",
        ],
      },
      {
        title: "8. Mise à jour de cette politique",
        paragraphs: [
          "Cette politique peut évoluer avec nos services ou les exigences applicables. La date affichée en haut de page permet d’identifier sa dernière mise à jour. Toute modification importante sera signalée de manière appropriée sur le site.",
        ],
      },
    ],
  },
  cgu: {
    eyebrow: "Un cadre clair pour utiliser le site",
    title: "Conditions générales d’utilisation",
    description:
      "Ces conditions définissent les règles applicables à la consultation et à l’utilisation du site Lynxa Tech.",
    icon: "FileCheck2",
    sections: [
      {
        title: "1. Objet et acceptation",
        paragraphs: [
          "Les présentes conditions générales d’utilisation encadrent l’accès au site lynxatech.com et à ses fonctionnalités. En consultant ou en utilisant ce site, vous acceptez ces conditions. Si vous ne les acceptez pas, veuillez ne pas utiliser le site.",
          "Le site présente Lynxa Tech, ses services, ses réalisations, ses opportunités de collaboration et ses offres de recrutement. Il ne constitue pas, à lui seul, une offre contractuelle ferme.",
        ],
      },
      {
        title: "2. Accès au site",
        paragraphs: [
          "Nous faisons notre possible pour maintenir le site accessible et fiable. Son accès peut toutefois être interrompu, limité ou modifié sans préavis pour maintenance, sécurité, mise à jour ou pour une cause indépendante de notre volonté.",
          "L’utilisateur est responsable de son équipement, de sa connexion et des frais associés à l’accès au site.",
        ],
      },
      {
        title: "3. Utilisation autorisée",
        paragraphs: ["Vous vous engagez à utiliser le site de façon licite, loyale et respectueuse des droits de Lynxa Tech et des tiers. Il est notamment interdit de :"],
        bullets: [
          "Tenter d’accéder sans autorisation à une zone, un compte, un serveur ou une donnée.",
          "Perturber le fonctionnement du site, contourner ses protections ou introduire un code malveillant.",
          "Collecter massivement du contenu ou des données par des moyens automatisés sans autorisation écrite.",
          "Usurper une identité, transmettre de fausses informations ou utiliser le site à des fins frauduleuses.",
          "Reproduire ou exploiter le contenu au-delà des exceptions permises par la loi ou d’une autorisation expresse.",
        ],
      },
      {
        title: "4. Formulaires et échanges",
        paragraphs: [
          "Vous garantissez que les informations envoyées via nos formulaires sont exactes, pertinentes et que vous êtes autorisé à les communiquer. L’envoi d’une demande, d’une candidature ou d’un projet ne crée pas automatiquement de relation contractuelle avec Lynxa Tech.",
          "Les modalités d’une prestation, notamment son périmètre, ses délais, son prix, ses livrables et ses garanties, sont définies dans un devis ou contrat distinct accepté par les parties.",
        ],
      },
      {
        title: "5. Propriété intellectuelle",
        paragraphs: [
          "Sauf indication contraire, la structure du site, les textes, visuels, signes distinctifs, logos, créations et éléments techniques présentés sont la propriété de Lynxa Tech ou sont utilisés avec autorisation. Tous les droits non expressément accordés sont réservés.",
          "Vous pouvez consulter le contenu pour un usage personnel ou interne. Toute reproduction, adaptation, diffusion ou exploitation commerciale substantielle nécessite une autorisation écrite préalable.",
        ],
      },
      {
        title: "6. Liens et services tiers",
        paragraphs: [
          "Le site peut contenir des liens vers des services tiers. Lynxa Tech ne contrôle pas systématiquement leur contenu, leur disponibilité ou leurs pratiques. L’accès à ces services s’effectue sous votre responsabilité et selon leurs propres conditions.",
        ],
      },
      {
        title: "7. Responsabilité",
        paragraphs: [
          "Les informations du site sont fournies à titre général. Malgré le soin apporté à leur publication, nous ne garantissons pas qu’elles soient en permanence exhaustives, exemptes d’erreurs ou adaptées à un besoin particulier.",
          "Dans les limites autorisées par la loi, Lynxa Tech ne pourra être tenue responsable des dommages indirects résultant de l’utilisation ou de l’indisponibilité du site. Rien dans ces conditions n’exclut une responsabilité qui ne peut légalement être exclue.",
        ],
      },
      {
        title: "8. Droit applicable et contact",
        paragraphs: [
          "Ces conditions sont régies par le droit de la République de Guinée. En cas de différend, les parties chercheront d’abord une solution amiable avant de saisir la juridiction compétente.",
          "Pour toute question concernant ces conditions, contactez-nous à contact@lynxatech.com. Nous pouvons les modifier afin de tenir compte de l’évolution du site ou du cadre applicable ; la version publiée à la date de votre utilisation est celle qui s’applique.",
        ],
      },
    ],
  },
  securite: {
    eyebrow: "La sécurité intégrée dès la conception",
    title: "Sécurité & confiance",
    description:
      "Notre approche pour protéger le site, limiter les risques et recevoir de façon responsable les signalements de vulnérabilités.",
    icon: "ShieldCheck",
    sections: [
      {
        title: "1. Notre approche",
        paragraphs: [
          "Lynxa Tech applique une démarche de sécurité proportionnée aux risques, depuis la conception jusqu’à l’exploitation. Aucun système n’étant totalement exempt de risque, nous améliorons continuellement nos protections, nos procédures et la sensibilisation de nos équipes.",
        ],
      },
      {
        title: "2. Mesures de protection",
        bullets: [
          "Chiffrement des échanges réseau au moyen de HTTPS sur le domaine de production.",
          "Contrôle des accès, séparation des privilèges et authentification des espaces réservés.",
          "Validation des entrées, protections contre les abus et journalisation utile au diagnostic.",
          "Mises à jour des dépendances et correction priorisée des vulnérabilités selon leur criticité.",
          "Sauvegardes, surveillance et procédures de restauration adaptées aux services concernés.",
          "Collecte limitée des données et accès restreint aux personnes qui en ont besoin.",
        ],
      },
      {
        title: "3. Responsabilité partagée",
        paragraphs: [
          "Vous contribuez à la sécurité en protégeant vos appareils et comptes, en utilisant des mots de passe uniques, en vérifiant le domaine avant de transmettre des informations et en évitant l’envoi de secrets ou de données sensibles non demandées dans les formulaires.",
          "Lynxa Tech ne vous demandera jamais votre mot de passe par e-mail ou messagerie instantanée. En cas de doute sur un message reçu en notre nom, contactez-nous par un canal officiel.",
        ],
      },
      {
        title: "4. Signaler une vulnérabilité",
        paragraphs: [
          "Si vous pensez avoir découvert une faille affectant lynxatech.com ou un service explicitement exploité par Lynxa Tech, envoyez un rapport à contact@lynxatech.com avec l’objet « Signalement sécurité ». Indiquez l’URL concernée, les étapes de reproduction et l’impact estimé, sans inclure de données personnelles obtenues lors du test.",
          "Nous accuserons réception dans un délai raisonnable, évaluerons le signalement et vous tiendrons informé lorsque cela est possible. Merci de nous laisser le temps de corriger le problème avant toute divulgation publique.",
        ],
      },
      {
        title: "5. Règles de recherche responsable",
        paragraphs: ["Pour protéger nos utilisateurs et permettre une résolution constructive, nous vous demandons de ne pas :"],
        bullets: [
          "Accéder, modifier, supprimer ou télécharger des données qui ne vous appartiennent pas.",
          "Recourir à l’ingénierie sociale, au phishing, au déni de service ou à des tests physiques.",
          "Installer un mécanisme persistant, exécuter des scans perturbateurs ou dégrader le service.",
          "Étendre les tests au-delà de ce qui est strictement nécessaire pour démontrer la faille.",
          "Publier des détails exploitables avant que la correction et une divulgation coordonnée soient convenues.",
        ],
      },
      {
        title: "6. Incidents et mises à jour",
        paragraphs: [
          "Lorsqu’un incident confirmé présente un risque pour les personnes ou nos services, nous cherchons à le contenir, à préserver les éléments utiles, à corriger sa cause et à notifier les parties concernées lorsque la loi ou le niveau de risque l’exige.",
          "Cette page décrit notre posture publique et ne révèle volontairement pas les configurations qui pourraient faciliter une attaque. Elle peut être mise à jour à mesure que nos services et contrôles évoluent.",
        ],
      },
    ],
  },
};

const LEGAL_LINKS = [
  { label: "Confidentialité", path: "/confidentialite", icon: "Fingerprint" },
  { label: "CGU", path: "/cgu", icon: "FileCheck2" },
  { label: "Sécurité", path: "/securite", icon: "ShieldCheck" },
];

const LegalPage = ({ page }) => {
  const content = PAGES[page];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{content.title} | Lynxa Tech Guinea</title>
        <meta name="description" content={content.description} />
        <link rel="canonical" href={`/${page}`} />
      </Helmet>

      <Header />

      <main className="pt-16">
        <section className="relative overflow-hidden bg-secondary py-16 md:py-24">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <motion.div
            className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Icon name={content.icon} size={17} />
              {content.eyebrow}
            </div>
            <h1 className="max-w-4xl text-4xl font-bold text-white md:text-5xl">{content.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">{content.description}</p>
            <p className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <Icon name="CalendarDays" size={15} />
              Dernière mise à jour : {LAST_UPDATED}
            </p>
          </motion.div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-soft">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Pages légales</p>
              <nav className="space-y-2" aria-label="Pages légales">
                {LEGAL_LINKS.map((link) => {
                  const active = link.path === `/${page}`;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                        active ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                      }`}
                    >
                      <Icon name={link.icon} size={18} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="text-sm leading-relaxed text-gray-500">Une question sur cette page ?</p>
                <a href="mailto:contact@lynxatech.com" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
                  <Icon name="Mail" size={16} />
                  Nous écrire
                </a>
              </div>
            </div>
          </aside>

          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft">
            <div className="border-b border-gray-100 bg-gradient-to-r from-primary/10 to-transparent px-6 py-5 md:px-10">
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="Info" size={17} className="text-primary" />
                Version en vigueur depuis le {LAST_UPDATED}
              </p>
            </div>
            <div className="space-y-10 px-6 py-8 md:px-10 md:py-12">
              {content.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-4 text-xl font-bold text-secondary md:text-2xl">{section.title}</h2>
                  <div className="space-y-4 text-[15px] leading-7 text-gray-600 md:text-base">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul className="space-y-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <Icon name="Check" size={17} className="mt-1 flex-shrink-0 text-primary" strokeWidth={2.5} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>
      </main>

      <footer className="bg-secondary py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <Link to="/home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-black">
              <img src={logoIco} alt="Lynxa Tech" className="h-8 w-8 rounded-lg object-cover" />
            </span>
            <span>
              <span className="block font-heading font-bold">Lynxa Tech</span>
              <span className="block text-xs text-gray-400">Guinea</span>
            </span>
          </Link>
          <p className="text-center text-sm text-gray-400">© {new Date().getFullYear()} Lynxa Tech Guinea. Tous droits réservés.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
            Nous contacter <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
