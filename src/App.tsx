import { useRoutes } from "react-router-dom";

import { PopupProvider } from "./contexts/PopupContext";

import WelcomePage from "./components/pages/welcome/WelcomePage";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";
import HomePage from "./components/pages/home/HomePage";
import TransactionsPage from './components/pages/transactions/TransactionsPage';

function App() {
  const elements = useRoutes([
    { path: '/', element: <WelcomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/home', element: <HomePage /> },
    { path: '/transactions', element: <TransactionsPage /> },
  ])

  return (
    <PopupProvider>
      {elements}
    </PopupProvider>
  );
}

export default App;