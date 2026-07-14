import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Loader2,
  MailPlus,
  Save,
  Shield,
  SlidersHorizontal,
  UserCheck,
  UserCog,
  UserX,
  Users,
} from "lucide-react";
import {
  ADMIN_ROLES,
  ADMIN_RESOURCE_GROUPS,
  ADMIN_RESOURCES,
  getAdminUsers,
  inviteAdminUser,
  permissionsForResources,
  saveAdminPermissions,
  updateAdminUser,
} from "../../../lib/adminUsers";
import { useAdminAuth } from "../components/AdminAuthContext";

const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

const ROLE_STYLES = {
  owner: "bg-orange-50 text-orange-700 border-orange-200",
  admin: "bg-purple-50 text-purple-700 border-purple-200",
  editor: "bg-blue-50 text-blue-700 border-blue-200",
  viewer: "bg-gray-50 text-gray-600 border-gray-200",
};

function RoleBadge({ role }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[role] || ROLE_STYLES.viewer}`}>
      <Shield size={12} /> {ADMIN_ROLES[role]?.label || role}
    </span>
  );
}

function PermissionMatrix({ role, permissions, onChange }) {
  const values = Object.fromEntries((permissions || []).map((item) => [item.resource, item]));
  const roleAllows = (action) => {
    if (action === "view") return true;
    if (["create", "update"].includes(action)) return ["admin", "editor"].includes(role);
    return role === "admin";
  };

  function toggle(resource, action, checked) {
    const current = values[resource] || { resource, can_view: false, can_create: false, can_update: false, can_delete: false };
    const next = { ...current, [`can_${action}`]: checked };
    if (action !== "view" && checked) next.can_view = true;
    if (action === "view" && !checked) {
      next.can_create = false;
      next.can_update = false;
      next.can_delete = false;
    }
    onChange([
      ...(permissions || []).filter((item) => item.resource !== resource),
      next,
    ]);
  }

  return (
    <div className="space-y-4 overflow-x-auto pb-1">
      {ADMIN_RESOURCE_GROUPS.map((group) => (
        <div key={group.label} className="min-w-[420px] overflow-hidden rounded-lg border border-gray-200">
          <div className="grid grid-cols-[1fr_repeat(4,64px)] gap-1 bg-gray-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            <span>{group.label}</span><span className="text-center">Voir</span><span className="text-center">Créer</span><span className="text-center">Modifier</span><span className="text-center">Suppr.</span>
          </div>
          <div className="divide-y divide-gray-100">
            {group.resources.map(([resource, label]) => (
              <div key={resource} className="grid grid-cols-[1fr_repeat(4,64px)] items-center gap-1 px-3 py-2 text-sm">
                <span className="min-w-0 truncate text-gray-700">{label}</span>
                {["view", "create", "update", "delete"].map((action) => (
                  <label key={action} className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={Boolean(values[resource]?.[`can_${action}`])}
                      disabled={!roleAllows(action)}
                      onChange={(event) => toggle(resource, action, event.target.checked)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
                    />
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminUsersAdmin() {
  const { user } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [invite, setInvite] = useState({ fullName: "", email: "", role: "editor", resources: [] });
  const [permissionsOpen, setPermissionsOpen] = useState("");
  const [permissionDraft, setPermissionDraft] = useState([]);

  async function load() {
    setLoading(true);
    setError("");
    try {
      setUsers(await getAdminUsers());
    } catch (loadError) {
      setError(loadError?.message || "Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const activeCount = useMemo(() => users.filter((item) => item.active).length, [users]);

  async function handleInvite(event) {
    event.preventDefault();
    setSaving("invite");
    setError("");
    setSuccess("");
    try {
      const invitation = await inviteAdminUser({
        ...invite,
        permissions: permissionsForResources(invite.resources, invite.role),
      });
      setInviteLink(invitation.inviteUrl);
      setInvite({ fullName: "", email: "", role: "editor", resources: [] });
      setSuccess(`Lien d’invitation créé pour ${invite.email}. Il reste valide pendant 7 jours.`);
    } catch (inviteError) {
      setError(inviteError?.message || "L’invitation n’a pas pu être envoyée.");
    } finally {
      setSaving("");
    }
  }

  function openPermissions(item) {
    if (permissionsOpen === item.user_id) {
      setPermissionsOpen("");
      return;
    }
    setPermissionDraft(ADMIN_RESOURCES.map(({ id }) => (
      item.permissions.find((permission) => permission.resource === id)
      || { resource: id, can_view: false, can_create: false, can_update: false, can_delete: false }
    )));
    setPermissionsOpen(item.user_id);
  }

  async function handleSavePermissions(item) {
    setSaving(`permissions-${item.user_id}`);
    setError("");
    setSuccess("");
    try {
      const savedPermissions = await saveAdminPermissions(item.user_id, permissionDraft);
      setUsers((current) => current.map((entry) => entry.user_id === item.user_id
        ? { ...entry, permissions: savedPermissions }
        : entry));
      setSuccess(`Les sections accessibles à ${item.full_name || item.email} ont été enregistrées.`);
    } catch (permissionError) {
      setError(permissionError?.message || "Impossible d’enregistrer ces permissions.");
    } finally {
      setSaving("");
    }
  }

  async function handleUpdate(item, changes) {
    setSaving(item.user_id);
    setError("");
    setSuccess("");
    try {
      const updated = await updateAdminUser(item.user_id, changes);
      setUsers((current) => current.map((entry) => entry.user_id === updated.user_id ? { ...entry, ...updated } : entry));
      setSuccess("Les droits de l’utilisateur ont été mis à jour.");
    } catch (updateError) {
      setError(updateError?.message || "Impossible de modifier cet utilisateur.");
    } finally {
      setSaving("");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Utilisateurs et rôles</h1>
        <p className="mt-1 text-sm text-gray-500">Invitez votre équipe et contrôlez précisément son accès au CMS.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <Users className="text-blue-600" size={20} />
          <p className="mt-3 text-2xl font-bold text-gray-900">{users.length}</p>
          <p className="text-xs text-gray-500">Utilisateurs enregistrés</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <UserCheck className="text-green-600" size={20} />
          <p className="mt-3 text-2xl font-bold text-gray-900">{activeCount}</p>
          <p className="text-xs text-gray-500">Accès actifs</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <UserX className="text-red-500" size={20} />
          <p className="mt-3 text-2xl font-bold text-gray-900">{users.length - activeCount}</p>
          <p className="text-xs text-gray-500">Accès suspendus</p>
        </div>
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={17} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div role="status" className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <Check size={17} className="mt-0.5 shrink-0" /> {success}
        </div>
      )}
      {inviteLink && (
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
          <p className="text-sm font-medium text-orange-900">Lien à transmettre au collaborateur</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input readOnly value={inviteLink} className="min-w-0 flex-1 rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm text-gray-600" />
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(inviteLink);
                setSuccess("Lien d’invitation copié.");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Copy size={15} /> Copier le lien
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleInvite} className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <MailPlus size={19} className="text-orange-500" />
          <h2 className="font-bold text-gray-900">Inviter un utilisateur</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="space-y-1.5 text-sm font-medium text-gray-700">
            Nom complet
            <input required value={invite.fullName} onChange={(event) => setInvite({ ...invite, fullName: event.target.value })} className={inputClass} placeholder="Prénom et nom" />
          </label>
          <label className="space-y-1.5 text-sm font-medium text-gray-700">
            Adresse e-mail
            <input required type="email" value={invite.email} onChange={(event) => setInvite({ ...invite, email: event.target.value })} className={inputClass} placeholder="collaborateur@lynxatech.com" />
          </label>
          <label className="space-y-1.5 text-sm font-medium text-gray-700">
            Rôle initial
            <select value={invite.role} onChange={(event) => setInvite({ ...invite, role: event.target.value })} className={inputClass}>
              <option value="admin">Administrateur</option>
              <option value="editor">Éditeur</option>
              <option value="viewer">Lecture seule</option>
            </select>
          </label>
        </div>
        <div className="mt-5 border-t border-gray-100 pt-4">
          <p className="text-sm font-semibold text-gray-800">Sections accessibles dès l’activation</p>
          <p className="mt-0.5 text-xs text-gray-500">Les actions sont limitées automatiquement par le rôle choisi.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ADMIN_RESOURCE_GROUPS.map((group) => (
              <div key={group.label} className="rounded-lg border border-gray-200 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{group.label}</p>
                <div className="space-y-2">
                  {group.resources.map(([resource, label]) => (
                    <label key={resource} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={invite.resources.includes(resource)}
                        onChange={(event) => setInvite({
                          ...invite,
                          resources: event.target.checked
                            ? [...invite.resources, resource]
                            : invite.resources.filter((item) => item !== resource),
                        })}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button disabled={saving === "invite"} className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50">
            {saving === "invite" ? <Loader2 size={16} className="animate-spin" /> : <MailPlus size={16} />}
            Créer le lien d’invitation
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <UserCog size={19} className="text-gray-500" />
            <h2 className="font-bold text-gray-900">Membres de l’administration</h2>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-gray-400"><Loader2 size={18} className="animate-spin" /> Chargement…</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {users.map((item) => {
              const isSelf = item.user_id === user.id;
              const isSaving = saving === item.user_id;
              return (
                <div key={item.user_id}>
                  <div className="grid gap-4 px-5 py-4 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center">
                    <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold text-gray-900">{item.full_name || item.email}</p>
                      {isSelf && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">Vous</span>}
                      {!item.active && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-600">Suspendu</span>}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-gray-500">{item.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <RoleBadge role={item.role} />
                    <select
                      aria-label={`Rôle de ${item.email}`}
                      value={item.role}
                      disabled={isSaving}
                      onChange={(event) => handleUpdate(item, { role: event.target.value })}
                      className="rounded-lg border border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-orange-400"
                    >
                      {Object.entries(ADMIN_ROLES).map(([value, role]) => <option key={value} value={value}>{role.label}</option>)}
                    </select>
                    </div>
                    {item.role === "owner" ? (
                      <span className="inline-flex min-w-36 items-center justify-center gap-1.5 rounded-lg bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700"><Shield size={14} /> Accès total</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openPermissions(item)}
                        className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <SlidersHorizontal size={15} /> Permissions {permissionsOpen === item.user_id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                    <button
                    type="button"
                    disabled={isSaving || isSelf}
                    onClick={() => handleUpdate(item, { active: !item.active })}
                    className={`inline-flex min-w-32 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 ${item.active ? "border-red-200 text-red-600 hover:bg-red-50" : "border-green-200 text-green-700 hover:bg-green-50"}`}
                  >
                    {isSaving ? <Loader2 size={15} className="animate-spin" /> : item.active ? <UserX size={15} /> : <UserCheck size={15} />}
                    {item.active ? "Suspendre" : "Réactiver"}
                    </button>
                  </div>
                  {permissionsOpen === item.user_id && item.role !== "owner" && (
                    <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-5">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">Accès de {item.full_name || item.email}</h3>
                          <p className="mt-0.5 text-xs text-gray-500">Le rôle constitue le plafond; les cases choisissent les sections réellement autorisées.</p>
                        </div>
                        <button
                          type="button"
                          disabled={saving === `permissions-${item.user_id}`}
                          onClick={() => handleSavePermissions(item)}
                          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                        >
                          {saving === `permissions-${item.user_id}` ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                          Enregistrer
                        </button>
                      </div>
                      <PermissionMatrix role={item.role} permissions={permissionDraft} onChange={setPermissionDraft} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <h2 className="font-semibold text-blue-900">Droits associés aux rôles</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {Object.entries(ADMIN_ROLES).map(([key, role]) => (
            <div key={key} className="rounded-lg bg-white/70 p-3">
              <RoleBadge role={key} />
              <p className="mt-2 text-xs leading-relaxed text-blue-900/70">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
