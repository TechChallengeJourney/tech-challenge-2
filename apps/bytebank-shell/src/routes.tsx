import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BytebankHomePage from './pages/home/home';
import BytebankDashboardPage from './pages/dashboard/dashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BytebankHomePage />} />
    <Route path="/dashboard" element={<BytebankDashboardPage />} />
  </Routes>
);

export default AppRoutes;
