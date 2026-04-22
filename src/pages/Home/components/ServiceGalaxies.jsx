import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ServiceGalaxies = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Développement Multiplateforme",
      subtitle: "Performance et Flexibilité sur Tous les Appareils",
      description:
        "Applications mobiles (iOS & Android) et desktop développées à partir d’un seul code base, garantissant une expérience fluide et cohérente sur toutes les plateformes.",
      icon: "Smartphone",
      image:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
      stats: {
        projects: "2+",
        rating: "/5",
        downloads: "+",
      },
      recentWin:
        "Lancement de la première application ...",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Electron"],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Solutions Réseau",
      subtitle: "Infrastructure & Connectivité",
      description:
        "Conception, mise en œuvre et gestion d’infrastructures réseau robustes pour des entreprises de toutes tailles.",
      icon: "Network",
      image:
        "https://images.pixabay.com/photo/2020/02/03/00/12/network-4815296_960_720.jpg",
      stats: {
        projects: "0+",
        uptime: "99,9%",
        coverage: "0+ nœuds",
      },
      recentWin:
        "Déploiement d’un réseau d’entreprise ...",
      technologies: ["Cisco", "Ubiquiti", ],
      gradient: "from-green-500 to-teal-600",
    },
    {
      id: 3,
      title: "Développement Web",
      subtitle: "Expériences Digitales Modernes",
      description:
        "Applications et sites web réactifs, rapides et évolutifs, construits avec des technologies de pointe.",
      icon: "Globe",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
      stats: {
        projects: "0+",
        performance: "Score 0+",
        clients: "0+",
      },
      recentWin:
        "Création d’une plateforme ...",
      technologies: ["React", "Next.js", "Node.js", "MongoDB"],
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: 4,
      title: "Monitoring Réseau",
      subtitle: "Surveillance Continue et Performance Optimale",
      description:
        "Solutions et formations complètes pour superviser, analyser et optimiser les infrastructures réseau des entreprises en temps réel.",
      icon: "Activity",
      image:
        "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      stats: {
        Supervisés: "0+",
        Incidents: "0+",
        Monitoring: "24/7",
      },
      recentWin:
        "Prévention ...",
      technologies: ["SNMP", "NetFlow", "Zabbix", "Nagios", "Grafana"],
      gradient: "from-red-500 to-pink-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6">
            Nos Galaxies de{" "}
            <span className="text-gradient-orange">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deux domaines clés d’expertisem, les solutions digitales et les services réseaux 
            dans lesquels nous offrons des solutions technologiques de classe mondiale, 
            alliant innovation et compréhension approfondie des besoins du marché africain.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services?.map((service) => (
            <div
              key={service?.id}
              className="group relative bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden border border-border card-hover"
              onMouseEnter={() => setHoveredService(service?.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Image
                  src={service?.image}
                  alt={service?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service?.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              <div className="relative p-8">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-orange group-hover:scale-110 transition-transform duration-300">
                      <Icon
                        name={service?.icon}
                        size={28}
                        color="white"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-secondary mb-1">
                        {service?.title}
                      </h3>
                      <p className="text-primary font-medium">
                        {service?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service?.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(service?.stats)?.map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-heading font-bold text-secondary">
                        {value}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key?.replace(/([A-Z])/g, " $1")?.trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Win */}
                <div
                  className={`bg-surface rounded-lg p-4 mb-6 transition-all duration-300 ${
                    hoveredService === service?.id
                      ? "bg-primary/5 border-l-4 border-primary"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="Trophy"
                      size={16}
                      className="text-primary mt-1 flex-shrink-0"
                    />
                    <p className="text-sm text-secondary font-medium">
                      {service?.recentWin}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-2">
                    Technologies:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service?.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-surface text-xs text-secondary rounded-md border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/service"
                  className="inline-flex items-center space-x-2 text-primary hover:text-accent font-medium transition-colors duration-200 group"
                >
                  <span>Explore Solutions</span>
                  <Icon
                    name="ArrowRight"
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            to="/service"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-medium hover:shadow-large transition-all duration-300 glow-orange"
          >
            <Icon name="Rocket" size={20} />
            <span> Découvrez tous les services</span>
            <Icon name="ArrowRight" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceGalaxies;
