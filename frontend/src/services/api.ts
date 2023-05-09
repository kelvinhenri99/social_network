import axios, { AxiosResponse } from 'axios';

export interface User {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

const api = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
});

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

export async function register(user: User): Promise<User> {
  try {
    const response: AxiosResponse<User> = await api.post('/register', user);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/logout');
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}

export async function refreshToken(token: string): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post('/refresh', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response: AxiosResponse<User> = await api.put(`/users/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
}
