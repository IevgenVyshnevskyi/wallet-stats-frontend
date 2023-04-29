import { useRoutes, Navigate } from "react-router-dom";

import { PopupProvider } from "./contexts/PopupContext";

import WelcomePage from "./components/pages/welcome/WelcomePage";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";
import HomePage from "./components/pages/home/HomePage";
import TransactionsPage from './components/pages/transactions/TransactionsPage';
import DataEntryPage from "./components/pages/data/DataEntryPage";
import PasswordRecovery from "./components/pages/password-recovery/PasswordRecovery";
import TwoFactorAuthenticationPage from "./components/pages/2FA/TwoFactorAuthenticationPage";
import CategoriesPage from './components/pages/categories/CategoriesPage';
import StatisticsPage from "./components/pages/statistics/StatisticsPage";

function App() {
  const elements = useRoutes([
    { path: '/', element: <Navigate to="/home" replace /> },
    { path: '/welcome', element: <WelcomePage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/data-entry', element: <DataEntryPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/authentication', element: <TwoFactorAuthenticationPage /> },
    { path: '/password-recovery', element: <PasswordRecovery /> },
    { path: '/home', element: <HomePage /> },
    { path: '/transactions', element: <TransactionsPage /> },
    { path: '/categories', element: <CategoriesPage /> },
    { path: '/statistics', element: <StatisticsPage /> },
  ])

  return (
    <PopupProvider>
      {elements}
    </PopupProvider>
  );
}

export default App;