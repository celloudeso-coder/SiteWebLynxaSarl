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
          <Route path="home-content"   element={<HomeContentAdmin />} />
          <Route path="about-content"    element={<AboutContentAdmin />} />
          <Route path="services-content"   element={<ServicesContentAdmin />} />
          <Route path="portfolio-content"    element={<PortfolioContentAdmin />} />
          <Route path="contact-content"     element={<ContactContentAdmin />} />
          <Route path="partnership-content" element={<PartnershipContentAdmin />} />
          <Route path="join-us-content"     element={<JoinUsContentAdmin />} />
          <Route path="insights-content"    element={<InsightsAdmin />} />
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
          <Route path="pages/join-us"     element={<PageSectionsAdmin page="join-us" />} />
          <Route path="pages/insights"    element={<PageSectionsAdmin page="insights" />} />
        </Routes>
      </AdminLayout>
    </AdminGuard>
  );
}
