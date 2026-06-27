import { create } from 'zustand';
import { Order, OrderDTO } from '../models/Order';
import ordersApi from '../api/orders.api';
import { OrderStatusType } from '../../../shared/api/enums';

type OrdersState = {
  orders: Order[];
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
  
  clearOrdersError: () => void;
  fetchOrders: (token: string, includePaid?: boolean) => Promise<void>;
  addOrder: (token: string, payload: OrderDTO) => Promise<void>;
  editOrder: (token: string, id: string | number, payload: Partial<Order>) => Promise<void>;
  removeOrder: (token: string, id: string | number) => Promise<void>;
  updateOrderStatus: (token: string, id: string | number, status: OrderStatusType) => Promise<void>;
  receiveNewOrder: (order: Order) => void;
  receiveOrderUpdate: (updatedOrder: Order) => void;
};

// Hemos eliminado `persist` y `createJSONStorage`
export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  loading: false,
  actionLoading: false,
  error: null,

  clearOrdersError: () => set({ error: null }),

  fetchOrders: async (token, includePaid: boolean = false) => {
    set({ loading: true, error: null });
    try {
      const res = await ordersApi.getOrders(token, includePaid);
      if (res.error) {
        set({ error: res.message });
        return;
      }
      set({ orders: res.data || [] });
    } finally {
      set({ loading: false });
    }
  },

  addOrder: async (token, payload) => {
    set({ actionLoading: true, error: null });
    console.log(payload);
    console.log(payload.items.map(i => i.features.map(f => `Nombre: ${f.name_tag}, Valor: ${f.value}`)));
    try {
      const res = await ordersApi.createOrder(token, payload);
      if (res.error) {
        set({ error: res.message });
        return;
      }
      if (res.data) set((state) => ({ orders: [...state.orders, res.data!] }));
    } finally {
      set({ actionLoading: false });
    }
  },

  editOrder: async (token, id, payload) => {
    set({ actionLoading: true, error: null });
    try {
      const res = await ordersApi.updateOrder(token, id, payload);
      if (res.error) {
        set({ error: res.message });
        return;
      }
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? { ...o, ...res.data } : o)),
      }));
    } finally {
      set({ actionLoading: false });
    }
  },

  removeOrder: async (token, id) => {
    set({ actionLoading: true, error: null });
    try {
      const res = await ordersApi.deleteOrder(token, id);
      if (res.error) {
        set({ error: res.message });
        return;
      }
      set((state) => ({
        orders: state.orders.filter((o) => o.id !== id),
      }));
    } finally {
      set({ actionLoading: false });
    }
  },

  updateOrderStatus: async (token, id, status) => {
    set({ actionLoading: true, error: null });
    try {
      const res = await ordersApi.updateOrder(token, id, { status });
      if (res.error) {
        set({ error: res.message });
        return;
      }
      set((state) => ({
        orders: state.orders.map((o) => 
          o.id === id ? { ...o, status } : o
        ),
      }));
    } finally {
      set({ actionLoading: false });
    }
  },
  
  receiveNewOrder: (order) => {
    set((state) => {
      if (state.orders.some((o) => o.id === order.id)) return state;
      return { orders: [order, ...state.orders] };
    });
  },

  receiveOrderUpdate: (updatedOrder) => {
    set((state) => ({
      orders: state.orders.map((o) => 
        o.id === updatedOrder.id ? { ...o, ...updatedOrder } : o
      ),
    }));
  },
}));