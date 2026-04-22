import React from "react";
import Image from "../../../components/AppImage";

const ClientLogos = () => {
  const clients = [ {/*
    {
      name: "Ministère de l'Économie Numérique de Guinée",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
      category: "Gouvernement",
    },
    {
      name: "Banque Ouest-Africaine de Développement",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop",
      category: "Financier",
    },
    {
      name: "UNICEF Guinée",
      logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=100&fit=crop",
      category: "ONG",
    },
    {
      name: "Orange Guinée",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop",
      category: "Télécommunications",
    },
    {
      name: "Université de Conakry",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=100&fit=crop",
      category: "Éducation",
    },
    {
      name: "Ministère de la Santé de Guinée",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=100&fit=crop",
      category: "Santé",
    },
    {
      name: "Autorité Portuaire de Conakry",
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=100&fit=crop",
      category: "Infrastructure",
    },
    {
      name: "Compagnie Minière de Guinée",
      logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&h=100&fit=crop",
      category: "Mines",
    }, */}
  ];

  return (
    <section className="py-16 bg-white">
     {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
       {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Fiable par les Organisations de Premier Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des institutions gouvernementales aux ONG internationales, nos
            clients couvrent divers secteurs à travers la Guinée et l'Afrique de
            l'Ouest.
          </p>
        </div> */}

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {clients?.map((client, index) => (
            <div
              key={index}
              className="group flex items-center justify-center p-6 bg-muted rounded-lg hover:bg-white hover:shadow-soft transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={client?.logo}
                  alt={client?.name}
                  className="h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div> */}

        {/* Statistics */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              0+
            </div>
            <div className="text-muted-foreground">Projets Réussis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              0+
            </div>
            <div className="text-muted-foreground">Clients Satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              0%
            </div>
            <div className="text-muted-foreground">Satisfaction Client</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              0+
            </div>
            <div className="text-muted-foreground">Années d'Expérience</div>
          </div>
        </div> */}
     {/* </div> */}
    </section>
  );
};

export default ClientLogos;
