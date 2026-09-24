import React, { useState, useEffect } from "react";
import { getProjects, saveProject, deleteProject } from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle, JsonArrayEditor, ImageField } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const IMPACT_OPTIONS = ["High", "Medium", "Low"];
const SCALE_OPTIONS  = ["Enterprise", "Medium", "Small", "National", "International"];
const SERVICE_OPTIONS = [
  "Mobile Development", "Network Infrastructure", "Web Development",
  "Cybersecurity", "Cloud & DevOps", "Data & Analytics",
];

function MetricsEditor({ value = [], onChange }) {
  const items = Array.isArray(value) ? value : [];

  function add() {
    onChange([...items, { label: "", value: "" }]);
  }

  function update(i, field, val) {
    const next = [...items];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  }

  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item.label || ""}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder="Libellé (ex: Adoption)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            value={item.value || ""}
            onChange={(e) => update(i, "value", e.target.value)}
            placeholder="Valeur (ex: +150%)"
            className="w-32 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-red-400 hover:text-red-600 text-sm px-2"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-orange-500 hover:text-orange-700 text-sm font-medium"
      >
        + Ajouter une métrique
      </button>
    </div>
  );
}

const STATUS_OPTIONS = ["Phase pilote", "En production", "Bêta", "Archivé"];

const emptyProject = {
  sort_order: 0, active: true, title: "", service_type: "", industry: "",
  scale: "", impact: "", description: "", challenge: "", solution: "",
  implementation_steps: [], technologies: [], metrics: [], testimonial: null,
  duration: "", image_url: "", gallery_urls: [], project_url: "",
  status: "", is_flagship_product: false, product_slug: "",
  value_proposition: "", key_features: [], compliance_notes: "", demo_url: "",
};

