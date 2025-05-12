import axios from 'axios';

export interface UserProfile {
  id: string | number;
  username: string;
  email: string;
  phone_no?: string;
  profile_picture?: string;
  bio?: string;
  created_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone_no?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const authService = {
  async login(data: LoginRequest): Promise<void> {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  },

  async register(data: RegisterRequest): Promise<void> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  },

  async getCurrentUser(): Promise<UserProfile> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    if (!axios.defaults.headers.common['Authorization']) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  },
}; 