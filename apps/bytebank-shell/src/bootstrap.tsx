import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { BytebankWrapper } from './components/wrapper/wrapper';

// Verificar se estamos no navegador (cliente)
const isClient = typeof window !== 'undefined';

// Somente executa renderização no cliente
if (isClient) {
  const rootElement = document.getElementById('root');
  
  // Se o elemento já tiver conteúdo (SSR/SSG), usamos hydrate para preservar
  // Se não tiver conteúdo, fazemos a renderização normal
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <Router>
          <BytebankWrapper>
            <App />
          </BytebankWrapper>
        </Router>
      </React.StrictMode>
    );
  }

  // Reportar métricas de web vitals apenas no cliente
  reportWebVitals();
}