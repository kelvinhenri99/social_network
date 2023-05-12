import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute: React.FC<RouteProps> = ({ element: Component, ...rest }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!Component) {
    return null;
  }

  return <Route {...rest} element={Component} />;
};

