const API_URL = "http://localhost:5000"; // L'adresse de json-server

// ---------------------- USERS ----------------------

// Inscription
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

// Connexion (simulée)
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
  const data = await res.json();
  return data.length > 0 ? data[0] : null; // retourne l'utilisateur s'il existe
}

// Récupérer tous les utilisateurs
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

// Mettre à jour un utilisateur (profil)
export async function updateUser(id, updatedData) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
}

// Supprimer un utilisateur (admin)
export async function deleteUser(id) {
  await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
  return true;
}

// Rechercher un freelance par compétence / domaine / alumni
export async function searchFreelancers({ competence, domaine, alumni }) {
  let query = `${API_URL}/users?role=freelancer`;
  if (competence) query += `&competence=${competence}`;
  if (domaine) query += `&domaine=${domaine}`;
  if (alumni) query += `&alumni=${alumni}`;
  const res = await fetch(query);
  return res.json();
}

// ---------------------- MISSIONS ----------------------

// Publier une mission
export async function addMission(mission) {
  const res = await fetch(`${API_URL}/missions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mission),
  });
  return res.json();
}

// Récupérer toutes les missions
export async function getMissions() {
  const res = await fetch(`${API_URL}/missions`);
  return res.json();
}

// Supprimer une mission (admin)
export async function deleteMission(id) {
  await fetch(`${API_URL}/missions/${id}`, { method: "DELETE" });
  return true;
}

// ---------------------- MESSAGES ----------------------

// Récupérer les messages
export async function getMessages() {
  const res = await fetch(`${API_URL}/messages`);
  return res.json();
}

// Envoyer un message
export async function sendMessage(message) {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  return res.json();
}

// ---------------------- ADMIN ----------------------

// Valider / modifier une mission
export async function updateMission(id, updatedData) {
  const res = await fetch(`${API_URL}/missions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
}

// Obtenir stats admin (exemple : nb utilisateurs / nb missions)
export async function getAdminStats() {
  const users = await getUsers();
  const missions = await getMissions();
  return {
    totalUsers: users.length,
    totalMissions: missions.length,
  };
}
