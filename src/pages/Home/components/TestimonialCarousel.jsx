import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import { useTestimonials } from "../../../hooks/useContent";


const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const { data: cmsTestimonials, loading } = useTestimonials();

  const testimonials = (cmsTestimonials ?? []).map((t) => ({
    id: t.id,
    name: t.author_name,
    position: t.author_position,
    company: t.author_company,
    avatar: t.author_image,
    rating: t.rating ?? 5,
    content: t.quote,
    project: t.project_ref,
    result: t.result,
    location: "",
    flag: "",
  }));

  const total = testimonials.length;

  // All hooks must be declared before any early return
  useEffect(() => {
    if (!autoPlay || total === 0) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % total);
    }, 6000);
    return () => clearInterval(id);
  }, [autoPlay, total]);

  // Hidden while loading or when no testimonials have been added yet
  if (loading || total === 0) return null;

  function go(index) {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  }
  function next() { go((current + 1) % total); }
  function prev() { go((current - 1 + total) % total); }

  const t = testimonials[current];

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            <span>Témoignages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6">
            Histoires de{" "}
            <span className="text-gradient-orange">Réussite Client</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Écoutez les entreprises de Guinée et les organisations internationales qui ont transformé leurs opérations avec nos solutions.
          </p>
        </motion.div>

        {/* Main card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-large p-8 lg:p-12 border border-gray-100 overflow-hidden min-h-[420px] flex flex-col justify-between">
            {/* Quote icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow-orange">
                <Icon name="Quote" size={24} color="white" />
              </div>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex-1"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-5">
                  {[...Array(t.rating ?? 5)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-secondary text-center leading-relaxed mb-8 font-medium italic">
                  "{t.content}"
                </blockquote>

                {/* Project details */}
                {(t.project || t.result) && (
                  <div className={`grid grid-cols-1 ${t.project && t.result ? "md:grid-cols-2" : ""} gap-4 mb-8`}>
                    {t.project && (
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <Icon name="Briefcase" size={18} className="text-primary mx-auto mb-1.5" />
                        <p className="text-xs text-gray-400 mb-1">Type de projet</p>
                        <p className="font-semibold text-secondary text-sm">{t.project}</p>
                      </div>
                    )}
                    {t.result && (
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <Icon name="TrendingUp" size={18} className="text-emerald-500 mx-auto mb-1.5" />
                        <p className="text-xs text-gray-400 mb-1">Résultat clé</p>
                        <p className="font-semibold text-secondary text-sm">{t.result}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <div className="text-center">
                    <h4 className="font-heading font-bold text-secondary">{t.name}</h4>
                    <p className="text-primary font-medium text-sm">{t.position}</p>
                    <p className="text-xs text-gray-400">{t.company}</p>
                    {(t.flag || t.location) && (
                      <p className="text-xs text-gray-400 mt-0.5">{t.flag} {t.location}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-11 h-11 bg-white rounded-full shadow-medium hover:shadow-large border border-gray-100 flex items-center justify-center group transition-all duration-200"
            aria-label="Précédent"
          >
            <Icon name="ChevronLeft" size={18} className="text-secondary group-hover:text-primary transition-colors" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-11 h-11 bg-white rounded-full shadow-medium hover:shadow-large border border-gray-100 flex items-center justify-center group transition-all duration-200"
            aria-label="Suivant"
          >
            <Icon name="ChevronRight" size={18} className="text-secondary group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => go(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === current ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400 w-2.5"
              }`}
              aria-label={`Témoignage ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex items-center justify-center mt-4 gap-2">
          <div className={`w-2 h-2 rounded-full ${autoPlay ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
          <span className="text-xs text-gray-400">
            {autoPlay ? "Lecture automatique" : "En pause"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
