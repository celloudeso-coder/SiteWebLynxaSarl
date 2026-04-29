import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const ROADMAP_PHASES = [
  {
    phase: "Phase 1",
    timeline: "2025 – 2027",
    title: "Expansion en Afrique de l'Ouest",
    status: "En cours",
    description: "Établir des partenariats stratégiques et des bureaux dans les principaux marchés d'Afrique de l'Ouest pour servir la région CEDEAO.",
    goals: [
      "Ouvrir des bureaux au Sénégal et en Côte d'Ivoire",
      "S'associer à 10+ entreprises technologiques locales",
      "Lancer des services en français et en anglais",
      "Atteindre 100–500 clients régionaux et internationaux",
    ],
    markets: ["Sénégal", "Côte d'Ivoire", "Mali"],
    icon: "MapPin",
    color: "bg-primary",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    phase: "Phase 2",
    timeline: "2027 – 2028",
    title: "Présence Continentale",
    status: "Planifiée",
    description: "S'étendre à travers l'Afrique en mettant l'accent sur les marchés de l'Est et du Sud, établissant Lynxa Tech comme un leader technologique panafricain.",
    goals: [
      "Entrer sur 5 nouveaux marchés africains",
      "Lancer une plateforme d'intégration de mobile money",
      "Établir des laboratoires d'innovation dans 3 pays",
      "Atteindre 500+ clients continentaux",
    ],
    markets: ["Kenya", "Nigeria", "Ghana", "Afrique du Sud", "Maroc"],
    icon: "Globe",
    color: "bg-accent",
    statusColor: "bg-yellow-50 text-yellow-600",
  },
  {
    phase: "Phase 3",
    timeline: "2028 – 2030",
    title: "Reconnaissance Globale",
    status: "Vision",
    description: "Obtenir une reconnaissance internationale en tant qu'entreprise technologique leader d'Afrique, en concurrence mondiale tout en conservant nos racines africaines.",
    goals: [
      "IPO ou opportunité d'acquisition majeure",
      "Clients Fortune 500 à l'international",
      "Prix internationaux d'innovation",
      "1000+ employés à travers les continents",
    ],
    markets: ["Europe", "Amérique du Nord", "Asie", "Moyen-Orient"],
    icon: "Trophy",
    color: "bg-success",
    statusColor: "bg-gray-100 text-gray-500",
  },
];

const VISION_PILLARS = [
  { icon: "Rocket",    title: "Leadership en Innovation",    description: "Devenir l'entreprise technologique la plus innovante d'Afrique, définissant les standards pour l'industrie tech mondiale." },
  { icon: "Users",     title: "Développement des Talents",  description: "Créer 1000+ emplois technologiques de qualité et former 10 000+ développeurs à travers l'Afrique d'ici 2030." },
  { icon: "Building",  title: "Construction d'Écosystème",  description: "Établir des hubs technologiques et des centres d'innovation qui nourrissent la prochaine génération d'entrepreneurs africains." },
  { icon: "Handshake", title: "Partenariats Globaux",       description: "Former des alliances stratégiques avec des géants technologiques internationaux tout en conservant notre identité africaine." },
];

const IMPACT_METRICS = [
  { current: "7+",  target: "25+",  label: "Membres de l'équipe", icon: "Users" },
  { current: "1",   target: "20+",  label: "Pays",                icon: "MapPin" },
  { current: "6+",  target: "500+", label: "Clients",             icon: "Briefcase" },
  { current: "0+",  target: "1K+",  label: "Vies impactées",      icon: "Heart" },
];

const VisionRoadmap = () => (
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
          <Icon name="Rocket" size={16} />
          <span>Feuille de route</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
          Vision 2030 : Construire l'avenir technologique de l'Afrique
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Notre feuille de route stratégique pour devenir l'entreprise technologique leader en Afrique
        </p>
      </motion.div>

      {/* Vision quote */}
      <motion.div
        className="bg-gradient-to-br from-secondary to-primary/80 rounded-2xl p-8 text-white mb-14 text-center"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-heading font-bold mb-4">Notre Vision</h3>
        <blockquote className="text-lg italic max-w-4xl mx-auto text-white/90 leading-relaxed">
          « Être le pont qui relie l'expertise africaine aux opportunités mondiales, prouvant que des entreprises
          technologiques de classe mondiale peuvent émerger de n'importe où et concurrencer partout. »
        </blockquote>
      </motion.div>

      {/* Roadmap phases */}
      <div className="space-y-8 mb-14 relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20 z-0" />
        {ROADMAP_PHASES.map((phase, index) => (
          <motion.div
            key={index}
            className="flex flex-col lg:flex-row lg:items-start lg:gap-8 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mb-4 lg:mb-0 relative z-10">
              <motion.div
                className={`w-12 h-12 ${phase.color} rounded-full flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon name={phase.icon} size={22} color="white" />
              </motion.div>
              <div className="text-center mt-2">
                <div className="text-xs font-semibold text-primary">{phase.phase}</div>
                <div className="text-xs text-gray-400">{phase.timeline}</div>
              </div>
            </div>

            {/* Card */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="text-xl font-heading font-bold text-secondary">{phase.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${phase.statusColor}`}>
                  {phase.status}
                </span>
              </div>
              <p className="text-gray-500 mb-5 text-sm leading-relaxed">{phase.description}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-secondary mb-3 text-sm">Objectifs clés</h4>
                  <div className="space-y-2">
                    {phase.goals.map((goal, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-500">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-3 text-sm">Marchés cibles</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.markets.map((market, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">{market}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vision pillars */}
      <div className="mb-14">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-2">Les quatre piliers de notre vision</h3>
          <p className="text-gray-500 text-sm">Les éléments fondamentaux qui guideront notre succès</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {VISION_PILLARS.map((pillar, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-medium transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon name={pillar.icon} size={22} color="var(--color-primary)" />
              </motion.div>
              <h4 className="font-heading font-bold text-secondary mb-2 text-sm">{pillar.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Growth trajectory */}
      <motion.div
        className="bg-white rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-heading font-bold text-secondary mb-2">Trajectoire de croissance</h3>
          <p className="text-gray-500 text-sm">De notre situation actuelle à nos ambitions pour 2027</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_METRICS.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-gray-50 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={metric.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold text-gray-400">{metric.current}</div>
                <div className="text-xs text-gray-400">Actuel</div>
                <Icon name="ArrowDown" size={14} color="var(--color-primary)" className="mx-auto" />
                <div className="text-2xl font-bold text-primary">{metric.target}</div>
                <div className="text-xs text-gray-400">Objectif 2027</div>
              </div>
              <div className="text-xs font-semibold text-secondary mt-2">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default VisionRoadmap;
