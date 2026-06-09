export type APIError = {
  message: string;
  error?: string;
  statusCode?: number;
};

export type Role = {
  id: string;
  name: string;
  permissions?: Record<string, boolean>;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role?: Role;
  currency?: 'USD' | 'VES' | 'COP';
};

export type Branch = {
  id: string;
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
};

export type Menu = {
  id: string;
  name: string;
  branchId?: string;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  priceUSD: number;
  priceVES?: number;
  priceCOP?: number;
  menuId?: string;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  unitPriceUSD: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  totalUSD: number;
  status: string;
  createdAt: string;
  clientId?: string;
};

export type Purchase = {
  id: string;
  amountUSD: number;
  currency: 'USD' | 'VES' | 'COP';
  tax?: number;
  createdAt?: string;
};
