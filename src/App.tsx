import { useRoutes } from "react-router-dom";
import MainPage from "./components/pages/main/MainPage";
import { PopupProvider } from "./contexts/PopupContext";

import WelcomePage from "./components/pages/welcome/WelcomePage";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";

function App() {
  const elements = useRoutes([
    { path: '/', element: <WelcomePage /> },
    { path: '/main', element: <MainPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
  ])

  return (
    <PopupProvider>
      {elements}
    </PopupProvider>
  );
}

export default App;