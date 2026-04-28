import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const ServiceDetails = ({ service }) => {
  if (!service) return null;

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-secondary to-secondary/80 p-8 text-white">
        <div className="flex items-center gap-5 mb-5">
          <motion.div
            className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon name={service.icon || "Code"} size={32} color="white" />
          </motion.div>
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              {service.title}
            </h2>
            {service.subtitle && (
              <p className="text-white/70 mt-1 text-sm">{service.subtitle}</p>
            )}
          </div>
        </div>
        <p className="text-white/85 leading-relaxed max-w-3xl">
          {service.description}
        </p>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Highlights */}
          {service.highlights?.length > 0 && (
            <div>
              <h3 className="text-lg font-heading font-bold text-secondary mb-4 flex items-center gap-2">
                <Icon name="CheckCircle" size={20} className="text-primary" />
                Points Clés
              </h3>
              <ul className="space-y-3">
                {service.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={11} className="text-primary" />
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Metrics */}
          {service.metrics?.length > 0 && (
            <div>
              <h3 className="text-lg font-heading font-bold text-secondary mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-emerald-500" />
                Indicateurs de Performance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {service.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {m.value}
                    </div>
                    <div className="text-xs text-gray-500 leading-snug">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technologies */}
        {service.technologies?.length > 0 && (
          <div>
            <h3 className="text-lg font-heading font-bold text-secondary mb-4 flex items-center gap-2">
              <Icon name="Code" size={20} className="text-primary" />
              Technologies Utilisées
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Featured Projects */}
        {service.projects?.length > 0 && (
          <div>
            <h3 className="text-lg font-heading font-bold text-secondary mb-4 flex items-center gap-2">
              <Icon name="FolderOpen" size={20} className="text-primary" />
              Projets Réalisés
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <h4 className="font-semibold text-secondary mb-1.5 text-sm">
                    {project.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  {project.industry && (
                    <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {project.industry}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-gray-50 to-primary/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-secondary mb-1">
              Démarrer votre projet {service.title?.toLowerCase()} ?
            </h3>
            <p className="text-sm text-muted-foreground">
              Consultation gratuite — réponse sous 24h.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-border text-secondary hover:border-primary hover:text-primary px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <Icon name="Calendar" size={16} />
              Planifier un Appel
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 glow-orange"
            >
              <Icon name="MessageCircle" size={16} />
              Obtenir un Devis
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceDetails;
