import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { useSiteSettings, useHeroSection } from "../../../hooks/useContent";

const FALLBACK = {
  phone: "+224 621 724 657",
  email: "contact@lynxatech.com",
  address: "Conakry, République de Guinée",
  hours: "Lun-Ven 8h-18h · Sam 9h-14h",
};

const ContactHero = () => {
  const { data: settings } = useSiteSettings();
  const { data: cmsHero } = useHeroSection("contact");

  const contact = { ...FALLBACK, ...(settings?.contact || {}) };
  const title   = cmsHero?.title    ?? "Parlons de votre projet";
  const subtitle = cmsHero?.subtitle ?? "Toujours à votre écoute";
  const desc    = cmsHero?.description ?? "Discutons de vos besoins technologiques. Notre équipe vous répond sous 24h, en français ou en anglais.";

  const infoItems = [
    { icon: "Phone",   label: "Téléphone",  value: contact.phone,   href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: "Mail",    label: "Email",      value: contact.email,   href: `mailto:${contact.email}` },
    { icon: "MapPin",  label: "Adresse",    value: contact.address, href: null },
    { icon: "Clock",   label: "Horaires",   value: contact.hours,   href: null },
  ];

  return (
    <section className="relative bg-gradient-to-br from-secondary via-gray-900 to-primary/30 text-white overflow-hidden">
      {/* Blobs décoratifs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Colonne gauche — texte */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm mb-8"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              🇬🇳 Basé à Conakry · Disponible maintenant
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
              {subtitle}
              <span className="block text-gradient-orange mt-2">{title}</span>
            </h1>

            <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-xl">
              {desc}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              {[
                { icon: "Clock", text: "Réponse sous 24h" },
                { icon: "Globe", text: "FR · EN · Langues locales" },
                { icon: "Shield", text: "Confidentiel & sécurisé" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <Icon name={item.icon} size={16} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Colonne droite — carte infos */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-5">
              <h2 className="text-lg font-semibold text-white mb-6">
                Nos coordonnées
              </h2>
              {infoItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={item.icon} size={18} color="#FF8C00" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;
