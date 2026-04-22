import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const WhatsAppIntegration = () => {
  const [selectedTopic, setSelectedTopic] = useState("");

  const quickTopics = [
    {
      id: "urgent",
      title: "Projet Urgent",
      description: "Besoin d’une assistance immédiate pour un projet critique",
      icon: "AlertCircle",
      message:
        "Bonjour ! J’ai un projet urgent nécessitant une attention immédiate. Pouvons-nous en discuter ?",
    },
    {
      id: "mobile",
      title: "Application Mobile",
      description: "Discussion sur le développement d’applications mobiles",
      icon: "Smartphone",
      message:
        "Bonjour ! Je souhaite développer une application mobile. Pouvez-vous m’expliquer le processus et les tarifs ?",
    },
    {
      id: "web",
      title: "Développement Web",
      description: "Projet de site web ou d’application web",
      icon: "Globe",
      message:
        "Bonjour ! J’ai besoin d’aide pour le développement web. Pouvons-nous discuter de mes besoins ?",
    },
    {
      id: "network",
      title: "Installation Réseau",
      description: "Infrastructure et configuration réseau",
      icon: "Network",
      message:
        "Bonjour ! J’ai besoin d’aide pour la mise en place de l’infrastructure réseau. Êtes-vous disponible pour en discuter ?",
    },
    {
      id: "security",
      title: "Cybersécurité",
      description: "Consultation et mise en œuvre de la sécurité",
      icon: "Shield",
      message:
        "Bonjour ! Je cherche des solutions de cybersécurité pour mon entreprise. Pouvons-nous en parler ?",
    },
    {
      id: "consultation",
      title: "Consultation Générale",
      description: "Consultation et conseils technologiques généraux",
      icon: "MessageCircle",
      message:
        "Bonjour ! J’aimerais avoir une consultation générale sur les solutions technologiques pour mon entreprise.",
    },
  ];
  
  {/* gestion du click vers le numero whatsapp */}
  const handleWhatsAppClick = (message) => {
    const phoneNumber = "+224621724657"; // Mock WhatsApp Business number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const businessHours = [
    { day: "Lundi - Vendredi", hours: "8h00 - 18h00 GMT" },
    { day: "Samedi", hours: "9h00 - 14h00 GMT" },
    { day: "Dimanche", hours: "Urgences uniquement" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Icon name="MessageCircle" size={24} color="white" />
              </div>
              <span className="text-green-600 font-medium">
                WhatsApp Business
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-6">
              Obtenez une réponse instantanée sur WhatsApp
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Pour une assistance immédiate et des consultations rapides,
              contactez-nous directement sur WhatsApp. Idéal pour les projets
              urgents, les questions rapides et les clients guinéens qui
              préfèrent la messagerie instantanée.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="Zap" size={16} color="rgb(34 197 94)" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">
                    Réponse Instantanée
                  </h3>
                  <p className="text-muted-foreground">
                    Recevez une réponse en quelques minutes pendant les heures
                    d’ouverture
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="FileText" size={16} color="rgb(34 197 94)" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">
                    Partage de Documents
                  </h3>
                  <p className="text-muted-foreground">
                    Partagez facilement les fichiers de projet, les besoins et
                    les maquettes
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="Users" size={16} color="rgb(34 197 94)" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">
                    Discussions de Groupe
                  </h3>
                  <p className="text-muted-foreground">
                    Incluez les membres de votre équipe dans les discussions de
                    projet
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-secondary mb-4 flex items-center">
                <Icon name="Clock" size={20} className="mr-2 text-primary" />
                Heures d’ouverture WhatsApp
              </h3>

              <div className="space-y-2">
                {businessHours?.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-muted-foreground">
                      {schedule?.day}
                    </span>
                    <span className="font-medium text-secondary">
                      {schedule?.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <Icon name="Info" size={16} className="inline mr-1" />
                  Pour les urgences en dehors des heures d’ouverture, nous vous
                  répondrons dès que possible.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Topics */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-medium border border-border">
              <h3 className="text-2xl font-heading font-bold text-secondary mb-6 text-center">
                Démarrage Rapide de la Conversation
              </h3>
              <p className="text-muted-foreground text-center mb-8">
                Choisissez un sujet pour démarrer une conversation avec un
                message pré-écrit
              </p>

              <div className="grid gap-4">
                {quickTopics?.map((topic) => (
                  <button
                    key={topic?.id}
                    onClick={() => handleWhatsAppClick(topic?.message)}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors duration-200">
                      <Icon
                        name={topic?.icon}
                        size={20}
                        className="text-green-600 group-hover:text-white transition-colors duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary group-hover:text-primary transition-colors duration-200">
                        {topic?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {topic?.description}
                      </p>
                    </div>
                    <Icon
                      name="ExternalLink"
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-200"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
                  onClick={() =>
                    handleWhatsAppClick(
                      "Bonjour ! J’aimerais discuter d’un projet avec Lynxa Tech Guinea."
                    )
                  }
                >
                  Démarrer une Conversation Personnalisée
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  WhatsApp: +224 621 724 657
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppIntegration;
