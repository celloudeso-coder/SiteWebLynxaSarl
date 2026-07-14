import React from "react";
import { Link } from "react-router-dom";
import {
  Globe, Briefcase, FolderOpen, Users,
  DollarSign, Clock, BarChart2, MessageSquare, Settings,
  ArrowRight, Handshake, UserPlus, Mail,
  Home, Info, Layers, Phone, LayoutGrid, Lock, CheckCircle2, Inbox,
  Newspaper, CalendarClock,
  ShieldCheck,
} from "lucide-react";
import { useAdminAuth } from "./components/AdminAuthContext";

const CONTENT_SECTIONS = [
  { to: "/admin/hero", label: "Hero Sections", desc: "Titres et descriptions des pages", icon: Globe, color: "bg-blue-50 text-blue-600", resource: "hero" },
  { to: "/admin/services", label: "Services", desc: "Offres et détails techniques", icon: Briefcase, color: "bg-orange-50 text-orange-600", resource: "services" },
  { to: "/admin/portfolio", label: "Portfolio", desc: "Projets et études de cas", icon: FolderOpen, color: "bg-purple-50 text-purple-600", resource: "portfolio" },
  { to: "/admin/team", label: "Équipe", desc: "Membres et profils", icon: Users, color: "bg-green-50 text-green-600", resource: "team" },
  { to: "/admin/pricing", label: "Tarifs", desc: "Plans et grilles tarifaires", icon: DollarSign, color: "bg-yellow-50 text-yellow-600", resource: "pricing" },
  { to: "/admin/timeline", label: "Timeline", desc: "Historique de l'entreprise", icon: Clock, color: "bg-pink-50 text-pink-600", resource: "timeline" },
  { to: "/admin/metrics", label: "Métriques", desc: "Compteurs et statistiques", icon: BarChart2, color: "bg-teal-50 text-teal-600", resource: "metrics" },
  { to: "/admin/testimonials", label: "Témoignages", desc: "Citations et avis clients", icon: MessageSquare, color: "bg-indigo-50 text-indigo-600", resource: "testimonials" },
  { to: "/admin/partnership", label: "Partenariat", desc: "Formulaires partenariat", icon: Handshake, color: "bg-rose-50 text-rose-600", resource: "partnership" },
  { to: "/admin/join-us", label: "Rejoindre", desc: "Candidatures et recrutement", icon: UserPlus, color: "bg-cyan-50 text-cyan-600", resource: "recruitment" },
  { to: "/admin/messages", label: "Messages", desc: "Soumissions du formulaire contact", icon: Inbox, color: "bg-sky-50 text-sky-600", resource: "messages" },
  { to: "/admin/newsletter", label: "Newsletter", desc: "Abonnements et campagnes", icon: Mail, color: "bg-lime-50 text-lime-600", resource: "newsletter" },
  { to: "/admin/subscriptions", label: "Tracker", desc: "Échéances et abonnements clients", icon: CalendarClock, color: "bg-violet-50 text-violet-600", resource: "subscriptions" },
  { to: "/admin/settings", label: "Paramètres", desc: "Contact, réseaux sociaux, infos", icon: Settings, color: "bg-gray-100 text-gray-600", resource: "settings" },
];

