import { Routes, Route } from 'react-router-dom';
import BytebankHomePage from './pages/home/home';
import BytebankDashboardPage from './pages/dashboard/dashboard';
import NotFound from './pages/not-found/not-found';
import { AuthGuard } from './guards/auth.guard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BytebankHomePage />} />
    <Route path="/dashboard" element={<AuthGuard component={BytebankDashboardPage} />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
