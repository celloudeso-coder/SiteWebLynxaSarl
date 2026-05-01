import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import { getPartnershipProcessSteps } from "../../../lib/cms";

const STATIC_STEPS = [
  {
    id: 1, icon: "Search", color: "primary",
    title: "Découverte & Consultation",
    description: "Discussion approfondie pour comprendre vos besoins, objectifs et contraintes techniques.",
    duration: "1-3 jours",
    deliverables: ["Analyse des besoins", "Étude de faisabilité", "Périmètre initial", "Évaluation des risques"],
  },
  {
    id: 2, icon: "FileText", color: "accent",
    title: "Proposition & Planification",
    description: "Proposition détaillée avec calendrier, budget et architecture technique adaptés.",
    duration: "2-5 jours",
    deliverables: ["Proposition de projet", "Architecture technique", "Jalons & planning", "Détail de l'investissement"],
  },
  {
    id: 3, icon: "Handshake", color: "primary",
    title: "Accord & Lancement",
    description: "Finalisation du contrat et lancement officiel avec votre équipe dédiée.",
    duration: "1-2 jours",
    deliverables: ["Contrat signé", "Réunion de lancement", "Présentation équipe", "Protocoles de com."],
  },
  {
    id: 4, icon: "Code", color: "accent",
    title: "Développement & Suivi",
    description: "Développement itératif avec mises à jour régulières et revues de jalons.",
    duration: "Selon le projet",
    deliverables: ["Rapports d'avancement", "Démos de jalons", "Tests QA continus", "Intégration des retours"],
  },
  {
    id: 5, icon: "CheckCircle", color: "primary",
    title: "Tests & Assurance Qualité",
    description: "Tests complets pour garantir performance, sécurité et conformité aux exigences.",
    duration: "1-2 semaines",
    deliverables: ["Tests fonctionnels", "Optimisation perf.", "Validation sécurité", "Tests d'acceptation"],
  },
  {
    id: 6, icon: "Rocket", color: "accent",
    title: "Déploiement & Support",
    description: "Mise en production et support continu pour assurer la pérennité de votre solution.",
    duration: "En continu",
    deliverables: ["Déploiement prod.", "Formation équipe", "Documentation", "Plan de support"],
  },
];

const ProcessOverview = () => {
  const [steps, setSteps] = useState(STATIC_STEPS);

  useEffect(() => {
    getPartnershipProcessSteps()
      .then((data) => {
        if (data?.length) {
          setSteps(data.map((s) => ({
            ...s,
            deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
          Notre processus de projet
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          De la consultation au support continu — une approche structurée qui garantit
          le succès de chaque projet.
        </p>
      </motion.div>

      {/* Timeline steps */}
      <div className="relative">
        {/* Ligne verticale desktop */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-20" />

        <div className="space-y-10">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={step.id} className="flex flex-col lg:flex-row items-center gap-0 lg:gap-0">
                {/* Contenu gauche */}
                <div className={`w-full lg:w-5/12 ${isLeft ? "lg:pr-12" : "lg:order-3 lg:pl-12"}`}>
                  <motion.div
                    className="bg-surface rounded-2xl p-7 border border-border"
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          step.color === "primary" ? "bg-primary" : "bg-accent"
                        } glow-orange`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon name={step.icon} size={22} color="white" />
                      </motion.div>
                      <span className="text-xs text-muted-foreground bg-white border border-border px-2.5 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-secondary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-2 gap-1.5">
                      {step.deliverables.map((d, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Icon name="Check" size={12} color="var(--color-primary)" />
                          <span className="text-xs text-muted-foreground">{d}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Numéro central */}
                <div className={`hidden lg:flex lg:order-2 w-2/12 justify-center z-10`}>
                  <motion.div
                    className="w-12 h-12 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-md flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </motion.div>
                </div>

                {/* Espace droite (vide pour alterner) */}
                {isLeft && <div className="hidden lg:block lg:order-3 w-5/12" />}
                {!isLeft && <div className="hidden lg:block lg:order-1 w-5/12" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="mt-16 bg-gradient-to-br from-secondary via-gray-800 to-secondary rounded-2xl p-10 text-white text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-heading font-bold mb-3">
          Prêt à démarrer votre projet ?
        </h3>
        <p className="text-white/80 mb-7 max-w-xl mx-auto">
          Discutons de vos besoins et créons une solution sur mesure pour votre organisation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all glow-orange"
          >
            <Icon name="MessageCircle" size={18} color="white" />
            Planifier une consultation
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-all"
          >
            <Icon name="Eye" size={18} color="white" />
            Voir nos réalisations
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default ProcessOverview;
