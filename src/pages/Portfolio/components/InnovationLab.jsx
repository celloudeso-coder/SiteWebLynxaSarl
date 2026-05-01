import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import { getPortfolioInnovations } from "../../../lib/cms";

const STATIC_INNOVATIONS = [
  {
    icon: "Cpu",
    title: "Optimisation Réseau par IA",
    description: "Algorithmes d'apprentissage automatique pour optimiser automatiquement les performances réseau et prévenir les pannes.",
    status: "En Développement",
    status_color: "text-amber-600 bg-amber-50",
    impact: "Réduction de 40% des interruptions réseau",
  },
  {
    icon: "Lock",
    title: "Identité Blockchain",
    description: "Système d'identité décentralisé pour une authentification sécurisée et respectueuse de la vie privée.",
    status: "Phase de Recherche",
    status_color: "text-blue-600 bg-blue-50",
    impact: "Sécurité pour +100 000 utilisateurs",
  },
  {
    icon: "Leaf",
    title: "Agriculture IoT",
    description: "Capteurs IoT pour surveiller conditions du sol, météo et santé des cultures pour les agriculteurs guinéens.",
    status: "Test Pilote",
    status_color: "text-emerald-600 bg-emerald-50",
    impact: "+20% de rendements agricoles",
  },
];

const InnovationLab = () => {
  const [innovations, setInnovations] = useState(STATIC_INNOVATIONS);

  useEffect(() => {
    getPortfolioInnovations()
      .then((d) => { if (d?.length) setInnovations(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="FlaskConical" size={16} />
            <span>Laboratoire d'Innovation</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-3">
            Pionniers des Solutions de Demain
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nos initiatives R&D repoussent les limites de la technologie africaine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {innovations.map((item, i) => (
            <motion.div
              key={item.id ?? item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name={item.icon} size={22} className="text-primary" />
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.status_color ?? item.statusColor}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="font-heading font-bold text-secondary mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                <Icon name="Target" size={13} />
                {item.impact}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-soft p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Lightbulb" size={26} className="text-primary" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-secondary mb-3">
              Une Idée Innovante ?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nous explorons toujours de nouvelles frontières technologiques. Si vous avez un projet
              ambitieux ou un concept innovant, collaborons pour le concrétiser.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 glow-orange"
            >
              <Icon name="MessageCircle" size={18} />
              Discuter de Votre Idée
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationLab;
