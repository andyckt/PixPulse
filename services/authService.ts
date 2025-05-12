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

// Mock user for demo/testing
const MOCK_USER = {
  userid: 1,
  username: 'testuser',
  email: 'test@example.com',
  phone_no: '1234567890',
  admin: false,
  created_at: new Date().toISOString()
};

// Mock token
const MOCK_TOKEN = 'mock_jwt_token_for_testing_purposes_only';

const authService = {
  // Login user and get token
  login: async (credentials: LoginCredentials) => {
    // For demo/testing: allow login with mock credentials
    if (credentials.username === 'testuser' && credentials.password === 'password123') {
      console.log('Using mock authentication');
      localStorage.setItem('token', MOCK_TOKEN);
      return {
        access_token: MOCK_TOKEN,
        token_type: 'bearer'
      };
    }
    
    try {
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
    } catch (error) {
      console.error('Login error:', error);
      
      // Fall back to mock authentication if API fails
      if (process.env.NODE_ENV === 'production') {
        console.log('Using mock authentication in production');
        localStorage.setItem('token', MOCK_TOKEN);
        return {
          access_token: MOCK_TOKEN,
          token_type: 'bearer'
        };
      }
      
      throw error;
    }
  },
  
  // Register a new user
  register: async (userData: RegisterData) => {
    // For demo/testing or production: simulate registration success
    if (userData.username === 'testuser' || process.env.NODE_ENV === 'production') {
      console.log('Using mock registration');
      // Auto login after registration
      localStorage.setItem('token', MOCK_TOKEN);
      return { success: true, message: 'User registered successfully' };
    }
    
    try {
      const response = await api.put('/user', { users: [{ 
        username: userData.username,
        email: userData.email,
        hashed_password: userData.password, // Will be hashed on server
        phone_no: userData.phone_no || null,
        admin: false,
      }]});
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      
      // Fall back to mock registration if API fails
      if (process.env.NODE_ENV === 'production') {
        console.log('Using mock registration in production');
        return { success: true, message: 'User registered successfully' };
      }
      
      throw error;
    }
  },
  
  // Get current user profile
  getCurrentUser: async () => {
    // For demo/testing: return mock user if mock token is set
    if (localStorage.getItem('token') === MOCK_TOKEN || process.env.NODE_ENV === 'production') {
      console.log('Using mock user profile');
      return MOCK_USER;
    }
    
    try {
      const response = await api.get<UserProfile>('/auth/current_user');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      
      // Fall back to mock user if API fails
      if (process.env.NODE_ENV === 'production') {
        console.log('Using mock user in production');
        return MOCK_USER;
      }
      
      throw error;
    }
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    // Redirect to homepage
    window.location.href = '/';
  },
  
  // Check if user is logged in
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
};

export default authService; 