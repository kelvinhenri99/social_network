import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, login, register, logout, refreshToken } from '../services/api';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  children?: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      refreshToken(storedToken)
        .then((response) => {
          setUser(response.user);
          localStorage.setItem('token', response.access_token);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    setUser(response.user);
    localStorage.setItem('token', response.access_token);
  };

  const handleRegister = async (user: User) => {
    await register(user);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: handleLogin, register: handleRegister, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
