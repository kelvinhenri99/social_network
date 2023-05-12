import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { getHeaders } from '../utils/utils'


export interface User {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

const api = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
});

function getHeaders(method = 'GET', token: string, body?: any): AxiosRequestConfig {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method,
    data: body,
  };
}



export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}

export async function register(name: string, email: string, password: string): Promise<User> {
  try {
    const response: AxiosResponse<User> = await api.post('/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}

export async function logout(token: string): Promise<void> {
  try {
    await api.post('/logout', null, getHeaders('POST', token ));
  } catch (error: any) {
    throw new Error(error.response?.data?.errors?.[0] ?? 'Erro ao fazer logout');
  }
}

export async function refreshToken(token: string): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post('/refresh', null, getHeaders('POST', token ));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const response: AxiosResponse<User[]> = await api.get('/users');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const response: AxiosResponse<User> = await api.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}

export async function updateUser(id: string, user: User, token: string): Promise<User> {
  try {
    const response: AxiosResponse<User> = await api.put(`/users/${id}`, user, getHeaders('PUT', token ));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}
