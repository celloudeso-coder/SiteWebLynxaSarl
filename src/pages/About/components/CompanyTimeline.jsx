import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";
import { useTimelineEvents } from "../../../hooks/useContent";

const TIMELINE_COLORS = ["bg-primary", "bg-accent", "bg-success", "bg-warning"];
const TIMELINE_ICONS = ["Rocket", "Smartphone", "Trophy", "Users", "Globe", "Lightbulb"];

const STATIC_EVENTS = [
  {
    year: "2025",
    title: "Fondation & Premiers Pas",
    description:
      "Lynxa Tech a été fondée à Conakry avec pour vision de relier l'innovation africaine aux opportunités mondiales. Commencé avec 4 informaticiens passionnés.",
    icon: "Rocket",
    achievements: [
      "Enregistrement de l'entreprise",
      "Plateformes numériques réalisées",
      "Équipe initiale de 4",
    ],
    color: "bg-primary",
  },
];

const SkeletonEvent = () => (
  <div className="relative flex items-center animate-pulse">
    <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-gray-200 rounded-full transform md:-translate-x-4 z-10" />
    <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12">
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-3">
        <div className="h-5 bg-gray-100 rounded-full w-1/4" />
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-20 bg-gray-100 rounded-full" />
          <div className="h-6 w-24 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
    <div className="hidden md:block md:w-1/2" />
  </div>
);

const CompanyTimeline = () => {
  const { data: cmsEvents, loading } = useTimelineEvents();

  const timelineEvents =
    cmsEvents && cmsEvents.length > 0
      ? cmsEvents.map((e, i) => ({
          year: e.year,
          title: e.title,
          description: e.description,
          achievements: Array.isArray(e.achievements) ? e.achievements : [],
          icon: TIMELINE_ICONS[i % TIMELINE_ICONS.length],
          color: TIMELINE_COLORS[i % TIMELINE_COLORS.length],
        }))
      : STATIC_EVENTS;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="GitBranch" size={16} />
            <span>Notre histoire</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Notre parcours d'innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De la Guinée au monde, une aventure technologique ambitieuse étape par étape.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent transform md:-translate-x-px z-0" />

          <div className="space-y-12">
            {loading
              ? [0, 1].map((i) => <SkeletonEvent key={i} />)
              : timelineEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className="absolute left-4 md:left-1/2 w-8 h-8 transform md:-translate-x-4 z-10"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, type: "spring", delay: 0.1 }}
                    >
                      <div className={`w-8 h-8 ${event.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <Icon name={event.icon} size={16} color="white" />
                      </div>
                    </motion.div>

                    {/* Content card */}
                    <motion.div
                      className={`ml-16 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                      }`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-primary">{event.year}</span>
                          <div className="h-px bg-primary/20 flex-1" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-secondary mb-3">{event.title}</h3>
                        <p className="text-gray-500 mb-4 leading-relaxed text-sm">{event.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {event.achievements.map((achievement, i) => (
                            <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
              Prêt(e) à faire partie de notre histoire ?
            </h3>
            <p className="text-gray-500 mb-6 max-w-2xl mx-auto text-sm">
              Rejoignez-nous alors que nous continuons à construire l'avenir de la technologie en Afrique et au-delà.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 glow-orange cursor-pointer text-sm"
                >
                  <Icon name="Briefcase" size={16} />
                  Rejoignez notre équipe
                </motion.span>
              </Link>
              <Link to="/partnership">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center gap-2 border border-gray-200 text-secondary hover:border-primary hover:text-primary font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-sm"
                >
                  <Icon name="Handshake" size={16} />
                  Devenez notre partenaire
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyTimeline;
