import React, { useState, useEffect } from "react";
import { getProjects, saveProject, deleteProject } from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle, JsonArrayEditor } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const emptyProject = {
  sort_order: 0, active: true, title: "", service_type: "", industry: "",
  scale: "", impact: "", description: "", challenge: "", solution: "",
  implementation_steps: [], technologies: [], metrics: [], testimonial: null,
  duration: "", image_url: "",
};

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getProjects(false);
    setProjects(data || []);
  }

  function update(id, field, value) {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
    setSaved(null);
  }

  function updateTestimonial(id, field, value) {
    setProjects((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      return { ...p, testimonial: { ...(p.testimonial || {}), [field]: value } };
    }));
  }

  async function save(project) {
    setSaving(project.id);
    try {
      const updated = await saveProject(project);
      setProjects((prev) => prev.map((p) => p.id === project.id ? updated : p));
      setSaved(project.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveProject({ ...emptyProject, sort_order: projects.length + 1 });
    setProjects((prev) => [...prev, created]);
    setExpanded(created.id);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce projet ?")) return;
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-500 text-sm mt-0.5">Études de cas et projets réalisés</p>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                {expanded === project.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{project.title || "Nouveau projet"}</p>
                  <p className="text-xs text-gray-500">{project.industry} · {project.duration}</p>
                </div>
              </button>
              <Toggle checked={project.active} onChange={(v) => update(project.id, "active", v)} />
              <button onClick={() => remove(project.id)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 size={16} />
              </button>
            </div>

            {expanded === project.id && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Titre">
                    <TextInput value={project.title} onChange={(v) => update(project.id, "title", v)} />
                  </FormField>
                  <FormField label="Type de service">
                    <TextInput value={project.service_type} onChange={(v) => update(project.id, "service_type", v)} placeholder="Développement Mobile" />
                  </FormField>
                  <FormField label="Industrie">
                    <TextInput value={project.industry} onChange={(v) => update(project.id, "industry", v)} placeholder="Fintech" />
                  </FormField>
                  <FormField label="Durée">
                    <TextInput value={project.duration} onChange={(v) => update(project.id, "duration", v)} placeholder="6 mois" />
                  </FormField>
                  <FormField label="Échelle">
                    <TextInput value={project.scale} onChange={(v) => update(project.id, "scale", v)} placeholder="National" />
                  </FormField>
                  <FormField label="Impact résumé">
                    <TextInput value={project.impact} onChange={(v) => update(project.id, "impact", v)} placeholder="+50K utilisateurs" />
                  </FormField>
                </div>

                <FormField label="Description courte">
                  <TextArea value={project.description} onChange={(v) => update(project.id, "description", v)} rows={2} />
                </FormField>
                <FormField label="Le Défi">
                  <TextArea value={project.challenge} onChange={(v) => update(project.id, "challenge", v)} rows={3} />
                </FormField>
                <FormField label="La Solution">
                  <TextArea value={project.solution} onChange={(v) => update(project.id, "solution", v)} rows={3} />
                </FormField>
                <FormField label="Étapes d'implémentation">
                  <JsonArrayEditor
                    value={project.implementation_steps}
                    onChange={(v) => update(project.id, "implementation_steps", v)}
                    placeholder="Ajouter une étape"
                  />
                </FormField>
                <FormField label="Technologies utilisées">
                  <JsonArrayEditor
                    value={project.technologies}
                    onChange={(v) => update(project.id, "technologies", v)}
                    placeholder="Ajouter une technologie"
                  />
                </FormField>
                <FormField label="Image URL">
                  <TextInput value={project.image_url} onChange={(v) => update(project.id, "image_url", v)} placeholder="https://…" />
                </FormField>

                {/* Testimonial */}
                <div className="border-t border-gray-100 pt-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Témoignage client</h3>
                  <div className="space-y-4">
                    <FormField label="Citation">
                      <TextArea
                        value={project.testimonial?.quote}
                        onChange={(v) => updateTestimonial(project.id, "quote", v)}
                        rows={2}
                        placeholder="Ce projet a transformé notre organisation…"
                      />
                    </FormField>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <FormField label="Nom">
                        <TextInput value={project.testimonial?.author_name} onChange={(v) => updateTestimonial(project.id, "author_name", v)} />
                      </FormField>
                      <FormField label="Poste">
                        <TextInput value={project.testimonial?.author_position} onChange={(v) => updateTestimonial(project.id, "author_position", v)} />
                      </FormField>
                      <FormField label="Entreprise">
                        <TextInput value={project.testimonial?.author_company} onChange={(v) => updateTestimonial(project.id, "author_company", v)} />
                      </FormField>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <SaveButton loading={saving === project.id} saved={saved === project.id} onClick={() => save(project)} />
                </div>
              </div>
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            Aucun projet. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}
