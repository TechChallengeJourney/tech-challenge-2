import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BytebankHomePage from './pages/home/home';
import BytebankDashboardPage from './pages/dashboard/dashboard';
import NotFound from './pages/not-found/not-found';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BytebankHomePage />} />
    <Route path="/dashboard" element={<BytebankDashboardPage />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
