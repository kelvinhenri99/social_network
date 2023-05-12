import React, { lazy } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../routes/PrivateRoutes';


import { useAuth } from '../contexts/AuthContext';


const LoginPage = lazy(() => import('../pages/Auth/Login/index'));
const RegisterPage = lazy(() => import('../pages/Auth/Register/index'));
const HomePage = lazy(() => import('../pages/Home/index'));

const AllRoutes: React.FC = () => {

  const { user } = useAuth();


  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute path="/" element={<HomePage />} />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

      {user ? (
        <Route path="/" element={<HomePage />} />
      ) : (
        <Route element={<PrivateRoute path="/" element={<HomePage />} />} />
      )}

    </Routes>
  );
};

export default AllRoutes;
