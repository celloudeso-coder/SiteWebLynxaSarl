import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { getInsightsCategories } from "../../../lib/cms";

const STATIC_CATEGORIES = [
  { id: "all",          label: "All Content",            icon: "Grid"       },
  { id: "cybersecurity",label: "Cybersecurity",          icon: "Shield"     },
  { id: "mobile",       label: "Mobile Innovation",      icon: "Smartphone" },
  { id: "network",      label: "Network Solutions",      icon: "Network"    },
  { id: "ecosystem",    label: "African Tech Ecosystem", icon: "Globe"      },
];

const ContentFilters = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const [categories, setCategories] = useState(STATIC_CATEGORIES);

  useEffect(() => {
    getInsightsCategories()
      .then((d) => { if (d?.length) setCategories(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
            Trouvez Votre{" "}
            <span className="text-gradient-orange">Expertise</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Filtrez notre contenu organisé par catégorie ou recherchez des
            sujets spécifiques pour trouver exactement ce dont vous avez besoin.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search insights, articles, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-primary rounded-lg"
            />
            <Icon
              name="Search"
              size={20}
              color="#6B7280"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              variant={activeCategory === category?.id ? "default" : "outline"}
              size="md"
              iconName={category?.icon}
              iconPosition="left"
              className={`px-6 py-3 font-medium transition-all duration-300 ${
                activeCategory === category?.id
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg transform scale-105"
                  : "text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
              }`}
            >
              {category?.label}
            </Button>
          ))}
        </div>

        {/* Active Filters Display */}
        {(searchQuery || activeCategory !== "all") && (
          <div className="mt-6 flex flex-wrap items-center gap-2 justify-center">
            <span className="text-sm text-gray-500">Active filters:</span>
            {activeCategory !== "all" && (
              <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>
                  {categories?.find((c) => c?.id === activeCategory)?.label}
                </span>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="ml-2 hover:text-primary/70"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            )}
            {searchQuery && (
              <div className="flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-2 hover:text-accent/70"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            )}
            {(searchQuery || activeCategory !== "all") && (
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                Effacer tout
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentFilters;
