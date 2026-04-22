import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const SocialProofSection = () => {
  const partnerships = [
    {
      id: 1,
      name: "Microsoft Partner",
      logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=200&h=100",
      type: "Partenaire Technologique",
      description: "Fournisseur de Solutions Azure Certifié",
    },
    {
      id: 2,
      name: "Cisco Networking",
      logo: "https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=200&h=100",
      type: "Partenaire Infrastructure",
      description: "Solutions Réseau Certifiées",
    },
    {
      id: 3,
      name: "AWS Partner",
      logo: "https://images.pixabay.com/photo-2021/01/30/06/42/tiktok-5962992_960_720.jpg",
      type: "Partenaire Cloud",
      description: "Partenaire de Conseil Avancé",
    },
    {
      id: 4,
      name: "Google Cloud",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=200&h=100",
      type: "Solutions Cloud",
      description: "Statut de Partenaire Premier",
    },
  ];

  const certifications = [
    {
      id: 1,
      icon: "Shield",
      title: "ISO 27001",
      description: "Gestion de la Sécurité de l'Information",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      icon: "Lock",
      title: "SOC 2 Type II",
      description: "Contrôles de Sécurité et Disponibilité",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      icon: "CheckCircle",
      title: "RGPD Conforme",
      description: "Normes de Protection des Données",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 4,
      icon: "Award",
      title: "PCI DSS",
      description: "Normes de l'Industrie des Cartes de Paiement",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const mediaRecognition = [
    {
      id: 1,
      publication: "TechCrunch Africa",
      headline: "L'Étoile Montante de la Tech Guinéenne : Company Tech",
      date: "Décembre 2023",
      type: "Article de Fond",
    },
    {
      id: 2,
      publication: "West Africa Business",
      headline: "Top 10 des Entreprises Tech à Suivre",
      date: "Novembre 2023",
      type: "Reconnaissance de l'Industrie",
    },
    {
      id: 3,
      publication: "African Innovation Hub",
      headline: "L'Excellence en Cybersécurité en Afrique de l'Ouest",
      date: "Octobre 2023",
      type: "Interview d'Expert",
    },
  ];

  const communityImpact = [
    {
      id: 1,
      icon: "Users",
      metric: "100+",
      label: "Développeurs Mentorés",
      description: "Via nos bootcamps de codage",
    },
    {
      id: 2,
      icon: "GraduationCap",
      metric: "25+",
      label: "Partenariats Universitaires",
      description: "À travers l'Afrique de l'Ouest",
    },
    {
      id: 3,
      icon: "Briefcase",
      metric: "200+",
      label: "Emplois Créés",
      description: "Dans l'écosystème tech",
    },
    {
      id: 4,
      icon: "Heart",
      metric: "50+",
      label: "Projets Pro Bono",
      description: "Pour des ONG locales",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6">
            Fiabilité Reconnue{" "}
            <span className="text-gradient-orange">Global Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nos partenariats, certifications et impact communautaire démontrent
            notre engagement envers l'excellence et l'innovation dans le paysage
            technologique africain.
          </p>
        </div>

        {/* Technology Partnerships */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-secondary text-center mb-8">
            Partenaires Technologiques
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partnerships?.map((partner) => (
              <div
                key={partner?.id}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 text-center border border-border card-hover"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-heading font-bold text-secondary mb-1">
                  {partner?.name}
                </h4>
                <p className="text-xs text-primary font-medium mb-2">
                  {partner?.type}
                </p>
                <p className="text-xs text-muted-foreground">
                  {partner?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-secondary text-center mb-8">
            Certifications de Sécurité et Conformité
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert) => (
              <div
                key={cert?.id}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 text-center border border-border card-hover"
              >
                <div
                  className={`w-12 h-12 ${cert?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon name={cert?.icon} size={24} className={cert?.color} />
                </div>
                <h4 className="font-heading font-bold text-secondary mb-2">
                  {cert?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Recognition */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-secondary text-center mb-8">
            Reconnaissance Médiatique
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaRecognition?.map((media) => (
              <div
                key={media?.id}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border card-hover"
              >
                <div className="flex items-start space-x-3 mb-4">
                  <Icon
                    name="Newspaper"
                    size={20}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-secondary mb-1">
                      {media?.publication}
                    </h4>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {media?.type}
                    </span>
                  </div>
                </div>
                <h5 className="font-medium text-secondary mb-2 leading-tight">
                  {media?.headline}
                </h5>
                <p className="text-sm text-muted-foreground">{media?.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Impact */}
        <div>
          <h3 className="text-2xl font-heading font-bold text-secondary text-center mb-8">
            Impact Communautaire
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityImpact?.map((impact) => (
              <div
                key={impact?.id}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 text-center border border-border card-hover"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name={impact?.icon}
                    size={24}
                    className="text-primary"
                  />
                </div>
                <div className="text-3xl font-heading font-bold text-secondary mb-2">
                  {impact?.metric}
                </div>
                <h4 className="font-medium text-secondary mb-2">
                  {impact?.label}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {impact?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
            <Icon
              name="Shield"
              size={48}
              className="text-primary mx-auto mb-4"
            />
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
              Votre Confiance, Notre Priorité
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Chaque partenariat, certification et initiative communautaire
              reflète notre engagement indéfectible envers la sécurité, la
              qualité et l'impact positif dans l'écosystème technologique
              africain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
