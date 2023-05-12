import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute: React.FC<RouteProps> = ({ element: Component, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={Component} />;
};
