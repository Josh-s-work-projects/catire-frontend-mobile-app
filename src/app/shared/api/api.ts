import axios from 'axios'
import { Endpoint, Services } from './urls';
import { ApiResponse } from './models';

export class Api {
  private apiUrl = '';
  private apiClient;
  
  constructor() {
    this.apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost/api';
    this.apiClient = axios.create({
      baseURL: this.apiUrl,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  async get<R>(service: Services, endpoint: Endpoint, token: string, id?: number | string): Promise<ApiResponse<R>> {
    try {
      let route = `${service}/${endpoint}`;
      if(id) route += `/${id}`

      const res = await this.apiClient.get(route, {
        headers: { authorization: `Bearer ${token}` }
      })

      if (res.status !== 200)
        return {
          error: true,
          message: res.data.message,
          data: null
        }

      return {
        error: false,
        message: '',
        data: res.data
      }
    } catch (error) {
      console.log(error);

      return {
        error: true,
        message: error as string,
        data: null
      }
    }
  }

  async post<D, R>(service: Services, endpoint: Endpoint, data: D, token?: string): Promise<ApiResponse<R>> {
    try {
      const config = token ?  { headers: { authorization: `Bearer ${token}` } } : undefined;

      const res = await this.apiClient.post(`${service}/${endpoint}`, data, config)

      if (res.status !== 200)
        return {
          error: true,
          message: res.data.message,
          data: null
        }

      return {
        error: false,
        message: '',
        data: res.data as R
      }
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        message: error as string,
        data: null
      }
    }
  }

  async patch<D, R>(service: Services, endpoint: Endpoint, data: D, token: string): Promise<ApiResponse<R>> {
    try {
      const res = await this.apiClient.patch(`${service}/${endpoint}`, data, {
        headers: { authorization: `Bearer ${token}` }
      })

      if (res.status !== 200)
        return {
          error: true,
          message: res.data.message,
          data: null
        }

      return {
        error: false,
        message: '',
        data: res.data as R
      }
    } catch (error) {
      console.log(error);

      return {
        error: true,
        message: error as string,
        data: null
      }
    }
  }

  async delete<R>(service: Services, endpoint: Endpoint, token: string): Promise<ApiResponse<R>> {
    try {
      const res = await this.apiClient.delete(`${service}/${endpoint}`, {
        headers: { authorization: `Bearer ${token}` }
      });

      if (res.status !== 200)
        return {
          error: true,
          message: res.data.message,
          data: null
        }

      return {
        error: false,
        message: '',
        data: res.data
      }
    } catch (error) {
      console.log(error);

      return {
        error: true,
        message: error as string,
        data: null
      }
    }
  }
}