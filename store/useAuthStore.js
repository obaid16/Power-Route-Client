import { create } from 'zustand';
import api from '../lib/api';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isInitialized: false,

  // Initialize store from localStorage on mount
  init: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      let user = null;
      try {
        user = userStr ? JSON.parse(userStr) : null;
      } catch (e) {}

      set({ token, user, isInitialized: true });
    } else {
      set({ isInitialized: true });
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/auth/register', userData);
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ token, user, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.error || 'Registration failed'
      });
      return false;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ token, user, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.error || 'Login failed' 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null })
}));

export default useAuthStore;
