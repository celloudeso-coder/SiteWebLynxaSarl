import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import {
  LayoutDashboard, Globe, Briefcase, FolderOpen,
  Users, DollarSign, Clock, BarChart2, MessageSquare,
  Settings, LogOut, Menu, X, ChevronRight, ChevronDown,
  Mail, Handshake, UserPlus, Home, Info, Layers, BookOpen,
  Phone, LayoutGrid, Inbox, Sparkles, Newspaper,
} from "lucide-react";

// ── Nav structure ─────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    id: "contenu",
    label: "Contenu",
    defaultOpen: true,
    items: [
      { to: "/admin/hero",         label: "Hero Sections", icon: Globe         },
      { to: "/admin/services",     label: "Services",      icon: Briefcase     },
      { to: "/admin/portfolio",    label: "Portfolio",     icon: FolderOpen    },
      { to: "/admin/timeline",     label: "Timeline",      icon: Clock         },
      { to: "/admin/testimonials",  label: "Témoignages",   icon: MessageSquare },
      { to: "/admin/home-content",  label: "Accueil+",      icon: Sparkles      },
      { to: "/admin/about-content",    label: "À propos+",    icon: Info          },
      { to: "/admin/services-content",   label: "Services+",    icon: Layers        },
      { to: "/admin/portfolio-content",    label: "Portfolio+",   icon: FolderOpen    },
      { to: "/admin/contact-content",     label: "Contact+",     icon: Phone         },
      { to: "/admin/partnership-content", label: "Partenariat+", icon: Handshake     },
      { to: "/admin/join-us-content",     label: "Rejoindre+",   icon: UserPlus      },
      { to: "/admin/insights-content",    label: "Insights+",    icon: Newspaper     },
    ],
  },
  {
    id: "business",
    label: "Équipe & Business",
    defaultOpen: false,
    items: [
      { to: "/admin/team",         label: "Équipe",        icon: Users         },
      { to: "/admin/pricing",      label: "Tarifs",        icon: DollarSign    },
      { to: "/admin/metrics",      label: "Métriques",     icon: BarChart2     },
      { to: "/admin/partnership",  label: "Partenariat",   icon: Handshake     },
      { to: "/admin/join-us",      label: "Rejoindre",     icon: UserPlus      },
    ],
  },
  {
    id: "pages",
    label: "Sections des Pages",
    defaultOpen: false,
    items: [
      { to: "/admin/pages/home",        label: "Accueil",     icon: Home      },
      { to: "/admin/pages/about",       label: "À propos",    icon: Info      },
      { to: "/admin/pages/services",    label: "Services",    icon: Layers    },
      { to: "/admin/pages/portfolio",   label: "Portfolio",   icon: FolderOpen},
      { to: "/admin/pages/contact",     label: "Contact",     icon: Phone     },
      { to: "/admin/pages/partnership", label: "Partenariat", icon: Handshake },
      { to: "/admin/pages/join-us",     label: "Rejoindre",   icon: UserPlus  },
      { to: "/admin/pages/insights",    label: "Insights",    icon: Newspaper },
    ],
  },
  {
    id: "admin",
    label: "Administration",
    defaultOpen: false,
    items: [
      { to: "/admin/messages",   label: "Messages",    icon: Inbox    },
      { to: "/admin/newsletter", label: "Newsletter",  icon: Mail     },
      { to: "/admin/settings",   label: "Paramètres",  icon: Settings },
    ],
  },
];

// ── Collapsible group ─────────────────────────────────────────────────────────
function NavGroup({ group, onLinkClick }) {
  const location = useLocation();
  const hasActive = group.items.some((item) => location.pathname.startsWith(item.to));
  const [open, setOpen] = useState(group.defaultOpen || hasActive);

  return (
    <div className="mb-1">
      {/* Group header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 transition-colors select-none"
      >
        <span>{group.label}</span>
        {open
          ? <ChevronDown size={13} className="flex-shrink-0 transition-transform" />
          : <ChevronRight size={13} className="flex-shrink-0 transition-transform" />}
      </button>

      {/* Items */}
      {open && (
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 text-white flex flex-col transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
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

        {/* Nav */}
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
          {NAV_GROUPS.map((group) => (
            <NavGroup key={group.id} group={group} onLinkClick={closeSidebar} />
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-800 flex-shrink-0">
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 lg:px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-900"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>Lynxa Tech</span>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Admin</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-orange-500 hover:underline font-medium"
          >
            Voir le site →
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
