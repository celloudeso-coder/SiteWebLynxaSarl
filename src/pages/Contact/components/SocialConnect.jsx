import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { useSiteSettings } from "../../../hooks/useContent";
import { subscribeNewsletter } from "../../../lib/cms";

const SocialConnect = () => {
  const { data: settings } = useSiteSettings();
  const social = settings?.social || {};

  const platforms = [
    {
      name: "LinkedIn",
      icon: "Linkedin",
      handle: "@LynxaTechGuinea",
      description: "Actualités professionnelles, insights sectoriels et nouvelles de l'entreprise.",
      color: "bg-blue-600",
      url: social.linkedin || "https://linkedin.com/company/lynxatech",
    },
    {
      name: "X / Twitter",
      icon: "Twitter",
      handle: "@LynxaTechGuinea",
      description: "Mises à jour en temps réel, discussions tech et annonces rapides.",
      color: "bg-gray-900",
      url: social.twitter || "https://twitter.com/LynxaTechGuinea",
    },
    {
      name: "Facebook",
      icon: "Facebook",
      handle: "@LynxaTechGuinea",
      description: "Contenu backstage, culture d'équipe et présentations de projets.",
      color: "bg-blue-700",
      url: social.facebook || "https://facebook.com/LynxaTechGuinea",
    },
  ];

  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [subStatus, setSubStatus] = useState(null); // "success" | "error"

  const handleNewsletter = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email);
      setSubStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Newsletter erreur :", err);
      setSubStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez notre parcours et restez informé de l'innovation technologique africaine.
          </p>
        </motion.div>

        {/* Social icons — modernes, sans texte */}
        <div className="flex justify-center items-center gap-5 sm:gap-6 mb-16">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} — ${p.handle}`}
              title={`${p.name} · ${p.handle}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${p.color} text-white flex items-center justify-center shadow-soft hover:shadow-medium transition-shadow duration-300`}
            >
              <Icon name={p.icon} size={26} color="white" />
            </motion.a>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          className="bg-gradient-to-br from-secondary via-gray-800 to-secondary rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <Icon name="Mail" size={26} color="white" />
            </div>

            <h3 className="text-2xl font-heading font-bold mb-3">
              Restez informé avec notre newsletter
            </h3>
            <p className="text-white/80 mb-7 leading-relaxed">
              Recevez les dernières actualités sur l'innovation tech en Afrique, nos projets
              et les tendances du secteur. Pas de spam, juste du contenu de valeur.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-describedby={subStatus ? "newsletter-status" : undefined}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubStatus(null); }}
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <motion.button
                onClick={handleNewsletter}
                disabled={loading || !email}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-semibold px-6 py-3 min-h-11 rounded-xl transition-all duration-200 glow-orange flex items-center gap-2 justify-center"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <Icon name="ArrowRight" size={16} />
                )}
                Souscrire
              </motion.button>
            </div>

            {subStatus === "success" && (
              <motion.p
                id="newsletter-status"
                role="status"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-green-400 mt-4 text-sm"
              >
                Inscription réussie ! Merci de nous rejoindre.
              </motion.p>
            )}
            {subStatus === "error" && (
              <motion.p
                id="newsletter-status"
                role="alert"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-red-400 mt-4 text-sm"
              >
                Une erreur s'est produite. Réessayez dans un instant.
              </motion.p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 mt-7 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={14} />
                <span>Vie privée protégée</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={14} />
                <span>Mises à jour hebdomadaires</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="XCircle" size={14} />
                <span>Désabonnement à tout moment</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialConnect;
