import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone_no?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  userid: number;
  username: string;
  email: string;
  phone_no?: string;
  admin: boolean;
  created_at: string;
}

const authService = {
  // Login user and get token
  login: async (credentials: LoginCredentials) => {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await api.post<AuthResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // Store token in localStorage
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  },
  
  // Register a new user
  register: async (userData: RegisterData) => {
    const response = await api.put('/user', { users: [{ 
      username: userData.username,
      email: userData.email,
      hashed_password: userData.password, // Will be hashed on server
      phone_no: userData.phone_no || null,
      admin: false,
    }]});
    
    return response.data;
  },
  
  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get<UserProfile>('/auth/current_user');
    return response.data;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    // Redirect to login page or home page
    window.location.href = '/';
  },
  
  // Check if user is logged in
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
};

export default authService; 