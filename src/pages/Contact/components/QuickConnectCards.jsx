import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { useSiteSettings } from "../../../hooks/useContent";

const QuickConnectCards = () => {
  const { data: settings } = useSiteSettings();
  const phone   = settings?.contact?.phone   || "+224 621 724 657";
  const email   = settings?.contact?.email   || "contact@lynxatech.com";
  const rawPhone = phone.replace(/\s/g, "");

  const options = [
    {
      id: 1,
      title: "WhatsApp Business",
      description: "Messagerie instantanée pour des discussions rapides et des demandes de projet.",
      icon: "MessageSquare",
      action: "Discuter maintenant",
      contact: phone,
      color: "bg-green-500",
      popular: true,
      href: `https://wa.me/${rawPhone.replace("+", "")}?text=Bonjour ! Je suis intéressé par vos services.`,
      external: true,
    },
    {
      id: 2,
      title: "Appel Direct",
      description: "Parlez directement avec un consultant technique de l'équipe.",
      icon: "Phone",
      action: "Appeler maintenant",
      contact: phone,
      color: "bg-blue-500",
      popular: false,
      href: `tel:${rawPhone}`,
      external: false,
    },
    {
      id: 3,
      title: "Support Email",
      description: "Discussions détaillées de projet et communications formelles.",
      icon: "Mail",
      action: "Envoyer un email",
      contact: email,
      color: "bg-red-500",
      popular: false,
      href: `mailto:${email}?subject=Demande de projet&body=Bonjour l'équipe Lynxa Tech,%0D%0A%0D%0AJe souhaite discuter d'un projet avec vous.`,
      external: false,
    },
    {
      id: 4,
      title: "Consultation Gratuite",
      description: "Réservez une session de 30 min avec nos experts pour votre projet.",
      icon: "Calendar",
      action: "Contacter par WhatsApp",
      contact: "30 min offertes",
      color: "bg-orange-500",
      popular: false,
      href: `https://wa.me/${rawPhone.replace("+", "")}?text=Bonjour ! Je souhaite planifier une consultation gratuite.`,
      external: true,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Choisissez votre mode de contact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous comprenons que chaque projet est unique. Choisissez le canal
            qui vous convient le mieux.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {options.map((option) => (
            <motion.a
              key={option.id}
              href={option.href}
              target={option.external ? "_blank" : "_self"}
              rel={option.external ? "noopener noreferrer" : undefined}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 group flex flex-col items-center text-center border border-transparent hover:border-primary/30"
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div
                className={`inline-flex items-center justify-center w-16 h-16 ${option.color} rounded-2xl mb-4 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
              >
                <Icon name={option.icon} size={28} color="white" />
              </div>

              <h3 className="text-lg font-heading font-semibold text-secondary mb-1.5">
                {option.title}
              </h3>

              <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors break-words">
                {option.contact}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-white px-4 py-2 rounded-full shadow-soft">
            <Icon name="Shield" size={16} />
            <span>Toutes nos communications sont sécurisées et confidentielles.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickConnectCards;
