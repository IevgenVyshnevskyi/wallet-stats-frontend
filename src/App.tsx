import { useRoutes } from "react-router-dom";

import WelcomePage from "./components/pages/welcome/WelcomePage";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";
import HomePage from "./components/pages/home/HomePage";
import TransactionsPage from './components/pages/transactions/TransactionsPage';
import DataEntryPage from "./components/pages/data/DataEntryPage";
import PasswordRecoveryOnePage from "./components/pages/passwordRecoveryOne/PasswordRecoveryOnePage";
import PasswordRecoveryTwoPage from "./components/pages/passwordRecoveryTwo/PasswordRecoveryTwoPage";
import PasswordRecoveryThreePage from "./components/pages/PasswordRecoveryThree/PasswordRecoveryThreePage";
import TwoFactorAuthenticationPage from "./components/pages/2FA/TwoFactorAuthenticationPage";
import CategoriesPage from './components/pages/categories/CategoriesPage';
import StatisticsPage from "./components/pages/statistics/StatisticsPage";

import { PopupProvider } from "./contexts/PopupContext";
import PopupEditWallet from "./components/molecules/popup/PopupEditWallet";
import PopupEditProfile from "./components/molecules/popup/PopupEditProfile";

function App() {
  const elements = useRoutes([
    { path: '/', element: <WelcomePage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/data-entry', element: <DataEntryPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/authentication', element: <TwoFactorAuthenticationPage /> },
    { path: '/recoveryOne', element: <PasswordRecoveryOnePage /> },
    { path: '/recoveryTwo', element: <PasswordRecoveryTwoPage /> },
    { path: '/recoveryThree', element: <PasswordRecoveryThreePage /> },
    { path: '/home', element: <HomePage /> },
    { path: '/transactions', element: <TransactionsPage /> },
    { path: '/categories', element: <CategoriesPage /> },
    { path: '/statistics', element: <StatisticsPage /> },

    { path: '/popup', element: <PopupEditProfile /> },
  ])

  return (
    <PopupProvider>
      {elements}
    </PopupProvider>
  );
}

export default App;