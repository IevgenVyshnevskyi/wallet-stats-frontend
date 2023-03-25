import { useRoutes } from "react-router-dom";

function App() {
  const elements = useRoutes([
    { path: '/', element: <></> }
  ])

  return elements;
}

export default App;
