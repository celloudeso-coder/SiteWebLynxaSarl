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

// ─── Job Openings ─────────────────────────────────────────────────────────────

export async function getJobOpenings(activeOnly = true) {
  return fetchTable("job_openings", {
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveJobOpening(opening) {
  return upsertRow("job_openings", opening);
}

export async function deleteJobOpening(id) {
  return deleteRow("job_openings", id);
}

// ─── Job Applications ─────────────────────────────────────────────────────────

export async function submitJobApplication(application) {
  const { error } = await supabase
    .from("job_applications")
    .insert(application);
  if (error) throw error;
}

export async function getJobApplications() {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateApplicationStatus(id, status, notes) {
  const { data, error } = await supabase
    .from("job_applications")
    .update({ status, admin_notes: notes })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteJobApplication(id) {
  return deleteRow("job_applications", id);
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
  const { error } = await supabase
    .from("newsletter_subscriptions")
    .insert({ email, active: true });
  // Ignore unique violation (already subscribed)
  if (error && error.code !== "23505") throw error;
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

// ─── Contact Messages ─────────────────────────────────────────────────────────

export async function submitContactMessage(message) {
  const { error } = await supabase
    .from("contact_messages")
    .insert(message);
  if (error) throw error;
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateMessageStatus(id, status, admin_notes) {
  const payload = { status };
  if (admin_notes !== undefined) payload.admin_notes = admin_notes;
  const { data, error } = await supabase
    .from("contact_messages")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteContactMessage(id) {
  return deleteRow("contact_messages", id);
}

// ─── Media Upload ─────────────────────────────────────────────────────────────

// ─── Home Engagements (Bande Engagements) ────────────────────────────────────

export async function getHomeEngagements() {
  return fetchTable("home_engagements", { orderBy: "sort_order" });
}

export async function saveHomeEngagement(item) {
  return upsertRow("home_engagements", item);
}

export async function deleteHomeEngagement(id) {
  return deleteRow("home_engagements", id);
}

// ─── Home Why Items (Pourquoi Lynxa ?) ───────────────────────────────────────

export async function getHomeWhyItems() {
  return fetchTable("home_why_items", { orderBy: "sort_order" });
}

export async function saveHomeWhyItem(item) {
  return upsertRow("home_why_items", item);
}

export async function deleteHomeWhyItem(id) {
  return deleteRow("home_why_items", id);
}

// ─── Contact — Form Config & Office Details ───────────────────────────────────

export async function getContactFormConfig() {
  const s = await getSettings();
  return s.contact_form_config ?? null;
}

export async function saveContactFormConfig(data) {
  return saveSetting("contact_form_config", data);
}

export async function getOfficeDetails() {
  const s = await getSettings();
  return s.office_details ?? null;
}

export async function saveOfficeDetails(data) {
  return saveSetting("office_details", data);
}

// ─── Partnership — Process Steps ─────────────────────────────────────────────

export async function getPartnershipProcessSteps() {
  return fetchTable("partnership_process_steps", { orderBy: "sort_order" });
}

export async function savePartnershipProcessStep(item) {
  return upsertRow("partnership_process_steps", item);
}

export async function deletePartnershipProcessStep(id) {
  return deleteRow("partnership_process_steps", id);
}

// ─── Partnership — Trust Signals ─────────────────────────────────────────────

export async function getTrustSecurityItems() {
  return fetchTable("trust_security_items", { orderBy: "sort_order" });
}

export async function saveTrustSecurityItem(item) {
  return upsertRow("trust_security_items", item);
}

export async function deleteTrustSecurityItem(id) {
  return deleteRow("trust_security_items", id);
}

export async function getTrustCommitmentItems() {
  return fetchTable("trust_commitment_items", { orderBy: "sort_order" });
}

export async function saveTrustCommitmentItem(item) {
  return upsertRow("trust_commitment_items", item);
}

export async function deleteTrustCommitmentItem(id) {
  return deleteRow("trust_commitment_items", id);
}

// ─── Portfolio — Innovation Lab ───────────────────────────────────────────────

export async function getPortfolioInnovations() {
  return fetchTable("portfolio_innovations", { orderBy: "sort_order" });
}

export async function savePortfolioInnovation(item) {
  return upsertRow("portfolio_innovations", item);
}

export async function deletePortfolioInnovation(id) {
  return deleteRow("portfolio_innovations", id);
}

// ─── Service — Process Steps ──────────────────────────────────────────────────

export async function getServiceProcessSteps() {
  return fetchTable("service_process_steps", { orderBy: "sort_order" });
}

export async function saveServiceProcessStep(item) {
  return upsertRow("service_process_steps", item);
}

export async function deleteServiceProcessStep(id) {
  return deleteRow("service_process_steps", id);
}

// ─── Service — Tech Items ──────────────────────────────────────────────────────

export async function getServiceTechItems() {
  const { data, error } = await supabase
    .from("service_tech_items")
    .select("*")
    .eq("active", true)
    .order("category_key")
    .order("sort_order");
  if (error) throw error;
  return data;
}

export async function saveServiceTechItem(item) {
  return upsertRow("service_tech_items", item);
}

export async function deleteServiceTechItem(id) {
  return deleteRow("service_tech_items", id);
}

export async function getServiceTechCategories() {
  const s = await getSettings();
  return s.service_tech_categories ?? null;
}

export async function saveServiceTechCategories(data) {
  return saveSetting("service_tech_categories", data);
}

// ─── About — Core Values ─────────────────────────────────────────────────────

export async function getAboutCoreValues() {
  return fetchTable("about_core_values", { orderBy: "sort_order" });
}

export async function saveAboutCoreValue(item) {
  return upsertRow("about_core_values", item);
}

export async function deleteAboutCoreValue(id) {
  return deleteRow("about_core_values", id);
}

// ─── About — Advantages (Pourquoi Guinée ?) ──────────────────────────────────

export async function getAboutAdvantages() {
  return fetchTable("about_advantages", { orderBy: "sort_order" });
}

export async function saveAboutAdvantage(item) {
  return upsertRow("about_advantages", item);
}

export async function deleteAboutAdvantage(id) {
  return deleteRow("about_advantages", id);
}

// ─── About — Vision Pillars ───────────────────────────────────────────────────

export async function getAboutVisionPillars() {
  return fetchTable("about_vision_pillars", { orderBy: "sort_order" });
}

export async function saveAboutVisionPillar(item) {
  return upsertRow("about_vision_pillars", item);
}

export async function deleteAboutVisionPillar(id) {
  return deleteRow("about_vision_pillars", id);
}

// ─── About — Roadmap Phases ───────────────────────────────────────────────────

export async function getAboutRoadmapPhases() {
  return fetchTable("about_roadmap_phases", { orderBy: "sort_order" });
}

export async function saveAboutRoadmapPhase(item) {
  return upsertRow("about_roadmap_phases", item);
}

export async function deleteAboutRoadmapPhase(id) {
  return deleteRow("about_roadmap_phases", id);
}

// ─── About — Settings (Founder, Ecosystem Stats, Impact Metrics) ─────────────

export async function getAboutFounder() {
  const s = await getSettings();
  return s.about_founder ?? null;
}

export async function saveAboutFounder(data) {
  return saveSetting("about_founder", data);
}

export async function getAboutEcosystemStats() {
  const s = await getSettings();
  return s.about_ecosystem_stats ?? null;
}

export async function saveAboutEcosystemStats(data) {
  return saveSetting("about_ecosystem_stats", data);
}

export async function getAboutImpactMetrics() {
  const s = await getSettings();
  return s.about_impact_metrics ?? null;
}

export async function saveAboutImpactMetrics(data) {
  return saveSetting("about_impact_metrics", data);
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

// ─── Portfolio — Filter Options ───────────────────────────────────────────────

export async function getPortfolioFilterOptions() {
  const s = await getSettings();
  return s.portfolio_filter_options ?? null;
}

export async function savePortfolioFilterOptions(data) {
  return saveSetting("portfolio_filter_options", data);
}

// ─── Join-Us — Process Steps ──────────────────────────────────────────────────

export async function getJoinUsProcessSteps() {
  return fetchTable("join_us_process_steps", { orderBy: "sort_order" });
}

export async function saveJoinUsProcessStep(item) {
  return upsertRow("join_us_process_steps", item);
}

export async function deleteJoinUsProcessStep(id) {
  return deleteRow("join_us_process_steps", id);
}

// ─── Insights — Categories ────────────────────────────────────────────────────

export async function getInsightsCategories() {
  const s = await getSettings();
  return s.insights_categories ?? null;
}

export async function saveInsightsCategories(data) {
  return saveSetting("insights_categories", data);
}

// ─── Insights — Blog Posts ────────────────────────────────────────────────────

export async function getBlogPosts(activeOnly = true) {
  return fetchTable("blog_posts", {
    orderBy: "sort_order",
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveBlogPost(post) {
  return upsertRow("blog_posts", post);
}

export async function deleteBlogPost(id) {
  return deleteRow("blog_posts", id);
}

// ─── Insights — Whitepapers ───────────────────────────────────────────────────

export async function getWhitepapers(activeOnly = true) {
  return fetchTable("whitepapers", {
    orderBy: "sort_order",
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveWhitepaper(item) {
  return upsertRow("whitepapers", item);
}

export async function deleteWhitepaper(id) {
  return deleteRow("whitepapers", id);
}

// ─── Insights — Tech Talks ────────────────────────────────────────────────────

export async function getTechTalks(activeOnly = true) {
  return fetchTable("tech_talks", {
    orderBy: "sort_order",
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveTechTalk(item) {
  return upsertRow("tech_talks", item);
}

export async function deleteTechTalk(id) {
  return deleteRow("tech_talks", id);
}

// ─── Insights — Industry Reports ──────────────────────────────────────────────

export async function getIndustryReports(activeOnly = true) {
  return fetchTable("industry_reports", {
    orderBy: "sort_order",
    filters: activeOnly ? { active: true } : {},
  });
}

export async function saveIndustryReport(item) {
  return upsertRow("industry_reports", item);
}

export async function deleteIndustryReport(id) {
  return deleteRow("industry_reports", id);
}
