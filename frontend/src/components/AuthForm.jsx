// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Code, User, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function AuthForm({ onNavigate }) {
  const [userType, setUserType] = useState(null); // "client" | "freelance"
  const [authMode, setAuthMode] = useState("login");

  // === CHOIX ENTRE CLIENT ET FREELANCE ===
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl text-center"
        >
          {/* ===== Titre principal ===== */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <img
                src="/Logo.png"
                alt="FreelanceCI logo"
                className="h-30 w-auto"
                draggable="false"
              />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
              Bienvenue sur la plateforme IT ivoirienne
            </h1>
            <p className="text-lg text-gray-600">
              Choisissez votre espace pour continuer votre aventure.
            </p>
          </div>

          {/* ===== Cartes Choix ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* === CLIENT === */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card
                onClick={() => setUserType("client")}
                className="p-10 cursor-pointer border-2 border-transparent hover:border-orange-400 hover:shadow-2xl transition-all duration-300 rounded-2xl group bg-white"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                    <User className="w-10 h-10 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Je suis <span className="text-orange-600">Client</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Trouvez facilement les meilleurs talents IT pour vos projets.
                  </p>

                  <ul className="text-left space-y-2 text-sm text-gray-500 mb-8">
                    <li>• Accès à des freelances vérifiés</li>
                    <li>• Suivi simplifié de vos missions</li>
                    <li>• Communication fluide et rapide</li>
                  </ul>

                  <Button className="w-full bg-orange-500 text-white hover:bg-orange-600 rounded-full py-2 text-base font-semibold shadow-md hover:shadow-lg transition">
                    Continuer en tant que Client
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* === FREELANCE === */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card
                onClick={() => setUserType("freelance")}
                className="p-10 cursor-pointer border-2 border-transparent hover:border-green-500 hover:shadow-2xl transition-all duration-300 rounded-2xl group bg-white"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                    <Briefcase className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Je suis <span className="text-green-600">Freelance</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Rejoignez un réseau de freelances IT passionnés.
                  </p>

                  <ul className="text-left space-y-2 text-sm text-gray-500 mb-8">
                    <li>• Trouvez des missions locales et rémunératrices</li>
                    <li>• Développez votre réputation IT</li>
                    <li>• Bénéficiez d’un réseau alumni exclusif</li>
                  </ul>

                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full py-2 text-base font-semibold shadow-md hover:shadow-lg transition">
                    Continuer en tant que Freelance
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* ===== Retour ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-10"
          >
            <Button
              variant="ghost"
              onClick={() => onNavigate("landing")}
              className="text-gray-500 hover:text-orange-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l’accueil
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // === PAGE DE CONNEXION / INSCRIPTION ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-10 shadow-lg rounded-2xl bg-white/90 backdrop-blur">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img
                src="/Logo.png"
                alt="FreelanceCI logo"
                className="h-30 w-auto"
                draggable="false"
              />
            </div>
            <h2 className="text-2xl font-bold mb-1 text-gray-800">
              {userType === "client" ? "Espace Client" : "Espace Freelance"}
            </h2>
            <p className="text-sm text-gray-500">
              {authMode === "login"
                ? "Connectez-vous pour continuer votre mission"
                : "Créez votre profil et démarrez votre parcours"}
            </p>
          </div>

          {/* === Onglets === */}
          <Tabs value={authMode} onValueChange={(v) => setAuthMode(v)} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-full p-1">
              <TabsTrigger value="login" className="rounded-full text-gray-700">
                Connexion
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full text-gray-700">
                Inscription
              </TabsTrigger>
            </TabsList>

            {/* === Connexion === */}
            <TabsContent value="login" className="space-y-4 mt-6">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="votre@email.com" className="mt-2 rounded-xl" />
              </div>
              <div>
                <Label>Mot de passe</Label>
                <Input type="password" placeholder="••••••••" className="mt-2 rounded-xl" />
              </div>
              <Button
                onClick={() =>
                  userType === "freelance" ? onNavigate("dashboard") : onNavigate("catalog")
                }
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold py-2 rounded-full hover:shadow-lg transition"
              >
                Se connecter
              </Button>
              <Button variant="link" className="w-full text-sm text-gray-500">
                Mot de passe oublié ?
              </Button>
            </TabsContent>

            {/* === Inscription === */}
            <TabsContent value="signup" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prénom</Label>
                  <Input placeholder="Kouassi" className="mt-2 rounded-xl" />
                </div>
                <div>
                  <Label>Nom</Label>
                  <Input placeholder="Amara" className="mt-2 rounded-xl" />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="votre@email.com" className="mt-2 rounded-xl" />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input type="tel" placeholder="+225 01 02 03 04 05" className="mt-2 rounded-xl" />
              </div>
              {userType === "freelance" && (
                <div>
                  <Label>Établissement / Alumni</Label>
                  <Input placeholder="INPHB, ESATIC, ESI..." className="mt-2 rounded-xl" />
                </div>
              )}
              <div>
                <Label>Mot de passe</Label>
                <Input type="password" placeholder="••••••••" className="mt-2 rounded-xl" />
              </div>
              <Button
                onClick={() =>
                  userType === "freelance" ? onNavigate("dashboard") : onNavigate("catalog")
                }
                className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white font-semibold py-2 rounded-full hover:shadow-lg transition"
              >
                Créer mon compte
              </Button>
              <p className="text-xs text-center text-gray-500">
                En vous inscrivant, vous acceptez nos conditions d'utilisation
              </p>
            </TabsContent>
          </Tabs>

          {/* === Retour === */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserType(null)}
              className="text-gray-500 hover:text-orange-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Changer de profil
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
