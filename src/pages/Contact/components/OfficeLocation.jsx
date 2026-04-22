import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const OfficeLocation = () => {
  const officeDetails = {
    address: "Quartier Almamya, Rue KA-028\nConakry, Guinée",
    coordinates: "9.5370,-13.6785",
    phone: "+224 622 123 456",
    email: "hello@lynxatech.gn",
    hours: {
      weekdays: "Lundi - Vendredi: 8:00 - 18:00",
      saturday: "Samedi: 9:00 - 14:00",
      sunday: "Dimanche: Fermé",
    },
    timezone: "GMT+0 (Heure de Guinée)",
  };

  const directions = [
    {
      landmark: "De l'Aéroport de Conakry",
      instruction:
        "Prendre la nationale N1 vers le centre-ville, tourner à droite au rond-point d'Almamya, continuer sur 500m",
      duration: "25 minutes en voiture",
    },
    {
      landmark: "Du Palais du Peuple",
      instruction:
        "Prendre l'Avenue de la République vers le nord, tourner à gauche au carrefour d'Almamya",
      duration: "10 minutes en voiture",
    },
    {
      landmark: "Transport en Commun",
      instruction:
        "Prendre les bus ligne 12 ou 15 jusqu'à l'arrêt Almamya, marcher 200m vers la rue KA-028",
      duration: "45 minutes au total",
    },
  ];

  const facilities = [
    { icon: "Car", label: "Parking Gratuit Disponible" },
    { icon: "Wifi", label: "Internet Haut Débit" },
    { icon: "Coffee", label: "Rafraîchissements Offerts" },
    { icon: "Shield", label: "Accès Sécurisé au Bâtiment" },
    { icon: "Users", label: "Salles de Réunion" },
    { icon: "Accessibility", label: "Accès pour Personnes à Mobilité Réduite" },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Visitez Notre Centre d'Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our modern workspace in the heart of Conakry. Schedule a
            visit to see where Guinea's tech innovation happens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map and Address */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="h-80 relative">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Lynxa Tech Guinea Office Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${officeDetails?.coordinates}&z=16&output=embed`}
                  className="border-0"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon
                      name="MapPin"
                      size={24}
                      color="var(--color-primary)"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-secondary mb-2">
                      Lynxa Tech Guinea HQ
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line mb-4">
                      {officeDetails?.address}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <a
                        href={`tel:${officeDetails?.phone}`}
                        className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Icon name="Phone" size={16} />
                        <span>{officeDetails?.phone}</span>
                      </a>
                      <a
                        href={`mailto:${officeDetails?.email}`}
                        className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Icon name="Mail" size={16} />
                        <span>{officeDetails?.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Clock" size={20} color="var(--color-primary)" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-secondary">
                  Business Hours
                </h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium text-secondary">
                    8:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium text-secondary">
                    9:00 AM - 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium text-secondary">Closed</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timezone</span>
                    <span className="font-medium text-secondary">
                      {officeDetails?.timezone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Office Photos and Details */}
          <div className="space-y-6">
            {/* Office Photos */}
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="space-y-2">
                  <div className="h-32 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
                      alt="Modern office workspace with computers and collaborative areas"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="h-20 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
                      alt="Conference room with modern presentation equipment"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop"
                      alt="Team collaboration area with whiteboards and planning materials"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="h-32 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop"
                      alt="Reception area with Lynxa Tech branding and comfortable seating"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t">
                <h3 className="font-semibold text-secondary mb-2">
                  Our Modern Workspace
                </h3>
                <p className="text-sm text-muted-foreground">
                  State-of-the-art facilities designed for innovation,
                  collaboration, and client meetings in the heart of Conakry.
                </p>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-heading font-semibold text-secondary mb-4">
                Office Facilities
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {facilities?.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon
                        name={facility?.icon}
                        size={16}
                        color="var(--color-primary)"
                      />
                    </div>
                    <span className="text-sm text-secondary">
                      {facility?.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Directions */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-xl font-heading font-semibold text-secondary mb-4">
                How to Find Us
              </h3>

              <div className="space-y-4">
                {directions?.map((direction, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon
                        name="Navigation"
                        size={16}
                        color="var(--color-primary)"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary text-sm mb-1">
                        {direction?.landmark}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {direction?.instruction}
                      </p>
                      <span className="text-xs text-primary font-medium">
                        {direction?.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 bg-primary/5 rounded-xl p-6 border border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon
                  name="AlertCircle"
                  size={24}
                  color="var(--color-primary)"
                />
              </div>
              <div>
                <h3 className="font-semibold text-secondary">
                  Emergency Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  For existing clients with urgent technical issues
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="tel:+224622999888"
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Icon name="Phone" size={16} />
                <span className="font-medium">+224 622 999 888</span>
              </a>
              <span className="text-muted-foreground text-sm">
                24/7 Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;
