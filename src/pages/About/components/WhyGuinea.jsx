import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import SectionLoadError from "../../../components/SectionLoadError";
import { useAboutAdvantages, useAboutEcosystemStats } from "../../../hooks/useContent";

const WhyGuinea = () => {
  // Avantages et statistiques : uniquement depuis le CMS. Bloc masqué si
  // vide ; message honnête si le chargement échoue.
  const advantagesState = useAboutAdvantages();
  const statsState = useAboutEcosystemStats();
  const advantages = advantagesState.data;
  const ecosystemStats = statsState.data;

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
            <Icon name="MapPin" size={16} />
            <span>Guinée</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Pourquoi la Guinée ? Pourquoi maintenant ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les avantages uniques qui font de la Guinée la base idéale pour créer des solutions technologiques de classe mondiale
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          className="mb-16 rounded-2xl overflow-hidden h-64 md:h-80 relative"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/aboutpole.png"
            alt="Pôle d'innovation Conakry"
            className="w-full h-full object-cover"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-primary/60 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">Pôle d'innovation de l'Afrique de l'Ouest</h3>
              <p className="text-lg text-white/90">Conakry, Guinée – Où les standards mondiaux rencontrent l'innovation locale</p>
            </div>
          </div>
        </motion.div>

        {/* Advantages grid */}
        {advantagesState.error && <SectionLoadError compact title="Pourquoi la Guinée ?" />}
        {advantages.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.id || index}
                className="bg-white rounded-2xl p-6 hover:shadow-medium transition-shadow duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon name={advantage.icon} size={22} color="var(--color-primary)" />
                  </motion.div>
                  <div>
                    <h3 className="font-heading font-bold text-secondary text-sm">{advantage.title}</h3>
                    <p className="text-xs text-primary font-medium">{advantage.stats}</p>
                    {advantage.source && (
                      <p className="text-[10px] text-gray-400 mt-0.5">Source : {advantage.source}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Ecosystem stats */}
        {statsState.error && <SectionLoadError compact title="L'écosystème technologique en pleine expansion" />}
        {ecosystemStats.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl p-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-secondary mb-2">L'écosystème technologique en pleine expansion</h3>
              <p className="text-gray-500 text-sm">Indicateurs clés de la transformation numérique en Guinée</p>
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
              {ecosystemStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-5 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name={stat.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div className="text-2xl font-bold text-secondary mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                  {stat.source && (
                    <div className="text-[10px] text-gray-400">Source : {stat.source}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Map + text */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">Hub stratégique en Afrique de l'Ouest</h3>
            <p className="text-gray-500 mb-6 leading-relaxed text-sm">
              La position de la Guinée offre un accès inégalé au marché ouest-africain tout en maintenant de solides
              connexions avec l'Europe et les Amériques.
            </p>
            <div className="space-y-4">
              {[
                { icon: "Plane",      text: "6 heures de vol vers l'Europe" },
                { icon: "Globe",      text: "Porte d'accès à un marché CEDEAO de plus de 400M de personnes" },
                { icon: "Languages",  text: "Français, anglais et langues locales" },
                { icon: "Handshake",  text: "Solides relations commerciales à travers les régions" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Icon name={item.icon} size={18} color="var(--color-primary)" />
                  <span className="text-gray-500 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-4 shadow-soft"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Guinea Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=9.6412,-13.5784&z=8&output=embed"
                className="border-0"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="font-heading font-semibold text-secondary text-sm">République de Guinée</h4>
              <p className="text-xs text-gray-500">La porte d'entrée de l'innovation en Afrique de l'Ouest</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="bg-gradient-to-br from-secondary to-primary/80 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-heading font-bold mb-4">Prêt à découvrir l'avantage de la Guinée ?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto text-sm">
            Rejoignez le nombre croissant de clients de Lynxa Tech.
          </p>
          <Link to="/contact">
            <motion.span
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-white/90 font-semibold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm"
            >
              <Icon name="MessageCircle" size={16} />
              Commencer une conversation
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyGuinea;
