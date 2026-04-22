import React from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SocialConnect = () => {
  const socialPlatforms = [
    {
      name: "LinkedIn",
      icon: "Linkedin",
      handle: "@LynxaTechGuinea",
      description:
        "Actualités professionnelles, insights sectoriels et nouvelles de l'entreprise",
      followers: "0+ abonnés",
      color: "bg-blue-400",
      url: "https://linkedin.com/company/lynxatech-guinea",
      active: true,
    },
    {
      name: "X (anciennement Twitter)",
      icon: "X",
      handle: "@LynxaTechGuinea",
      description:
        "Mises à jour en temps réel, discussions tech et annonces rapides",
      followers: "0K+ abonnés",
      color: "bg-black",
      url: "https://twitter.com/CompanyTechGN",
      active: true,
    },
    {
      name: "Facebook",
      icon: "Facebook",
      handle: "@LynxaTechGuinea",
      description:
        "Contenu backstage, culture d'équipe et présentations de projets",
      followers: "0K+ abonnés",
      color: "bg-blue-800",
      url: "https://instagram.com/companytech.guinea",
      active: true,
    },
   
  ];

  {/* Statistiqes de la communaute */}
  const communityStats = [
    {
      icon: "Users",
      label: "Membres de la Communauté",
      value: "8 500+",
      description: "Abonnés actifs sur toutes les plateformes",
    },
    {
      icon: "MessageCircle",
      label: "Engagement Mensuel",
      value: "15K+",
      description: "J'aimes, commentaires et partages",
    },
    {
      icon: "Share2",
      label: "Contenus Partagés",
      value: "200+",
      description: "Publications, articles et mises à jour mensuels",
    },
    {
      icon: "Award",
      label: "Reconnaissance de l'Industrie",
      value: "25+",
      description: "Features et mentions dans les médias tech",
    },
  ];

  const handleSocialClick = (platform) => {
    window.open(platform?.url, "_blank", "noopener,noreferrer");
  };

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleNewsletter = async () => {
    if (!email) return;

    setLoading(true);

    try {
      await emailjs.send(
        "service_nru6i81",      
        "template_rn0vj99", 
        { user_email: email },
        "RE-vtDTXpbEbLN8jl"        
      );

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setSuccess(false);
    }

    setLoading(false);
  };

  return (
    <section className="py-16 bg-white flex items-center justify-center min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Connectez-vous avec notre communauté
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez notre parcours, obtenez les dernières actualités et rejoignez
            la conversation sur l'innovation technologique africaine.
          </p>
        </div>

        {/* Social Platforms */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {socialPlatforms?.map((platform, index) => (
            <div
              key={index}
              className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 card-hover group relative max-w-xs mx-auto"
            >
               {platform?.active && (
                 <div className="absolute top-4 right-4">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                 </div>
               )}

              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${platform?.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    name={platform?.icon}
                    size={28}
                    color="white"
                    strokeWidth={2}
                  />
                </div>

                <h3 className="text-xl font-heading font-semibold text-secondary mb-2">
                  {platform?.name}
                </h3>

                <p className="text-primary font-medium text-sm mb-3">
                  {platform?.handle}
                </p>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {platform?.description}
                </p>

                <div className="text-xs text-muted-foreground mb-4">
                  {platform?.followers}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleSocialClick(platform)}
                  className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                >
                  Suivre
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        {/*<div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-2">
              Notre Communauté en Croissance
            </h3>
            <p className="text-muted-foreground">
              Rejoignez des milliers de passionnés de technologie,
              d'entrepreneurs et d'innovateurs qui suivent notre parcours.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {communityStats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <Icon
                    name={stat?.icon}
                    size={24}
                    color="var(--color-primary)"
                    strokeWidth={2}
                  />
                </div>
                <div className="text-2xl font-heading font-bold text-secondary mb-1">
                  {stat?.value}
                </div>
                <div className="font-medium text-secondary text-sm mb-1">
                  {stat?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat?.description}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Newsletter Signup */}
        <div className="bg-secondary rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Mail" size={28} color="white" strokeWidth={2} />
            </div>

            <h3 className="text-2xl font-heading font-bold mb-4">
              Restez informé avec notre newsletter
            </h3>

            <p className="text-white/90 mb-8 leading-relaxed">
              Recevez des informations exclusives sur l'innovation technologique
              africaine, des mises à jour de projets, des analyses sectorielles
              et un accès anticipé à nos nouveaux services. Pas de spam, juste
              du contenu de valeur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              <Button
                onClick={handleNewsletter}
                disabled={loading}
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white border-primary glow-orange"
                iconName="ArrowRight"
                iconPosition="right"
              >
                {loading ? "..." : "Souscrire"}
              </Button>
            </div>

            {success === true && (
              <p className="text-green-400 mt-4">Inscription réussie </p>
            )}

            {success === false && (
              <p className="text-red-400 mt-4">Une erreur s'est produite </p>
            )}



            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-white/70">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Vie Privée Protégée</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} />
                <span>Mises à jour hebdo /mensu </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="X" size={16} />
                <span>Désabonnez-vous à tout moment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        {/* <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Fiabilité Reconnue - De confiance pour les entrepreneurs,
            développeurs et entreprises à travers l'Afrique de l'Ouest.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-medium">
              Présenté dans TechCrunch Africa
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-sm font-medium">
              Vainqueur des Guinea Tech Awards
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-sm font-medium">
              Partenaire Innovation de la CEDEAO
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-sm font-medium">Partenaire Microsoft</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SocialConnect;
