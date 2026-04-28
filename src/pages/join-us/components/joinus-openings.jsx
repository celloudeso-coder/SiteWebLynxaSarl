import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { useJobOpenings } from "../../../hooks/useContent";

const TYPE_COLORS = {
  "Temps plein": "bg-blue-100 text-blue-700",
  "Stage":       "bg-green-100 text-green-700",
  "Freelance":   "bg-purple-100 text-purple-700",
  "Temps partiel": "bg-yellow-100 text-yellow-700",
};

const JoinUsOpenings = () => {
  const { data: openings, loading } = useJobOpenings();

  if (loading) return null;
  if (!openings || openings.length === 0) return null;

  return (
    <section className="py-20 bg-surface" id="postes">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Postes ouverts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos opportunités actuelles et trouvez votre place dans l'équipe.
          </p>
        </motion.div>

        <div className="space-y-4">
          {openings.map((job, i) => {
            const reqs = Array.isArray(job.requirements)
              ? job.requirements
              : (() => { try { return JSON.parse(job.requirements); } catch { return []; } })();

            return (
              <motion.div
                key={job.id}
                className="bg-white rounded-2xl border border-border p-6 hover:shadow-medium transition-shadow duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {job.is_urgent && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          Urgent
                        </span>
                      )}
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_COLORS[job.type] || "bg-gray-100 text-gray-600"}`}>
                        {job.type}
                      </span>
                      {job.department && (
                        <span className="text-xs text-muted-foreground bg-gray-100 px-2.5 py-1 rounded-full">
                          {job.department}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-heading font-bold text-secondary mb-1">
                      {job.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                      <Icon name="MapPin" size={13} />
                      <span>{job.location}</span>
                    </div>

                    {job.description && (
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {job.description}
                      </p>
                    )}

                    {reqs.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {reqs.map((req, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 text-xs text-secondary bg-surface border border-border px-2.5 py-1 rounded-lg">
                            <Icon name="Check" size={11} color="var(--color-primary)" />
                            {req}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <motion.a
                    href="#candidature"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all glow-orange flex-shrink-0 self-start"
                  >
                    <Icon name="Send" size={14} color="white" />
                    Postuler
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Vous ne voyez pas votre poste idéal ?{" "}
          <a href="#candidature" className="text-primary hover:underline font-medium">
            Envoyez une candidature spontanée →
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default JoinUsOpenings;
