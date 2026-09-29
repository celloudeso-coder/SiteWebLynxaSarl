import React from "react";
import Icon from "./AppIcon";

// Affiché quand le contenu d'une section ne peut pas être chargé depuis le
// CMS. On n'affiche jamais de contenu de remplacement : un article, un
// membre de l'équipe, un engagement ou un chiffre qui n'est pas dans le CMS
// ne doit pas être publié, même pendant une panne.
// `compact` : pour un bloc à l'intérieur d'une section existante.
const SectionLoadError = ({ title, compact = false }) => {
  const body = (
    <div className={`${compact ? "max-w-xl" : "max-w-3xl px-4 sm:px-6 lg:px-8"} mx-auto text-center`}>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
        <Icon name="AlertCircle" size={22} color="#6b7280" />
      </div>
      {compact
        ? <h3 className="text-lg font-heading font-semibold text-secondary mb-2">{title}</h3>
        : <h2 className="text-xl font-heading font-semibold text-secondary mb-2">{title}</h2>}
      <p className="text-gray-600" role="status">
        Ce contenu ne peut pas être chargé pour le moment. Réessayez dans quelques instants.
      </p>
    </div>
  );
  return compact ? <div className="py-8">{body}</div> : <section className="py-12 bg-white">{body}</section>;
};

export default SectionLoadError;
