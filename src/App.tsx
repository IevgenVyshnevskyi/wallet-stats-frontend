import { useRoutes } from "react-router-dom";
import WelcomePage from './components/pages/welcome/WelcomePage';

function App() {
  const elements = useRoutes([
    { path: '/', element: <WelcomePage /> }
  ])

  return elements;
}

export default App;
