import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BytebankHomePage from './pages/home/home';
import BytebankDashboardPage from './pages/dashboard/dashboard';
import SSRPage from './pages/ssr/ssr-page';
import SSGPage from './pages/ssg/ssg-page';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BytebankHomePage />} />
    <Route path="/dashboard" element={<BytebankDashboardPage />} />
    <Route path="/ssr-exemplo" element={<SSRPage />} />
    <Route path="/ssg-exemplo" element={<SSGPage />} />
  </Routes>
);

export default AppRoutes;
