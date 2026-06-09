import { Api } from '../../../shared/api';
import type { Order } from '../../../app/core/types';

const client = new Api();

const createOrder = async (payload: any): Promise<Order> => {
  const res = await client.post('orders', 'orders', payload);
  if (res.error) throw new Error(String(res.message));
  return res.data as Order;
};

const listOrders = async (): Promise<Order[]> => {
  const res = await client.get('orders', 'orders', '');
  if (res.error) throw new Error(String(res.message));
  return res.data as Order[];
};

export default { createOrder, listOrders };
