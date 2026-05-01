import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";
import { getServiceTechItems, getServiceTechCategories } from "../../../lib/cms";

const STATIC_CATEGORIES = [
  { key: "frontend",       title: "Développement Frontend",  icon: "Monitor"    },
  { key: "backend",        title: "Développement Backend",   icon: "Server"     },
  { key: "mobile",         title: "Développement Mobile",    icon: "Smartphone" },
  { key: "infrastructure", title: "Infrastructure & DevOps", icon: "Cloud"      },
];

const STATIC_TECH = {
  frontend:       [
    { name: "React",       icon: "Code",       description: "Développement d'interfaces modernes", link: "https://react.dev/" },
    { name: "Vue.js",       icon: "Layers",     description: "Framework progressif",                link: "https://vuejs.org/" },
    { name: "Angular",      icon: "Box",        description: "Applications d'entreprise",            link: "https://angular.io/" },
    { name: "React Native", icon: "Smartphone", description: "Mobile multiplateforme",              link: "https://reactnative.dev/" },
    { name: "Flutter",      icon: "Zap",        description: "Performance native",                  link: "https://flutter.dev/" },
    { name: "Tailwind CSS", icon: "Palette",    description: "Styling utilitaire",                  link: "https://tailwindcss.com/" },
  ],
  backend: [
    { name: "Node.js",    icon: "Cpu",      description: "Runtime JavaScript",           link: "https://nodejs.org/" },
    { name: "Python",     icon: "Code",     description: "Programmation polyvalente",    link: "https://www.python.org/" },
    { name: "PHP",        icon: "Globe",    description: "Développement web",            link: "https://www.php.net/" },
    { name: "Java",       icon: "Coffee",   description: "Solutions d'entreprise",        link: "https://www.java.com/" },
    { name: "PostgreSQL", icon: "Database", description: "Base de données relationnelle", link: "https://www.postgresql.org/" },
    { name: "MongoDB",    icon: "HardDrive",description: "Base de données NoSQL",        link: "https://www.mongodb.com/" },
  ],
  mobile: [
    { name: "iOS Native",     icon: "Apple",     description: "Développement Swift",        link: "https://developer.apple.com/swift/" },
    { name: "Android Native", icon: "Android",   description: "Applications Kotlin/Java",   link: "https://developer.android.com/" },
    { name: "React Native",   icon: "Code",      description: "Multiplateforme",            link: "https://reactnative.dev/" },
    { name: "Flutter",        icon: "Zap",       description: "Framework Google",           link: "https://flutter.dev/" },
    { name: "Ionic",          icon: "Layers",    description: "Applications hybrides",      link: "https://ionicframework.com/" },
    { name: "PWA",            icon: "Globe",     description: "Applications web progressives", link: "https://web.dev/progressive-web-apps/" },
  ],
  infrastructure: [
    { name: "AWS",        icon: "Cloud",     description: "Informatique en cloud",     link: "https://aws.amazon.com/" },
    { name: "Docker",     icon: "Package",   description: "Conteneurisation",          link: "https://www.docker.com/" },
    { name: "Kubernetes", icon: "Settings",  description: "Orchestration",             link: "https://kubernetes.io/" },
    { name: "CI/CD",      icon: "GitBranch", description: "Déploiement automatisé",    link: "https://about.gitlab.com/topics/ci-cd/" },
    { name: "Monitoring", icon: "Activity",  description: "Santé du système",          link: "https://prometheus.io/" },
    { name: "Security",   icon: "Shield",    description: "Protection des données",    link: "https://owasp.org/" },
  ],
};

const TechnologyStack = () => {
  const [categories, setCategories]   = useState(STATIC_CATEGORIES);
  const [techByCategory, setTechByCategory] = useState(STATIC_TECH);
  const [activeCategory, setActiveCategory] = useState("frontend");

  useEffect(() => {
    getServiceTechCategories()
      .then((d) => { if (d?.length) setCategories(d); })
      .catch(() => {});

    getServiceTechItems()
      .then((items) => {
        if (!items?.length) return;
        const grouped = {};
        items.forEach((item) => {
          if (!grouped[item.category_key]) grouped[item.category_key] = [];
          grouped[item.category_key].push(item);
        });
        setTechByCategory(grouped);
      })
      .catch(() => {});
  }, []);

  const activeTechs = techByCategory[activeCategory] || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Stack Technologique
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous utilisons des technologies de pointe pour créer des solutions
            évolutives, sécurisées et performantes pour nos clients.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-white shadow-lg glow-orange"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon name={cat.icon} size={20} />
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTechs.map((tech, index) => (
            <div
              key={tech.id ?? index}
              className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 card-hover group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <Icon name={tech.icon} size={24} color="#FF8C00" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-secondary">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} color="#FFA500" className="fill-current" />
                  ))}
                </div>
                {tech.link && (
                  <button
                    onClick={() => window.open(tech.link, "_blank", "noopener,noreferrer")}
                    className="p-1 rounded-full hover:bg-gray-100 group-hover:text-primary transition-colors duration-300"
                    title={`Visiter ${tech.name}`}
                  >
                    <Icon name="ArrowUpRight" size={18} color="#6B7280" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
              Vous Ne Voyez Pas Votre Technologie ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nous explorons constamment de nouvelles technologies et
              frameworks. Si vous avez des besoins spécifiques, discutons de la
              manière dont nous pouvons adapter notre expertise pour répondre à
              vos attentes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <button className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon name="MessageCircle" size={20} />
                  <span>Discuter des Besoins</span>
                </button>
              </Link>
              <Link to="/contact">
                <button className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-accent transition-all duration-300 glow-orange">
                  <Icon name="Calendar" size={20} />
                  <span>Planifier une Consultation</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
