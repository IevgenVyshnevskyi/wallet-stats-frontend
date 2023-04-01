import { useRoutes } from "react-router-dom";

import { PopupProvider } from "./contexts/PopupContext";

import HomePage from "./components/pages/home/HomePage";
import WelcomePage from "./components/pages/welcome/WelcomePage";
import TransactionsPage from './components/pages/transactions/TransactionsPage';

function App() {
  const elements = useRoutes([
    { path: '/', element: <WelcomePage /> },
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