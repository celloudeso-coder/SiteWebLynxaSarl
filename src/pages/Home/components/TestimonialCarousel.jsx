import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Mamadou Diallo",
      position: "PDG, GuineaTech Solutions",
      company: "Entreprise Guinéenne Locale",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      content: `Lynxa Tech a transformé notre entreprise avec une application mobile qui a augmenté l'engagement client de 300%. Leur compréhension du marché local combinée à des normes de qualité internationales est inégalée en Guinée.`,
      project: "Développement d'Application Mobile",
      result: "Augmentation de 300% de l'engagement client",
      location: "Conakry, Guinée",
      flag: "🇬🇳",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Directrice de Programme",
      company: "ONG Internationale",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      content: `Travailler avec Lynxa Tech a été exceptionnel. Ils ont déployé une infrastructure réseau complète sur 15 sites en Guinée, garantissant une connectivité fiable pour nos opérations humanitaires. Leur expertise technique et leur compréhension culturelle ont fait la différence.`,
      project: "Infrastructure Réseau",
      result: "Disponibilité de 99.9% sur 15 sites",
      location: "Opérations Internationales",
      flag: "🌍",
    },
    {
      id: 3,
      name: "Dr. Alpha Condé",
      position: "Directeur IT",
      company: "Université de Conakry",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 5,
      content: `Les solutions de cybersécurité mises en œuvre par Lynxa Tech ont protégé notre institution contre de multiples menaces. Leur surveillance 24/7 et leurs capacités de réponse rapide nous donnent une tranquillité d'esprit totale.`,
      project: "Implémentation de Cybersécurité",
      result: "Aucune violation de sécurité depuis 2 ans",
      location: "Conakry, Guinée",
      flag: "🇬🇳",
    },
    {
      id: 4,
      name: "Marie Camara",
      position: "Fondatrice",
      company: "Guinea E-commerce Hub",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      content: `Notre plateforme e-commerce construite par Lynxa Tech a généré plus de 50 000 $ de revenus mensuels. Leur expertise en développement web et leur compréhension des systèmes de paiement africains ont été cruciales pour notre succès.`,
      project: "Plateforme E-commerce",
      result: "Plus de 50K $ de revenus mensuels",
      location: "Conakry, Guinée",
      flag: "🇬🇳",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials?.length) % testimonials?.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentData = testimonials?.[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6">
            Histoires{" "}
            <span className="text-gradient-orange">Reussite Client</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Écoutez les entreprises de toute la Guinée et les organisations
            internationales qui ont transformé leurs opérations avec nos
            solutions technologiques.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-large p-8 lg:p-12 border border-border">
            {/* Quote Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow-orange">
                <Icon name="Quote" size={28} color="white" />
              </div>
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(currentData?.rating)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={24}
                  className="text-yellow-400 fill-current"
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-xl lg:text-2xl text-secondary text-center leading-relaxed mb-8 font-medium">
              "{currentData?.content}"
            </blockquote>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-surface rounded-xl p-4 text-center">
                <Icon
                  name="Briefcase"
                  size={20}
                  className="text-primary mx-auto mb-2"
                />
                <p className="text-sm text-muted-foreground mb-1">
                  Project Type
                </p>
                <p className="font-medium text-secondary">
                  {currentData?.project}
                </p>
              </div>
              <div className="bg-surface rounded-xl p-4 text-center">
                <Icon
                  name="TrendingUp"
                  size={20}
                  className="text-green-500 mx-auto mb-2"
                />
                <p className="text-sm text-muted-foreground mb-1">Key Result</p>
                <p className="font-medium text-secondary">
                  {currentData?.result}
                </p>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center justify-center space-x-4">
              <Image
                src={currentData?.avatar}
                alt={currentData?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div className="text-center">
                <h4 className="font-heading font-bold text-secondary text-lg">
                  {currentData?.name}
                </h4>
                <p className="text-primary font-medium">
                  {currentData?.position}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentData?.company}
                </p>
                <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1 mt-1">
                  <span>{currentData?.flag}</span>
                  <span>{currentData?.location}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-medium hover:shadow-large transition-all duration-300 flex items-center justify-center group border border-border"
            aria-label="Previous testimonial"
          >
            <Icon
              name="ChevronLeft"
              size={20}
              className="text-secondary group-hover:text-primary transition-colors duration-200"
            />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-medium hover:shadow-large transition-all duration-300 flex items-center justify-center group border border-border"
            aria-label="Next testimonial"
          >
            <Icon
              name="ChevronRight"
              size={20}
              className="text-secondary group-hover:text-primary transition-colors duration-200"
            />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? "bg-primary scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isAutoPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm text-muted-foreground">
            {isAutoPlaying ? "Auto-playing" : "Paused"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
