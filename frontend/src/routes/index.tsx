import React, { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const LoginPage = lazy(() => import('../pages/Auth/Login/index'));
const RegisterPage = lazy(() => import('../pages/Auth/Register/index'));
const HomePage = lazy(() => import('../pages/Home/index'));

const AllRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
    </Suspense>
  );
};

export default AllRoutes;
