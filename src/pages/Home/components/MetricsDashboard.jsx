import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState({
    mobileApps: 1,
    networksSecured: 0,
    websitesLaunched: 0,
    threatsBlocked: 0,
  });

  const finalMetrics = {
    mobileApps: 1,
    networksSecured: 0,
    websitesLaunched: 0,
    threatsBlocked: 0,
  };

  useEffect(() => {
    const animateMetrics = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setMetrics({
          mobileApps: Math.floor(finalMetrics?.mobileApps * progress),
          networksSecured: Math.floor(finalMetrics?.networksSecured * progress),
          websitesLaunched: Math.floor(finalMetrics?.websitesLaunched * progress),
          threatsBlocked: Math.floor(finalMetrics?.threatsBlocked * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setMetrics(finalMetrics);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateMetrics, 500);
    return () => clearTimeout(timer);
  }, []);

  const metricsData = [
    {
      id: 1,
      icon: "Smartphone",
      label: "Applications Déployées",
      value: metrics?.mobileApps,
      suffix: "+",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 2,
      icon: "Network",
      label: "Services Réseaux ",
      value: metrics?.networksSecured,
      suffix: "+",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      icon: "Globe",
      label: "Sites Web Lancés",
      value: metrics?.websitesLaunched,
      suffix: "+",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 4,
      icon: "Activity",
      label: "Monitoring actifs",
      value: metrics?.threatsBlocked,
      suffix: "+",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-secondary mb-4">
            Tableau de bord d’impact en temps réel 
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Indicateurs en direct montrant notre contribution continue à la
            transformation numérique de la Guinée 
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData?.map((metric) => (
            <div
              key={metric?.id}
              className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 card-hover border border-border"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${metric?.bgColor} rounded-lg flex items-center justify-center mb-4`}
              >
                <Icon name={metric?.icon} size={24} className={metric?.color} />
              </div>

              {/* Value */}
              <div className="mb-2">
                <span className="text-3xl font-heading font-bold text-secondary">
                  {metric?.value?.toLocaleString()}
                </span>
                <span className={`text-2xl font-bold ${metric?.color}`}>
                  {metric?.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-sm text-muted-foreground font-medium">
                {metric?.label}
              </p>

              {/* Progress Indicator */}
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-2000 ease-out`}
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <Icon name="TrendingUp" size={16} className="text-green-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Live Status Indicator */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
             Données en direct mises à jour toutes les 24 heures 
          </span>
        </div>

        {/* Additional Stats */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-soft border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-heading font-bold text-primary mb-2">
                99.5%
              </div>
              <p className="text-sm text-muted-foreground">
                 Garantie de disponibilité 
              </p>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-primary mb-2">
                &lt;3s
              </div>
              <p className="text-sm text-muted-foreground">
                Temps de chargement moyen 
              </p>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-primary mb-2">
                24/7
              </div>
              <p className="text-sm text-muted-foreground">
                Couverture du support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
