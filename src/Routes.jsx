import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContactMultiChannelConnection from "./pages/Contact";
import AboutInnovationStoryVision from "./pages/About";
import TeamSpotlight1 from "./pages/About/components/TeamSpotlight1";
import PartnershipCollaborationGateway from "./pages/Partnership";
import ServicesPage from "./pages/Services";
import Homepage from "./pages/Home";
import PortfolioShowcase from "./pages/Portfolio";
import InsightsKnowledgeLeadership from "./pages/insights-knowledge-leadership";
import JoinUsPage from "pages/join-us";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminAcceptInvite from "./pages/Admin/AdminAcceptInvite";
import AdminApp from "./pages/Admin";
import LegalPage from "./pages/Legal";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/contact" element={<ContactMultiChannelConnection />} />
          <Route path="/about" element={<AboutInnovationStoryVision />} />
          <Route path="/about/teamspotlight1" element={<TeamSpotlight1 />} />
          <Route path="/partnership" element={<PartnershipCollaborationGateway />} />
          <Route path="/service" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioShowcase />} />
          <Route path="/insights" element={<InsightsKnowledgeLeadership />} />
          <Route path="/insights-knowledge-leadership" element={<InsightsKnowledgeLeadership />} />
          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="/confidentialite" element={<LegalPage page="confidentialite" />} />
          <Route path="/cgu" element={<LegalPage page="cgu" />} />
          <Route path="/securite" element={<LegalPage page="securite" />} />
          {/* Admin CMS */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/accept-invite" element={<AdminAcceptInvite />} />
          <Route path="/admin/*" element={<AdminApp />} />
          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
