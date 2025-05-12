"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, UserProfile as AuthUserProfile } from '@/services';

// Define local interface for enhanced user profile
interface UserProfile extends AuthUserProfile {
  profile_picture?: string;
  bio?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, phoneNo?: string) => Promise<void>;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const userData = await authService.getCurrentUser();
            if (userData) {
              // Enhance the user data with UI-specific fields
              const enhancedUser = {
                ...userData,
                profile_picture: undefined,
                bio: undefined
              } as UserProfile;
              setUser(enhancedUser);
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.error('Authentication error:', error);
            localStorage.removeItem('token');
          }
        }
        setIsLoading(false);
      }
    };

    // Wrap in try/catch to prevent unhandled errors
    try {
      checkAuth();
    } catch (error) {
      console.error("Error in auth check:", error);
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.login({ username, password });
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          // Enhance the user data with UI-specific fields
          const enhancedUser = {
            ...userData,
            profile_picture: undefined,
            bio: undefined
          } as UserProfile;
          setUser(enhancedUser);
          setIsAuthenticated(true);
        }
      } catch (userError) {
        console.error('Error fetching user data after login:', userError);
        throw userError;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, phoneNo?: string) => {
    setIsLoading(true);
    try {
      await authService.register({ username, email, password, phone_no: phoneNo });
      // Automatically log in after registration
      try {
        await login(username, password);
      } catch (loginError) {
        console.error('Login failed after registration:', loginError);
        throw loginError;
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 