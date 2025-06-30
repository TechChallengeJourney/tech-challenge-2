import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Lazy load the App to create an async boundary for Material UI
const App = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Carregando aplicação...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);

// Carregar o reportWebVitals de forma assíncrona
import('./reportWebVitals').then(({ default: reportWebVitals }) => {
  reportWebVitals();
});
