import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const SERVICE_ICONS = {
  "Mobile Development":    "Smartphone",
  "Network Infrastructure":"Network",
  "Web Development":       "Globe",
  "Cybersecurity":         "Shield",
  "Développement Mobile":  "Smartphone",
  "Infrastructure Réseau": "Network",
  "Développement Web":     "Globe",
  "Cybersécurité":         "Shield",
};

const PROJECT_LINK_META = {
  "Mobile Development":    { label: "Voir l'application", icon: "Smartphone"  },
  "Développement Mobile":  { label: "Voir l'application", icon: "Smartphone"  },
  "Web Development":       { label: "Voir le site",       icon: "Globe"        },
  "Développement Web":     { label: "Voir le site",       icon: "Globe"        },
  "Network Infrastructure":{ label: "Voir le rapport",    icon: "FileText"     },
  "Infrastructure Réseau": { label: "Voir le rapport",    icon: "FileText"     },
  "Cybersecurity":         { label: "Voir le rapport",    icon: "ShieldCheck"  },
  "Cybersécurité":         { label: "Voir le rapport",    icon: "ShieldCheck"  },
};

const ProjectModal = ({ project, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && project && (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 sm:p-0">
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-4xl my-8 text-left bg-white shadow-2xl rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header image */}
            <div className="relative">
              <div className="h-64 overflow-hidden">
                <Image
                  src={project?.image}
                  alt={project?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
              <div className="absolute bottom-4 left-4 right-16">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon
                      name={SERVICE_ICONS[project?.service] || "Code"}
                      size={22}
                      className="text-primary"
                    />
                    <span className="text-primary font-medium text-sm">{project?.service}</span>
                    <span className="text-muted-foreground text-sm">·</span>
                    <span className="text-muted-foreground text-sm">{project?.industry}</span>
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-secondary">
                    {project?.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Challenge */}
              <div>
                <h3 className="text-xl font-heading font-bold text-secondary mb-3 flex items-center gap-2">
                  <Icon name="AlertCircle" size={20} className="text-destructive" />
                  Le Défi
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project?.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="text-xl font-heading font-bold text-secondary mb-3 flex items-center gap-2">
                  <Icon name="Lightbulb" size={20} className="text-warning" />
                  Notre Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{project?.solution}</p>
                {project?.technologies?.length > 0 && (
                  <>
                    <h4 className="font-semibold text-secondary mb-2 text-sm">Technologies utilisées</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Implementation */}
              {project?.implementation?.length > 0 && (
                <div>
                  <h3 className="text-xl font-heading font-bold text-secondary mb-3 flex items-center gap-2">
                    <Icon name="Settings" size={20} className="text-accent" />
                    Processus d'Implémentation
                  </h3>
                  <div className="space-y-3">
                    {project.implementation.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {i + 1}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {project?.metrics?.length > 0 && (
                <div>
                  <h3 className="text-xl font-heading font-bold text-secondary mb-3 flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} className="text-success" />
                    Résultats Mesurables
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">{metric?.value}</div>
                        <div className="text-sm text-muted-foreground">{metric?.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {project?.testimonial && (
                <div>
                  <h3 className="text-xl font-heading font-bold text-secondary mb-3 flex items-center gap-2">
                    <Icon name="MessageSquare" size={20} className="text-primary" />
                    Témoignage Client
                  </h3>
                  <div className="bg-muted rounded-xl p-6">
                    <blockquote className="text-muted-foreground italic mb-4 leading-relaxed">
                      "{project.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-secondary text-sm">
                          {project.testimonial.author || project.testimonial.author_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {project.testimonial.position || project.testimonial.author_position}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Project details footer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
                <div className="text-center">
                  <Icon name="Calendar" size={22} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-secondary text-sm">Durée</div>
                  <div className="text-muted-foreground text-sm">{project?.duration}</div>
                </div>
                <div className="text-center">
                  <Icon name="Layers" size={22} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-secondary text-sm">Secteur</div>
                  <div className="text-muted-foreground text-sm">{project?.industry}</div>
                </div>
                <div className="text-center">
                  <Icon name="MapPin" size={22} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-secondary text-sm">Localisation</div>
                  <div className="text-muted-foreground text-sm">Guinée</div>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-muted px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Intéressé par un projet similaire ? Discutons de vos besoins.
              </p>
              <div className="flex flex-wrap gap-3">
                {project?.projectUrl && (() => {
                  const meta = PROJECT_LINK_META[project.service] || { label: "Voir le projet", icon: "ExternalLink" };
                  return (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm whitespace-nowrap"
                    >
                      <Icon name={meta.icon} size={16} />
                      {meta.label}
                      <Icon name="ExternalLink" size={13} className="opacity-60" />
                    </a>
                  );
                })()}
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 glow-orange text-sm whitespace-nowrap"
                >
                  <Icon name="MessageCircle" size={16} />
                  Commencer une Discussion
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )}
  </AnimatePresence>
);

export default ProjectModal;
