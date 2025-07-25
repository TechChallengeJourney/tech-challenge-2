import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { BytebankWrapper } from './components/wrapper/wrapper';
import { FinancialDataProvider, UserProvider } from '@repo/data-access';
import ErrorBoundary from './error-boundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <FinancialDataProvider>
          <Router>
            <BytebankWrapper>
              <App />
            </BytebankWrapper>
          </Router>
        </FinancialDataProvider>
      </UserProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();