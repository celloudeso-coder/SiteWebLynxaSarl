import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ServiceCard = ({ service, isActive, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-500 cursor-pointer ${
        isActive
          ? "border-primary shadow-2xl glow-orange scale-105"
          : "border-gray-200 hover:border-primary/50 hover:shadow-xl"
      }`}
      onClick={onActivate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 
              // ${isActive ? "bg-primary glow-orange" : "bg-gray-100"}`}
          >
            <Icon
              name={service?.icon}
              size={32}
              color={isActive ? "white" : "#6B7280"}
            />
          </div>
          <div
            className={`transition-transform duration-300 ${
              isHovered ? "rotate-12" : ""
            }`}
          >
            <Icon name="ArrowUpRight" size={24} color="#FF8C00" />
          </div>
        </div>

        <h3 className="text-2xl font-heading font-bold text-secondary mb-3">
          {service?.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {service?.description}
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
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
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl pointer-events-none"></div>
      )}
    </div>
  );
};

export default ServiceCard;
