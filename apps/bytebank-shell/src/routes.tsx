import { Routes, Route } from 'react-router-dom';
import BytebankHomePage from './pages/home/home';
import BytebankDashboardPage from './pages/dashboard/dashboard';
import { BytebankCardsPage } from "./pages/cards/cards";
import NotFound from './pages/not-found/not-found';
import Profile from './pages/profile/profile';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicGuard component={BytebankHomePage} />} />
    <Route
      path="/dashboard"
      element={<AuthGuard component={BytebankDashboardPage} />}
    />
    <Route
      path="/cartoes"
      element={<AuthGuard component={BytebankCardsPage} />}
    />
    <Route path="/*" element={<NotFound />} />
    <Route path="/minha-conta" element={<AuthGuard component={Profile} />} />
  </Routes>
);

export default AppRoutes;
