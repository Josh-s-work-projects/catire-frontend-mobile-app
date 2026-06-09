import { Api } from '../../../../shared/api';
import type { Branch, Menu, Product } from '../../../core/types';

const client = new Api();

const getBranches = async (): Promise<Branch[]> => {
  const res = await client.get('catalog', 'branches', '');
  if (res.error) throw new Error(String(res.message));
  return res.data as Branch[];
};

const getMenus = async (branchId?: string): Promise<Menu[]> => {
  // shared Api.get signature: get(service, endpoint, token, id?)
  const res = await client.get('catalog', 'menus', '', branchId);
  if (res.error) throw new Error(String(res.message));
  return res.data as Menu[];
};

const getProducts = async (menuId?: string): Promise<Product[]> => {
  const res = await client.get('catalog', 'products', '', menuId);
  if (res.error) throw new Error(String(res.message));
  return res.data as Product[];
};

export default { getBranches, getMenus, getProducts };
