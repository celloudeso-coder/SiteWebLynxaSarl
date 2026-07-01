import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import { useTeamMembers } from "../../../hooks/useContent";

const STATIC_TEAM = [
  {
    id: 1,
    name: "Elhadj Sadou Barry",
    role: "Responsable Développement Mobile",
    image: "/CellouK.png",
    expertise: ["Full-Stack", "Flutter", "Digital Forensics"],
    description: "Développeur mobile spécialisé en solutions multiplateformes.",
    achievements: ["Développeur Web Full-Stack", "Développeur Flutter"],
    social_links: { linkedin: "#", github: "https://github.com/D4wn-Light" },
  },
  {
    id: 2,
    name: "Mamadou Cellou Kanté",
    role: "CEO & Co-Fondateur",
    image: "/Cellou.png",
    expertise: ["Vision Produit", "Business Dev", "Stratégie Tech"],
    description: "Pilote la stratégie technique de Lynxa Tech.",
    achievements: ["Administrateur réseaux et systèmes", "Certifié Analyste Cybersécurité"],
    social_links: { linkedin: "https://www.linkedin.com/in/mamadou-cellou-kante", github: "#" },
  },
  {
    id: 3,
    name: "Aissatou Lamarana Diallo",
    role: "Responsable Solutions Digitales",
    image: "/lamarana.png",
    expertise: ["React", "Node.js", "Cloud"],
    description: "Pilote la stratégie digitale de Lynxa Tech.",
    achievements: ["Architecte Solutions AWS", "Expert React"],
    social_links: { linkedin: "#" },
  },
  {
    id: 4,
    name: "Bandiougou Keita",
    role: "Responsable Services Réseaux",
    image: "/keita.jpg",
    expertise: ["Cisco", "Cybersécurité", "VMware"],
    description: "Supervise les infrastructures réseau clients.",
    achievements: ["Administrateur réseaux", "Certifié CCNP"],
    social_links: { linkedin: "#" },
  },
];

const SkeletonCard = () => (
  <div className="bg-gray-50 rounded-2xl p-6 animate-pulse space-y-4 flex-shrink-0 w-[280px] snap-start">
    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto" />
    <div className="h-4 bg-gray-200 rounded-full w-3/4 mx-auto" />
    <div className="h-3 bg-gray-100 rounded-full w-1/2 mx-auto" />
    <div className="flex gap-2 justify-center flex-wrap">
      <div className="h-5 w-16 bg-gray-100 rounded-full" />
      <div className="h-5 w-20 bg-gray-100 rounded-full" />
    </div>
  </div>
);

const TeamSpotlight = () => {
  const { data: cmsTeam, loading } = useTeamMembers();
  const allMembers =
    cmsTeam && cmsTeam.length > 0
      ? cmsTeam.map((m) => ({ ...m, image: m.image_url }))
      : STATIC_TEAM;
  const teamMembers = allMembers;

  const scrollRef = useRef(null);
  const pausedRef = useRef(false);   // pause temporaire (survol / interaction)
  const dragRef = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  // Défilement automatique + support du défilement manuel (molette, trackpad, drag, tactile)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || loading || teamMembers.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let resumeTimer;

    const step = () => {
      const half = el.scrollWidth / 2;
      if (!reduceMotion && !pausedRef.current && !dragRef.current.down) {
        el.scrollLeft += 0.5;
      }
      // Boucle sans couture : le contenu est dupliqué, on revient au début après une copie
      if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pauseTemporarily = () => {
      pausedRef.current = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { pausedRef.current = false; }, 1500);
    };
    const onEnter = () => { pausedRef.current = true; clearTimeout(resumeTimer); };
    const onLeave = () => { pausedRef.current = false; };

    // Glisser-déposer à la souris (le tactile utilise le scroll natif)
    const onPointerDown = (e) => {
      if (e.pointerType !== "mouse") return;
      dragRef.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
      el.style.cursor = "grabbing";
    };
    const onPointerMove = (e) => {
      if (!dragRef.current.down) return;
      const dx = e.clientX - dragRef.current.startX;
      if (Math.abs(dx) > 3) {
        dragRef.current.moved = true;
        el.setPointerCapture?.(e.pointerId);
      }
      el.scrollLeft = dragRef.current.startScroll - dx;
    };
    const onPointerUp = (e) => {
      if (!dragRef.current.down) return;
      dragRef.current.down = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = "grab";
      pauseTemporarily();
    };
    // Empêche l'ouverture d'un lien si l'utilisateur a fait glisser
    const onClickCapture = (e) => {
      if (dragRef.current.moved) {
        e.preventDefault();
        e.stopPropagation();
        dragRef.current.moved = false;
      }
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("wheel", pauseTemporarily, { passive: true });
    el.addEventListener("touchstart", pauseTemporarily, { passive: true });
    el.addEventListener("touchend", pauseTemporarily, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("wheel", pauseTemporarily);
      el.removeEventListener("touchstart", pauseTemporarily);
      el.removeEventListener("touchend", pauseTemporarily);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [loading, teamMembers.length]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Users" size={16} />
            <span>L'équipe</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Rencontrez notre équipe d'experts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des professionnels talentueux de Guinée capables d'offrir des solutions de classe mondiale
          </p>
        </motion.div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="relative group">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto cursor-grab select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <div
                  key={index}
                  aria-hidden={index >= teamMembers.length}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-medium hover:-translate-y-1 transition-all duration-300 flex-shrink-0 w-[280px] mr-6"
                >
                  {/* Avatar */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20">
                      <Image
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-base font-heading font-bold text-secondary mb-0.5">{member.name}</h3>
                    <p className="text-primary font-medium text-xs mb-3">{member.role}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{member.description}</p>
                  </div>

                  {/* Expertise tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {member.expertise?.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {member.achievements?.length > 0 && (
                    <div className="mb-4 space-y-1">
                      {member.achievements.slice(0, 2).map((achievement, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <Icon name="Award" size={11} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-500 leading-snug">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Social links */}
                  <div className="flex justify-center gap-2 pt-2 border-t border-gray-100">
                    {(member.social_links?.linkedin || member.social?.linkedin) && (
                      <a
                        href={member.social_links?.linkedin || member.social?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors duration-200"
                      >
                        <Icon name="Linkedin" size={14} />
                      </a>
                    )}
                    {(member.social_links?.github || member.social?.github) && (
                      <a
                        href={member.social_links?.github || member.social?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors duration-200"
                      >
                        <Icon name="Github" size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSpotlight;
