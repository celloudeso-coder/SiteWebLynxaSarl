import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

// Faits vérifiables, sans compteur : remplace l'ancien « Tableau de bord
// d'impact » et ses chiffres (textes validés, à ne pas reformuler).
const DELIVERED = [
  "Quatre organisations accompagnées : recherche publique, sport et bien être, conseil aux entreprises, commerce de détail.",
  "KONTA, notre logiciel de comptabilité SYSCOHADA, est en production chez son premier client payant.",
  "Nous assurons l'hébergement et la maintenance des sites que nous livrons, sur abonnement.",
];

const DeliveredSection = () => (
  <section className="py-16 bg-surface">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl sm:text-4xl font-heading font-bold text-secondary mb-10 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ce que nous avons livré
      </motion.h2>
      <ul className="space-y-4">
        {DELIVERED.map((text, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-soft border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Icon name="CheckCircle" size={22} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <p className="text-secondary leading-relaxed">{text}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

export default DeliveredSection;
