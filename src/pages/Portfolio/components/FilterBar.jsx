import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const FilterBar = ({
  activeService,
  setActiveService,
  activeIndustry,
  setActiveIndustry,
  activeScale,
  setActiveScale,
  searchTerm,
  setSearchTerm,
  onClearFilters,
}) => {
  const services = [
    "Tous",
    "Développement Mobile",
    "Infrastructure Réseau",
    "Développement Web",
    "Cybersécurité",
  ];
  const industries = [
    "Tous",
    "Services Financiers",
    "Santé",
    "Gouvernement",
    "ONG",
    "Éducation",
    "Commerce de Détail",
  ];
  const scales = ["Tous", "Entreprise", "Moyenne", "Petite"];

  const hasActiveFilters =
    activeService !== "Tous" ||
    activeIndustry !== "Tous" ||
    activeScale !== "Tous" ||
    searchTerm;

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filtre de Service */}
          <div className="min-w-48">
            <label className="block text-sm font-medium text-secondary mb-2">
              Type de Service
            </label>
            <select
              value={activeService}
              onChange={(e) => setActiveService(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            >
              {services?.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre d'Industrie */}
          <div className="min-w-40">
            <label className="block text-sm font-medium text-secondary mb-2">
              Industrie
            </label>
            <select
              value={activeIndustry}
              onChange={(e) => setActiveIndustry(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            >
              {industries?.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre d'Échelle */}
          <div className="min-w-32">
            <label className="block text-sm font-medium text-secondary mb-2">
              Échelle
            </label>
            <select
              value={activeScale}
              onChange={(e) => setActiveScale(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            >
              {scales?.map((scale) => (
                <option key={scale} value={scale}>
                  {scale}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="shrink-0"
          >
            Réinitialiser les Filtres
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
