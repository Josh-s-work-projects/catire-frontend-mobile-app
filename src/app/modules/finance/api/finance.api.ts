import { Api } from '../../../../shared/api';
import type { Purchase } from '../../../core/types';

const client = new Api();

const listPurchases = async (): Promise<Purchase[]> => {
  const res = await client.get('finance', 'purchases', '');
  if (res.error) throw new Error(String(res.message));
  return res.data as Purchase[];
};

const getTaxes = async (): Promise<any> => {
  const res = await client.get('finance', 'taxes' as any, '');
  if (res.error) throw new Error(String(res.message));
  return res.data;
};

export default { listPurchases, getTaxes };
