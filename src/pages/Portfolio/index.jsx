import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
// import FilterBar from "./components/FilterBar";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import InnovationLab from "./components/InnovationLab";
import ClientLogos from "./components/ClientLogos";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useContent";

const STATIC_PROJECTS = [
    {
      id: 1,
      title: "Mobile Banking for Rural Communities",
      service: "Mobile Development",
      industry: "Financial Services",
      scale: "Enterprise",
      impact: "High",
      description:
        "Une solution bancaire mobile complète conçue spécialement pour les communautés rurales guinéennes, permettant des transactions financières sécurisées sans infrastructure bancaire traditionnelle.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      duration: "8 mois",
      metrics: [
        { label: "Adoption des utilisateurs", value: "+150%" },
        { label: "Volume de transactions", value: "2,5M$+" },
        { label: "Satisfaction des utilisateurs", value: "96%" },
      ],
      challenge: `Les communautés rurales en Guinée faisaient face à d'importantes barrières pour accéder aux services bancaires de base. Les banques traditionnelles étaient situées loin des villages, et de nombreux habitants ne disposaient pas des documents d'identité nécessaires pour ouvrir un compte. Les solutions de mobile money existantes étaient complexes et ne répondaient pas aux besoins spécifiques des communautés agricoles nécessitant une planification de paiements saisonniers et des microcrédits.`,
      solution: `Nous avons développé une plateforme bancaire mobile complète avec des fonctionnalités hors ligne, une authentification biométrique et des fonctions axées sur l'agriculture. La solution comprenait une interface simplifiée avec navigation vocale dans les langues locales, intégration avec les coopératives agricoles et un réseau d'agents villageois pour faciliter les dépôts et retraits.`,
      implementation: [
        "Réalisation de recherches sur le terrain dans 15 villages ruraux pour comprendre les besoins et contraintes des utilisateurs",
        "Conception d'une interface simplifiée avec navigation vocale en langues Peul, Malinké et Soussou",
        "Mise en place d'un système d'authentification biométrique compatible avec les smartphones basiques",
        "Établissement d'un réseau de plus de 200 agents villageois pour les services en espèces",
        "Intégration avec les coopératives agricoles pour la planification des paiements saisonniers",
        "Déploiement d'une architecture orientée offline-first pour gérer une connectivité réseau faible",
        "Formation complète des utilisateurs en partenariat avec des ONG locales",
      ],
      technologies: [
        "React Native",
        "Node.js",
        "MongoDB",
        "Biometric SDK",
        "Offline-First Architecture",
      ],
      testimonial: {
        quote:
          "Cette solution bancaire mobile a transformé la gestion de l'argent dans notre communauté. Nous pouvons désormais envoyer de l'argent à nos proches, payer des biens et même épargner pour l'avenir sans nous déplacer en ville. La navigation vocale dans notre langue locale la rend accessible à tous, même à ceux qui ne savent pas lire.",
        author: "Mamadou Diallo",
        position: "Chef de coopérative villageoise, région de Kindia",
      },
    },
    {
      id: 2,
      title: "NGO Network Infrastructure Overhaul",
      service: "Network Infrastructure",
      industry: "NGO",
      scale: "Enterprise",
      impact: "High",
      description:
        "Refonte complète de l'infrastructure réseau pour une grande ONG internationale, améliorant la connectivité dans 20 bureaux sur le terrain en Guinée et pays voisins.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      duration: "6 mois",
      metrics: [
        { label: "Disponibilité du réseau", value: "99,8%" },
        { label: "Réduction des coûts", value: "45%" },
        { label: "Amélioration de la vitesse", value: "300%" },
      ],
      challenge: `L'ONG internationale rencontrait des problèmes de connectivité Internet instable dans ses 20 bureaux sur le terrain en Guinée, Sierra Leone et Libéria. L'infrastructure réseau existante était obsolète, coûteuse à maintenir et souvent défaillante lors des opérations critiques, entravant la communication entre les équipes et le siège et affectant la réponse humanitaire et le reporting aux donateurs.`,
      solution: `Nous avons conçu et mis en œuvre une solution réseau hybride combinant Internet par satellite, connexions 4G/5G et réseau maillé. La solution incluait des connexions redondantes, une gestion centralisée et un routage prioritaire du trafic pour garantir la bande passante pour les communications critiques. Nous avons également mis en place un cadre de cybersécurité complet pour protéger les données humanitaires sensibles.`,
      implementation: [
        "Évaluation complète du réseau dans les 20 bureaux sur le terrain",
        "Conception d'une solution de connectivité hybride avec satellite et secours cellulaire",
        "Mise en place de la technologie SD-WAN pour un routage intelligent du trafic",
        "Déploiement d'un système centralisé de surveillance et gestion du réseau",
        "Établissement d'un centre d'opérations réseau 24/7 à Conakry",
        "Mise en place de mesures de cybersécurité incluant VPN et firewall",
        "Formation extensive du personnel IT local sur chaque site",
      ],
      technologies: [
        "SD-WAN",
        "Satellite Internet",
        "4G/5G",
        "Network Monitoring",
        "Cybersecurity",
      ],
      testimonial: {
        quote:
          "La transformation du réseau a été incroyable. Nous sommes passés de problèmes de connectivité constants à un Internet fiable et rapide dans tous nos bureaux sur le terrain, améliorant considérablement notre capacité à coordonner les réponses humanitaires et à maintenir la communication avec nos équipes éloignées.",
        author: "Sarah Johnson",
        position: "Directrice IT, Organisation internationale de secours",
      },
    },
    {
      id: 3,
      title: "Government Cybersecurity Implementation",
      service: "Cybersecurity",
      industry: "Government",
      scale: "Enterprise",
      impact: "High",
      description:
        "Mise en place d'un cadre complet de cybersécurité pour une institution gouvernementale guinéenne, protégeant les données sensibles des citoyens et les infrastructures critiques.",
      image:
        "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=250&fit=crop",
      duration: "12 mois",
      metrics: [
        { label: "Prévention des menaces", value: "99,9%" },
        { label: "Incidents de sécurité", value: "-95%" },
        { label: "Score de conformité", value: "100%" },
      ],
      challenge: `L'institution gouvernementale faisait face à des menaces croissantes en cybersécurité, incluant tentatives de violations de données, attaques par ransomware et accès non autorisé à des informations sensibles. Les mesures existantes étaient insuffisantes, sans plan d'intervention, avec un personnel peu formé et des infrastructures obsolètes.`,
      solution: `Nous avons mis en œuvre un cadre de cybersécurité multi-couches incluant détection avancée des menaces, protection des terminaux, segmentation du réseau et formation complète du personnel. La solution comprenait surveillance en temps réel, réponse automatisée aux incidents et évaluations régulières de sécurité. Un SOC (Security Operations Center) 24/7 a été créé avec procédures détaillées.`,
      implementation: [
        "Audit complet de sécurité et évaluation des risques",
        "Mise en place de systèmes de détection et prévention avancés",
        "Déploiement de la protection des terminaux sur tous les appareils gouvernementaux",
        "Segmentation du réseau et contrôle des accès",
        "Création d'un SOC 24/7 avec personnel local",
        "Élaboration de procédures détaillées de réponse aux incidents",
        "Formation extensive du personnel à la cybersécurité",
        "Évaluations régulières et tests d'intrusion",
      ],
      technologies: [
        "SIEM",
        "Endpoint Protection",
        "Network Segmentation",
        "Threat Intelligence",
        "SOC",
      ],
      testimonial: {
        quote:
          "La mise en place de la cybersécurité nous a donné confiance dans notre infrastructure numérique. Nous disposons désormais d'une protection complète contre les menaces et d'une équipe capable de répondre aux incidents. La formation de notre personnel a été précieuse pour instaurer une culture de sécurité dans toute l'organisation.",
        author: "Dr. Amadou Bah",
        position:
          "Directeur des systèmes d'information, Ministère de l'Économie Numérique",
      },
    },
    {
      id: 4,
      title: "E-Commerce Platform for Local Artisans",
      service: "Web Development",
      industry: "Retail",
      scale: "Medium",
      impact: "Medium",
      description:
        "Plateforme e-commerce moderne connectant les artisans guinéens aux marchés internationaux, avec support multilingue et design optimisé mobile.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      duration: "4 mois",
      metrics: [
        { label: "Intégration des artisans", value: "+200%" },
        { label: "Ventes internationales", value: "+180%" },
        { label: "Utilisation de la plateforme", value: "85%" },
      ],
      challenge: `Les artisans locaux en Guinée avaient un accès limité aux marchés internationaux, se reposant principalement sur les ventes locales et touristiques. Beaucoup ne pouvaient pas présenter leurs créations globalement en raison du manque de présence numérique et de capacités e-commerce.`,
      solution: `Nous avons créé une plateforme e-commerce complète pour les artisans guinéens, avec listing simplifié des produits, traitement des paiements, expédition internationale et support multilingue. La plateforme incluait la mise en valeur de l'histoire culturelle des créations, profils d'artisans et communication directe acheteurs/créateurs.`,
      implementation: [
        "Recherche sur les besoins des artisans et exigences des marchés internationaux",
        "Conception d'une interface facile pour les artisans peu techniques",
        "Support multilingue (français, anglais, langues locales)",
        "Intégration de solutions de paiement et d'expédition internationales",
        "Création de profils d'artisans avec storytelling",
        "Design mobile-first responsive",
        "Formation et support continu aux artisans",
      ],
      technologies: [
        "React",
        "Node.js",
        "Stripe",
        "Multi-language",
        "Responsive Design",
      ],
      testimonial: {
        quote:
          "Cette plateforme a ouvert le monde à nos créations. J'ai désormais des clients en Europe et Amérique qui apprécient l'histoire culturelle de mon travail. La plateforme est facile à utiliser et l'équipe de support m'a aidé à chaque étape.",
        author: "Fatoumata Camara",
        position: "Artisan textile traditionnel, Conakry",
      },
    },
    {
      id: 5,
      title: "Healthcare Management System",
      service: "Web Development",
      industry: "Healthcare",
      scale: "Enterprise",
      impact: "High",
      description:
        "Système complet de gestion hospitalière pour un hôpital régional, optimisant dossiers patients, rendez-vous et gestion des inventaires médicaux.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      duration: "10 mois",
      metrics: [
        { label: "Traitement des patients", value: "+120%" },
        { label: "Précision des dossiers", value: "99,5%" },
        { label: "Efficacité du personnel", value: "+80%" },
      ],
      challenge: `L'hôpital régional gérait les dossiers patients manuellement, entraînant erreurs fréquentes, fichiers perdus et inefficacité. La planification des rendez-vous était chaotique, l'inventaire mal suivi, et la communication entre services fragmentée.`,
      solution: `Nous avons développé un système de gestion hospitalière complet avec modules d'inscription des patients, dossiers médicaux électroniques, planification des rendez-vous, gestion des stocks et facturation. Le système inclut contrôle d'accès par rôle, intégration avec équipements médicaux et rapports complets pour l'administration et le ministère de la santé.`,
      implementation: [
        "Analyse des flux de travail existants et identification des améliorations",
        "Conception modulaire pour scalabilité et maintenance",
        "Mise en place de dossiers médicaux électroniques avec recherche et reporting",
        "Création d'un système de rendez-vous avec notifications SMS",
        "Développement de la gestion des stocks avec alertes automatiques",
        "Intégration de la facturation et traitement des assurances",
        "Formation complète du personnel et accompagnement au changement",
      ],
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "APIs Médicales",
        "Intégration SMS",
      ],
      testimonial: {
        quote:
          "Le système de gestion hospitalière a révolutionné notre fonctionnement. Les temps d'attente ont considérablement diminué, les dossiers sont précis et accessibles, et notre personnel peut se concentrer sur les soins aux patients plutôt que sur la paperasse. C'est un changement majeur pour notre hôpital.",
        author: "Dr. Mariama Sow",
        position: "Directrice médicale, Hôpital régional de Kindia",
      },
    },
    {
      id: 6,
      title: "Educational Portal for Universities",
      service: "Web Development",
      industry: "Education",
      scale: "Enterprise",
      impact: "Medium",
      description:
        "Portail d'apprentissage moderne pour les universités, avec cours en ligne, gestion des étudiants et outils collaboratifs.",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop",
      duration: "7 mois",
      metrics: [
        { label: "Engagement des étudiants", value: "+90%" },
        { label: "Achèvement des cours", value: "+65%" },
        { label: "Adoption par le corps enseignant", value: "92%" },
      ],
      challenge: `Les universités en Guinée avaient du mal à s'adapter aux exigences de l'apprentissage numérique, surtout pendant la pandémie. L'enseignement uniquement en présentiel limitait l'accès à l'éducation pour les étudiants éloignés et aucun système centralisé n'existait pour la gestion des cours, des évaluations et des dossiers académiques.`,
      solution: `Nous avons créé un portail éducatif complet avec un LMS intégré, offrant cours en ligne, devoirs interactifs, intégration de visioconférences, suivi de la progression et gestion des dossiers académiques. La plateforme supporte apprentissage en ligne et hybride avec accès hors ligne au contenu.`,
      implementation: [
        "Évaluation des besoins auprès des enseignants et étudiants",
        "Conception d'une interface intuitive pour enseignants et étudiants",
        "Mise en place d'outils de création de cours multimédias",
        "Intégration de la visioconférence et des outils collaboratifs",
        "Création d'un système complet d'évaluation et de notation",
        "Développement d'une application mobile pour accès étudiant",
        "Formation et support technique complet pour le corps enseignant",
      ],
      technologies: [
        "React",
        "Node.js",
        "Streaming Vidéo",
        "Application Mobile",
        "Stockage Cloud",
      ],
      testimonial: {
        quote:
          "Ce portail éducatif a transformé notre manière d'enseigner. Les étudiants peuvent désormais accéder aux cours de n'importe où, participer à des discussions interactives et soumettre leurs devoirs numériquement. Le système rend l'éducation plus accessible et engageante pour notre population étudiante diversifiée.",
        author: "Prof. Ibrahima Diallo",
        position:
          "Vice-recteur aux affaires académiques, Université de Conakry",
      },
    },
];

const PortfolioShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeService, setActiveService] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [activeScale, setActiveScale] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { data: cmsProjects } = useProjects();

  const projects =
    cmsProjects && cmsProjects.length > 0
      ? cmsProjects.map((p) => ({
          id: p.id,
          title: p.title,
          service: p.service_type,
          industry: p.industry,
          scale: p.scale,
          impact: p.impact,
          description: p.description,
          image: p.image_url,
          duration: p.duration,
          metrics: Array.isArray(p.metrics) ? p.metrics : [],
          challenge: p.challenge,
          solution: p.solution,
          implementation: Array.isArray(p.implementation_steps) ? p.implementation_steps : [],
          technologies: Array.isArray(p.technologies) ? p.technologies : [],
          testimonial: p.testimonial,
        }))
      : STATIC_PROJECTS;

  const filteredProjects = projects?.filter((project) => {
    const matchesService =
      activeService === "All" || project?.service === activeService;
    const matchesIndustry =
      activeIndustry === "All" || project?.industry === activeIndustry;
    const matchesScale =
      activeScale === "All" || project?.scale === activeScale;
    const matchesSearch =
      !searchTerm ||
      project?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      project?.description
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      project?.service?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    return matchesService && matchesIndustry && matchesScale && matchesSearch;
  });

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleClearFilters = () => {
    setActiveService("All");
    setActiveIndustry("All");
    setActiveScale("All");
    setSearchTerm("");
  };

  const handleLoadMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  useEffect(() => {
    document.title = "Portfolio - Success Showcase | Lynxa Tech Guinea";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />

        {/* Portfolio Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Icon name="Briefcase" size={16} />
                <span>Nos Réalisations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
                Histoires de Succès Inspirantes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez notre portfolio de projets transformateurs qui ont eu
                un impact réel en Guinée et en Afrique de l’Ouest.
              </p>
            </div>

            {/* hr983 */}

            {/* Results Count */}
           {/* <div className="mb-8">
              <p className="text-muted-foreground">
                Affichage de{" "}
                {Math.min(visibleProjects, filteredProjects?.length)} sur{" "}
                {filteredProjects?.length} projets
              </p>
            </div> */}

            {/* Projects Grid */}
            {filteredProjects?.length > 0 ? (
              <>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {filteredProjects
                    ?.slice(0, visibleProjects)
                    ?.map((project) => (
                      <ProjectCard
                        key={project?.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                </div> */}

                {/* Load More Button */}
                {visibleProjects < filteredProjects?.length && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleLoadMore}
                      iconName="Plus"
                      iconPosition="left"
                      className="glow-orange"
                    >
                      Charger plus de projects
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Icon
                  name="Search"
                  size={48}
                  className="text-muted-foreground mx-auto mb-4"
                />
                <h3 className="text-xl font-heading font-bold text-secondary mb-2">
                  Aucun projet trouvé
                </h3>
                <p className="text-muted-foreground mb-6">
                  Essayez d’ajuster vos filtres ou termes de recherche pour
                  trouver des projets pertinents.
                </p>

                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Renitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </section>

        <InnovationLab />
        <ClientLogos />

        {/* Call to Action */}
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Prêt à créer votre histoire à succès ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Discutons de la manière dont nous pouvons transformer vos idées
                en réalité numérique. Notre équipe est prête à relever vos
                projets les plus ambitieux.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="bg-primary hover:bg-primary/90 glow-orange"
                  >
                    Lancer Votre Projet
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Calendar"
                    iconPosition="left"
                    className="border-white text-white hover:bg-white hover:text-secondary"
                  >
                    Planifier une Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PortfolioShowcase;
