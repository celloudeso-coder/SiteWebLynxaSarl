import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import logoIco from "../../../public/LYNXA.ico";



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      name: "Accueil",
      path: "/home",
      icon: "Home",
    },
    {
      name: "A Propos",
      path: "/about",
      icon: "Users",
    },
    {
      name: "Services",
      path: "/service",
      icon: "Layers",
    },
    {
      name: "Portfolio",
      path: "/portfolio",
      icon: "Briefcase",
    },
    {
      name: "Partenariat",
      path: "/partnership",
      icon: "Handshake",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "MessageCircle",
    },
  ];

  const moreItems = [
    {
      name: "Contact",
      path: "/contact",
      icon: "MessageCircle",
    },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-soft" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-black from-primary to-accent rounded-lg flex items-center justify-center glow-orange group-hover:scale-105 transition-transform duration-300">

                <img
                  src={logoIco}
                  alt="Lynxa Tech logo"
                  className="w-8 h-8 object-cover rounded-lg"
                />

              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-secondary">
                Lynxa Tech
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Guinea</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? "bg-primary text-primary-foreground shadow-glow-orange"
                    : "text-text-primary hover:bg-muted hover:text-primary"
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}

            {/* More Dropdown */}
            {/* <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-muted hover:text-primary transition-all duration-300">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>

              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-medium border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {moreItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm hover:bg-muted transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                      isActivePath(item?.path)
                        ? "text-primary bg-muted"
                        : "text-text-primary"
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            </div> */}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              className="invisible" // Rendre le bouton invisible
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-4 py-4 bg-surface border-t">
            <div className="space-y-2">
              {[...navigationItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-text-primary hover:bg-muted hover:text-primary"
                  }`}
                >
                  <Icon name={item?.icon} size={20} /> {/* ← ici */}
                  <span>{item?.name}</span>
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <Button
                variant="default"
                size="sm"
                fullWidth
                iconName="Phone"
                iconPosition="left"
                className="invisible"
              >
                Get Quote
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};


export default Header;