function updateGalleryUrl(galleryUrls, index, value) {
  const next = Array.isArray(galleryUrls) ? [...galleryUrls] : [];
  next[index] = value;
  // Retire les emplacements vides en fin de tableau pour ne pas stocker
  // des trous ("", null) au-delà de la dernière capture réellement fournie.
  while (next.length > 0 && !next[next.length - 1]) next.pop();
  return next;
}

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving]     = useState(null);
  const [saved, setSaved]       = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getProjects(false);
    setProjects(data || []);
  }

  function update(id, field, value) {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
    setSaved(null);
  }

  // Le toggle de la liste enregistre immédiatement en base (maj optimiste + rollback si échec)
  async function toggleActive(project, value) {
    setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, active: value } : p)));
    setSaving(project.id);
    try {
      const updated = await saveProject({ ...project, active: value });
      setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
    } catch (e) {
      setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, active: project.active } : p)));
      alert("Échec de l'enregistrement du statut. Vérifiez la connexion à Supabase.");
    } finally {
      setSaving(null);
    }
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
                {expanded === project.id
                  ? <ChevronUp size={16} className="text-gray-400" />
                  : <ChevronDown size={16} className="text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900 text-sm flex items-center gap-2">
                    {project.title || "Nouveau projet"}
                    {project.is_flagship_product && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">
                        Produit phare
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {[project.service_type, project.industry, project.status, project.duration].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </button>
              <Toggle checked={project.active} onChange={(v) => toggleActive(project, v)} />
              <button onClick={() => remove(project.id)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 size={16} />
              </button>
            </div>

            {expanded === project.id && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                {/* Basic info */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Titre">
                    <TextInput value={project.title} onChange={(v) => update(project.id, "title", v)} />
                  </FormField>
                  <FormField label="Type de service">
                    <select
                      value={project.service_type || ""}
                      onChange={(e) => update(project.id, "service_type", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">— Choisir —</option>
                      {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Industrie">
                    <TextInput value={project.industry} onChange={(v) => update(project.id, "industry", v)} placeholder="Fintech, Santé…" />
                  </FormField>
                  <FormField label="Durée">
                    <TextInput value={project.duration} onChange={(v) => update(project.id, "duration", v)} placeholder="6 mois" />
                  </FormField>
                  <FormField label="Statut" hint="Affiché de façon cohérente partout où ce projet apparaît.">
                    <select
                      value={project.status || ""}
                      onChange={(e) => update(project.id, "status", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">— Choisir —</option>
                      {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Échelle">
                    <select
                      value={project.scale || ""}
                      onChange={(e) => update(project.id, "scale", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">— Choisir —</option>
                      {SCALE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Impact">
                    <select
                      value={project.impact || ""}
                      onChange={(e) => update(project.id, "impact", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">— Choisir —</option>
                      {IMPACT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
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

                {/* Metrics */}
                <FormField label="Métriques de résultat" hint="Paires libellé / valeur affichées sur la carte et dans le modal.">
                  <MetricsEditor
                    value={project.metrics}
                    onChange={(v) => update(project.id, "metrics", v)}
                  />
                </FormField>

                {/* Image — upload ou URL */}
                <FormField label="Image du projet" hint="Téléversez un fichier ou collez une URL — l'une ou l'autre option.">
                  <ImageField
                    value={project.image_url}
                    onChange={(v) => update(project.id, "image_url", v)}
                    folder="projects"
                  />
                </FormField>

                {/* Galerie — jusqu'à 2 captures d'écran affichées dans l'étude de cas */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Capture d'écran 1" hint="Optionnelle — affichée dans la fiche projet détaillée.">
                    <ImageField
                      value={project.gallery_urls?.[0] || ""}
                      onChange={(v) => update(project.id, "gallery_urls", updateGalleryUrl(project.gallery_urls, 0, v))}
                      folder="projects"
                    />
                  </FormField>
                  <FormField label="Capture d'écran 2" hint="Optionnelle — affichée dans la fiche projet détaillée.">
                    <ImageField
                      value={project.gallery_urls?.[1] || ""}
                      onChange={(v) => update(project.id, "gallery_urls", updateGalleryUrl(project.gallery_urls, 1, v))}
                      folder="projects"
                    />
                  </FormField>
                </div>

                {/* Project link */}
                <FormField
                  label="Lien vers le projet"
                  hint='URL de la démo, du site live ou de la fiche projet (affiché comme bouton "Voir le projet").'
                >
                  <TextInput
                    value={project.project_url}
                    onChange={(v) => update(project.id, "project_url", v)}
                    placeholder="https://monprojet.com"
                  />
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-orange-500 hover:underline mt-1"
                    >
                      Tester le lien →
                    </a>
                  )}
                </FormField>

                {/* Produit phare — page dédiée */}
                <div className="border-t border-gray-100 pt-5">
                  <Toggle
                    checked={!!project.is_flagship_product}
                    onChange={(v) => update(project.id, "is_flagship_product", v)}
                    label="Produit phare (a sa propre page dédiée)"
                  />
                  {project.is_flagship_product && (
                    <div className="mt-4 space-y-4">
                      <FormField label="Slug de la page produit" hint='URL publique : /produits/<slug>. Ex. "konta"'>
                        <TextInput
                          value={project.product_slug}
                          onChange={(v) => update(project.id, "product_slug", v.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"))}
                          placeholder="konta"
                        />
                      </FormField>
                      <FormField label="Proposition de valeur" hint="Phrase d'accroche affichée en haut de la page produit.">
                        <TextArea
                          value={project.value_proposition}
                          onChange={(v) => update(project.id, "value_proposition", v)}
                          rows={2}
                          placeholder="La gestion comptable simplifiée pour les PME guinéennes, conforme SYSCOHADA."
                        />
                      </FormField>
                      <FormField label="Fonctions principales">
                        <JsonArrayEditor
                          value={project.key_features}
                          onChange={(v) => update(project.id, "key_features", v)}
                          placeholder="Ajouter une fonction"
                        />
                      </FormField>
                      <FormField label="Conformité SYSCOHADA" hint="Description de la conformité réglementaire, affichée en section dédiée.">
                        <TextArea
                          value={project.compliance_notes}
                          onChange={(v) => update(project.id, "compliance_notes", v)}
                          rows={3}
                        />
                      </FormField>
                      <FormField label="Lien de démonstration" hint='Utilisé pour le bouton "Voir la démo".'>
                        <TextInput
                          value={project.demo_url}
                          onChange={(v) => update(project.id, "demo_url", v)}
                          placeholder="https://konta.lynxatech.com/demo"
                        />
                      </FormField>
                    </div>
                  )}
                </div>

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
