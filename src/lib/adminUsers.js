import { supabase } from "./supabase";

export const ADMIN_ROLES = {
  owner: {
    label: "Propriétaire",
    description: "Accès total, gestion des utilisateurs et des rôles.",
    level: 4,
  },
  admin: {
    label: "Administrateur",
    description: "Accès total au contenu et aux données confidentielles.",
    level: 3,
  },
  editor: {
    label: "Éditeur",
    description: "Création et modification du contenu public du site.",
    level: 2,
  },
  viewer: {
    label: "Lecture seule",
    description: "Consultation du contenu sans possibilité de modification.",
    level: 1,
  },
};

export const ADMIN_RESOURCE_GROUPS = [
  {
    label: "Contenu principal",
    resources: [
      ["hero", "Hero Sections"], ["services", "Services"],
      ["portfolio", "Portfolio"], ["timeline", "Timeline"],
      ["testimonials", "Témoignages"],
    ],
  },
  {
    label: "Équipe et business",
    resources: [
      ["team", "Équipe"], ["pricing", "Tarifs"], ["metrics", "Métriques"],
      ["partnership", "Partenariat"], ["recruitment", "Recrutement"],
      ["subscriptions", "Abonnements"],
    ],
  },
  {
    label: "Contenu détaillé",
    resources: [
      ["home_content", "Accueil+"], ["about_content", "À propos+"],
      ["services_content", "Services+"], ["portfolio_content", "Portfolio+"],
      ["contact_content", "Contact+"], ["partnership_content", "Partenariat+"],
      ["recruitment_content", "Recrutement+"], ["insights", "Insights+"],
    ],
  },
  {
    label: "Administration",
    resources: [
      ["messages", "Messages"], ["newsletter", "Newsletter"],
      ["settings", "Paramètres"],
    ],
  },
];

export const ADMIN_RESOURCES = ADMIN_RESOURCE_GROUPS.flatMap((group) =>
  group.resources.map(([id, label]) => ({ id, label, group: group.label })),
);

export const ROUTE_RESOURCES = {
  "/admin/services-content": "services_content",
  "/admin/portfolio-content": "portfolio_content",
  "/admin/partnership-content": "partnership_content",
  "/admin/join-us-content": "recruitment_content",
  "/admin/contact-content": "contact_content",
  "/admin/insights-content": "insights",
  "/admin/home-content": "home_content",
  "/admin/about-content": "about_content",
  "/admin/subscriptions": "subscriptions",
  "/admin/testimonials": "testimonials",
  "/admin/partnership": "partnership",
  "/admin/newsletter": "newsletter",
  "/admin/portfolio": "portfolio",
  "/admin/timeline": "timeline",
  "/admin/services": "services",
  "/admin/messages": "messages",
  "/admin/settings": "settings",
  "/admin/pricing": "pricing",
  "/admin/metrics": "metrics",
  "/admin/join-us": "recruitment",
  "/admin/team": "team",
  "/admin/hero": "hero",
};

export function hasAdminRole(profile, requiredRole = "viewer") {
  if (!profile?.active) return false;
  return (ADMIN_ROLES[profile.role]?.level || 0) >= (ADMIN_ROLES[requiredRole]?.level || 99);
}

export function hasAdminPermission(profile, resource, action = "view") {
  if (!profile?.active || !resource) return false;
  if (profile.role === "owner") return true;
  if (action === "delete" && profile.role !== "admin") return false;
  if (["create", "update"].includes(action) && !["admin", "editor"].includes(profile.role)) return false;
  const permission = (profile.permissions || []).find((item) => item.resource === resource);
  return Boolean(permission?.[`can_${action}`]);
}

export function permissionsForResources(resourceIds, role) {
  return resourceIds.map((resource) => ({
    resource,
    can_view: true,
    can_create: ["admin", "editor"].includes(role),
    can_update: ["admin", "editor"].includes(role),
    can_delete: role === "admin",
  }));
}

export async function getCurrentAdminProfile(userId) {
  const [profileResult, permissionsResult] = await Promise.all([
    supabase.from("admin_profiles").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("admin_permissions").select("*").eq("user_id", userId),
  ]);
  if (profileResult.error) throw profileResult.error;
  if (permissionsResult.error) throw permissionsResult.error;
  return profileResult.data ? { ...profileResult.data, permissions: permissionsResult.data || [] } : null;
}

export async function getAdminUsers() {
  const [profilesResult, permissionsResult] = await Promise.all([
    supabase.from("admin_profiles").select("*").order("created_at", { ascending: true }),
    supabase.from("admin_permissions").select("*").order("resource"),
  ]);
  if (profilesResult.error) throw profilesResult.error;
  if (permissionsResult.error) throw permissionsResult.error;
  return (profilesResult.data || []).map((profile) => ({
    ...profile,
    permissions: (permissionsResult.data || []).filter((permission) => permission.user_id === profile.user_id),
  }));
}

export async function inviteAdminUser({ email, fullName, role, permissions = [] }) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw userError || new Error("Session invalide.");
  const { data, error } = await supabase
    .from("admin_invitations")
    .insert({
      email: email.trim().toLowerCase(),
      full_name: fullName.trim(),
      role,
      permissions,
      invited_by: userData.user.id,
    })
    .select()
    .single();
  if (error) throw error;
  return {
    ...data,
    inviteUrl: `${window.location.origin}/admin/accept-invite?token=${data.token}`,
  };
}

export async function saveAdminPermissions(userId, permissions) {
  const rows = ADMIN_RESOURCES.map(({ id }) => {
    const permission = permissions.find((item) => item.resource === id) || {};
    return {
      user_id: userId,
      resource: id,
      can_view: Boolean(permission.can_view),
      can_create: Boolean(permission.can_create),
      can_update: Boolean(permission.can_update),
      can_delete: Boolean(permission.can_delete),
      updated_at: new Date().toISOString(),
    };
  });
  const { data, error } = await supabase
    .from("admin_permissions")
    .upsert(rows, { onConflict: "user_id,resource" })
    .select();
  if (error) throw error;
  return data || [];
}

export async function acceptAdminInvitation(token) {
  const { data, error } = await supabase.rpc("accept_admin_invitation", {
    invitation_token: token,
  });
  if (error) throw error;
  return data;
}

export async function updateAdminUser(userId, changes) {
  const allowed = {};
  if (changes.role) allowed.role = changes.role;
  if (typeof changes.active === "boolean") allowed.active = changes.active;
  if (typeof changes.full_name === "string") allowed.full_name = changes.full_name.trim();
  allowed.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("admin_profiles")
    .update(allowed)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
