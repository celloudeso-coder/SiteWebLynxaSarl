import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import { useTeamMembers } from "../../../hooks/useContent";

const STATIC_EXTRA_MEMBERS = [
  {
    id: "extra-1",
    name: "Ramatoulaye Diallo",
    role: "Responsable des Affaires Financières",
    image: "",
    description: "Ramatoulaye Diallo est en charge de la gestion financière et administrative de Lynxa Tech.",
    expertise: [],
    achievements: [],
    social_links: { facebook: "#", linkedin: "#" },
  },
  {
    id: "extra-2",
    name: "Mohamed Dembele",
    role: "Responsable Marketing",
    image: "/Dembele.jpeg",
    description: "Mohamed Dembélé pilote la stratégie marketing et commerciale de Lynxa Tech.",
    expertise: [],
    achievements: [],
    social_links: { facebook: "#", linkedin: "#" },
  },
  {
    id: "extra-3",
    name: "Mamadou Moustapha Diallo",
    role: "Responsable Communication",
    image: "",
    description: "Moustapha Diallo est le garant de l'image et de l'identité visuelle de Lynxa Tech.",
    expertise: [],
    achievements: [],
    social_links: { facebook: "#", linkedin: "#" },
  },
];

const TeamSpotlight1 = () => {
  const navigate = useNavigate();
  const { data: cmsTeam } = useTeamMembers();

  const extraMembers =
    cmsTeam && cmsTeam.length > 4
      ? cmsTeam.slice(4).map((m) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          image: m.image_url,
          description: m.description,
          expertise: Array.isArray(m.expertise) ? m.expertise : [],
          achievements: Array.isArray(m.achievements) ? m.achievements : [],
          social_links: m.social_links || {},
        }))
      : STATIC_EXTRA_MEMBERS;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex items-center gap-3 mb-8">
          <Users className="text-secondary w-8 h-8" />
          <h2 className="text-3xl font-bold text-secondary">
            Membres supplémentaires de l'équipe
          </h2>
        </div>

        <p className="text-muted-foreground mb-10">
          Voici les autres membres de l'équipe Lynxa Tech qui contribuent
          activement à la vision, à la stratégie et au développement
          technologique.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {extraMembers.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface rounded-xl p-6 card-hover"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden glow-orange">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-secondary mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* Expertise Tags */}
              {member.expertise?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-secondary mb-2">
                    Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {member.achievements?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-secondary mb-2">
                    Réalisations:
                  </h4>
                  <div className="space-y-1">
                    {member.achievements.slice(0, 2).map((achievement, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Icon name="Award" size={12} color="var(--color-primary)" />
                        <span className="text-xs text-muted-foreground">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                {(member.social_links?.linkedin) && (
                  <a
                    href={member.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200"
                  >
                    <Icon name="Linkedin" size={16} />
                  </a>
                )}
                {(member.social_links?.github) && (
                  <a
                    href={member.social_links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200"
                  >
                    <Icon name="Github" size={16} />
                  </a>
                )}
                {(member.social_links?.facebook) && (
                  <a
                    href={member.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200"
                  >
                    <Icon name="Facebook" size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bouton retour */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200"
          >
            Fermer
          </button>
        </div>

      </div>
    </section>
  );
};

export default TeamSpotlight1;
