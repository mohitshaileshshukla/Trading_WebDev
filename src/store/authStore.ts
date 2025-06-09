import { create } from 'zustand';
import axios from 'axios';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Backend base URL (adjust if needed)
const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      const { access_token } = response.data;

      // Optionally decode token to get user info or call backend for profile
      const user: User = {
        id: '', // you'd need to fetch this from backend if needed
        name: email, // replace with actual name if available
        email,
        portfolioValue: 0,
        cashBalance: 0,
      };

      localStorage.setItem('token', access_token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error('Invalid email or password');
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password
      });

      const { access_token } = response.data;

      const user: User = {
        id: '',
        name,
        email,
        portfolioValue: 0,
        cashBalance: 100000,
      };

      localStorage.setItem('token', access_token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error('Registration failed');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('token');
  }
}));
