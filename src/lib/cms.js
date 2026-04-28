import { supabase } from "./supabase";

// ─── Generic helpers ────────────────────────────────────────────────────────

async function fetchTable(table, options = {}) {
  const { orderBy = "sort_order", filters = {} } = options;
  let query = supabase.from(table).select("*").order(orderBy);
  Object.entries(filters).forEach(([col, val]) => {
    query = query.eq(col, val);
  });
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function upsertRow(table, row) {
  const { data, error } = await supabase.from(table).upsert(row).select().single();
  if (error) throw error;
  return data;
}

async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export async function getSettings() {
  const { data, error } = await supabase.from("site_settings").select("*");
  if (error) throw error;
  return Object.fromEntries((data || []).map((r) => [r.key, r.value]));
}

export async function saveSetting(key, value) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
}

// ─── Hero Sections ────────────────────────────────────────────────────────────

export async function getHeroSection(page) {
  const { data, error } = await supabase
    .from("hero_sections")
    .select("*")
    .eq("page", page)
    .single();
  if (error) return null;
  return data;
}

export async function getAllHeroSections() {
  return fetchTable("hero_sections", { orderBy: "page" });
}

export async function saveHeroSection(hero) {
  return upsertRow("hero_sections", hero);
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getServices(activeOnly = true) {
  return fetchTable("services", {
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveService(service) {
  return upsertRow("services", service);
}

export async function deleteService(id) {
  return deleteRow("services", id);
}

// ─── Portfolio Projects ───────────────────────────────────────────────────────

export async function getProjects(activeOnly = true) {
  return fetchTable("portfolio_projects", {
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveProject(project) {
  return upsertRow("portfolio_projects", project);
}

export async function deleteProject(id) {
  return deleteRow("portfolio_projects", id);
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export async function getTeamMembers(activeOnly = true) {
  return fetchTable("team_members", {
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveTeamMember(member) {
  return upsertRow("team_members", member);
}

export async function deleteTeamMember(id) {
  return deleteRow("team_members", id);
}

// ─── Pricing Plans ────────────────────────────────────────────────────────────

export async function getPricingPlans(activeOnly = true) {
  return fetchTable("pricing_plans", {
    filters: activeOnly ? { active: true } : {},
  });
}

export async function savePricingPlan(plan) {
  return upsertRow("pricing_plans", plan);
}

export async function deletePricingPlan(id) {
  return deleteRow("pricing_plans", id);
}

// ─── Timeline Events ──────────────────────────────────────────────────────────

export async function getTimelineEvents(activeOnly = true) {
  return fetchTable("timeline_events", {
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveTimelineEvent(event) {
  return upsertRow("timeline_events", event);
}

export async function deleteTimelineEvent(id) {
  return deleteRow("timeline_events", id);
}

// ─── Metrics ─────────────────────────────────────────────────────────────────

export async function getMetrics(page = "home") {
  return fetchTable("metrics", { filters: { active: true, page } });
}

export async function saveMetric(metric) {
  return upsertRow("metrics", metric);
}

export async function deleteMetric(id) {
  return deleteRow("metrics", id);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(activeOnly = true) {
  return fetchTable("testimonials", {
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveTestimonial(testimonial) {
  return upsertRow("testimonials", testimonial);
}

export async function deleteTestimonial(id) {
  return deleteRow("testimonials", id);
}

// ─── Partnership Pathways ─────────────────────────────────────────────────────

export async function getPartnershipPathways(activeOnly = true) {
  return fetchTable("partnership_pathways", {
    filters: activeOnly ? { active: true } : {},
  });
}

export async function savePartnershipPathway(pathway) {
  return upsertRow("partnership_pathways", pathway);
}

export async function deletePartnershipPathway(id) {
  return deleteRow("partnership_pathways", id);
}

// ─── Newsletter Subscriptions ─────────────────────────────────────────────────

export async function subscribeNewsletter(email) {
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .upsert({ email, active: true }, { onConflict: "email" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getNewsletterSubscriptions() {
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .select("*")
    .order("subscribed_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function deleteNewsletterSubscription(id) {
  return deleteRow("newsletter_subscriptions", id);
}

export async function toggleNewsletterSubscription(id, active) {
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .update({ active })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Media Upload ─────────────────────────────────────────────────────────────

export async function uploadMedia(file, path) {
  const { data, error } = await supabase.storage
    .from("cms-media")
    .upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from("cms-media").getPublicUrl(data.path);
  return urlData.publicUrl;
}
