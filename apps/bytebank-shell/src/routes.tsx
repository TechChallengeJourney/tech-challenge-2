import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "./guards/auth.guard";
import { BytebankCardsPage } from "./pages/cards/cards";
import BytebankDashboardPage from "./pages/dashboard/dashboard";
import BytebankHomePage from "./pages/home/home";
import NotFound from "./pages/not-found/not-found";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BytebankHomePage />} />
    <Route
      path="/dashboard"
      element={<AuthGuard component={BytebankDashboardPage} />}
    />
    <Route
      path="/cartoes"
      element={<AuthGuard component={BytebankCardsPage} />}
    />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
