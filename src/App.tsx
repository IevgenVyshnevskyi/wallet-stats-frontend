import { useRoutes } from "react-router-dom";
import MainPage from "./components/pages/main/MainPage";
import { PopupProvider } from "./contexts/PopupContext";

function App() {
  const elements = useRoutes([
    { path: '/', element: <MainPage /> },
  ]);

  return (
    <PopupProvider>
      {elements}
    </PopupProvider>
  );
}

export default App;
