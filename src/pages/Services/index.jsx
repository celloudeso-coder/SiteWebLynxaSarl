import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import ServiceHero from "./components/ServiceHero";
import ServiceCard from "./components/ServiceCard";
import ServiceDetails from "./components/ServiceDetails";
import ProcessTimeline from "./components/ProcessTimeline";
import TechnologyStack from "./components/TechnologyStack";
import PricingFramework from "./components/PricingFramework";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

import { Link } from "react-router-dom";
import { useServices } from "../../hooks/useContent";

import logoIco from "../../../public/LYNXA.ico";

const STATIC_SERVICES = [
  {
    id: "mobile-development",
    title: "Mobile Development",
    subtitle: "Native & Cross-Platform Solutions",
    icon: "Smartphone",
    description:
      "Create powerful mobile applications that engage users and drive business growth. From fintech solutions to agricultural platforms, we build apps that make a difference in Guinea and beyond.",
    highlights: [
      "iOS & Android native development",
      "Cross-platform solutions with React Native",
      "Progressive Web Apps (PWA)",
      "App Store optimization and deployment",
    ],
    projectCount: 45,
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Firebase"],
    metrics: [
      { label: "Average App Rating", value: "4.8/5" },
      { label: "Download Success Rate", value: "98%" },
      { label: "User Retention", value: "85%" },
      { label: "Performance Score", value: "95/100" },
    ],
    projects: [
      { name: "GuineaPay Mobile", description: "Digital payment solution for local businesses with 50K+ active users", industry: "Fintech" },
      { name: "AgriConnect", description: "Agricultural marketplace connecting farmers with buyers across West Africa", industry: "Agriculture" },
      { name: "EduGuinea", description: "Educational platform providing remote learning for 10K+ students", industry: "Education" },
    ],
  },
  {
    id: "network-infrastructure",
    title: "Network Infrastructure",
    subtitle: "Robust & Scalable Network Solutions",
    icon: "Wifi",
    description:
      "Design and implement secure, scalable network infrastructure tailored for West African connectivity challenges. From small offices to enterprise-level deployments.",
    highlights: [
      "Network design and implementation",
      "Security infrastructure setup",
      "Performance optimization",
      "Ongoing monitoring and maintenance",
    ],
    projectCount: 32,
    technologies: ["Cisco", "Ubiquiti", "pfSense", "VMware", "Linux"],
    metrics: [
      { label: "Network Uptime", value: "99.8%" },
      { label: "Security Incidents", value: "0" },
      { label: "Performance Improvement", value: "300%" },
      { label: "Client Satisfaction", value: "100%" },
    ],
    projects: [
      { name: "Ministry of Health Network", description: "Nationwide network infrastructure connecting 50+ health facilities", industry: "Healthcare" },
      { name: "Banking Sector Security", description: "Advanced cybersecurity implementation for major financial institution", industry: "Banking" },
      { name: "Educational Network", description: "Campus-wide network for University of Conakry with 5000+ users", industry: "Education" },
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    subtitle: "Modern & Responsive Web Solutions",
    icon: "Globe",
    description:
      "Build stunning, high-performance websites and web applications that deliver exceptional user experiences and drive business results for organizations across Guinea.",
    highlights: [
      "Responsive web design",
      "E-commerce platforms",
      "Content management systems",
      "SEO optimization and analytics",
    ],
    projectCount: 78,
    technologies: ["React", "Vue.js", "Node.js", "PHP", "WordPress", "Shopify"],
    metrics: [
      { label: "Page Load Speed", value: "< 2s" },
      { label: "SEO Score", value: "95/100" },
      { label: "Conversion Rate", value: "+250%" },
      { label: "Mobile Optimization", value: "100%" },
    ],
    projects: [
      { name: "Guinea Tourism Portal", description: "Official tourism website showcasing Guinea's attractions with booking system", industry: "Tourism" },
      { name: "NGO Impact Platform", description: "Comprehensive platform for tracking and reporting development projects", industry: "Non-Profit" },
      { name: "E-Commerce Marketplace", description: "Multi-vendor platform connecting local artisans with global customers", industry: "E-Commerce" },
    ],
  },
];

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const { data: cmsServices } = useServices();

  const services =
    cmsServices && cmsServices.length > 0
      ? cmsServices.map((s) => ({
          id: s.slug || s.id,
          title: s.title,
          subtitle: s.subtitle,
          icon: s.icon,
          description: s.description,
          highlights: Array.isArray(s.highlights) ? s.highlights : [],
          projectCount: s.project_count ?? 0,
          technologies: Array.isArray(s.technologies) ? s.technologies : [],
          metrics: Array.isArray(s.metrics) ? s.metrics : [],
          projects: Array.isArray(s.projects) ? s.projects : [],
        }))
      : STATIC_SERVICES;

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-reveal]");
    elements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  const handleServiceActivate = (index) => {
    setActiveService(index);
  };

  return (
    <>
      <Helmet>
        <title>Services - Solution Universe | Lynxa Tech Guinea</title>
        <meta
          name="description"
          content="Explore Lynxa Tech's comprehensive technology solutions: Mobile Development, Network Infrastructure, Web Development, and Cybersecurity services for African businesses with global ambitions."
        />
        <meta
          name="keywords"
          content="mobile development, network infrastructure, web development, cybersecurity, Guinea, West Africa, technology solutions"
        />
        <meta
          property="og:title"
          content="Services - Solution Universe | Lynxa Tech Guinea"
        />
        <meta
          property="og:description"
          content="Four distinct service galaxies offering cutting-edge technology solutions for businesses across Guinea and West Africa."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/service" />
      </Helmet>
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <ServiceHero />

        {/* Services Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              id="services-overview"
              data-reveal
              className={`text-center mb-12 reveal-animation ${
                isVisible?.["services-overview"] ? "revealed" : ""
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
                Deux galaxies de services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Chaque domaine de service incarne un savoir-faire solide et une
                approche orientée résultats, conçus pour transformer votre
                entreprise grâce à des solutions technologiques de pointe.
              </p>
            </div>

            {/* Service Cards Grid
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {services?.map((service, index) => (
                <div
                  key={service?.id}
                  data-reveal
                  className={`reveal-animation 
                    `}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <ServiceCard
                    service={service}
                    isActive={activeService === index}
                    onActivate={() => handleServiceActivate(index)}
                  />
                </div>
              ))}
            </div> */}

            {/* Active Service Details */}
            <div
              id="service-details"
              data-reveal
              className={`reveal-animation ${
                isVisible?.["service-details"] ? "revealed" : ""
              }`}
            >
              <ServiceDetails service={services?.[activeService]} />
            </div>
          </div>
        </section>

        {/* Process ServiceCard 
        <ServiceCard /> */}

        {/* Process Timeline */}
        <ProcessTimeline />

        {/* Technology Stack */}
        <TechnologyStack />

        {/* Pricing Framework */}
        <PricingFramework />

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-secondary to-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              id="cta-section"
              data-reveal
              className={`reveal-animation ${
                isVisible?.["cta-section"] ? "revealed" : ""
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Prêt à transformer votre entreprise ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Discutons de la manière dont notre expertise peut vous aider à
                atteindre vos objectifs technologiques et à stimuler la
                croissance de votre entreprise en Guinée et au-delà.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Calendar"
                    iconPosition="left"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Planifier une consultation
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="bg-white text-secondary hover:bg-gray-100 glow-orange"
                  >
                    Obtenir un devis de projet
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} color="#10B981" />
                  <span>Consultation gratuite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} color="#FFA500" />
                  <span>Délai de réponse de 24 heures</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} color="#3B82F6" />
                  <span>
                    Protection NDA{" "}
                    {/*non-divulgation (Non-Disclosure Agreement)*/}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-black from-primary to-accent rounded-lg flex items-center justify-center">

                  <img
                    src={logoIco}
                    alt="Lynxa Tech logo"
                    className="w-8 h-8 object-cover rounded-lg"
                  />

                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">
                      Lynxa Tech
                    </h3>
                    <p className="text-sm text-gray-400">Guinea</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Construire l’avenir de la technologie en Guinée avec des
                  solutions innovantes, compétitives à l’échelle mondiale et au
                  service des communautés locales.
                </p>
                <div className="flex space-x-4">
                  <Icon name="Mail" size={20} color="#6B7280" />
                  <Icon name="Phone" size={20} color="#6B7280" />
                  <Icon name="MapPin" size={20} color="#6B7280" />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Développement mobile</li>
                  <li>Infrastructures réseaux</li>
                  <li>Développement Web</li>
                  <li>Cybersécurité</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Lynxa</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>À propos de nous</li>
                  <li>Portfolio</li>
                  <li>Partenariats</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>
                &copy; {new Date()?.getFullYear()} Lynxa Tech Guinea. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ServicesPage;
