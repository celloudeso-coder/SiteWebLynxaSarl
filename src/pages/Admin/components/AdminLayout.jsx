import React, { useState, useMemo, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import {
  Globe, Briefcase, FolderOpen,
  Users, DollarSign, Clock, BarChart2, MessageSquare,
  Settings, LogOut, Menu, X, ChevronRight, ChevronDown,
  Mail, Handshake, UserPlus, Home, Info, Layers, CalendarClock,
  Phone, LayoutGrid, Inbox, Sparkles, Newspaper,
  ShieldCheck, Download, WifiOff, RefreshCw, AlertTriangle,
} from "lucide-react";
import { ADMIN_ROLES, ROUTE_RESOURCES } from "../../../lib/adminUsers";
import { useAdminAuth } from "./AdminAuthContext";
import { useAdminPwa } from "../../../lib/adminPwa";

// ── Nav structure ─────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    id: "contenu",
    label: "Contenu principal",
    items: [
      { to: "/admin/hero",         label: "Hero Sections", icon: Globe, resource: "hero" },
      { to: "/admin/services",     label: "Services",      icon: Briefcase, resource: "services" },
      { to: "/admin/portfolio",    label: "Portfolio",     icon: FolderOpen, resource: "portfolio" },
      { to: "/admin/timeline",     label: "Timeline",      icon: Clock, resource: "timeline" },
      { to: "/admin/testimonials", label: "Témoignages",   icon: MessageSquare, resource: "testimonials" },
    ],
  },
  {
    id: "business",
    label: "Équipe & Business",
    items: [
      { to: "/admin/team",         label: "Équipe",        icon: Users, resource: "team" },
      { to: "/admin/pricing",      label: "Tarifs",        icon: DollarSign, resource: "pricing" },
      { to: "/admin/metrics",      label: "Métriques",     icon: BarChart2, resource: "metrics" },
      { to: "/admin/partnership",  label: "Partenariat",   icon: Handshake, resource: "partnership" },
      { to: "/admin/join-us",      label: "Rejoindre",     icon: UserPlus, resource: "recruitment" },
      { to: "/admin/subscriptions", label: "Abonnements",  icon: CalendarClock, resource: "subscriptions" },
    ],
  },
  {
    id: "pages-content",
    label: "Contenu des pages",
    items: [
      { to: "/admin/home-content",        label: "Accueil+",     icon: Sparkles, resource: "home_content" },
      { to: "/admin/about-content",       label: "À propos+",    icon: Info, resource: "about_content" },
      { to: "/admin/services-content",    label: "Services+",    icon: Layers, resource: "services_content" },
      { to: "/admin/portfolio-content",   label: "Portfolio+",   icon: FolderOpen, resource: "portfolio_content" },
      { to: "/admin/contact-content",     label: "Contact+",     icon: Phone, resource: "contact_content" },
      { to: "/admin/partnership-content", label: "Partenariat+", icon: Handshake, resource: "partnership_content" },
      { to: "/admin/join-us-content",     label: "Rejoindre+",   icon: UserPlus, resource: "recruitment_content" },
      { to: "/admin/insights-content",    label: "Insights+",    icon: Newspaper, resource: "insights" },
    ],
  },
  {
    id: "pages",
    label: "Sections des pages",
    items: [
      { to: "/admin/pages/home", label: "Accueil", icon: Home, resources: ["hero", "metrics", "services", "testimonials", "home_content"] },
      { to: "/admin/pages/about", label: "À propos", icon: Info, resources: ["hero", "team", "timeline", "about_content"] },
      { to: "/admin/pages/services", label: "Services", icon: Layers, resources: ["hero", "services", "pricing", "services_content"] },
      { to: "/admin/pages/portfolio", label: "Portfolio", icon: FolderOpen, resources: ["hero", "portfolio", "portfolio_content"] },
      { to: "/admin/pages/contact", label: "Contact", icon: Phone, resources: ["hero", "settings", "contact_content"] },
      { to: "/admin/pages/partnership", label: "Partenariat", icon: Handshake, resources: ["hero", "partnership", "partnership_content"] },
      { to: "/admin/pages/join-us", label: "Rejoindre", icon: UserPlus, resources: ["hero", "recruitment", "recruitment_content"] },
      { to: "/admin/pages/insights", label: "Insights", icon: Newspaper, resources: ["hero", "insights"] },
    ],
  },
  {
    id: "admin",
    label: "Administration",
    items: [
      { to: "/admin/messages",   label: "Messages",    icon: Inbox, resource: "messages" },
      { to: "/admin/unrecorded-submissions", label: "Soumissions à vérifier", icon: AlertTriangle, resource: "messages" },
      { to: "/admin/newsletter", label: "Newsletter",  icon: Mail, resource: "newsletter" },
      { to: "/admin/settings",   label: "Paramètres",  icon: Settings, resource: "settings" },
      { to: "/admin/users",      label: "Utilisateurs", icon: ShieldCheck, minRole: "owner" },
    ],
  },
];