const PAGE_SECTIONS = [
  { to: "/admin/pages/home", label: "Accueil", desc: "6 sections éditables", icon: Home, color: "bg-blue-500", cms: 6, total: 6, resources: ["hero", "metrics", "services", "testimonials", "home_content"] },
  { to: "/admin/pages/about", label: "À propos", desc: "7 sections éditables", icon: Info, color: "bg-purple-500", cms: 7, total: 7, resources: ["hero", "team", "timeline", "about_content"] },
  { to: "/admin/pages/services", label: "Services", desc: "5 sections éditables", icon: Layers, color: "bg-orange-500", cms: 5, total: 5, resources: ["hero", "services", "pricing", "services_content"] },
  { to: "/admin/pages/portfolio", label: "Portfolio", desc: "4 sections éditables", icon: FolderOpen, color: "bg-teal-500", cms: 4, total: 4, resources: ["hero", "portfolio", "portfolio_content"] },
  { to: "/admin/pages/contact", label: "Contact", desc: "4 sections éditables", icon: Phone, color: "bg-green-500", cms: 4, total: 4, resources: ["hero", "settings", "contact_content"] },
  { to: "/admin/pages/partnership", label: "Partenariat", desc: "4 sections éditables", icon: Handshake, color: "bg-indigo-500", cms: 4, total: 4, resources: ["hero", "partnership", "partnership_content"] },
  { to: "/admin/pages/join-us", label: "Rejoindre", desc: "4 sections éditables", icon: UserPlus, color: "bg-rose-500", cms: 4, total: 4, resources: ["hero", "recruitment", "recruitment_content"] },
  { to: "/admin/pages/insights", label: "Insights", desc: "6 sections éditables", icon: Newspaper, color: "bg-cyan-500", cms: 6, total: 6, resources: ["hero", "insights"] },
];

function SectionCard({ to, label, desc, icon: Icon, color }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-orange-200 transition-all group"
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <ArrowRight size={16} className="text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="font-semibold text-gray-900 mt-3 text-sm">{label}</h3>
      <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
    </Link>
  );
}

function PageCard({ to, label, icon: Icon, color, cms, total }) {
  const locked = total - cms;
  return (
    <Link
      to={to}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-orange-200 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
          <Icon size={18} color="white" />
        </div>
        <ArrowRight size={16} className="text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm mb-2">{label}</h3>
      <div className="flex gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          <CheckCircle2 size={10} /> {cms} CMS
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          <Lock size={10} /> {locked} code
        </span>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const { can, canAccess } = useAdminAuth();
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez tout le contenu du site Lynxa Tech depuis ce panneau.
        </p>
      </div>

      {/* Sections des Pages */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-orange-500 rounded-full" />
          <h2 className="text-base font-bold text-gray-800">Sections des Pages</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-1">Nouveau</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">Vue par page — identifiez rapidement quelles sections sont éditables pour chaque page du site.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {PAGE_SECTIONS.filter((page) => page.resources.some((resource) => canAccess(resource, "view"))).map((p) => (
            <PageCard key={p.to} {...p} />
          ))}
        </div>
      </div>

      {/* Contenu global */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gray-400 rounded-full" />
          <h2 className="text-base font-bold text-gray-800">Contenu & Administration</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTENT_SECTIONS.filter((section) => canAccess(section.resource, "view")).map((s) => (
            <SectionCard key={s.to} {...s} />
          ))}
        </div>
      </div>

      {can("owner") && (
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-orange-800"><ShieldCheck size={19} /><h2 className="font-bold">Administration en équipe</h2></div>
              <p className="mt-1 text-sm text-orange-800/70">Invitez des collaborateurs et attribuez leurs rôles d’accès au CMS.</p>
            </div>
            <Link to="/admin/users" className="shrink-0 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">Gérer l’équipe</Link>
          </div>
        </div>
      )}

      {/* Getting started */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
        <h2 className="font-semibold text-orange-900 text-sm mb-2">Premiers pas</h2>
        <ol className="text-sm text-orange-800 space-y-1 list-decimal list-inside">
          <li>Exécutez <code className="bg-orange-100 px-1 rounded">supabase/schema.sql</code> dans l'éditeur SQL Supabase</li>
          <li>Modifiez les sections Hero de chaque page via <strong>Hero Sections</strong></li>
          <li>Mettez à jour vos services, tarifs et membres d'équipe</li>
          <li>Utilisez <strong>Sections des Pages</strong> pour un aperçu par page</li>
        </ol>
      </div>
    </div>
  );
}
