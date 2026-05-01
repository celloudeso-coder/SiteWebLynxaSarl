import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { getJoinUsProcessSteps } from "../../../lib/cms";

const STATIC_STEPS = [
  { id: 1, icon: "FileText",     color: "bg-primary", title: "Postulez",          desc: "Remplissez le formulaire ci-dessous avec votre CV et votre lettre de motivation. Simple et rapide.", detail: "~5 minutes" },
  { id: 2, icon: "MessageSquare",color: "bg-accent",  title: "Entretien",         desc: "Nos recruteurs vous contactent sous 48h pour un échange convivial sur votre profil et vos ambitions.", detail: "Sous 48h" },
  { id: 3, icon: "Code",         color: "bg-primary", title: "Test technique",    desc: "Un petit exercice pratique adapté au poste — l'occasion de montrer votre façon de penser.", detail: "Optionnel" },
  { id: 4, icon: "PartyPopper",  color: "bg-accent",  title: "Bienvenue à bord !", desc: "Si le feeling est là, vous rejoignez la famille Lynxa Tech et contribuez à façonner l'avenir tech africain.", detail: "C'est parti 🚀" },
];

const JoinUsProcess = () => {
  const [steps, setSteps] = useState(STATIC_STEPS);

  useEffect(() => {
    getJoinUsProcessSteps()
      .then((data) => { if (data?.length) setSteps(data); })
      .catch(() => {});
  }, []);

  return (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
          Notre processus de recrutement
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Simple, humain et transparent — de la candidature à l'intégration.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative">
        {/* Ligne de connexion desktop */}
        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.13 }}
            >
              {/* Numéro + icône */}
              <motion.div
                className={`relative w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-5 shadow-md z-10`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon name={step.icon} size={32} color="white" />
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-white border-2 border-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{step.id}</span>
                </div>
              </motion.div>

              <h3 className="text-lg font-heading font-bold text-secondary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {step.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                <Icon name="Clock" size={11} color="var(--color-primary)" />
                {step.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default JoinUsProcess;
