import React from "react";

import Icon from "../../../components/AppIcon";

const steps = [
  {
    icon: "Search",
    title: "1. Postulez",
    desc: "Soumettez votre candidature via le formulaire ci-dessous avec votre CV et vos motivations.",
  },
  {
    icon: "MessageSquare",
    title: "2. Entretien",
    desc: "Nos recruteurs échangent avec vous pour comprendre votre profil et vos ambitions.",
  },
  {
    icon: "CheckCircle",
    title: "3. Bienvenue à bord",
    desc: "Si le feeling est là, vous rejoignez la famille Lynxa Tech ! ",
  },
];

const JoinUsProcess = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-secondary mb-10">
          Notre processus de recrutement
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-6 shadow-medium hover:shadow-large transition-all"
            >
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <Icon name={step.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-secondary">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JoinUsProcess;
