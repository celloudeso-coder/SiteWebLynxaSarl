import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import { getAboutFounder } from "../../../lib/cms";

const STATIC_FOUNDER = {
  name: "Mamadou Cellou Kante",
  title: "Fondateur & CEO",
  image: "/Cellou.png",
  linkedinUrl: "https://www.linkedin.com/in/mamadou-cellou-kante",
  quote: `« Je m'appelle Mamadou Cellou Kante. J'aurais pu choisir la France, les États-Unis ou d'autres pays où l'informatique est plus avancée et davantage valorisée, comme l'ont fait beaucoup de mes promotionnaires. Mais j'ai décidé de rester en Guinée. Pourquoi ? Parce que je crois que la prochaine grande vague d'innovation viendra d'Afrique. »`,
  story: [
    "Né à Kamsar et diplômé en informatique à l'IPG-ISTI de Dakar. Administrateur réseaux et systèmes, certifié en cybersécurité, j'ai eu l'opportunité de travailler sur plusieurs projets d'infrastructure et de solutions technologiques pour des entreprises privées.",
    "Ces expériences m'ont permis de constater une réalité frappante : malgré leur expertise et leur créativité, les talents africains restent trop souvent sous-évalués sur la scène internationale.",
    "C'est de ce constat qu'est née cette vision. Avec LYNXA Tech, mon ambition est claire : créer un pont entre l'innovation africaine et les opportunités mondiales.",
  ],
  tags: ["Administrateur Réseaux & Systèmes", "Certifié Cybersécurité", "Entrepreneur Tech"],
};

const FounderStory = () => {
  const [founderData, setFounderData] = useState(STATIC_FOUNDER);

  useEffect(() => {
    getAboutFounder()
      .then((d) => { if (d) setFounderData(d); })
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
            <Icon name="User" size={16} />
            <span>Le fondateur</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Le parcours de l'un des fondateurs de Lynxa Tech
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rencontrez un visionnaire qui a choisi de construire l'avenir depuis la Guinée
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — image + badge */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl glow-orange max-w-sm mx-auto lg:mx-0">
              <Image
                src={founderData.image}
                alt={founderData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 lg:right-auto lg:-right-4 bg-primary text-white px-4 py-3 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
            >
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={18} />
                <p className="text-sm font-semibold">Conakry, Guinée</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — story */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-secondary mb-1">{founderData.name}</h3>
              <p className="text-primary font-medium mb-5">{founderData.title}</p>
              <blockquote className="text-base text-gray-700 italic border-l-4 border-primary pl-5 leading-relaxed">
                {founderData.quote}
              </blockquote>
            </div>

            <div className="space-y-4">
              {(founderData.story || []).map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-gray-500 leading-relaxed text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {(founderData.tags || []).map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={founderData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm glow-orange"
              >
                <Icon name="Linkedin" size={16} />
                Profil LinkedIn
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-200 text-secondary hover:border-primary hover:text-primary font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm"
              >
                <Icon name="MessageCircle" size={16} />
                Nous écrire
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
