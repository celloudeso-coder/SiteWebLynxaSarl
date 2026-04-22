import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ServiceDetails = ({ service }) => {
  if (!service) return null;

  // return (
  // <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* <div className="bg-gradient-to-r from-primary to-accent p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Icon name={service?.icon} size={32} color="white" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold">
              {service?.title}
            </h2>
            <p className="text-white/80">{service?.subtitle}</p>
          </div>
        </div>
      </div> */}

      {/* <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-heading font-bold text-secondary mb-4">
              Technologies Clés
            </h3>
            <div className="flex flex-wrap gap-2">
              {service?.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold text-secondary mb-4">
              Indicateurs de Succès
            </h3>
            <div className="space-y-3">
              {service?.metrics?.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{metric?.label}</span>
                  <span className="font-bold text-primary">
                    {metric?.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-heading font-bold text-secondary mb-4">
            Projets Mis en Avant
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service?.projects?.map((project, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <h4 className="font-semibold text-secondary mb-2">
                  {project?.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {project?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {project?.industry}
                  </span>
                  <Icon name="ExternalLink" size={16} color="#6B7280" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-primary/5 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-heading font-bold text-secondary mb-2">
                Prêt à Lancer Votre Projet ?
              </h3>
              <p className="text-gray-600">
                Discutons de la façon dont notre expertise en{" "}
                {service?.title?.toLowerCase()}
                peut transformer votre entreprise.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
              >
                Planifier un Appel
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                className="glow-orange"
              >
                Obtenir un Devis
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    // </div> 
  // );
};

export default ServiceDetails;
