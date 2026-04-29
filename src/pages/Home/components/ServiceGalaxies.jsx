import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="p-8 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-xl" />
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded-full w-36" />
          <div className="h-3 bg-gray-100 rounded-full w-24" />
        </div>
      </div>
      <div className="h-3 bg-gray-100 rounded-full w-full" />
      <div className="h-3 bg-gray-100 rounded-full w-5/6" />
      <div className="grid grid-cols-3 gap-4 pt-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-10 bg-gray-100 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

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

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Layers" size={16} />
            <span>Nos services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6">
            Nos Galaxies de{" "}
            <span className="text-gradient-orange">Services</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Des solutions technologiques de classe mondiale alliant innovation et compréhension approfondie des besoins du marché africain.
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Empty state */}
        {!loading && services.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Layers" size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-secondary mb-2">Services en cours de configuration</h3>
            <p className="text-gray-400 text-sm mb-6">Rendez-vous sur l'admin pour ajouter vos services.</p>
            <Link to="/admin/services" className="inline-flex items-center gap-2 border border-gray-200 text-secondary hover:border-primary hover:text-primary px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200">
              <Icon name="Settings" size={14} />
              Gérer les services
            </Link>
          </motion.div>
        )}

        {/* Services grid */}
        {!loading && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.id || i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative bg-white rounded-2xl shadow-soft hover:shadow-large transition-shadow duration-500 overflow-hidden border border-gray-100"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Image src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-orange"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon name={service.icon || "Briefcase"} size={28} color="white" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-heading font-bold text-secondary mb-1">{service.title}</h3>
                          <p className="text-primary font-medium text-sm">{service.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-500 mb-6 leading-relaxed text-sm">{service.description}</p>

                    {service.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {service.metrics.slice(0, 3).map((m, j) => (
                          <motion.div
                            key={j}
                            className="text-center p-3 bg-gray-50 rounded-xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 + j * 0.08 + 0.3 }}
                          >
                            <div className="text-base font-heading font-bold text-secondary">{m.value}</div>
                            <div className="text-xs text-gray-400 leading-snug mt-0.5">{m.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {service.highlights && service.highlights.length > 0 && (
                      <div className={`bg-gray-50 rounded-xl p-4 mb-6 transition-all duration-300 ${hoveredService === service.id ? "bg-primary/5 border-l-4 border-primary" : ""}`}>
                        <div className="flex items-start gap-3">
                          <Icon name="Trophy" size={15} className="text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-secondary font-medium">{service.highlights[0]}</p>
                        </div>
                      </div>
                    )}

                    {service.technologies.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs text-gray-400 mb-2">Technologies :</p>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.slice(0, 6).map((tech) => (
                            <span key={tech} className="px-2.5 py-1 bg-gray-100 text-xs text-secondary rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link
                      to="/service"
                      className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors duration-200 text-sm group"
                    >
                      Explorer les solutions
                      <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/service"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-large transition-all duration-300 glow-orange"
              >
                <Icon name="Rocket" size={20} />
                Découvrez tous les services
                <Icon name="ArrowRight" size={20} />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceGalaxies;
