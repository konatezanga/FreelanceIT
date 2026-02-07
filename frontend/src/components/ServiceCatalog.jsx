// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";
import { Search, Filter, Star, ArrowLeft, Plus, User, Edit, Trash2, MessageCircle, Eye, Menu, X, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { LogOut } from 'lucide-react';
import { ClientProfile } from "./ClientProfile";
import { getMissions, getFreelancers, createMission, logoutUser } from "../services/api";
import { useEffect } from "react";

export function ServiceCatalog({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPublishOpen, setPublishOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", budget: "", deadline: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [activeView, setActiveView] = useState("missions");
  const [selectedMission, setSelectedMission] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  // Missions de l'utilisateur client
  const [userMissions, setUserMissions] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // En parallèle
      const [missionsData, freelancersData] = await Promise.all([
        getMissions(),
        getFreelancers()
      ]);

      setUserMissions(missionsData);

      const freelancersList = Array.isArray(freelancersData) ? freelancersData : [];
      const mappedFreelancers = freelancersList.map(u => {
        const profile = u.freelancer_profile || {};
        return {
          id: u.id,
          name: `${u.firstname} ${u.lastname}`,
          photo: u.profile_photo_path || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.firstname}`,
          specialty: profile.institution || "Freelance",
          hourlyRate: profile.hourly_rate || "N/A",
          dailyRate: profile.daily_rate || "N/A",
          skills: profile.skills || [],
          alumni: profile.institution,
          available: profile.availability !== undefined ? profile.availability : true,
          bio: profile.bio || "Aucune bio disponible.",
          email: u.email,
          phone: u.phone
        };
      });
      setFreelancers(mappedFreelancers);

    } catch (error) {
      console.error("Erreur chargement données", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Titre requis";
    if (!form.description.trim()) errs.description = "Description requise";
    if (!form.budget || Number(form.budget) <= 0) errs.budget = "Budget valide requis";
    if (!form.deadline) errs.deadline = "Délai requis";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      if (selectedMission) {
        console.log("Update logic to implement");
      } else {
        const newMission = await createMission(form);
        setUserMissions([newMission, ...userMissions]);
      }

      setPublishOpen(false);
      setForm({ title: "", description: "", budget: "", deadline: "" });
      setErrors({});
      setSelectedMission(null);
      fetchData(); // Refresh list
    } catch (err) {
      console.error("Error creating mission", err);
      setErrors({ form: "Erreur lors de la création de la mission" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      onNavigate("landing");
    }
  };

  const handleDeleteMission = (missionId) => {
    setUserMissions(userMissions.filter(mission => mission.id !== missionId));
  };

  const handleEditMission = (mission) => {
    setForm({
      title: mission.title,
      description: mission.description,
      budget: mission.budget,
      deadline: mission.deadline
    });
    setSelectedMission(mission.id);
    setPublishOpen(true);
  };

  const handleViewProfile = (freelancer) => {
    onNavigate("FreelancerProfile", { freelancer });
  };

  const handleContactFreelancer = (freelancer) => {
    onNavigate("ClientMessagingView", { freelancer });
  };

  const handleOpenMessaging = () => {
    onNavigate("ClientMessagingView");
  };

  const filteredFreelancers = freelancers.filter(freelancer =>
    searchQuery === "" ||
    freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    freelancer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  //eslint-disable-next-line no-unused-vars
  const NavigationItem = ({ view, icon: Icon, label, isActive }) => (
    <button
      onClick={() => {
        setActiveView(view);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${isActive
        ? 'bg-gradient-to-r from-orange-500 to-green-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              <Button variant="ghost" onClick={handleLogout} className="flex bg-orange-100 text-orange-600 hover:bg-orange-200">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>

              <h1 className="text-xl font-bold">
                <span className="text-orange-500">Freelancing</span>
                <span className="text-green-600">IT</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Dialog open={isPublishOpen} onOpenChange={setPublishOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 text-white hidden sm:flex">
                    <Plus className="w-4 h-4 mr-2" />
                    Publier
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl bg-white">
                  <DialogHeader>
                    <DialogTitle>{selectedMission ? "Modifier la mission" : "Publier une mission"}</DialogTitle>
                    <DialogDescription>
                      {selectedMission ? "Modifiez les détails de votre mission" : "Permettre au client de publier une mission avec budget et délai."}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
                    {/* Formulaire de mission */}
                    <div className="grid gap-2">
                      <Label htmlFor="title">Titre</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Ex. Développer une landing page"
                        value={form.title}
                        onChange={handleChange}
                        aria-invalid={!!errors.title}
                      />
                      {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        rows={5}
                        placeholder="Décrivez la mission, livrables, compétences requises..."
                        value={form.description}
                        onChange={handleChange}
                        aria-invalid={!!errors.description}
                      />
                      {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="budget">Budget (FCFA)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">FCFA</span>
                          <Input
                            id="budget"
                            name="budget"
                            type="number"
                            min="0"
                            step="1000"
                            className="pl-14"
                            placeholder="ex. 200000"
                            value={form.budget}
                            onChange={handleChange}
                            aria-invalid={!!errors.budget}
                          />
                        </div>
                        {errors.budget && <p className="text-sm text-red-600">{errors.budget}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="deadline">Délai</Label>
                        <Input
                          id="deadline"
                          name="deadline"
                          type="date"
                          min={today}
                          value={form.deadline}
                          onChange={handleChange}
                          aria-invalid={!!errors.deadline}
                        />
                        {errors.deadline && <p className="text-sm text-red-600">{errors.deadline}</p>}
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => {
                        setPublishOpen(false);
                        setSelectedMission(null);
                        setForm({ title: "", description: "", budget: "", deadline: "" });
                      }}>
                        Annuler
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-green-600 text-white"
                        disabled={submitting}
                      >
                        {submitting ? "Publication..." : selectedMission ? "Modifier" : "Publier"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Avatar className="w-10 h-10 border-2 border-orange-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Client" />
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Navigation latérale - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <Card className="p-4 sticky top-24">
              <nav className="space-y-2">
                <NavigationItem view="missions" icon={Briefcase} label="Mes Missions" isActive={activeView === "missions"} />
                <NavigationItem view="recherche" icon={Search} label="Rechercher" isActive={activeView === "recherche"} />
                <NavigationItem view="profile" icon={User} label="Mon Profil" isActive={activeView === "profile"} />

                {/* Bouton pour ouvrir la messagerie complète */}
                <button
                  onClick={handleOpenMessaging}
                  className="flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Messagerie</span>
                </button>

                <Button onClick={() => setPublishOpen(true)} className="w-full bg-orange-500 text-white mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Publier une mission
                </Button>
              </nav>
            </Card>
          </aside>

          {/* Contenu principal */}
          <main className="flex-1 min-w-0">
            {/* Navigation mobile */}
            {mobileMenuOpen && (
              <div className="md:hidden mb-6">
                <Card className="p-4">
                  <nav className="space-y-2">
                    <NavigationItem view="missions" icon={Briefcase} label="Mes Missions" isActive={activeView === "missions"} />
                    <NavigationItem view="recherche" icon={Search} label="Rechercher" isActive={activeView === "recherche"} />
                    <NavigationItem view="profile" icon={User} label="Mon Profile" isActive={activeView === "ClientProfile"} />

                    {/* Bouton pour ouvrir la messagerie complète */}
                    <button
                      onClick={handleOpenMessaging}
                      className="flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">Messagerie</span>
                    </button>

                    <Button onClick={() => setPublishOpen(true)} className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white mt-2">
                      <Plus className="w-4 h-4 mr-2" />
                      Publier une mission
                    </Button>
                  </nav>
                </Card>
              </div>
            )}

            {/* Vues */}
            {activeView === "missions" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    <span className="text-orange-500">Mes</span> <span className="text-green-600">Missions</span>
                  </h2>
                  <Button onClick={() => setPublishOpen(true)} className="bg-gradient-to-r from-orange-500 to-green-600 text-white sm:hidden" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-6">
                  {userMissions.map((mission) => (
                    <Card key={mission.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{mission.title}</h3>
                            <Badge className={mission.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                              {mission.status === "active" ? "Active" : "Terminée"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">{mission.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div><span className="text-gray-500">Budget:</span><p className="font-semibold">{mission.budget} FCFA</p></div>
                            <div><span className="text-gray-500">Délai:</span><p className="font-semibold">{new Date(mission.deadline).toLocaleDateString()}</p></div>
                            <div><span className="text-gray-500">Publiée le:</span><p className="font-semibold">{new Date(mission.date).toLocaleDateString()}</p></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditMission(mission)} className="flex items-center gap-1">
                            <Edit className="w-4 h-4" />
                            <span className="hidden sm:inline">Modifier</span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteMission(mission.id)} className="flex items-center gap-1 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Supprimer</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {userMissions.length === 0 && (
                  <Card className="p-12 text-center">
                    <div className="text-gray-400 mb-4"><Plus className="w-16 h-16 mx-auto" /></div>
                    <h3 className="text-xl font-semibold mb-2">Aucune mission publiée</h3>
                    <p className="text-gray-600 mb-4">Commencez par publier votre première mission pour trouver des freelances talentueux.</p>
                    <Button onClick={() => setPublishOpen(true)} className="bg-gradient-to-r from-orange-500 to-green-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Publier une mission
                    </Button>
                  </Card>
                )}
              </motion.div>
            )}

            {activeView === "recherche" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold mb-6">Rechercher des Freelances</h2>

                <div className="flex flex-col md:flex-row gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par compétence, nom, spécialité..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-full"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Budget" /></SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="low">- 10,000 FCFA/h</SelectItem>
                      <SelectItem value="medium">10,000 - 20,000 FCFA/h</SelectItem>
                      <SelectItem value="high">20,000+ FCFA/h</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full md:w-[200px] rounded-full"><SelectValue placeholder="Alumni" /></SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="inphb">INPHB</SelectItem>
                      <SelectItem value="esatic">ESATIC</SelectItem>
                      <SelectItem value="esi">ESI</SelectItem>
                      <SelectItem value="ucao">UCAO</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>

                {/* Résultats de recherche */}
                {searchQuery && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFreelancers.map((freelancer) => (
                      <Card key={freelancer.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="w-16 h-16 border-2 border-orange-200">
                            <AvatarImage src={freelancer.photo} alt={freelancer.name} />
                            <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                            <p className="text-gray-600 text-sm">{freelancer.specialty}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {freelancer.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                          {freelancer.skills.length > 3 && <Badge variant="outline" className="text-xs">+{freelancer.skills.length - 3}</Badge>}
                        </div>

                        <div className="flex items-center justify-between text-sm mb-4">
                          <span className="text-gray-600">{freelancer.alumni}</span>
                          <span className="font-semibold text-orange-600">{freelancer.hourlyRate} FCFA/h</span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewProfile(freelancer)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Profil
                          </Button>
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-green-600" onClick={() => handleContactFreelancer(freelancer)}>
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Contacter
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {searchQuery && filteredFreelancers.length === 0 && (
                  <Card className="p-8 text-center">
                    <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun freelance trouvé</h3>
                    <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
                  </Card>
                )}

                {!searchQuery && (
                  <Card className="p-8 text-center">
                    <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Rechercher des freelances</h3>
                    <p className="text-gray-600">Utilisez la barre de recherche pour trouver des freelances talentueux.</p>
                  </Card>
                )}
              </motion.div>
            )}

            {activeView === "profile" && (
              <ClientProfile onNavigate={onNavigate} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}