import create from 'zustand';
import * as SecureStore from 'expo-secure-store';
import type { User } from '../types';
import authApi from '../../modules/auth/api/auth.api';

type AuthState = {
  user?: User | null;
  token?: string | null;
  loading: boolean;
  setToken: (token?: string | null) => Promise<void>;
  setUser: (user?: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  validate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  setToken: async (token) => {
    if (token) {
      await SecureStore.setItemAsync('token', token);
    } else {
      await SecureStore.deleteItemAsync('token');
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await authApi.login(email, password);
      const { token, user } = res;
      await SecureStore.setItemAsync('token', token);
      set({ token, user });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    await SecureStore.deleteItemAsync('token');
    set({ token: null, user: null });
  },
  validate: async () => {
    set({ loading: true });
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        const user = await authApi.validate(token);
        set({ token, user });
      }
    } catch (e) {
      await SecureStore.deleteItemAsync('token');
      set({ token: null, user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
