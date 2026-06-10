import { Api } from '../../../shared/api/api';
import { ApiResponse } from '../../../shared/api/models';
import { Purchase, PurchaseDTO } from '../models/Purchase';
// import { Tax, TaxDTO } from '../models/Tax'; // Asumiendo la creación de estos modelos/DTOs

const client = new Api();

// ==========================================
// 1. PURCHASES CRUD
// ==========================================
const getPurchases = async (token: string): Promise<ApiResponse<Purchase[]>> => {
  return await client.get<Purchase[]>('finance', 'purchases', token);
};

const createPurchase = async (token: string, payload: PurchaseDTO): Promise<ApiResponse<Purchase>> => {
  return await client.post<PurchaseDTO, Purchase>('finance', 'purchases', payload, token);
};

const updatePurchase = async (token: string, id: string | number, payload: Partial<Purchase>): Promise<ApiResponse<Purchase>> => {
  return await client.patch<Partial<Purchase>, Purchase>('finance', `purchases/${id}` as any, payload, token);
};

const deletePurchase = async (token: string, id: string | number): Promise<ApiResponse<{ success: boolean }>> => {
  return await client.delete<{ success: boolean }>('finance', `purchases/${id}` as any, token);
};

// const getTaxes = async (token: string): Promise<ApiResponse<Tax[]>> => {
//   return await client.get<Tax[]>('finance', 'taxes' as any, token); 
// };

// const createTax = async (token: string, payload: TaxDTO): Promise<ApiResponse<Tax>> => {
//   return await client.post<TaxDTO, Tax>('finance', 'taxes' as any, payload, token);
// };

// const updateTax = async (token: string, id: string | number, payload: Partial<Tax>): Promise<ApiResponse<Tax>> => {
//   return await client.patch<Partial<Tax>, Tax>('finance', `taxes/${id}` as any, payload, token);
// };

// const deleteTax = async (token: string, id: string | number): Promise<ApiResponse<{ success: boolean }>> => {
//   return await client.delete<{ success: boolean }>('finance', `taxes/${id}` as any, token);
// };

export default { 
  getPurchases, createPurchase, updatePurchase, deletePurchase,
  // getTaxes, createTax, updateTax, deleteTax,
};