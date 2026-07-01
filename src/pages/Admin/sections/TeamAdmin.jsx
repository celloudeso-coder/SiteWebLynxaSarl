import React, { useState, useEffect } from "react";
import { getTeamMembers, saveTeamMember, deleteTeamMember } from "../../../lib/cms";
import { FormField, TextInput, TextArea, Toggle, JsonArrayEditor, ImageUpload } from "../components/FormField";
import SaveButton from "../components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const emptyMember = {
  sort_order: 0, active: true, name: "", role: "", image_url: "",
  expertise: [], description: "", achievements: [], social_links: {},
};

export default function TeamAdmin() {
  const [members, setMembers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await getTeamMembers(false);
    setMembers(data || []);
  }

  function update(id, field, value) {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
    setSaved(null);
  }

  // Le toggle de la liste enregistre immédiatement en base (maj optimiste + rollback si échec)
  async function toggleActive(member, value) {
    setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, active: value } : m)));
    setSaving(member.id);
    try {
      const updated = await saveTeamMember({ ...member, active: value });
      setMembers((prev) => prev.map((m) => (m.id === member.id ? updated : m)));
    } catch (e) {
      setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, active: member.active } : m)));
      alert("Échec de l'enregistrement du statut. Vérifiez la connexion à Supabase.");
    } finally {
      setSaving(null);
    }
  }

  function updateSocial(id, field, value) {
    setMembers((prev) => prev.map((m) => {
      if (m.id !== id) return m;
      return { ...m, social_links: { ...(m.social_links || {}), [field]: value } };
    }));
  }

  async function save(member) {
    setSaving(member.id);
    try {
      const updated = await saveTeamMember(member);
      setMembers((prev) => prev.map((m) => m.id === member.id ? updated : m));
      setSaved(member.id);
      setTimeout(() => setSaved(null), 2500);
    } finally {
      setSaving(null);
    }
  }

  async function addNew() {
    const created = await saveTeamMember({ ...emptyMember, sort_order: members.length + 1 });
    setMembers((prev) => [...prev, created]);
    setExpanded(created.id);
  }

  async function remove(id) {
    if (!confirm("Supprimer ce membre ?")) return;
    await deleteTeamMember(id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Équipe</h1>
          <p className="text-gray-500 text-sm mt-0.5">Profils des membres de l'équipe</p>
        </div>
        <button
          onClick={addNew}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4">
              <button
                onClick={() => setExpanded(expanded === member.id ? null : member.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                {expanded === member.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                {member.image_url && (
                  <img src={member.image_url} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                )}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{member.name || "Nouveau membre"}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </button>
              <Toggle checked={member.active} onChange={(v) => toggleActive(member, v)} />
              <button onClick={() => remove(member.id)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 size={16} />
              </button>
            </div>

            {expanded === member.id && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Nom complet">
                    <TextInput value={member.name} onChange={(v) => update(member.id, "name", v)} />
                  </FormField>
                  <FormField label="Poste / Rôle">
                    <TextInput value={member.role} onChange={(v) => update(member.id, "role", v)} />
                  </FormField>
                </div>
                <FormField label="Photo">
                  <ImageUpload value={member.image_url} onChange={(v) => update(member.id, "image_url", v)} folder="team-members" />
                </FormField>
                <FormField label="Bio / Description">
                  <TextArea value={member.description} onChange={(v) => update(member.id, "description", v)} rows={3} />
                </FormField>
                <FormField label="Expertises">
                  <JsonArrayEditor
                    value={member.expertise}
                    onChange={(v) => update(member.id, "expertise", v)}
                    placeholder="Ajouter une compétence"
                  />
                </FormField>
                <FormField label="Réalisations">
                  <JsonArrayEditor
                    value={member.achievements}
                    onChange={(v) => update(member.id, "achievements", v)}
                    placeholder="Ajouter une réalisation"
                  />
                </FormField>
                <div className="grid sm:grid-cols-3 gap-4">
                  <FormField label="LinkedIn">
                    <TextInput value={member.social_links?.linkedin} onChange={(v) => updateSocial(member.id, "linkedin", v)} placeholder="https://…" />
                  </FormField>
                  <FormField label="Twitter / X">
                    <TextInput value={member.social_links?.twitter} onChange={(v) => updateSocial(member.id, "twitter", v)} placeholder="https://…" />
                  </FormField>
                  <FormField label="GitHub">
                    <TextInput value={member.social_links?.github} onChange={(v) => updateSocial(member.id, "github", v)} placeholder="https://…" />
                  </FormField>
                </div>
                <div className="flex justify-end pt-2">
                  <SaveButton loading={saving === member.id} saved={saved === member.id} onClick={() => save(member)} />
                </div>
              </div>
            )}
          </div>
        ))}
        {members.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">Aucun membre.</div>
        )}
      </div>
    </div>
  );
}
