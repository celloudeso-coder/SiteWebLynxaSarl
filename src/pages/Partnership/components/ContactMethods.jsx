import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ContactMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState("email");

  {/* methods de contact */}
  const contactMethods = [
    {
      id: "email",
      title: "Communication par Email",
      description:
        "Correspondance professionnelle par email pour des discussions détaillées et le partage de documents",
      icon: "Mail",
      contact: "partnerships@lynxatech.gn",
      responseTime: "4-8 heures",
      bestFor:
        "Propositions détaillées, communications formelles, partage de documents",
      color: "primary",
    },
    {
      id: "whatsapp",
      title: "WhatsApp Business",
      description:
        "Messagerie instantanée pour des questions rapides et des réponses immédiates",
      icon: "MessageCircle",
      contact: "+224 123 456 789",
      responseTime: "5-30 minutes",
      bestFor: "Questions rapides, urgences, partage de fichiers",
      color: "green",
    },
    {
      id: "phone",
      title: "Consultation Téléphonique",
      description:
        "Appels vocaux directs pour des discussions complexes et la résolution de problèmes en temps réel",
      icon: "Phone",
      contact: "+224 123 456 789",
      responseTime: "Appels sur rendez-vous",
      bestFor: "Discussions complexes, consultations techniques, négociations",
      color: "accent",
    },
    {
      id: "video",
      title: "Visio-Conférence",
      description:
        "Réunions en face-à-face via Zoom, Google Meet ou Microsoft Teams",
      icon: "Video",
      contact: "Planification par email",
      responseTime: "Réunions planifiées",
      bestFor:
        "Présentations d'équipe, présentations de projets, planification détaillée",
      color: "primary",
    },
    // {
    //   id: "office",
    //   title: "Visite au Bureau",
    //   description:
    //     "Réunions en personne dans nos bureaux de Conakry pour les clients locaux",
    //   icon: "MapPin",
    //   contact: "Kaloum, Conakry, Guinée",
    //   responseTime: "Sur rendez-vous",
    //   bestFor:
    //     "Signature de contrats, discussions sensibles, développement des relations",
    //   color: "accent",
    // },
  ];

  const officeHours = {
    weekdays: "Lundi - Vendredi : 8h00 - 18h00 GMT",
    saturday: "Samedi : 9h00 - 14h00 GMT",
    sunday: "Dimanche : Urgences uniquement",
    timezone: "Heure standard de Guinée (GMT+0)",
  };

  const emergencyContacts = [
    {
      type: "Urgence Technique",
      contact: "+224 621 724 657",
      description:
        "Pour les défaillances critiques du système et les problèmes techniques urgents",
      availability: "24/7",
    },
    {
      type: "Urgence Projet",
      contact: "emergency@lynxatech.com",
      description:
        "Pour les questions urgentes liées aux projets et aux délais",
      availability: "24/7",
    },
  ];

  const handleContactMethod = (method) => {
    switch (method?.id) {
      case "email":
        window.location.href = `mailto:${method?.contact}?subject=Demande de Partenariat&body=Bonjour Lynxa Tech,%0D%0A%0D%0AJe souhaite discuter d'une opportunité de partenariat.%0D%0A%0D%0APouvez-vous me faire savoir vos disponibilités pour une consultation ?%0D%0A%0D%0AMerci.`;
        break;
      case "whatsapp":
        const whatsappMessage = encodeURIComponent(
          "Bonjour ! Je souhaite établir un partenariat avec Lynxa Tech Guinée. Pouvons-nous discuter des exigences de mon projet ?"
        );
        window.open(
          `https://wa.me/${method?.contact?.replace(
            /\s+/g,
            ""
          )}?text=${whatsappMessage}`,
          "_blank"
        );
        break;
      case "phone":
        window.location.href = `tel:${method?.contact}`;
        break;
      case "video":
        window.location.href = `mailto:partnerships@companytech.gn?subject=Demande de Visio-Conférence&body=Bonjour,%0D%0A%0D%0AJe souhaite planifier une visio-conférence pour discuter des opportunités de partenariat.%0D%0A%0D%0ADates et heures préférées :%0D%0A- Option 1:%0D%0A- Option 2:%0D%0A- Option 3:%0D%0A%0D%0APlateforme préférée : [Zoom/Google Meet/Microsoft Teams]%0D%0A%0D%0AMerci.`;
        break;
      case "office":
        // Ouvre Google Maps vers le bureau
        window.open(
          "https://www.google.com/maps?q=Kaloum,Conakry,Guinea",
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       {/* <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Plusieurs façons de se connecter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choisissez la méthode de communication qui vous convient le mieux.
            Nous nous engageons à répondre rapidement et professionnellement via
            tous les canaux.
          </p>
        </div> */}

        {/* Contact Methods Grid */}
        {/*<div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactMethods?.map((method) => (
            <div
              key={method?.id}
              className={`bg-surface rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                selectedMethod === method?.id
                  ? "border-primary shadow-large"
                  : "border-border hover:border-primary/50 hover:shadow-medium"
              }`}
              onClick={() => setSelectedMethod(method?.id)}
            >
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    method?.color === "primary"
                      ? "bg-primary glow-orange"
                      : method?.color === "accent"
                      ? "bg-accent"
                      : method?.color === "green"
                      ? "bg-green-500"
                      : "bg-primary glow-orange"
                  }`}
                >
                  <Icon name={method?.icon} size={28} color="white" />
                </div>
                <h3 className="text-xl font-heading font-bold text-secondary mb-2">
                  {method?.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {method?.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Contact:
                  </span>
                  <span className="text-sm font-medium text-secondary">
                    {method?.contact}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Réponse:
                  </span>
                  <span className="text-sm font-medium text-secondary">
                    {method?.responseTime}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-2">
                  Meilleur Pour:
                </div>
                <div className="text-sm text-secondary">{method?.bestFor}</div>
              </div>

              <Button
                variant={selectedMethod === method?.id ? "default" : "outline"}
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => handleContactMethod(method)}
                className={selectedMethod === method?.id ? "glow-orange" : ""}
              >
                {method?.id === "office"
                  ? "View Location"
                  : "Contactez Maintenant"}
              </Button>
            </div>
          ))}
        </div> */}

        {/* Office Hours & Emergency Contacts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Office Hours */}
          <div className="bg-surface rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-6 flex items-center">
              <Icon name="Clock" size={24} className="mr-3 text-primary" />
              Heures de Travail
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">
                  Jour de la Semaine
                </span>
                <span className="font-medium text-secondary">
                  {officeHours?.weekdays}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Samedi</span>
                <span className="font-medium text-secondary">
                  {officeHours?.saturday}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Dimanche</span>
                <span className="font-medium text-secondary">
                  {officeHours?.sunday}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Timezone</span>
                <span className="font-medium text-secondary">
                  {officeHours?.timezone}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-surface rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-6 flex items-center">
              <Icon
                name="AlertTriangle"
                size={24}
                className="mr-3 text-red-500"
              />
              Contacts d'urgence
            </h3>
            <div className="space-y-6">
              {emergencyContacts?.map((emergency, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-secondary">
                      {emergency?.type}
                    </h4>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      {emergency?.availability}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {emergency?.description}
                  </p>
                  <div className="text-sm font-medium text-secondary">
                    {emergency?.contact}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                <Icon name="Info" size={16} className="inline mr-1" />
                Les contacts d'urgence sont uniquement pour les situations
                critiques. Pour les demandes générales, veuillez utiliser les
                méthodes de contact habituelles.
              </p>
            </div>
          </div>
        </div>

        {/* Office Location */}
        {/* <div className="bg-surface rounded-2xl p-8">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-6 flex items-center">
            <Icon name="MapPin" size={24} className="mr-3 text-primary" />
            Visit Our Office
          </h3>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-secondary mb-2">Address</h4>
                  <p className="text-muted-foreground">
                    Lynxa Tech Guinea
                    <br />
                    Kaloum District
                    <br />
                    Conakry, Guinea
                    <br />
                    West Africa
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-2">
                    Office Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="Wifi"
                        size={16}
                        color="var(--color-primary)"
                      />
                      <span className="text-sm text-muted-foreground">
                        High-speed Internet
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Car" size={16} color="var(--color-primary)" />
                      <span className="text-sm text-muted-foreground">
                        Parking Available
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="Coffee"
                        size={16}
                        color="var(--color-primary)"
                      />
                      <span className="text-sm text-muted-foreground">
                        Refreshments
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="Users"
                        size={16}
                        color="var(--color-primary)"
                      />
                      <span className="text-sm text-muted-foreground">
                        Meeting Rooms
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                iconName="Navigation"
                iconPosition="left"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps?q=Kaloum,Conakry,Guinea",
                    "_blank"
                  )
                }
                className="glow-orange"
              >
                Get Directions
              </Button>
            </div>

            <div className="h-64 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Lynxa Tech Guinea Office Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=9.5370,-13.6785&z=14&output=embed"
                className="border-0"
              ></iframe>
            </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default ContactMethods;
