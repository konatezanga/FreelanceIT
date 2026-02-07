import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// un intercepteur pour les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erreur API:', {
      URL: error.config?.url,
      Status: error.response?.status,
      Message: error.response?.data?.message || error.message,
      Data: error.response?.data
    });

    // Afficher l'erreur complète en développement
    if (process.env.NODE_ENV === 'development') {
      console.error('Détails complets:', error);
    }

    return Promise.reject(error);
  }
);

// --- AUTH ---
export const registerUser = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/user');
  return response.data;
};

// --- USERS (Public / Catalog) ---
export const getFreelancers = async (filters = {}) => {
  const params = { role: 'freelance', ...filters };
  const response = await api.get('/users', { params });
  return response.data;
};

// --- MISSIONS ---
export const getMissions = async () => {
  const response = await api.get('/missions');
  return response.data;
};

export const createMission = async (missionData) => {
  const response = await api.post('/missions', missionData);
  return response.data;
};

// --- MESSAGES ---
export const getMessages = async () => {
  const response = await api.get('/messages');
  return response.data;
}

export const sendMessage = async (messageData) => {
  const response = await api.post('/messages', messageData);
  return response.data;
}

// --- PROFILE ---
export const updateProfile = async (data) => {
  // Met à jour le user ou le profil spécifique
  const response = await api.put('/user/profile', data);
  return response.data;
}


export default api;
