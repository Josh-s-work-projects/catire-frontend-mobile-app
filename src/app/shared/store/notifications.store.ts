import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  date: string;
  orderId?: number | string;
};

type NotificationsState = {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notif: Omit<AppNotification, 'id' | 'isRead' | 'date'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
};

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notif) => {
        set((state) => {
          const newNotif: AppNotification = {
            ...notif,
            id: Math.random().toString(36).substr(2, 9),
            isRead: false,
            date: new Date().toISOString(),
          };
          return {
            notifications: [newNotif, ...state.notifications],
            unreadCount: state.unreadCount + 1,
          };
        });
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        }));
      },

      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
    }),
    {
      name: 'notifications-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);