import axios, { AxiosResponse } from 'axios';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface UserProfile {
  name: string;
  email: string;
}

const api = axios.create({
  baseURL: 'http://localhost:8000/api/auth', //aqui você deve colocar a URL da sua API Laravel
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const login = async (data: LoginData): Promise<AxiosResponse> => {
  const response = await api.post('/login', data);
  return response;
}

export const register = async (data: RegisterData): Promise<AxiosResponse> => {
  const response = await api.post('/register', data);
  return response;
}

export const logout = async (): Promise<AxiosResponse> => {
  const response = await api.post('/logout');
  return response;
}

export const refresh = async (): Promise<AxiosResponse> => {
  const response = await api.post('/refresh');
  return response;
}

export const getUserProfile = async (): Promise<AxiosResponse<UserProfile>> => {
  const response = await api.get('/user-profile');
  return response;
}