import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { useMetrics } from "../../../hooks/useContent";

const ICONS = ["Smartphone", "Network", "Globe", "Activity"];
const COLORS = [
  { text: "text-primary", bg: "bg-primary/10" },
  { text: "text-green-500", bg: "bg-green-500/10" },
  { text: "text-blue-500", bg: "bg-blue-500/10" },
  { text: "text-red-500", bg: "bg-red-500/10" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

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
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setAnimated(finalValues.map((m) => ({ ...m, displayValue: Math.floor(m.value * ease) })));
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
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-secondary mb-4">
            Tableau de bord d'impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Indicateurs montrant notre contribution continue à la transformation numérique de la Guinée
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {animated.map((metric, i) => (
            <motion.div
              key={metric.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300 border border-border cursor-default"
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
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.12 + 0.3 }}
                  />
                </div>
                <Icon name="TrendingUp" size={16} className="text-green-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Données mises à jour régulièrement</span>
        </motion.div>

        <motion.div
          className="mt-12 bg-white rounded-xl p-8 shadow-soft border border-border"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "99.5%", label: "Garantie de disponibilité" },
              { value: "<3s",   label: "Temps de chargement moyen" },
              { value: "24/7",  label: "Couverture du support" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="text-2xl font-heading font-bold text-primary mb-2">{item.value}</div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
