import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const SERVICE_ICONS = {
  "Mobile Development": "Smartphone",
  "Network Infrastructure": "Network",
  "Web Development": "Globe",
  "Cybersecurity": "Shield",
  "Développement Mobile": "Smartphone",
  "Infrastructure Réseau": "Network",
  "Développement Web": "Globe",
  "Cybersécurité": "Shield",
};

const PROJECT_LINK_META = {
  "Mobile Development":    { label: "Voir l'application", icon: "Smartphone" },
  "Développement Mobile":  { label: "Voir l'application", icon: "Smartphone" },
  "Web Development":       { label: "Voir le site",       icon: "Globe"       },
  "Développement Web":     { label: "Voir le site",       icon: "Globe"       },
  "Network Infrastructure":{ label: "Voir le rapport",    icon: "FileText"    },
  "Infrastructure Réseau": { label: "Voir le rapport",    icon: "FileText"    },
  "Cybersecurity":         { label: "Voir le rapport",    icon: "ShieldCheck" },
  "Cybersécurité":         { label: "Voir le rapport",    icon: "ShieldCheck" },
};

const IMPACT_STYLES = {
  High:   "text-emerald-700 bg-emerald-50 border border-emerald-200",
  Medium: "text-amber-700 bg-amber-50 border border-amber-200",
  Low:    "text-gray-500 bg-gray-100 border border-gray-200",
};

const IMPACT_LABELS = { High: "Impact Élevé", Medium: "Impact Moyen", Low: "Impact Faible" };

const ProjectCard = ({ project, onViewDetails, index = 0 }) => {
  const iconName    = SERVICE_ICONS[project?.service] || "Code";
  const impactStyle = IMPACT_STYLES[project?.impact]  || "text-gray-500 bg-gray-100 border border-gray-200";
  const linkMeta    = PROJECT_LINK_META[project?.service] || { label: "Voir le projet", icon: "ExternalLink" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden group flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${impactStyle}`}>
            {IMPACT_LABELS[project?.impact] || project?.impact}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2">
            <Icon name={iconName} size={18} className="text-primary" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-primary font-medium">{project?.service}</span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {project?.industry}
          </span>
        </div>

        <h3 className="text-lg font-heading font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
          {project?.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
          {project?.description}
        </p>

        {project?.metrics?.length > 0 && (
          <div className="space-y-2 mb-5 bg-muted/50 rounded-xl p-3">
            {project.metrics.slice(0, 3).map((metric, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{metric?.label}</span>
                <span className="text-xs font-semibold text-emerald-600">{metric?.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-border space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span className="text-xs">{project?.duration}</span>
            </div>
            <motion.button
              onClick={() => onViewDetails(project)}
              whileHover={{ x: 3 }}
              className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all"
            >
              Voir les détails
              <Icon name="ArrowRight" size={14} />
            </motion.button>
          </div>

          {project?.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary hover:text-white text-primary text-sm font-medium py-2 rounded-xl transition-all duration-200 group/link"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name={linkMeta.icon} size={15} />
              {linkMeta.label}
              <Icon name="ExternalLink" size={13} className="opacity-60 group-hover/link:opacity-100" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
