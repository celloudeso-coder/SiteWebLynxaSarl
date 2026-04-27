import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import { useMetrics } from "../../../hooks/useContent";

const ICONS = ["Smartphone", "Network", "Globe", "Activity"];
const COLORS = [
  { text: "text-primary", bg: "bg-primary/10" },
  { text: "text-green-500", bg: "bg-green-500/10" },
  { text: "text-blue-500", bg: "bg-blue-500/10" },
  { text: "text-red-500", bg: "bg-red-500/10" },
];

const MetricsDashboard = () => {
  const { data: cmsMetrics, loading } = useMetrics("home");
  const [animated, setAnimated] = useState([]);

  const finalValues = (cmsMetrics && cmsMetrics.length > 0 ? cmsMetrics : []).map((m) => ({
    id: m.id || m.sort_order,
    icon: m.icon || ICONS[m.sort_order - 1] || "Activity",
    label: m.label,
    value: m.value || 0,
    suffix: m.suffix || "+",
    ...COLORS[(m.sort_order - 1) % COLORS.length],
  }));

  useEffect(() => {
    if (finalValues.length === 0) return;
    setAnimated(finalValues.map((m) => ({ ...m, displayValue: 0 })));

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimated(finalValues.map((m) => ({ ...m, displayValue: Math.floor(m.value * progress) })));
      if (step >= steps) {
        clearInterval(interval);
        setAnimated(finalValues.map((m) => ({ ...m, displayValue: m.value })));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [cmsMetrics]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || finalValues.length === 0) return null;

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-secondary mb-4">
            Tableau de bord d'impact en temps réel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Indicateurs en direct montrant notre contribution continue à la transformation numérique de la Guinée
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {animated.map((metric) => (
            <div
              key={metric.id}
              className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 card-hover border border-border"
            >
              <div className={`w-12 h-12 ${metric.bg} rounded-lg flex items-center justify-center mb-4`}>
                <Icon name={metric.icon} size={24} className={metric.text} />
              </div>
              <div className="mb-2">
                <span className="text-3xl font-heading font-bold text-secondary">
                  {metric.displayValue?.toLocaleString()}
                </span>
                <span className={`text-2xl font-bold ${metric.text}`}>{metric.suffix}</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: "100%" }} />
                </div>
                <Icon name="TrendingUp" size={16} className="text-green-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Données en direct mises à jour toutes les 24 heures</span>
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-soft border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-heading font-bold text-primary mb-2">99.5%</div>
              <p className="text-sm text-muted-foreground">Garantie de disponibilité</p>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-primary mb-2">&lt;3s</div>
              <p className="text-sm text-muted-foreground">Temps de chargement moyen</p>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Couverture du support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
