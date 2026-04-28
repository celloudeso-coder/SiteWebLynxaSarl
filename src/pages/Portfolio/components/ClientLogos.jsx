import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const STATS = [
  { icon: "CheckCircle", value: "20+", label: "Projets Réussis",      color: "text-emerald-500 bg-emerald-50" },
  { icon: "Users",       value: "15+", label: "Clients Satisfaits",    color: "text-blue-500 bg-blue-50"      },
  { icon: "Star",        value: "98%", label: "Taux de Satisfaction",   color: "text-amber-500 bg-amber-50"    },
  { icon: "Globe",       value: "5+",  label: "Pays Impactés",          color: "text-purple-500 bg-purple-50"  },
];

const ClientLogos = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-3">
          Notre Impact en Chiffres
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Des résultats concrets qui témoignent de notre engagement envers
          l'excellence technologique en Afrique.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-surface rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-shadow duration-300"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${s.color}`}>
              <Icon name={s.icon} size={22} />
            </div>
            <div className="text-3xl font-bold text-secondary mb-1">{s.value}</div>
            <div className="text-muted-foreground text-sm">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ClientLogos;
