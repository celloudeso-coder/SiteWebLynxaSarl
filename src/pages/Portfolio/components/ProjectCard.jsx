import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProjectCard = ({ project, onViewDetails }) => {
  const getImpactColor = (level) => {
    switch (level) {
      case "High":
        return "text-success bg-success/10"; // Élevé
      case "Medium":
        return "text-warning bg-warning/10"; // Moyen
      case "Low":
        return "text-muted-foreground bg-muted"; // Faible
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getServiceIcon = (service) => {
    switch (service) {
      case "Mobile Development":
        return "Smartphone"; // Développement Mobile
      case "Network Infrastructure":
        return "Network"; // Infrastructure Réseau
      case "Web Development":
        return "Globe"; // Développement Web
      case "Cybersecurity":
        return "Shield"; // Cybersécurité
      default:
        return "Code";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group card-hover">
      {/* <div className="relative overflow-hidden h-48">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(
              project?.impact
            )}`}
          >
            {project?.impact} Impact
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
            <Icon
              name={getServiceIcon(project?.service)}
              size={20}
              className="text-primary"
            />
          </div>
        </div>
      </div> */}

      {/* <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-primary font-medium">
            {project?.service}
          </span>
          <span className="text-sm text-muted-foreground">
            {project?.industry}
          </span>
        </div>

        <h3 className="text-xl font-heading font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
          {project?.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project?.description}
        </p>

        <div className="space-y-3 mb-6">
          {project?.metrics?.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {metric?.label}
              </span>
              <span className="text-sm font-semibold text-success">
                {metric?.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {project?.duration}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(project)}
            iconName="ArrowRight"
            iconPosition="right"
            className="glow-orange"
          >
            Voir les details
          </Button>
        </div>
      </div> */}
    </div> 
  );
};

export default ProjectCard;
