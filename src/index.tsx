import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './shared/styles/globalStyles';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <GlobalStyles />
    <App />
  </BrowserRouter>
);