// ── Collapsible group (contrôlé — un seul ouvert à la fois) ────────────────────
function NavGroup({ group, isOpen, onToggle, onLinkClick }) {
  return (
    <div className="mb-1">
      {/* Group header */}
      <button
        onClick={() => onToggle(group.id)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 transition-colors select-none"
      >
        <span>{group.label}</span>
        <ChevronDown
          size={13}
          className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`}
        />
      </button>

      {/* Items */}
      {isOpen && (
        <div className="mt-0.5 ml-1 pl-2 border-l border-gray-800 space-y-0.5">
          {group.items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"}`
              }
            >
              <Icon size={15} className="flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, can, canAccess } = useAdminAuth();
  const pwa = useAdminPwa();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const accessibleGroups = useMemo(() => NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      if (item.minRole) return can(item.minRole);
      if (item.resource) return canAccess(item.resource, "view");
      if (item.resources) return item.resources.some((resource) => canAccess(resource, "view"));
      return true;
    }),
  })).filter((group) => group.items.length > 0), [profile]);

  const activeResource = useMemo(() => Object.entries(ROUTE_RESOURCES)
    .sort(([a], [b]) => b.length - a.length)
    .find(([route]) => location.pathname.startsWith(route))?.[1], [location.pathname]);

  // Groupe contenant la route active (correspondance sur le préfixe le plus long)
  const activeGroupId = useMemo(() => {
    let best = null, bestLen = -1;
    for (const grp of accessibleGroups) {
      for (const it of grp.items) {
        if (location.pathname.startsWith(it.to) && it.to.length > bestLen) {
          best = grp.id;
          bestLen = it.to.length;
        }
      }
    }
    return best;
  }, [location.pathname, accessibleGroups]);

  // Un seul groupe déroulé à la fois
  const [openGroup, setOpenGroup] = useState(activeGroupId ?? NAV_GROUPS[0].id);

  // Ouvre automatiquement le groupe de la page active lors de la navigation
  useEffect(() => {
    if (activeGroupId) setOpenGroup(activeGroupId);
  }, [activeGroupId]);

  const toggleGroup = (id) => setOpenGroup((prev) => (prev === id ? null : id));

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col bg-gray-950 text-white transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:flex lg:w-64 lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800 flex-shrink-0">
          <div>
            <p className="text-lg font-bold text-white">Lynxa Tech</p>
            <p className="text-xs text-orange-400 font-medium">Admin CMS</p>
          </div>
          <button onClick={closeSidebar} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav — seule cette zone défile si nécessaire */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {/* Dashboard — always visible, no group */}
          <NavLink
            to="/admin"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors mb-3
              ${isActive
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"}`
            }
          >
            <LayoutGrid size={16} />
            Dashboard
          </NavLink>

          {/* Divider */}
          <div className="border-t border-gray-800 mb-3" />

          {/* Grouped navigation */}
          {accessibleGroups.map((group) => (
            <NavGroup
              key={group.id}
              group={group}
              isOpen={openGroup === group.id}
              onToggle={toggleGroup}
              onLinkClick={closeSidebar}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-800 flex-shrink-0">
          <div className="mb-3 flex items-center gap-2.5 px-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/15 text-xs font-bold text-orange-400">
              {(profile.full_name || profile.email || "A").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-gray-200">{profile.full_name || profile.email}</p>
              <p className="truncate text-[11px] text-gray-500">{ADMIN_ROLES[profile.role]?.label}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={closeSidebar} />
      )}

      {/* Main content */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="admin-topbar flex flex-shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-900"
          >
            <Menu size={22} />
          </button>
          <div className="flex min-w-0 items-center gap-1 text-sm text-gray-500">
            <span className="hidden sm:inline">Lynxa Tech</span>
            <ChevronRight size={14} className="hidden sm:block" />
            <span className="text-gray-900 font-medium">Admin</span>
          </div>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-700">
              {ADMIN_ROLES[profile.role]?.label}
            </span>
          </div>
          {!pwa.online && (
            <span title="Hors ligne" className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
              <WifiOff size={13} /> <span className="hidden sm:inline">Hors ligne</span>
            </span>
          )}
          {(pwa.installable || pwa.manualInstall) && !pwa.installed && (
            <button
              type="button"
              onClick={pwa.install}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-2.5 py-2 text-xs font-medium text-white hover:bg-gray-800 sm:px-3"
            >
              <Download size={14} /> <span className="hidden md:inline">Installer l’app</span>
            </button>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir le site public"
            className="whitespace-nowrap text-xs font-medium text-orange-500 hover:underline"
          >
            <span className="hidden sm:inline">Voir le site </span>→
          </a>
        </header>

        {/* Page content — seule zone qui défile */}
        <main className="admin-content flex-1 overscroll-contain overflow-y-auto p-3 sm:p-4 lg:p-6">
          {pwa.updateAvailable && (
            <div className="mb-4 flex flex-col gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800 sm:flex-row sm:items-center sm:justify-between">
              <span>Une nouvelle version de l’administration est disponible.</span>
              <button type="button" onClick={pwa.update} className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600">
                <RefreshCw size={14} /> Mettre à jour
              </button>
            </div>
          )}
          {activeResource && canAccess(activeResource, "view") && !canAccess(activeResource, "update") && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              <ShieldCheck size={17} /> Accès en lecture seule pour cette section — les modifications sont bloquées par vos permissions.
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
