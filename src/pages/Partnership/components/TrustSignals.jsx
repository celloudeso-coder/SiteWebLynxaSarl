import React from "react";
import Icon from "../../../components/AppIcon";

const TrustSignals = () => {
  const certifications = [
    {
      title: "Certifié ISO 27001",
      description: "Gestion de la sécurité de l'information",
      icon: "Shield",
      status: "Certifié",
      year: "2024",
    },
    {
      title: "Partenaire Google Cloud",
      description: "Fournisseur autorisé de solutions Cloud",
      icon: "Cloud",
      status: "Partenaire",
      year: "2023",
    },
    {
      title: "Partenaire Microsoft",
      description: "Spécialiste des solutions Azure",
      icon: "Monitor",
      status: "Partenaire",
      year: "2023",
    },
    {
      title: "Cadre de cybersécurité",
      description: "Normes de conformité NIST",
      icon: "Lock",
      status: "Conforme",
      year: "2024",
    }, 
  ];

  const securityMeasures = [
    {
      title: "Chiffrement de bout en bout",
      description:
        "Toutes les transmissions de données sont chiffrées selon les standards AES-256",
      icon: "Key",
    },
    {
      title: "Développement sécurisé",
      description:
        "Respect des directives de sécurité OWASP tout au long du cycle de développement",
      icon: "Code",
    },
    {
      title: "Audits de sécurité réguliers",
      description:
        "Tests de pénétration trimestriels et évaluations des vulnérabilités",
      icon: "Search",
    },
    {
      title: "Conformité à la protection des données",
      description:
        "Gestion des données conforme au RGPD et mesures de protection de la vie privée",
      icon: "UserCheck",
    },
    {
      title: "Sauvegarde et récupération",
      description:
        "Sauvegardes quotidiennes automatisées avec garantie de récupération des données à 99,9%",
      icon: "Database",
    },
    {
      title: "Surveillance 24/7",
      description:
        "Surveillance continue du système et services de détection des menaces",
      icon: "Eye",
    },
  ];

  const clientCommitments = [
    {
      title: "Accord de confidentialité",
      description:
        "Protection complète de toutes les informations de projet et de la propriété intellectuelle",
      icon: "FileText",
      action: "Télécharger le modèle",
    },
    {
      title: "Contrat de niveau de service",
      description:
        "Délais de réponse et performances garanties avec clauses pénales",
      icon: "Clock",
      action: "Voir les termes du SLA",
    },
    {
      title: "Droits de propriété intellectuelle",
      description:
        "Propriété claire et accords de licence pour toutes les solutions développées",
      icon: "Copyright",
      action: "Lire la politique",
    },
    {
      title: "Politique de confidentialité",
      description:
        "Pratiques transparentes de collecte, d'utilisation et de protection des données",
      icon: "Shield",
      action: "Voir la politique",
    },
  ];

  const testimonialHighlights = [
    {
      quote:
        "L'approche axée sur la sécurité de Lynxa Tech nous a donné une confiance totale dans notre partenariat.",
      author: "Sarah Johnson",
      position: "CTO, TechCorp International",
      rating: 5,
    },
    {
      quote:
        "Leur processus transparent et leurs mises à jour régulières ont rendu la collaboration fluide.",
      author: "Ahmed Diallo",
      position: "Directeur, Banque de Développement de Guinée",
      rating: 5,
    },
    {
      quote:
        "Professionnel, fiable et engagé à livrer exactement ce qui a été promis.",
      author: "Maria Santos",
      position: "Chef de projet, NGO Alliance",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Votre confiance est notre priorité
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous respectons les normes les plus élevées en matière de sécurité,
            de conformité et d'intégrité professionnelle pour garantir que vos
            projets et vos données soient toujours protégés.
          </p>
        </div>

        {/* Certifications */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-8 text-center">
            Certifications et Partenariats
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-medium border border-border hover:shadow-large transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 glow-orange">
                  <Icon name={cert?.icon} size={28} color="white" />
                </div>
                <h4 className="font-semibold text-secondary mb-2">
                  {cert?.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {cert?.description}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {cert?.status}
                  </span>
                  <span className="text-muted-foreground">{cert?.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Security Measures */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-8 text-center">
            Sécurité et Protection des Données
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityMeasures?.map((measure, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-border"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={measure?.icon} size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-2">
                      {measure?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {measure?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Commitments */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-8 text-center">
            Engagements Légaux et Contractuels
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {clientCommitments?.map((commitment, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 glow-orange">
                      <Icon name={commitment?.icon} size={20} color="white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary mb-2">
                        {commitment?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {commitment?.description}
                      </p>
                    </div>
                  </div>
                  <button className="text-primary hover:text-accent font-medium text-sm whitespace-nowrap ml-4">
                    {commitment?.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials */}
        {/*<div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-8 text-center">
            Ce Que Nos Clients Disent de Notre Fiabilité
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {testimonialHighlights?.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-border"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      color="rgb(251 191 36)"
                      className="fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial?.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-secondary">
                    {testimonial?.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial?.position}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Trust Guarantee */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShieldCheck" size={40} color="white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Garantie Satisfaction 100 %
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Nous nous engageons à vos côtés : avec votre collaboration et 
              nos efforts, nous assurons des résultats à la hauteur de vos 
              attentes. Si ce n’est pas le cas, nous corrigeons immédiatement 
              ou nous vous remboursons dans les 30 jours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                En Savoir Plus  
              </button>
             {/* <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200">
                Contacter l’Équipe Juridique
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
