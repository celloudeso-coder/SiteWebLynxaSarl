import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import {
  LayoutDashboard, Globe, Briefcase, FolderOpen,
  Users, DollarSign, Clock, BarChart2, MessageSquare,
  Settings, LogOut, Menu, X, ChevronRight
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/hero", label: "Hero Sections", icon: Globe },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { to: "/admin/team", label: "Équipe", icon: Users },
  { to: "/admin/pricing", label: "Tarifs", icon: DollarSign },
  { to: "/admin/timeline", label: "Timeline", icon: Clock },
  { to: "/admin/metrics", label: "Métriques", icon: BarChart2 },
  { to: "/admin/testimonials", label: "Témoignages", icon: MessageSquare },
  { to: "/admin/settings", label: "Paramètres", icon: Settings },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 text-white flex flex-col transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div>
            <p className="text-lg font-bold text-white">Lynxa Tech</p>
            <p className="text-xs text-orange-400 font-medium">Admin CMS</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors
                ${isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"}`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={17} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 lg:px-6">
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
