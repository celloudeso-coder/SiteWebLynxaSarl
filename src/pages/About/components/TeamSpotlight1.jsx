import React from "react";
import { useNavigate } from "react-router-dom"; // <- import nécessaire
import { motion } from "framer-motion";
import { Users, Facebook, Linkedin } from "lucide-react";

const extraMembers = [
  {
    name: "Ramatoulaye Diallo",
    role: "Responsable des Affaires Financières",
    image: "",
    description: "Ramatoulaye Diallo est en charge de la gestion financière et administrative de Lynxa Tech.",
    socials: { facebook: "#", linkedin: "#" }
  },
  {
    name: "Mohamed Dembele",
    role: "Responsable Marketing",
    image: "/Dembele.jpeg",
    description: "Mohamed Dembélé pilote la stratégie marketing et commerciale de Lynxa Tech.",
    socials: { facebook: "#", linkedin: "#" }
  },
  {
    name: "Mamadou Moustapha Diallo",
    role: "Responsable CommunicationMamadou",
    image: "",
    description: "Moustapha Diallo est le garant de l’image et de l’identité visuelle de Lynxa Tech.",
    socials: { facebook: "#", linkedin: "#" }
  }
];

const TeamSpotlight1 = () => {
  const navigate = useNavigate(); // <- définir navigate

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex items-center gap-3 mb-8">
          <Users className="text-secondary w-8 h-8" />
          <h2 className="text-3xl font-bold text-secondary">
            Membres supplémentaires de l’équipe
          </h2>
        </div>

        <p className="text-muted-foreground mb-10">
          Voici les autres membres de l’équipe Lynxa Tech qui contribuent
          activement à la vision, à la stratégie et au développement
          technologique.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {extraMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>

              <p className="text-secondary font-medium mb-2">
                {member.role}
              </p>

              <p className="text-sm text-muted-foreground">
                {member.description}
              </p>

              {/* Réseaux sociaux */}
              <div className="flex gap-4 mt-4">
                <a
                  href={member.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-secondary"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-secondary"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bouton fermer */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate(-1)} // redirige vers TeamSpotlight
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-200"
          >
            Fermer
          </button>
        </div>

      </div>
    </section>
  );
};

export default TeamSpotlight1;
