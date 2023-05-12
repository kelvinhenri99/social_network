import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginResponse, login, logout, register, refreshToken } from '../services/api';

interface AuthContextData {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<User>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);


  const signIn = async (email: string, password: string) => {
    const response: LoginResponse = await login(email, password);

    setUser(response.user);
    setToken(response.access_token);

    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.access_token);
  };
  

  const signOut = async () => {
    if (!token) return;

    try {
      await logout(token);
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setToken(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

const handleRegister = async (name: string, email: string, password: string) => {
  const user = await register(name, email, password);
  return user;
}

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, register: handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};


