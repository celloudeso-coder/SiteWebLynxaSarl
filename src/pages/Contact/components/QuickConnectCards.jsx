import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuickConnectCards = () => {
  const quickConnectOptions = [
    {
      id: 1,
      title: "WhatsApp Business",
      description:
        "Messagerie instantanée pour des discussions rapides et des demandes de projet",
      icon: "MessageSquare",
      action: "Discuter Maintenant",
      contact: "+224 621 724 657",
      color: "bg-green-800",
      popular: true,
    },
    {
      id: 2,
      title: "Appel Direct",
      description: "Parlez directement avec un consultant techniques",
      icon: "Phone",
      action: "Appeler Maintenant",
      contact: "+224 621 724 657",
      color: "bg-green-400",
      popular: false,
    },
    {
      id: 3,
      title: "Support Email",
      description:
        "Discussions détaillées de projet et communications formelles",
      icon: "Mail",
      action: "Envoyer un Email",
      contact: "support@lynxatech.com",
      color: "bg-red-500",
      popular: false,
    },
    {
      id: 4,
      title: "Planifier une Réunion",
      description:
        "Réservez une consultation pour une planification de projet complexe",
      icon: "Calendar",
      action: "Réserver Maintenant",
      contact: "Consultation gratuite de 30 min",
      color: "bg-blue-500",
      popular: false,
    },
  ];

  const handleQuickConnect = (option) => {
    switch (option?.icon) {
      case "MessageSquare":
        window.open(
          `https://wa.me/224621724657?text=Hello! I'm interested in discussing a project with Lynxa Tech.`,
          "_blank"
        );
        break;
      case "Phone":
        window.open(`tel:+224621724657`, "_self");
        break;
      case "Mail":
        window.open(
          `mailto:support@lynxatech.com?subject=Project Inquiry&body=Hello Lynxa Tech team,%0D%0A%0D%0AI'm interested in discussing a project with you.`,
          "_self"
        );
        break;
      case "Calendar":
        // Mock calendar booking
        alert(
          "Calendar booking feature coming soon! Please use WhatsApp or email for now."
        );
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Choisissez Votre Méthode de Connexion Préférée
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous comprenons que différents projets nécessitent différents styles
            de communication. Choisissez la méthode qui vous convient le mieux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickConnectOptions?.map((option) => (
            <div
              key={option?.id}
              className="relative bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 card-hover group"
            >
              {option?.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    Le Plus Populaire
                  </span>
                </div>
              )}

              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${option?.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    name={option?.icon}
                    size={28}
                    color="white"
                    strokeWidth={2}
                  />
                </div>

                <h3 className="text-xl font-heading font-semibold text-secondary mb-2">
                  {option?.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {option?.description}
                </p>

                <div className="text-sm font-medium text-secondary mb-4">
                  {option?.contact}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleQuickConnect(option)}
                  className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                >
                  {option?.action}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-white px-4 py-2 rounded-full shadow-soft">
            <Icon name="Shield" size={16} />
            <span>
              Toutes nos communications sont sécurisées et confidentielles.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickConnectCards;
