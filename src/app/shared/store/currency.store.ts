import { create } from 'zustand';
import type { Purchase } from '../types';

type CurrencyState = {
  currency: 'USD' | 'VES' | 'COP';
  rates: { VES?: number; COP?: number };
  setCurrency: (c: 'USD' | 'VES' | 'COP') => void;
  setRates: (rates: { VES?: number; COP?: number }) => void;
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: 'USD',
  rates: {},
  setCurrency: (c) => set({ currency: c }),
  setRates: (rates) => set({ rates }),
}));
