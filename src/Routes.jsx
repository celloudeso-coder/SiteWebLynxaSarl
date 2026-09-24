import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import RouteLoadingScreen from "components/RouteLoadingScreen";

// NotFound importe AppIcon ("import * as LucideIcons from 'lucide-react'") :
// statique, il embarquerait toute la bibliothèque d'icônes dans le chunk
// d'entrée. Différé comme le reste.
const NotFound = lazy(() => import("pages/NotFound"));

// Chargement différé par route : le bundle public initial n'embarque plus
// les pages elles-mêmes (chacune part dans son propre chunk téléchargé au
// moment de la navigation), et surtout pas le CMS d'administration
// (./pages/Admin/*), qu'un visiteur du site public ne doit jamais recevoir.
const ContactMultiChannelConnection = lazy(() => import("./pages/Contact"));
const AboutInnovationStoryVision = lazy(() => import("./pages/About"));
const TeamSpotlight1 = lazy(() => import("./pages/About/components/TeamSpotlight1"));
const PartnershipCollaborationGateway = lazy(() => import("./pages/Partnership"));
const ServicesPage = lazy(() => import("./pages/Services"));
const Homepage = lazy(() => import("./pages/Home"));
const PortfolioShowcase = lazy(() => import("./pages/Portfolio"));
const InsightsKnowledgeLeadership = lazy(() => import("./pages/insights-knowledge-leadership"));
const JoinUsPage = lazy(() => import("pages/join-us"));
const LegalPage = lazy(() => import("./pages/Legal"));
const ProductPage = lazy(() => import("./pages/Product"));

// Admin CMS : isolé dans ses propres chunks, jamais référencé statiquement
// depuis le code public.
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const AdminAcceptInvite = lazy(() => import("./pages/Admin/AdminAcceptInvite"));
const AdminApp = lazy(() => import("./pages/Admin"));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<RouteLoadingScreen />}>
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
            <Route path="/produits/:slug" element={<ProductPage />} />
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
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
