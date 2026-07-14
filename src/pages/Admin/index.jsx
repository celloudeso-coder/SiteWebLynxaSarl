import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminGuard from "./components/AdminGuard";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./AdminDashboard";
import HeroAdmin from "./sections/HeroAdmin";
import ServicesAdmin from "./sections/ServicesAdmin";
import PortfolioAdmin from "./sections/PortfolioAdmin";
import TeamAdmin from "./sections/TeamAdmin";
import PricingAdmin from "./sections/PricingAdmin";
import TimelineAdmin from "./sections/TimelineAdmin";
import MetricsAdmin from "./sections/MetricsAdmin";
import TestimonialsAdmin from "./sections/TestimonialsAdmin";
import PartnershipAdmin from "./sections/PartnershipAdmin";
import JoinUsAdmin from "./sections/JoinUsAdmin";
import NewsletterAdmin from "./sections/NewsletterAdmin";
import SettingsAdmin from "./sections/SettingsAdmin";
import PageSectionsAdmin from "./sections/PageSectionsAdmin";
import MessagesAdmin from "./sections/MessagesAdmin";
import HomeContentAdmin from "./sections/HomeContentAdmin";
import AboutContentAdmin from "./sections/AboutContentAdmin";
import ServicesContentAdmin from "./sections/ServicesContentAdmin";
import PortfolioContentAdmin from "./sections/PortfolioContentAdmin";
import ContactContentAdmin from "./sections/ContactContentAdmin";
import PartnershipContentAdmin from "./sections/PartnershipContentAdmin";
import JoinUsContentAdmin from "./sections/JoinUsContentAdmin";
import InsightsAdmin from "./sections/InsightsAdmin";
import SubscriptionTrackerAdmin from "./sections/SubscriptionTrackerAdmin";
import AdminUsersAdmin from "./sections/AdminUsersAdmin";
import RequireAdminRole from "./components/RequireAdminRole";
import RequireAdminPermission from "./components/RequireAdminPermission";

export default function AdminApp() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="hero" element={<RequireAdminPermission resource="hero"><HeroAdmin /></RequireAdminPermission>} />
          <Route path="services" element={<RequireAdminPermission resource="services"><ServicesAdmin /></RequireAdminPermission>} />
          <Route path="portfolio" element={<RequireAdminPermission resource="portfolio"><PortfolioAdmin /></RequireAdminPermission>} />
          <Route path="team" element={<RequireAdminPermission resource="team"><TeamAdmin /></RequireAdminPermission>} />
          <Route path="pricing" element={<RequireAdminPermission resource="pricing"><PricingAdmin /></RequireAdminPermission>} />
          <Route path="timeline" element={<RequireAdminPermission resource="timeline"><TimelineAdmin /></RequireAdminPermission>} />
          <Route path="metrics" element={<RequireAdminPermission resource="metrics"><MetricsAdmin /></RequireAdminPermission>} />
          <Route path="testimonials" element={<RequireAdminPermission resource="testimonials"><TestimonialsAdmin /></RequireAdminPermission>} />
          <Route path="partnership" element={<RequireAdminPermission resource="partnership"><PartnershipAdmin /></RequireAdminPermission>} />
          <Route path="join-us" element={<RequireAdminPermission resource="recruitment"><JoinUsAdmin /></RequireAdminPermission>} />
          <Route path="home-content" element={<RequireAdminPermission resource="home_content"><HomeContentAdmin /></RequireAdminPermission>} />
          <Route path="about-content" element={<RequireAdminPermission resource="about_content"><AboutContentAdmin /></RequireAdminPermission>} />
          <Route path="services-content" element={<RequireAdminPermission resource="services_content"><ServicesContentAdmin /></RequireAdminPermission>} />
          <Route path="portfolio-content" element={<RequireAdminPermission resource="portfolio_content"><PortfolioContentAdmin /></RequireAdminPermission>} />
          <Route path="contact-content" element={<RequireAdminPermission resource="contact_content"><ContactContentAdmin /></RequireAdminPermission>} />
          <Route path="partnership-content" element={<RequireAdminPermission resource="partnership_content"><PartnershipContentAdmin /></RequireAdminPermission>} />
          <Route path="join-us-content" element={<RequireAdminPermission resource="recruitment_content"><JoinUsContentAdmin /></RequireAdminPermission>} />
          <Route path="insights-content" element={<RequireAdminPermission resource="insights"><InsightsAdmin /></RequireAdminPermission>} />
          <Route path="messages" element={<RequireAdminPermission resource="messages"><MessagesAdmin /></RequireAdminPermission>} />
          <Route path="newsletter" element={<RequireAdminPermission resource="newsletter"><NewsletterAdmin /></RequireAdminPermission>} />
          <Route path="settings" element={<RequireAdminPermission resource="settings"><SettingsAdmin /></RequireAdminPermission>} />
          <Route path="subscriptions" element={<RequireAdminPermission resource="subscriptions"><SubscriptionTrackerAdmin /></RequireAdminPermission>} />
          <Route path="users" element={<RequireAdminRole role="owner"><AdminUsersAdmin /></RequireAdminRole>} />

          {/* Sections des Pages */}
          <Route path="pages/home" element={<RequireAdminPermission resources={["hero", "metrics", "services", "testimonials", "home_content"]}><PageSectionsAdmin page="home" /></RequireAdminPermission>} />
          <Route path="pages/about" element={<RequireAdminPermission resources={["hero", "team", "timeline", "about_content"]}><PageSectionsAdmin page="about" /></RequireAdminPermission>} />
          <Route path="pages/services" element={<RequireAdminPermission resources={["hero", "services", "pricing", "services_content"]}><PageSectionsAdmin page="services" /></RequireAdminPermission>} />
          <Route path="pages/portfolio" element={<RequireAdminPermission resources={["hero", "portfolio", "portfolio_content"]}><PageSectionsAdmin page="portfolio" /></RequireAdminPermission>} />
          <Route path="pages/contact" element={<RequireAdminPermission resources={["hero", "settings", "contact_content"]}><PageSectionsAdmin page="contact" /></RequireAdminPermission>} />
          <Route path="pages/partnership" element={<RequireAdminPermission resources={["hero", "partnership", "partnership_content"]}><PageSectionsAdmin page="partnership" /></RequireAdminPermission>} />
          <Route path="pages/join-us" element={<RequireAdminPermission resources={["hero", "recruitment", "recruitment_content"]}><PageSectionsAdmin page="join-us" /></RequireAdminPermission>} />
          <Route path="pages/insights" element={<RequireAdminPermission resources={["hero", "insights"]}><PageSectionsAdmin page="insights" /></RequireAdminPermission>} />
        </Routes>
      </AdminLayout>
    </AdminGuard>
  );
}
