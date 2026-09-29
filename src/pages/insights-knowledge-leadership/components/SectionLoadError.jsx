import React from "react";
import Icon from "../../../components/AppIcon";

// Affiché quand le contenu d'une section ne peut pas être chargé depuis le
// CMS. On n'affiche jamais de contenu de remplacement : un article, une
// conférence ou un rapport qui n'existe pas ne doit pas être publié, même
// pendant une panne.
const SectionLoadError = ({ title }) => (
  <section className="py-12 bg-white">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
        <Icon name="AlertCircle" size={22} color="#6b7280" />
      </div>
      <h2 className="text-xl font-heading font-semibold text-secondary mb-2">{title}</h2>
      <p className="text-gray-600" role="status">
        Ce contenu ne peut pas être chargé pour le moment. Réessayez dans quelques instants.
      </p>
    </div>
  </section>
);

export default SectionLoadError;
