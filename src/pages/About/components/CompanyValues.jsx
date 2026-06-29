import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import { getAboutCoreValues } from "../../../lib/cms";

const STATIC_CORE_VALUES = [
  { icon: "Lightbulb", title: "Innovation", description: "Repousser constamment les limites et explorer de nouvelles possibilités" },
  { icon: "Users", title: "Collaboration", description: "Travailler ensemble pour obtenir des résultats extraordinaires" },
  { icon: "Shield", title: "Intégrité", description: "Maintenir les normes éthiques les plus élevées dans tout notre travail" },
  { icon: "Target", title: "Excellence", description: "Fournir une qualité qui dépasse les attentes à chaque fois" },
  { icon: "Compass", title: "Objectif", description: "Guidé par un impact significatif et un changement positif" },
  { icon: "Zap", title: "Agilité", description: "S'adapter rapidement aux besoins et opportunités changeants" },
];

const HIGHLIGHT_VALUE = {
  title: "Vision au-delà de la technologie",
  icon: "Globe",
  description: "Nous croyons que de grandes idées peuvent venir de partout et atteindre partout. Nos solutions transcendent les frontières géographiques.",
  examples: [
    {
      title: "Portefeuille Client Global",
      description: "Servir des clients sur plusieurs continents avec une qualité constante",
      image: "/portefeuilcli.png",
      metrics: "Plusieurs pays desservis",
    },
    {
      title: "Collaboration Remote-First",
      description: "Livraison de projets fluide, peu importe la localisation",
      image: "/remotecolab.png",
      metrics: "99,5 % de disponibilité",
    },
  ],
  color: "bg-primary",
};

const CompanyValues = () => {
  const [coreValues, setCoreValues] = useState(STATIC_CORE_VALUES);

  useEffect(() => {
    getAboutCoreValues()
      .then((d) => { if (d?.length) setCoreValues(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Heart" size={16} />
            <span>Notre philosophie</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Notre vision et nos valeurs fondamentales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plus que de simples mots — les principes qui guident chaque décision et animent chaque projet
          </p>
        </motion.div>

        {/* Highlight value with images */}
        <motion.div
          className="lg:flex lg:items-center lg:gap-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 ${HIGHLIGHT_VALUE.color} rounded-xl flex items-center justify-center`}>
                <Icon name={HIGHLIGHT_VALUE.icon} size={24} color="white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-secondary">{HIGHLIGHT_VALUE.title}</h3>
            </div>
            <p className="text-gray-500 mb-6 leading-relaxed">{HIGHLIGHT_VALUE.description}</p>
            <div className="space-y-3">
              {HIGHLIGHT_VALUE.examples.map((example, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary text-sm mb-0.5">{example.title}</h4>
                    <p className="text-xs text-gray-500 mb-1">{example.description}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-medium">{example.metrics}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 grid gap-4">
            {HIGHLIGHT_VALUE.examples.map((example, i) => (
              <motion.div
                key={i}
                className="relative rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-video">
                  <Image src={example.image} alt={example.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h4 className="font-semibold text-sm mb-0.5">{example.title}</h4>
                    <p className="text-xs text-white/80">{example.metrics}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core values grid */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-2">Nos valeurs fondamentales</h3>
            <p className="text-gray-500 text-sm">Les principes qui façonnent notre culture</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.id || index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-soft transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon name={value.icon} size={22} color="var(--color-primary)" />
                </motion.div>
                <h4 className="font-heading font-bold text-secondary mb-2">{value.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
