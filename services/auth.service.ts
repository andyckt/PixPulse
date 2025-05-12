import axios from 'axios';

export interface UserProfile {
  userid: string | number;
  username: string;
  email: string;
  phone_no?: string;
  admin: boolean;
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
  admin?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const authService = {
  async login(data: LoginRequest): Promise<void> {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);
    
    const response = await axios.post(`${API_URL}/auth/login`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    }
    return response.data;
  },

  async register(data: RegisterRequest): Promise<void> {
    const userData = {
      users: [{
        username: data.username,
        email: data.email,
        hashed_password: data.password,
        phone_no: data.phone_no || null,
        admin: data.admin === true ? true : false
      }]
    };
    
    const response = await axios.put(`${API_URL}/user`, userData);
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
    
    try {
      const response = await axios.get(`${API_URL}/auth/current_user`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      throw error;
    }
  },
}; 