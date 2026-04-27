import React from "react";
import { Link } from "react-router-dom";
import {
  Globe, Briefcase, FolderOpen, Users,
  DollarSign, Clock, BarChart2, MessageSquare, Settings,
  ArrowRight
} from "lucide-react";

const sections = [
  { to: "/admin/hero", label: "Hero Sections", desc: "Titres et descriptions des pages", icon: Globe, color: "bg-blue-50 text-blue-600" },
  { to: "/admin/services", label: "Services", desc: "Offres et détails techniques", icon: Briefcase, color: "bg-orange-50 text-orange-600" },
  { to: "/admin/portfolio", label: "Portfolio", desc: "Projets et études de cas", icon: FolderOpen, color: "bg-purple-50 text-purple-600" },
  { to: "/admin/team", label: "Équipe", desc: "Membres et profils", icon: Users, color: "bg-green-50 text-green-600" },
  { to: "/admin/pricing", label: "Tarifs", desc: "Plans et grilles tarifaires", icon: DollarSign, color: "bg-yellow-50 text-yellow-600" },
  { to: "/admin/timeline", label: "Timeline", desc: "Historique de l'entreprise", icon: Clock, color: "bg-pink-50 text-pink-600" },
  { to: "/admin/metrics", label: "Métriques", desc: "Compteurs et statistiques", icon: BarChart2, color: "bg-teal-50 text-teal-600" },
  { to: "/admin/testimonials", label: "Témoignages", desc: "Citations et avis clients", icon: MessageSquare, color: "bg-indigo-50 text-indigo-600" },
  { to: "/admin/settings", label: "Paramètres", desc: "Contact, réseaux sociaux, infos", icon: Settings, color: "bg-gray-100 text-gray-600" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez tout le contenu du site Lynxa Tech depuis ce panneau.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ to, label, desc, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-orange-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <ArrowRight
                size={16}
                className="text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all"
              />
            </div>
            <h3 className="font-semibold text-gray-900 mt-3 text-sm">{label}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-5">
        <h2 className="font-semibold text-orange-900 text-sm mb-2">Premiers pas</h2>
        <ol className="text-sm text-orange-800 space-y-1 list-decimal list-inside">
          <li>Exécutez <code className="bg-orange-100 px-1 rounded">supabase/schema.sql</code> dans l'éditeur SQL Supabase</li>
          <li>Modifiez les sections Hero de chaque page</li>
          <li>Mettez à jour vos services, tarifs et membres d'équipe</li>
          <li>Ajoutez vos projets portfolio avec témoignages</li>
        </ol>
      </div>
    </div>
  );
}
