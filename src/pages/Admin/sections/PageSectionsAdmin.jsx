import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, ExternalLink, Lock, CheckCircle2,
  Globe, Briefcase, FolderOpen, Users, DollarSign,
  Clock, BarChart2, MessageSquare, Settings, Handshake,
  Home, Info, Layers, Phone, Mail,
} from "lucide-react";

// ── Page configurations ───────────────────────────────────────────────────────
const PAGE_CONFIGS = {
  home: {
    label: "Accueil",
    path: "/",
    icon: Home,
    color: "bg-blue-500",
    description: "Page d'accueil principale du site Lynxa Tech",
    sections: [
      { label: "Hero Section",       desc: "Titre, sous-titre, boutons d'action",        icon: Globe,         link: "/admin/hero",         cms: true  },
      { label: "Métriques",          desc: "Compteurs et indicateurs de performance",     icon: BarChart2,     link: "/admin/metrics",      cms: true  },
      { label: "Services",           desc: "Aperçu des services sur la page d'accueil",   icon: Briefcase,     link: "/admin/services",     cms: true  },
      { label: "Témoignages",        desc: "Citations et avis clients",                   icon: MessageSquare, link: "/admin/testimonials", cms: true  },
      { label: "Pourquoi Lynxa ?",   desc: "Section des avantages — intégrée au code",   icon: Lock,          link: null,                  cms: false },
      { label: "Bande Engagements",  desc: "4 engagements clés — intégré au code",        icon: Lock,          link: null,                  cms: false },
    ],
  },
  about: {
    label: "À propos",
    path: "/about",
    icon: Info,
    color: "bg-purple-500",
    description: "Page de présentation de l'entreprise et de l'équipe",
    sections: [
      { label: "Hero Section",       desc: "Titre et description de la page",              icon: Globe,         link: "/admin/hero",         cms: true  },
      { label: "Équipe",             desc: "Membres et profils de l'équipe",               icon: Users,         link: "/admin/team",         cms: true  },
      { label: "Timeline",           desc: "Historique et jalons de l'entreprise",         icon: Clock,         link: "/admin/timeline",     cms: true  },
      { label: "Histoire Fondateur", desc: "Story du fondateur — intégrée au code",        icon: Lock,          link: null,                  cms: false },
      { label: "Valeurs",            desc: "Valeurs de l'entreprise — intégrées au code",  icon: Lock,          link: null,                  cms: false },
      { label: "Pourquoi Guinée ?",  desc: "Avantages Guinée — intégré au code",           icon: Lock,          link: null,                  cms: false },
      { label: "Vision & Roadmap",   desc: "Feuille de route — intégrée au code",          icon: Lock,          link: null,                  cms: false },
    ],
  },
  services: {
    label: "Services",
    path: "/service",
    icon: Layers,
    color: "bg-orange-500",
    description: "Page de présentation des services et tarifs",
    sections: [
      { label: "Hero Section",      desc: "Titre et description de la page Services",     icon: Globe,      link: "/admin/hero",     cms: true  },
      { label: "Services",          desc: "Liste et détails de chaque service",            icon: Briefcase,  link: "/admin/services", cms: true  },
      { label: "Tarifs",            desc: "Plans et grilles tarifaires",                   icon: DollarSign, link: "/admin/pricing",  cms: true  },
      { label: "Processus",         desc: "Timeline du processus — intégrée au code",      icon: Lock,       link: null,              cms: false },
      { label: "Stack Technique",   desc: "Technologies utilisées — intégrée au code",     icon: Lock,       link: null,              cms: false },
    ],
  },
  portfolio: {
    label: "Portfolio",
    path: "/portfolio",
    icon: FolderOpen,
    color: "bg-teal-500",
    description: "Page de présentation des projets réalisés",
    sections: [
      { label: "Hero Section", desc: "Titre et description de la page Portfolio",          icon: Globe,      link: "/admin/hero",      cms: true  },
      { label: "Projets",      desc: "Liste des projets et études de cas",                 icon: FolderOpen, link: "/admin/portfolio", cms: true  },
      { label: "Lab Innovation",desc: "Section R&D — intégrée au code",                   icon: Lock,       link: null,               cms: false },
    ],
  },
  contact: {
    label: "Contact",
    path: "/contact",
    icon: Phone,
    color: "bg-green-500",
    description: "Page de contact et formulaire de prise de contact",
    sections: [
      { label: "Hero Section",    desc: "Titre et description de la page Contact",         icon: Globe,    link: "/admin/hero",     cms: true  },
      { label: "Paramètres",      desc: "Email, téléphone, adresse",                       icon: Settings, link: "/admin/settings", cms: true  },
      { label: "Formulaire",      desc: "Formulaire de contact — intégré au code",          icon: Lock,     link: null,              cms: false },
      { label: "Localisation",    desc: "Carte et adresse — intégrée au code",              icon: Lock,     link: null,              cms: false },
    ],
  },
  partnership: {
    label: "Partenariat",
    path: "/partnership",
    icon: Handshake,
    color: "bg-indigo-500",
    description: "Page de présentation des opportunités de partenariat",
    sections: [
      { label: "Hero Section",   desc: "Titre et description de la page Partenariat",     icon: Globe,     link: "/admin/hero",        cms: true  },
      { label: "Partenariat",    desc: "Formulaire et options de partenariat",             icon: Handshake, link: "/admin/partnership", cms: true  },
      { label: "Processus",      desc: "Étapes du partenariat — intégrées au code",        icon: Lock,      link: null,                cms: false },
      { label: "Signaux Confiance", desc: "Certifications, garanties — intégrées au code", icon: Lock,     link: null,                cms: false },
    ],
  },
};

