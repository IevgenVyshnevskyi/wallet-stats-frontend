import { useRoutes } from "react-router-dom";

import { PopupProvider } from "./contexts/PopupContext";

import WelcomePage from "./components/pages/welcome/WelcomePage";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";
import HomePage from "./components/pages/home/HomePage";
import TransactionsPage from './components/pages/transactions/TransactionsPage';
import DataEntryPage from "./components/pages/data/DataEntryPage";
import PasswordRecoveryOnePage from "./components/pages/passwordRecoveryOne/PasswordRecoveryOnePage";
import PasswordRecoveryTwoPage from "./components/pages/passwordRecoveryTwo/PasswordRecoveryTwoPage";
import PasswordRecoveryThreePage from "./components/pages/PasswordRecoveryThree/PasswordRecoveryThreePage";
import TwoFactorAuthenticationPage from "./components/pages/twoFactorAuthentication/TwoFactorAuthenticationPage";
import CategoriesPage from './components/pages/categories/CategoriesPage';

function App() {
  const elements = useRoutes([
    { path: '/', element: <WelcomePage /> },
    { path: '/recoveryOne', element: <PasswordRecoveryOnePage /> },
    { path: '/recoveryTwo', element: <PasswordRecoveryTwoPage /> },
    { path: '/recoveryThree', element: <PasswordRecoveryThreePage /> },
    { path: '/authentication', element: <TwoFactorAuthenticationPage /> },
    { path: '/data', element: <DataEntryPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/home', element: <HomePage /> },
    { path: '/transactions', element: <TransactionsPage /> },
    { path: '/categories', element: <CategoriesPage /> },
  ])

  return (
    <PopupProvider>
      {elements}
    </PopupProvider>
  );
}

export default App;