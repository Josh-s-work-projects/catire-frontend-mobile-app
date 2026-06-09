import { Api } from '../../../../shared/api';
import type { User } from '../../../core/types';

const client = new Api();

type LoginResponse = { token: string; user: User };

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await client.post('auth', 'login', { email, password });
  if (res.error) throw new Error(String(res.message));
  return res.data as LoginResponse;
};

const validate = async (token: string): Promise<User> => {
  const res = await client.post('auth', 'validate', { token });
  if (res.error) throw new Error(String(res.message));
  return res.data as User;
};

const register = async (payload: { full_name: string; email: string; password: string; dni?: number; phone_1?: string; phone_2?: string; role_id?: number }) => {
  // Use POST /auth/users as register endpoint; default role_id should be provided by caller
  const data = { ...payload };
  if (!data.role_id) data.role_id = 1; // default to client
  const res = await client.post('auth', 'users', data as any);
  if (res.error) throw new Error(String(res.message));
  return res.data;
};

export default { login, validate, register };