// ── Sub-component: section card ───────────────────────────────────────────────
function SectionCard({ section }) {
  const { label, desc, icon: Icon, link, cms } = section;

  const inner = (
    <div className={`flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 group
      ${cms && link
        ? "bg-white border-gray-200 hover:border-orange-300 hover:shadow-md cursor-pointer"
        : "bg-gray-50 border-gray-100 cursor-default opacity-75"}`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${cms ? "bg-orange-50" : "bg-gray-100"}`}>
        <Icon size={18} className={cms ? "text-orange-500" : "text-gray-400"} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {cms
            ? <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
            : <Lock size={12} className="text-gray-400 flex-shrink-0" />}
        </div>
        <p className="text-xs text-gray-500 leading-snug">{desc}</p>
      </div>
      {cms && link && (
        <ArrowRight size={15} className="text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
      )}
    </div>
  );

  if (cms && link) {
    return <Link to={link}>{inner}</Link>;
  }
  return inner;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PageSectionsAdmin({ page }) {
  const config = PAGE_CONFIGS[page];
  const navigate = useNavigate();

  if (!config) {
    return (
      <div className="text-center py-20 text-gray-400">
        Page « {page} » introuvable.
      </div>
    );
  }

  const PageIcon = config.icon;
  const cmsCount  = config.sections.filter((s) => s.cms).length;
  const totalCount = config.sections.length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center`}>
            <PageIcon size={22} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Page — {config.label}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{config.description}</p>
          </div>
        </div>
        <a
          href={config.path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-orange-500 hover:underline font-medium"
        >
          <ExternalLink size={13} />
          Voir la page
        </a>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
          <CheckCircle2 size={15} className="text-green-500" />
          <span className="text-sm font-medium text-green-700">{cmsCount} section{cmsCount > 1 ? "s" : ""} éditables via CMS</span>
        </div>
        <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
          <Lock size={14} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-500">{totalCount - cmsCount} section{totalCount - cmsCount > 1 ? "s" : ""} intégrées au code</span>
        </div>
      </div>

      {/* Sections grid */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {config.sections.map((section, i) => (
          <SectionCard key={i} section={section} />
        ))}
      </div>

      {/* Info notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lock size={14} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-800 mb-1">Sections intégrées au code</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Les sections marquées <span className="font-medium">« intégrées au code »</span> ne sont pas encore connectées au CMS.
              Pour les modifier, éditez directement les fichiers composants correspondants dans le code source.
              Une future version permettra de les gérer via ce panneau.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
