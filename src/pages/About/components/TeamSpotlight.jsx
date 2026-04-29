import React from "react";
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
  <div className="bg-gray-50 rounded-2xl p-6 animate-pulse space-y-4">
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
  const teamMembers = allMembers.slice(0, 4);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? [0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-medium transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
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
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSpotlight;
