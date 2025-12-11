import React, { useState } from "react";
//eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import {
  Users,
  Briefcase,
  Star,
  Shield,
  Search,
  GraduationCap,
  MessagesSquare,
  UserPlus,
  Code,
  Palette,
  Smartphone,
  BarChart,
  Megaphone,
  Database,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./images/ImageWithFallback";

export function LandingPage({ onNavigate }) {
  const _categories = [
    { icon: Code, name: "Développement Web", color: "text-orange-500" },
    { icon: Smartphone, name: "Mobile", color: "text-green-500" },
    { icon: Palette, name: "Design", color: "text-purple-500" },
    { icon: Database, name: "Data", color: "text-blue-500" },
    { icon: Megaphone, name: "Marketing Digital", color: "text-pink-500" },
    { icon: BarChart, name: "Analytics", color: "text-yellow-500" },
  ];

  const features = [
    {
      icon: Search,
      title: "Recherche facile",
      description: "Trouvez rapidement les talents ou missions qui correspondent à vos besoins avec filtre alumni ou (compétences, tarif, domaine...)",
    },
    {
      icon: GraduationCap,
      title: "Réseau Alumni",
      description: "Connectez-vous avec d'anciens camarades de votre école ou université pour des collaborations de confiance",
    },
    {
      icon: MessagesSquare,
      title: "Communication directe",
      description: "Echangez directement avec vos clients ou freelancers via notre messagerie intégrée",
    },
  ];

  const Header = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  //const [active, setActive] = useState("Accueil");
  //const navItems = ["Accueil", "Freelancers", "Missions"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-black/10 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center gap-4">
          {/* ====== Logo + titre (titre masqué sur mobile) ====== */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <img
              src="/Logo.png"
              alt="Logo FreelanceIT"
              className="w-16 h-16 object-contain"
            />
            <span className="sm:inline text-lg md:text-xl font-bold text-green-800 tracking-wide">
              FreelanceIT
            </span>
          </motion.div>

          {/* ====== Navigation (centrée) ====== */}
          {/*<div className="flex-1 flex  items-center justify-center min-w-0">
            <nav className="hidden md:flex gap-4 text-gray-700 font-medium">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActive(item);
                    setMenuOpen(false);
                    onNavigate(item === "Accueil" ? "landing" : item.toLowerCase());
                  }}
                  className={`relative px-2 py-1 whitespace-nowrap transition-colors duration-200 ${
                    active === item
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-orange-500 transition-all duration-200 ${
                      active === item ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              ))}
            </nav>
          </div>*/}

          {/* ====== Boutons Auth + Menu burger ====== */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Boutons desktop */}
            <div className="hidden md:flex gap-3">
              <Button
                onClick={() => onNavigate("auth")}
                className="border border-orange-400 text-orange-500 bg-orange-50 hover:bg-orange-200 hover:text-black rounded-full font-semibold px-3 md:px-4 py-1.5 text-sm transition-all duration-300"
              >
                Connexion
              </Button>

              <Button
                onClick={() => onNavigate("auth")}
                className="bg-orange-500 text-black hover:bg-orange-600 rounded-full font-semibold px-3 md:px-4 py-1.5 text-sm transition-all duration-300 shadow-md hover:shadow-lg"
              >
                S'inscrire
              </Button>
            </div>

            {/* Burger mobile */}
            <button
              className="p-2 rounded-md md:hidden text-gray-700 hover:text-orange-500"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ====== Menu mobile ====== */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-sm py-3">
            <div className="flex flex-col items-center gap-2">
              {/*{navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActive(item);
                    setMenuOpen(false);
                    onNavigate(item === "Accueil" ? "landing" : item.toLowerCase());
                  }}
                  className={`w-full text-center py-2 ${
                    active === item
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  {item}
                </button>
              ))}*/}

              {/* Boutons Auth dans le menu mobile */}
              <div className="flex gap-2 w-11/12 mt-2">
                <Button
                  onClick={() => onNavigate("auth")}
                  className="w-1/2 border border-orange-400 text-orange-500 bg-orange-50 hover:bg-orange-200 rounded-full font-semibold py-2 text-sm"
                >
                  Connexion
                </Button>
                <Button
                  onClick={() => onNavigate("auth")}
                  className="w-1/2 bg-orange-500 text-black hover:bg-orange-600 rounded-full font-semibold py-2 text-sm"
                >
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text">
              La plateforme de <br /> <span className="text-orange-500" >freelancing IT</span> <br /> pour la <span className="text-green-400">Côte d'Ivoire</span> 
            </h1>
            <p className="text-xl text-gray-500 text-muted-foreground mb-8">
            Connectez-vous avec les meilleurs talents tech ivoiriens ou trouvez des missions adaptées à vos compétences. Trouvez des collaborateurs de confiance grâce à votre réseau académique (Alumni). Communication en Français, simplicité garantie.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Button
                size="lg"
                onClick={() => onNavigate("auth")}
                className="w-full sm:w-auto justify-center bg-orange-500 text-black hover:bg-orange-600 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Trouver un talent
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("auth")}
                className="w-full sm:w-auto justify-center border border-orange-400 text-orange-500 bg-orange-50 hover:bg-orange-200 hover:text-black rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Devenir freelance
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <ImageWithFallback
              src="/PhotoFreelance.jpg"
              alt="Freelancing IT Côte d'Ivoire"
              className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />

          </motion.div>
        </div>
      </section>

      {/* Pourquoi choisir */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-3">Pourquoi choisir FreelanceIT ?</h2>
          <p className="text-lg md:text-xl text-gray-600">Une plateforme pensée pour les réalités ivoiriennes.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-center text-lg font-medium mb-3">{feature.title}</h3>
                <p className="text-center text-semibold text-gray-500">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-orange-500 to-green-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Prêt à rejoindre la communauté FreelanceIT ?</h2>
          <p className="mb-6">
            Que vous soyez freelancer à la recherche de missions ou entreprise en quête de talents,
            FreelanceIT vous connecte avec les bonnes personnes.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg" 
              onClick={() => onNavigate("auth")}>
              Devenir Freelancer
            </button>
            <button className="bg-white text-green-600 font-bold py-2 px-6 rounded-lg hover:bg-green-100"
              onClick={() => onNavigate("auth")}>
              Trouver un Talent
            </button>
          </div>
          <hr className="border-gray-200 mb-8" />
          <div>
            <h3 className="text-xl font-semibold mb-2 ">Laissez-nous un message ici</h3>
            <div className="flex justify-center gap-2">
              <input
                type="text"
                placeholder="Votre message..."
                className="p-3 rounded-lg w-80 text-gray-800 bg-white"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg">
                Envoyer
              </button>
            </div>
          </div>
          <p className="text-sm text-white mt-10">
            © 2025 FreelanceIT développé par @KonateZanga. Tous droits réservés.
          </p>
        </div>
      </footer>

    </div>
  );
};

  return <Header onNavigate={onNavigate} />;
}