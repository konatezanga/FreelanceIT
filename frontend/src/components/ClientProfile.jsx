import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Lock, Phone, Building, Globe, MapPin, Save, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { getCurrentUser, updateProfile } from "../services/api"; // Assurez-vous d'avoir ces fonctions

export function ClientProfile({ onNavigate }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form states
    const [formData, setFormData] = useState({
        phone: "",
        company_name: "",
        address: "",
        website: "",
    });

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
            setFormData({
                phone: userData.phone || "",
                company_name: userData.client_profile?.company_name || "",
                address: userData.client_profile?.address || "",
                website: userData.client_profile?.website || "",
            });
        } catch (err) {
            console.error("Erreur chargement profil", err);
            // setError("Impossible de charger le profil.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            await updateProfile({
                phone: formData.phone,
                ...formData // Envoie aussi company_name, address, etc.
            });
            setSuccess("Informations mises à jour avec succès !");
            loadProfile(); // Recharger pour être sûr
        } catch (err) {
            setError("Erreur lors de la mise à jour.");
            console.error(err);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (passwordData.new_password !== passwordData.new_password_confirmation) {
            setError("La confirmation du mot de passe ne correspond pas.");
            return;
        }

        try {
            await updateProfile({
                current_password: passwordData.current_password,
                password: passwordData.new_password,
                password_confirmation: passwordData.new_password_confirmation
            });
            setSuccess("Mot de passe modifié avec succès !");
            setPasswordData({ current_password: "", new_password: "", new_password_confirmation: "" });
        } catch (err) {
            setError("Erreur lors du changement de mot de passe. Vérifiez votre mot de passe actuel.");
            console.error(err);
        }
    };

    if (loading) return <div className="p-10 text-center">Chargement...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 mb-8">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">Mon Profil Client</h1>
                    <Button variant="outline" onClick={() => onNavigate("catalog")}>
                        Retour
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

                    {error && (
                        <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200 text-red-800">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sidebar Info */}
                        <Card className="p-6 md:col-span-1 h-fit">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="h-24 w-24 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600 text-3xl font-bold">
                                    {user?.firstname?.[0]}{user?.lastname?.[0]}
                                </div>
                                <h2 className="text-xl font-bold">{user?.firstname} {user?.lastname}</h2>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Client
                                </div>
                            </div>
                        </Card>

                        {/* Forms */}
                        <Card className="p-6 md:col-span-2">
                            <Tabs defaultValue="info">
                                <TabsList className="mb-6 w-full">
                                    <TabsTrigger value="info" className="flex-1">Mes Informations</TabsTrigger>
                                    <TabsTrigger value="security" className="flex-1">Sécurité</TabsTrigger>
                                </TabsList>

                                <TabsContent value="info">
                                    <form onSubmit={handleUpdateInfo} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Téléphone</Label>
                                                <div className="relative mt-1">
                                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                        className="pl-9"
                                                        placeholder="+225 ..."
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Nom de l'entreprise</Label>
                                                <div className="relative mt-1">
                                                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        value={formData.company_name}
                                                        onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                                                        className="pl-9"
                                                        placeholder="Ma Société SARL"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Adresse</Label>
                                            <div className="relative mt-1">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    value={formData.address}
                                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                    className="pl-9"
                                                    placeholder="Abidjan, Cocody..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Site Web</Label>
                                            <div className="relative mt-1">
                                                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    value={formData.website}
                                                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                                                    className="pl-9"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4">
                                            <Save className="w-4 h-4 mr-2" />
                                            Enregistrer les modifications
                                        </Button>
                                    </form>
                                </TabsContent>

                                <TabsContent value="security">
                                    <form onSubmit={handleChangePassword} className="space-y-4">
                                        <Alert className="bg-blue-50 border-blue-200 text-blue-800 mb-4">
                                            <AlertDescription className="text-sm">
                                                Pour votre sécurité, utilisez un mot de passe fort comportant au moins 8 caractères.
                                            </AlertDescription>
                                        </Alert>

                                        <div>
                                            <Label>Mot de passe actuel</Label>
                                            <div className="relative mt-1">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    type="password"
                                                    value={passwordData.current_password}
                                                    onChange={e => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                                    className="pl-9"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Nouveau mot de passe</Label>
                                                <Input
                                                    type="password"
                                                    value={passwordData.new_password}
                                                    onChange={e => setPasswordData({ ...passwordData, new_password: e.target.value })}
                                                    className="mt-1"
                                                    required
                                                    minLength={8}
                                                />
                                            </div>
                                            <div>
                                                <Label>Confirmer le nouveau mot de passe</Label>
                                                <Input
                                                    type="password"
                                                    value={passwordData.new_password_confirmation}
                                                    onChange={e => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })}
                                                    className="mt-1"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white mt-4">
                                            <Lock className="w-4 h-4 mr-2" />
                                            Changer mon mot de passe
                                        </Button>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
