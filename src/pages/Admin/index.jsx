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

export default function AdminApp() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="hero"         element={<HeroAdmin />} />
          <Route path="services"     element={<ServicesAdmin />} />
          <Route path="portfolio"    element={<PortfolioAdmin />} />
          <Route path="team"         element={<TeamAdmin />} />
          <Route path="pricing"      element={<PricingAdmin />} />
          <Route path="timeline"     element={<TimelineAdmin />} />
          <Route path="metrics"      element={<MetricsAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="partnership"  element={<PartnershipAdmin />} />
          <Route path="join-us"      element={<JoinUsAdmin />} />
          <Route path="home-content"  element={<HomeContentAdmin />} />
          <Route path="messages"     element={<MessagesAdmin />} />
          <Route path="newsletter"   element={<NewsletterAdmin />} />
          <Route path="settings"     element={<SettingsAdmin />} />

          {/* Sections des Pages */}
          <Route path="pages/home"        element={<PageSectionsAdmin page="home" />} />
          <Route path="pages/about"       element={<PageSectionsAdmin page="about" />} />
          <Route path="pages/services"    element={<PageSectionsAdmin page="services" />} />
          <Route path="pages/portfolio"   element={<PageSectionsAdmin page="portfolio" />} />
          <Route path="pages/contact"     element={<PageSectionsAdmin page="contact" />} />
          <Route path="pages/partnership" element={<PageSectionsAdmin page="partnership" />} />
        </Routes>
      </AdminLayout>
    </AdminGuard>
  );
}
