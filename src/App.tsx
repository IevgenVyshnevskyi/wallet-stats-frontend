import { useRoutes } from "react-router-dom";
import MainPage from "./components/pages/main/MainPage";
import { PopupProvider } from "./contexts/PopupContext";

import WelcomePage from "./components/pages/welcome/WelcomePage";

function App() {
  const elements = useRoutes([
    { path: '/', element: <WelcomePage /> },
    { path: '/main', element: <MainPage /> },
  ])

  return (
    <PopupProvider>
      {elements}
    </PopupProvider>
  );
}

export default App;