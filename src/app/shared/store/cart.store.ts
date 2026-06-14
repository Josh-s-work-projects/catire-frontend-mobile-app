import { create } from 'zustand';
import { NameTag } from '../api/enums';

export interface CartItem {
  cart_id: string;
  product_id: number;
  name: string;
  quantity: number;
  base_price: number;
  features: { name_tag: NameTag; value: string }[];
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cart_id: string) => void;
  updateQuantity: (cart_id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    // CORRECCIÓN: Ahora verificamos si ya existe el MISMO cart_id exacto
    const existing = state.items.find(i => i.cart_id === item.cart_id);
    
    if (existing) {
      return { 
        items: state.items.map(i => 
          i.cart_id === item.cart_id 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        ) 
      };
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (cart_id) => set((state) => ({
    items: state.items.filter((i) => i.cart_id !== cart_id),
  })),
  updateQuantity: (cart_id, quantity) => set((state) => ({
    items: state.items.map((i) => (i.cart_id === cart_id ? { ...i, quantity } : i)),
  })),
  clearCart: () => set({ items: [] }),
  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: () => get().items.reduce((total, item) => total + (item.base_price * item.quantity), 0),
}));