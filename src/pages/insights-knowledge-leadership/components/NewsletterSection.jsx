import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const interestOptions = [
    { id: "cybersecurity", label: "Cybersécurité", icon: "Shield" },
    { id: "mobile", label: "Innovation Mobile", icon: "Smartphone" },
    { id: "network", label: "Solutions Réseau", icon: "Network" },
    { id: "ecosystem", label: "Écosystème Tech Africain", icon: "Globe" },
    {
      id: "investment",
      label: "Investissement & Financement",
      icon: "TrendingUp",
    },
    {
      id: "policy",
      label: "Politique & Réglementation Tech",
      icon: "FileText",
    },
  ];

  const handleInterestToggle = (interestId) => {
    setInterests((prev) =>
      prev?.includes(interestId)
        ? prev?.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!email?.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
      setName("");
      setInterests([]);
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section
        id="newsletter"
        className="py-16 bg-gradient-to-r from-primary to-accent"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} color="white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Bienvenue dans notre communauté !
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Merci de vous être abonné à notre newsletter. Vous recevrez
              directement dans votre boîte mail les dernières analyses et mises
              à jour.
            </p>
            <Button
              onClick={() => setIsSubscribed(false)}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              S’abonner avec un autre email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="newsletter"
      className="py-16 bg-gradient-to-r from-primary to-accent"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              Restez informé grâce à notre newsletter
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Recevez les dernières analyses, insights et tendances de la
              technologie africaine directement dans votre boîte mail. Rejoignez
              plus de 5 000 leaders tech, entrepreneurs et innovateurs.
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email and Name Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  placeholder="your.email@example.com"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-white focus:bg-white/30"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Votre Nom (Optional)
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e?.target?.value)}
                  placeholder="John Doe"
                  className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-white focus:bg-white/30"
                />
              </div>
            </div>

            {/* Interest Selection */}
            <div>
              <label className="block text-white font-medium mb-4">
                Quels sujets vous intéressent le plus ? (Sélectionnez tout ce
                qui s’applique)
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions?.map((option) => (
                  <label
                    key={option?.id}
                    className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-all duration-200"
                  >
                    <Checkbox
                      checked={interests?.includes(option?.id)}
                      onChange={() => handleInterestToggle(option?.id)}
                      className="text-white"
                    />
                    <Icon name={option?.icon} size={20} color="white" />
                    <span className="text-white text-sm font-medium">
                      {option?.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Newsletter Benefits */}
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <h4 className="text-white font-semibold mb-3">
                Ce que vous recevrez :
              </h4>
              <ul className="grid md:grid-cols-2 gap-2 text-white/90 text-sm">
                <li className="flex items-center">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="mr-2 text-white"
                  />
                  Analyses hebdomadaires du marché
                </li>
                <li className="flex items-center">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="mr-2 text-white"
                  />
                  Aperçus exclusifs de recherches
                </li>
                <li className="flex items-center">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="mr-2 text-white"
                  />
                  Annonces d’événements
                </li>
                <li className="flex items-center">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="mr-2 text-white"
                  />
                  Interviews d’experts
                </li>
                <li className="flex items-center">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="mr-2 text-white"
                  />
                  Analyse des tendances du secteur
                </li>
                <li className="flex items-center">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="mr-2 text-white"
                  />
                  Opportunités d’emploi
                </li>
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="text-center">
              <p className="text-white/80 text-sm mb-4">
                Nous respectons votre vie privée. Vous pouvez vous désinscrire à
                tout moment.
                <a href="#" className="underline hover:text-white">
                  Lire notre politique de confidentialité
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                variant="outline"
                size="lg"
                iconName="Send"
                iconPosition="right"
                disabled={!email?.trim() || isLoading}
                className="border-white text-white hover:bg-white hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
              >
                {isLoading ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </div>
          </form>

          {/* Social Proof */}
          <div className="text-center mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center justify-center space-x-6 text-white/80 text-sm">
              <div className="flex items-center">
                <Icon name="Users" size={16} className="mr-2" />
                <span>5 000+ abonnés</span>
              </div>
              <div className="flex items-center">
                <Icon name="Mail" size={16} className="mr-2" />
                <span>Livraison hebdomadaire</span>
              </div>
              <div className="flex items-center">
                <Icon name="Shield" size={16} className="mr-2" />
                <span>Confidentialité protégée</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
