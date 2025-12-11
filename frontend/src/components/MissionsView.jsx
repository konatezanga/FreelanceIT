// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";
import { Clock, XCircle, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";

const missions = [
  {
    id: 1,
    title: "Développement d'une application e-commerce",
    budget: "500,000 - 750,000 FCFA",
    deadline: "4 semaines",
    client: { name: "Diabaté Moussa" },
    description:
      "Besoin d'un développeur pour créer une plateforme e-commerce complète avec système de paiement.",
  },
  {
    id: 2,
    title: "Design d'une application mobile",
    budget: "200,000 FCFA",
    deadline: "2 semaines",
    client: { name: "Traoré Aminata" },
    description:
      "Création de maquettes UI/UX pour une application mobile de livraison.",
  },
  {
    id: 3,
    title: "Campagne Marketing Digital",
    budget: "300,000 FCFA",
    deadline: "3 semaines",
    client: { name: "Koné Sékou" },
    description:
      "Gestion d'une campagne publicitaire sur les réseaux sociaux.",
  },
  {
    id: 4,
    title: "Développement API REST",
    budget: "400,000 FCFA",
    deadline: "3 semaines",
    client: { name: "Yao Kassi" },
    description: "Création d'une API REST pour une application mobile.",
  },
  {
    id: 5,
    title: "Analyse de données clients",
    budget: "600,000 FCFA",
    deadline: "5 semaines",
    client: { name: "Bamba Aïcha" },
    description:
      "Analyse des données clients pour optimiser la stratégie marketing.",
  },
];

export function MissionsView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMissions = missions.filter((mission) =>
    mission.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Titre */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                Missions disponibles
              </h1>
              <p className="text-gray-500">
                Découvrez les dernières missions publiées par les clients
              </p>
            </div>

            {/* Barre de recherche */}
            <div className="relative mt-4 sm:mt-0 w-full sm:w-72">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher une mission..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 w-full rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Liste des missions */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white rounded-full p-1 mb-8 shadow-sm w-fit">
              <TabsTrigger
                value="all"
                className="rounded-full text-sm font-medium p-2 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all"
              >
                Toutes ({filteredMissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {filteredMissions.length > 0 ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMissions.map((mission, index) => (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all rounded-2xl">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                          {mission.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          {mission.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4 border-t pt-4">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Budget</p>
                            <p className="text-sm font-medium text-green-600">
                              {mission.budget}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Délai</p>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <p className="text-sm">{mission.deadline}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <p className="text-sm text-gray-700">
                            Publié par :{" "}
                            <span className="font-medium">
                              {mission.client.name}
                            </span>
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full hover:bg-green-600 hover:border-0 hover:text-white transition-all"
                            onClick={() => onNavigate("messages")}
                          >
                            Contacter
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-700">
                    Aucune mission trouvée
                  </h3>
                  <p className="text-gray-500">
                    Essayez un autre mot-clé ou vérifiez l’orthographe.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
