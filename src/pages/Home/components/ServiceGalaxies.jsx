import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import { useServices } from "../../../hooks/useContent";

const GRADIENTS = [
  "from-blue-500 to-purple-600",
  "from-green-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-red-500 to-pink-600",
];

const FALLBACK_IMAGES = [
  "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
  "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const ServiceGalaxies = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const { data: cmsServices, loading } = useServices();

  const services = (cmsServices && cmsServices.length > 0 ? cmsServices : []).map((s, i) => ({
    ...s,
    gradient: GRADIENTS[i % GRADIENTS.length],
    image: s.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    technologies: Array.isArray(s.technologies) ? s.technologies : [],
    metrics: Array.isArray(s.metrics) ? s.metrics : [],
  }));

  if (loading || services.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6">
            Nos Galaxies de{" "}
            <span className="text-gradient-orange">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deux domaines clés d'expertise — les solutions digitales et les services réseaux —
            dans lesquels nous offrons des solutions technologiques de classe mondiale,
            alliant innovation et compréhension approfondie des besoins du marché africain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div
              key={service.id || i}
              className="group relative bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden border border-border card-hover"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Image src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-orange group-hover:scale-110 transition-transform duration-300">
                      <Icon name={service.icon || "Briefcase"} size={28} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-secondary mb-1">{service.title}</h3>
                      <p className="text-primary font-medium">{service.subtitle}</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                {service.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {service.metrics.slice(0, 3).map((m, j) => (
                      <div key={j} className="text-center">
                        <div className="text-lg font-heading font-bold text-secondary">{m.value}</div>
                        <div className="text-xs text-muted-foreground">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {service.highlights && service.highlights.length > 0 && (
                  <div
                    className={`bg-surface rounded-lg p-4 mb-6 transition-all duration-300 ${
                      hoveredService === service.id ? "bg-primary/5 border-l-4 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon name="Trophy" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-secondary font-medium">{service.highlights[0]}</p>
                    </div>
                  </div>
                )}

                {service.technologies.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground mb-2">Technologies :</p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-surface text-xs text-secondary rounded-md border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  to="/service"
                  className="inline-flex items-center space-x-2 text-primary hover:text-accent font-medium transition-colors duration-200 group"
                >
                  <span>Explorer les solutions</span>
                  <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/service"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-medium hover:shadow-large transition-all duration-300 glow-orange"
          >
            <Icon name="Rocket" size={20} />
            <span>Découvrez tous les services</span>
            <Icon name="ArrowRight" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceGalaxies;
