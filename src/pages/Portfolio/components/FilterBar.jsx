import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { getPortfolioFilterOptions } from "../../../lib/cms";

const STATIC_SERVICES = [
  "Tous",
  "Mobile Development",
  "Network Infrastructure",
  "Web Development",
  "Cybersecurity",
];

const STATIC_INDUSTRIES = [
  "Tous",
  "Financial Services",
  "Healthcare",
  "Government",
  "NGO",
  "Education",
  "Retail",
];

const FilterBar = ({
  activeService,
  setActiveService,
  activeIndustry,
  setActiveIndustry,
  searchTerm,
  setSearchTerm,
  onClearFilters,
}) => {
  const [services, setServices]     = useState(STATIC_SERVICES);
  const [industries, setIndustries] = useState(STATIC_INDUSTRIES);

  useEffect(() => {
    getPortfolioFilterOptions()
      .then((opts) => {
        if (opts?.services?.length)   setServices(opts.services);
        if (opts?.industries?.length) setIndustries(opts.industries);
      })
      .catch(() => {});
  }, []);

  const hasActive =
    activeService !== "Tous" || activeIndustry !== "Tous" || searchTerm;

  return (
    <div className="mb-10 space-y-5">
      {/* Search */}
      <div className="relative max-w-lg">
        <Icon
          name="Search"
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un projet…"
          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
        />
      </div>

      {/* Service tabs */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Service
        </p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <motion.button
              key={s}
              onClick={() => setActiveService(s)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border
                ${
                  activeService === s
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-secondary border-border hover:border-primary/50"
                }`}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Industry tabs */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Industrie
        </p>
        <div className="flex flex-wrap gap-2">
          {industries.map((ind) => (
            <motion.button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border
                ${
                  activeIndustry === ind
                    ? "bg-secondary text-white border-secondary"
                    : "bg-white text-secondary border-border hover:border-secondary/50"
                }`}
            >
              {ind}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      <AnimatePresence>
        {hasActive && (
          <motion.button
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
          >
            <Icon name="X" size={14} />
            Réinitialiser les filtres
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;
