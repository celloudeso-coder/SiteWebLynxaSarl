import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";


const TeamSpotlight = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Elhadj Sadou Barry",
      role: "Responsable du Développement Mobilee",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      expertise: ["Full-Stack", "Flutter Developer", "Future Digital Forensics Specialist"],
      description:
        "Elhadj Sadou Barry est développeur mobile spécialisé en solutions multiplateformes (Flutter). Il supervise le développement et l’optimisation des applications multiplateformes, en mettant l’accent sur la performance, l’ergonomie et l’expérience utilisateur.",
      achievements: [
        "Développeur Web Full-Stack",
        "Développeur Flutter",
        "Contributeur Open Source"
      ],
      social: {
        linkedin: "#  ",
        github: "https://github.com/D4wn-Light",
      },
    },
    {
      id: 2,
      name: "Mamadou Cellou Kanté",
      role: "CEO",
      image:
        "/CellouK.png",
      expertise: ["Tests de pénétration", "Audits de sécurité", "Conformité"],
      description:
        "Cellou CEO, Son rôle consiste à piloter la stratégie technique de Lynxa Tech, en veillant à l’innovation, à la performance et à la sécurité de nos solutions. Il supervise la conception, le déploiement et l’optimisation des services afin de garantir un haut niveau d’excellence opérationnelle et de satisfaction client.",
      achievements: [
        "Administrateur réseaux et systèmes",
        "Certifié Analyste Cybersecurité",
        {/* "Auditeur Principal ISO 27001", */ }
      ],
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 3,
      name: "Aissatou lamarana Diallo",
      role: "Responsable du Développement des Solutions Digitales",
      image:
        "/lamarana.png",
      expertise: ["React", "Node.js", "Architecture Cloud"],
     
      description:
        "Aissatou Lamarana Directrice des Services Digitaux, pilote la stratégie digitale de Lynxa Tech. Elle met son expertise au service de solutions innovantes et adaptées aux besoins opérationnels des entreprises, afin d’optimiser leur productivité et leur agilité numérique.",
      achievements: [
        "Architecte Solutions AWS",
        "Expert React",
        "Contributrice Open Source",
      ],
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 4,
      name: "Bandiougou Keita",
      role: "Responsable des Services Réseaux Informatiques",
      image:
        "/keita.jpg",
      expertise: [
        "Méthodologie Agile",
        "Leadership d'Équipe",
      ],
      description:
        "Bandiougou supervise la stratégie et planifie la gestion des infrastructures informatiques de nos clients. Il veille à la performance, à la disponibilité et à la sécurité des réseaux, tout en encadrant les équipes techniques et en garantissant l’efficacité opérationnelle du système d’information.",
      achievements: ["Administrateur réseaux",],
      social: {
        linkedin: "#",

      },
    },
  ];
  
  {/*  experience: "1+ ans", */}

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Rencontrez notre équipe d’experts
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Des professionnels talentueux de Guinée capables d'offrir des solutions de
            classe mondiale à des clients dans le monde entier
          </p>
        </div>

        <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-8">
          {teamMembers?.map((member) => (
            <div
              key={member?.id}
              className="bg-surface rounded-xl p-6 card-hover"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden glow-orange">
                  <Image
                    src={member?.image}
                    alt={member?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    {member?.experience}
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-secondary mb-1">
                  {member?.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member?.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member?.description}
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-secondary mb-2">
                  Expertise:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member?.expertise?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-secondary mb-2">
                  Realisations:
                </h4>
                <div className="space-y-1">
                  {member?.achievements
                    ?.slice(0, 2)
                    ?.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon
                          name="Award"
                          size={12}
                          color="var(--color-primary)"
                        />
                        <span className="text-xs text-muted-foreground">
                          {achievement}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
                  <Icon name="Linkedin" size={16} />
                </button>

                {member?.id !== 4 && (
                  <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
                    <Icon name="Github" size={16} />
                  </button>
                )}

                {/*<button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
                  <Icon name="Twitter" size={16} />
                </button> */}
              </div>
            </div>
          ))}
          <div>
            <Link
              to="/about/teamspotlight1"
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-200"
            >
              Voir plus
            </Link>
          </div>
       </div>


        {/* Team Stats */}
        {/*<div className="mt-16 bg-gradient-sunset rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              Notre équipe en chiffres
            </h3>
            <p className="text-white/80"> Expertises variées, vision unifiée</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4+</div>
              <div className="text-sm text-white/80"> Membres de l'équipe </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4+</div>
              <div className="text-sm text-white/80"> Spécialisations </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">6+</div>
              <div className="text-sm text-white/80">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-sm text-white/80">Langues</div>
            </div>
          </div>
        </div>*/}
      </div>
    </section>
  );
};

export default TeamSpotlight;
