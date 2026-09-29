import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import SectionLoadError from "../../../components/SectionLoadError";
import { useTrustSecurityItems, useTrustCommitmentItems } from "../../../hooks/useContent";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

const normalize = (item) => ({ ...item, desc: item.description ?? item.desc ?? "" });

const TrustSignals = () => {
  // Engagements de sécurité et contractuels : uniquement depuis le CMS.
  // Bloc masqué si vide ; message honnête si le chargement échoue.
  const securityState = useTrustSecurityItems();
  const commitmentsState = useTrustCommitmentItems();
  const security = securityState.data.map(normalize);
  const commitments = commitmentsState.data.map(normalize);

  return (
  <section className="py-20 bg-surface">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
          Votre confiance est notre priorité
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Nous respectons les normes les plus élevées en matière de sécurité, de
          conformité et d'intégrité professionnelle.
        </p>
      </motion.div>

      {/* Sécurité */}
      {securityState.error && <SectionLoadError compact title="Sécurité & Protection des données" />}
      {security.length > 0 && (
        <div className="mb-14">
          <motion.h3
            className="text-xl font-heading font-bold text-secondary mb-8 text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Sécurité & Protection des données
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {security.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={20} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1.5">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Engagements légaux */}
      {commitmentsState.error && <SectionLoadError compact title="Engagements légaux & contractuels" />}
      {commitments.length > 0 && (
        <div className="mb-14">
          <motion.h3
            className="text-xl font-heading font-bold text-secondary mb-8 text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Engagements légaux & contractuels
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-5">
            {commitments.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1.5">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Garantie */}
      <motion.div
        className="bg-gradient-to-r from-primary to-accent rounded-2xl p-10 text-white text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Icon name="ShieldCheck" size={40} color="white" />
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
          Garantie Satisfaction 100 %
        </h3>
        <p className="text-lg mb-7 opacity-90 max-w-2xl mx-auto">
          Nous nous engageons à vos côtés : avec votre collaboration et nos efforts, nous
          assurons des résultats à la hauteur de vos attentes. Si ce n'est pas le cas, nous
          corrigeons immédiatement ou vous remboursons sous 30 jours.
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-white text-primary-strong px-8 py-3 min-h-11 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          <Icon name="MessageCircle" size={18} color="var(--color-primary)" />
          En savoir plus
        </motion.a>
      </motion.div>
    </div>
  </section>
  );
};

export default TrustSignals;
