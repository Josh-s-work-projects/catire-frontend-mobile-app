import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import authApi from '../../modules/auth/api/auth.api';
import { LoginDTO } from '../../modules/auth/models/Auth';
import { User, UserDTO } from '../../modules/auth/models/User';
import { useCatalogStore } from '../../modules/catalog/store/catalog.store';
import { useFinanceStore } from '../../modules/finance/store/finance.store';
import { useOrdersStore } from '../../modules/orders/store/orders.store';

type AuthState = {
  user?: User | null;
  token?: string | null;
  error: string | null;
  loading: boolean;
  actionLoading: boolean;
  
  clearAuthError: () => void;
  setToken: (token?: string | null) => Promise<void>;
  setUser: (user?: User | null) => void;
  login: (payload: LoginDTO) => Promise<void>;
  register: (payload: UserDTO) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  actionLoading: false,
  error: null,

  clearAuthError: () => set({ error: null }),

  setToken: async (token) => {
    if (token) {
      await SecureStore.setItemAsync('token', token);
    } else {
      await SecureStore.deleteItemAsync('token');
    }
    set({ token });
  },

  setUser: (user) => set({ user }),

  login: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await authApi.login(payload.email, payload.password);

      if (res.error) {
        set({ error: res.message });
        return;
      }

      const token = res.data?.access_token || '';

      const validateRes = await authApi.validate(token);

      if (validateRes.error) {
        set({ error: validateRes.message });
        return;
      }

      await SecureStore.setItemAsync('token', token);
      set({ token, user: validateRes.data });
    } finally {
      set({ loading: false });
    }
  },

  register: async (payload) => {
    set({ actionLoading: true, error: null });
    try {
      const res = await authApi.register(payload);

      if (res.error) {
        set({ error: res.message });
        return false;
      }
      
      return true; // Retorna true para manejar redirecciones en la vista
    } finally {
      set({ actionLoading: false });
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('token');
    useCatalogStore.persist.clearStorage();
    useOrdersStore.persist.clearStorage();
    useFinanceStore.persist.clearStorage();
    set({ token: null, user: null, error: null });
  },
}));