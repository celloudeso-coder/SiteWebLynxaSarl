import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { getServiceProcessSteps } from "../../../lib/cms";

const STATIC_STEPS = [
  {
    id: 1,
    title: "Découverte & Analyse",
    description: "Nous plongeons en profondeur dans vos exigences commerciales, contraintes techniques et objectifs de croissance pour créer une feuille de route complète du projet.",
    icon: "Search",
    duration: "1–2 semaines",
    deliverables: ["Document des Exigences", "Spécification Technique", "Calendrier du Projet"],
  },
  {
    id: 2,
    title: "Conception & Architecture",
    description: "Notre équipe crée une architecture système détaillée, des conceptions d'expérience utilisateur et des plans techniques adaptés à vos besoins spécifiques.",
    icon: "Layers",
    duration: "2–3 semaines",
    deliverables: ["Architecture Système", "Conceptions UI/UX", "Schéma de Base de Données"],
  },
  {
    id: 3,
    title: "Développement & Tests",
    description: "Le développement Agile avec des tests continus assure des livrables de haute qualité avec des retours réguliers et des améliorations itératives.",
    icon: "Code",
    duration: "4–12 semaines",
    deliverables: ["Logiciel Fonctionnel", "Rapports de Test", "Documentation"],
  },
  {
    id: 4,
    title: "Déploiement & Support",
    description: "Déploiement transparent avec formation complète et support continu pour garantir que votre équipe puisse maximiser le potentiel de la solution.",
    icon: "Rocket",
    duration: "1–2 semaines",
    deliverables: ["Système en Production", "Matériel de Formation", "Plan de Support"],
  },
];

const ProcessTimeline = () => {
  const [steps, setSteps] = useState(STATIC_STEPS);

  useEffect(() => {
    getServiceProcessSteps()
      .then((d) => {
        if (d?.length) {
          setSteps(d.map((s, i) => ({
            ...s,
            id: s.sort_order ?? i + 1,
            deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="GitBranch" size={16} />
            <span>Notre Méthode</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Notre Processus Éprouvé
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Du concept au déploiement, une approche structurée qui garantit le succès et la satisfaction client. La durée varie selon le type de projet.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full z-0" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.id ?? index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <motion.div
                  className="w-full lg:w-5/12"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 p-8">
                    <div className="flex items-center gap-4 mb-5">
                      <motion.div
                        className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center glow-orange flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon name={step.icon} size={22} color="white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-secondary">
                          {step.title}
                        </h3>
                        <span className="text-sm text-primary font-medium">{step.duration}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {step.description}
                    </p>

                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Livrables clés
                      </p>
                      <div className="space-y-2">
                        {(step.deliverables || []).map((d, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <Icon name="CheckCircle" size={15} color="#10B981" />
                            <span className="text-sm text-gray-700">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Timeline node (desktop) */}
                <motion.div
                  className="hidden lg:flex w-2/12 justify-center relative z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                >
                  <div className="w-14 h-14 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg glow-orange">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>
                </motion.div>

                {/* Timeline node (mobile) */}
                <motion.div
                  className="lg:hidden relative z-10 w-14 h-14 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg glow-orange"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  <span className="text-lg font-bold text-primary">{index + 1}</span>
                </motion.div>

                <div className="hidden lg:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
