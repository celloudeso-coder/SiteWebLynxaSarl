import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import PathwayInquiryModal from "./PathwayInquiryModal";
import { usePartnershipPathways } from "../../../hooks/useContent";

const STATIC_PATHWAYS = [
  {
    id: 1, sort_order: 1, title: "Partenariat Startup & PME",
    description: "Solutions sur mesure pour les entreprises en croissance avec des options de paiement flexibles et une technologie évolutive.",
    icon: "Rocket",
    features: ["Développement MVP", "Plans de paiement flexibles", "Solutions axées sur la croissance", "Support de mentorat"],
    ideal_for: "Startups, Petites Entreprises, Entrepreneurs",
    timeline: "2-8 semaines", budget: "700 $ – 3 000 $", color: "primary",
  },
  {
    id: 2, sort_order: 2, title: "Solutions Entreprises",
    description: "Partenariats technologiques complets pour les grandes organisations avec des besoins complexes.",
    icon: "Building2",
    features: ["Systèmes entreprises personnalisés", "Support prioritaire 24/7", "Chef de projet dédié", "Garanties SLA"],
    ideal_for: "Grandes Entreprises, Gouvernement, ONG",
    timeline: "3-12 mois", budget: "3 500 $ – 10 000 $", color: "accent",
  },
  {
    id: 3, sort_order: 3, title: "Collaboration Internationale",
    description: "Partenariats transfrontaliers avec des organisations mondiales s'étendant sur les marchés africains.",
    icon: "Globe",
    features: ["Adaptation culturelle", "Support multilingue", "Expertise marché local", "Assistance conformité"],
    ideal_for: "Entreprises Internationales, ONG Mondiales",
    timeline: "4-16 semaines", budget: "15 000 $ et +", color: "primary",
  },
  {
    id: 4, sort_order: 4, title: "Réseau Technologique",
    description: "Alliances stratégiques avec d'autres entreprises tech pour une croissance et collaboration mutuelles.",
    icon: "Network",
    features: ["Programmes de revente", "Intégration technologique", "Joint ventures", "Partage de connaissances"],
    ideal_for: "Entreprises Tech, Intégrateurs de Systèmes",
    timeline: "En continu", budget: "Partage de revenus", color: "accent",
  },
];

const CollaborationPathways = () => {
  const [selectedPathway, setSelectedPathway] = useState(null);
  const { data: cmsPathways } = usePartnershipPathways();

  const pathways =
    cmsPathways && cmsPathways.length > 0
      ? cmsPathways.map((p) => ({
          ...p,
          features: Array.isArray(p.features) ? p.features : (typeof p.features === "string" ? JSON.parse(p.features) : []),
        }))
      : STATIC_PATHWAYS;

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.55, delay: i * 0.13, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-20 bg-surface" id="pathways">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Choisissez votre voie de collaboration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des cadres de partenariat conçus pour chaque type d'organisation, taille de
            projet et style de collaboration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {pathways.map((pathway, i) => (
            <motion.div
              key={pathway.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-8 shadow-medium hover:shadow-large transition-shadow duration-300 border border-border"
            >
              <div className="flex items-start justify-between mb-6">
                <motion.div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    pathway.color === "primary" ? "bg-primary" : "bg-accent"
                  } glow-orange`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon name={pathway.icon} size={26} color="white" />
                </motion.div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Durée estimée</p>
                  <p className="font-semibold text-secondary text-sm">{pathway.timeline}</p>
                </div>
              </div>

              <h3 className="text-xl font-heading font-bold text-secondary mb-3">
                {pathway.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                {pathway.description}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-secondary mb-2">Inclus :</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pathway.features?.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon name="Check" size={14} color="var(--color-primary)" />
                        <span className="text-xs text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Idéal pour</p>
                    <p className="text-xs font-medium text-secondary">{pathway.ideal_for}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Budget</p>
                    <p className="text-xs font-medium text-secondary">{pathway.budget}</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPathway(pathway)}
                className="w-full flex items-center justify-center gap-2 border border-border text-secondary hover:bg-primary hover:text-white hover:border-primary text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-300"
              >
                Explorer cette voie
                <Icon name="ArrowRight" size={15} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-5">
            Vous ne savez pas quel parcours correspond à votre projet ?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-xl font-semibold transition-all glow-orange"
          >
            <Icon name="MessageCircle" size={18} color="white" />
            Consultation personnalisée gratuite
          </motion.a>
        </motion.div>
      </div>

      {selectedPathway && (
        <PathwayInquiryModal
          pathway={selectedPathway}
          onClose={() => setSelectedPathway(null)}
        />
      )}
    </section>
  );
};

export default CollaborationPathways;
