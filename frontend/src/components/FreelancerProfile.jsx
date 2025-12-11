// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { ArrowLeft, Star, MapPin, Briefcase, GraduationCap, ExternalLink, MessageCircle, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function FreelancerProfile({ onNavigate, freelancer }) {
  const profile = freelancer || {
    name: "Kouassi Amara",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amara",
    specialty: "Développeur Full Stack",
    rating: 4.9,
    reviews: 47,
    hourlyRate: "15,000",
    dailyRate: "100,000",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker", "PostgreSQL", "GraphQL"],
    alumni: "INPHB - Institut National Polytechnique Houphouët-Boigny",
    location: "Abidjan, Côte d'Ivoire",
    experience: "5+ ans",
    available: true,
    bio: "Développeur passionné avec plus de 5 ans d'expérience dans le développement d'applications web modernes. Spécialisé en React et Node.js, j'aide les entreprises à digitaliser leurs processus avec des solutions robustes et évolutives.",
    completedProjects: 24,
    responseTime: "Quelques heures"
  };

  const handleContact = () => {
    onNavigate("ClientMessagingView", { freelancer: profile });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => onNavigate("catalog")} className="flex items-center gap-2 hover:bg-orange-50">
              <ArrowLeft className="w-4 h-4" />
              Retour aux recherches
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Carte profil */}
            <Card className="p-6 sticky top-24 border-0 shadow-lg bg-gradient-to-br from-white to-orange-50">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profile.photo} alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-green-600 text-white text-2xl">
                      {profile.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {profile.available && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                  )}
                </div>
                <h2 className="text-2xl font-bold mt-4 text-gray-900">{profile.name}</h2>
                <p className="text-orange-600 font-medium mb-2">{profile.specialty}</p>
              </div>

              {/* Informations rapides */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700 p-2 rounded-lg bg-white/50">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 p-2 rounded-lg bg-white/50">
                  <Briefcase className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{profile.experience} d'expérience</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 p-2 rounded-lg bg-white/50">
                  <GraduationCap className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{profile.alumni}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 p-2 rounded-lg bg-white/50">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Réponse: {profile.responseTime}</span>
                </div>
              </div>

              {/* Tarifs */}
              <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-xl p-4 text-white mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm opacity-90">Tarif horaire</span>
                  <span className="text-xl font-bold">{profile.hourlyRate} FCFA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Tarif journalier</span>
                  <span className="text-xl font-bold">{profile.dailyRate} FCFA</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button 
                  onClick={handleContact}
                  className="w-full bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white rounded-xl py-3 font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contacter
                </Button>
                <Button 
                  onClick={handleContact}
                  variant="outline" 
                  className="w-full rounded-xl py-3 border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 text-gray-700 font-semibold transition-all duration-200"
                >
                  Proposer une mission
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="lg:col-span-2 space-y-6"
          >
            {/* En-tête avec navigation */}
            <Card className="border-0 shadow-lg bg-white">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start p-2 bg-gray-100 rounded-xl">
                  <TabsTrigger value="about" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-3">
                    À propos
                  </TabsTrigger>
                </TabsList>

                {/* Section À propos */}
                <TabsContent value="about" className="space-y-6 mt-6">
                  <div className="grid gap-6">
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          Bio
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-lg">{profile.bio}</p>
                      </div>
                    </Card>

                    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Compétences
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {profile.skills.map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="secondary" 
                              className="px-4 py-2 text-sm bg-gradient-to-r from-orange-100 to-green-100 text-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}