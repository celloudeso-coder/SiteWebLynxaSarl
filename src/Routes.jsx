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
// import InsightsKnowledgeLeadership from './pages/insights-knowledge-leadership';
import JoinUsPage from "pages/join-us";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<ContactMultiChannelConnection />} />
          <Route path="/about" element={<AboutInnovationStoryVision />} />
          <Route
            path="/partnership"
            element={<PartnershipCollaborationGateway />}
          />
          <Route path="/service" element={<ServicesPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/portfolio" element={<PortfolioShowcase />} />
          {/* <Route path="/insights-knowledge-leadership" element={<InsightsKnowledgeLeadership />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="/about/teamspotlight1" element={<TeamSpotlight1 />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
