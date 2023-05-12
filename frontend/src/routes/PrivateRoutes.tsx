import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoutes: React.FC = () => { 
  const { token } = useAuth();

  return token ? <Outlet /> : null; 
};
