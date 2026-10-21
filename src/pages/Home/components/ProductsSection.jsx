import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

// Produits édités par Lynxa Tech (textes validés, à ne pas reformuler).
const KONTA_URL = "https://konta.lynxatech.com";

const PRODUCTS = [
  {
    name: "KONTA",
    text: "KONTA, logiciel de comptabilité conçu pour les PME guinéennes, avec le plan comptable SYSCOHADA intégré, la partie double contrôlée, un journal numéroté en continu, et la clôture et les à nouveaux automatiques. En production, premier client payant.",
    actions: true,
  },
  {
    name: "DJODDI",
    text: "DJODDI, solution de paie et de gestion des ressources humaines. En phase de recherche.",
    actions: false,
  },
];

const ProductsSection = () => (
  <section className="py-20 bg-surface">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-12 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Nos produits
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-6">
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.name}
            className="bg-white rounded-2xl p-8 shadow-soft border border-border flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="text-2xl font-heading font-bold text-secondary mb-3">{product.name}</h3>
            <p className="text-gray-600 leading-relaxed flex-1">{product.text}</p>
            {product.actions && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href={KONTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 min-h-11 rounded-xl font-semibold transition-colors"
                >
                  Découvrir KONTA
                  <Icon name="ExternalLink" size={16} color="var(--color-primary-foreground)" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-border text-secondary hover:border-primary hover:text-primary px-6 py-3 min-h-11 rounded-xl font-semibold transition-colors"
                >
                  Demander une démonstration
                </Link>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
