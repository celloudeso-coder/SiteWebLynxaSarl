import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const getServiceIcon = (service) => {
    switch (service) {
      case "Mobile Development":
        return "Smartphone";
      case "Network Infrastructure":
        return "Network";
      case "Web Development":
        return "Globe";
      case "Cybersecurity":
        return "Shield";
      default:
        return "Code";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="relative">
            <div className="h-64 overflow-hidden">
              <Image
                src={project?.image}
                alt={project?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon
                    name={getServiceIcon(project?.service)}
                    size={24}
                    className="text-primary"
                  />
                  <span className="text-primary font-medium">
                    {project?.service}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {project?.industry}
                  </span>
                </div>
                <h2 className="text-2xl font-heading font-bold text-secondary">
                  {project?.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Challenge */}
            <div className="mb-8">
              <h3 className="text-xl font-heading font-bold text-secondary mb-4 flex items-center">
                <Icon
                  name="AlertCircle"
                  size={20}
                  className="text-destructive mr-2"
                />
                Challenge
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project?.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-8">
              <h3 className="text-xl font-heading font-bold text-secondary mb-4 flex items-center">
                <Icon
                  name="Lightbulb"
                  size={20}
                  className="text-warning mr-2"
                />
                Approche de la Solution
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {project?.solution}
              </p>

              {project?.technologies && (
                <div>
                  <h4 className="font-semibold text-secondary mb-2">
                    Technologies Utilisées:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project?.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Implementation */}
            <div className="mb-8">
              <h3 className="text-xl font-heading font-bold text-secondary mb-4 flex items-center">
                <Icon name="Settings" size={20} className="text-accent mr-2" />
                Processus d'implementation
              </h3>
              <div className="space-y-3">
                {project?.implementation?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-8">
              <h3 className="text-xl font-heading font-bold text-secondary mb-4 flex items-center">
                <Icon
                  name="TrendingUp"
                  size={20}
                  className="text-success mr-2"
                />
                Résultats Mesurables
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project?.metrics?.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-success/5 border border-success/20 rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-success mb-1">
                      {metric?.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric?.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Testimonial */}
            {project?.testimonial && (
              <div className="mb-8">
                <h3 className="text-xl font-heading font-bold text-secondary mb-4 flex items-center">
                  <Icon
                    name="MessageSquote"
                    size={20}
                    className="text-primary mr-2"
                  />
                  Témoignage Client
                </h3>
                <div className="bg-muted rounded-lg p-6">
                  <blockquote className="text-muted-foreground italic mb-4">
                    "{project?.testimonial?.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary">
                        {project?.testimonial?.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project?.testimonial?.position}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t">
              <div className="text-center">
                <Icon
                  name="Calendar"
                  size={24}
                  className="text-primary mx-auto mb-2"
                />
                <div className="font-semibold text-secondary">Duration</div>
                <div className="text-muted-foreground">{project?.duration}</div>
              </div>
              <div className="text-center">
                <Icon
                  name="Users"
                  size={24}
                  className="text-primary mx-auto mb-2"
                />
                <div className="font-semibold text-secondary">Team Size</div>
                <div className="text-muted-foreground">
                  {project?.teamSize || "5-8 members"}
                </div>
              </div>
              <div className="text-center">
                <Icon
                  name="MapPin"
                  size={24}
                  className="text-primary mx-auto mb-2"
                />
                <div className="font-semibold text-secondary">Location</div>
                <div className="text-muted-foreground">
                  {project?.location || "Guinea"}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Intéressé par un projet similaire ? Discutons de vos besoins.
            </div>

            <Button
              variant="default"
              iconName="MessageCircle"
              iconPosition="left"
              className="glow-orange"
            >
              Commencez Une Discussion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
