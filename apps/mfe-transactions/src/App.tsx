import React, { Suspense } from 'react';
import './App.scss';
import { BytebankThemeProvider } from '@repo/utils';
import { Box } from '@mui/material';

// Lazy load the Transactions component to create an async boundary
const Transactions = React.lazy(() => import('./components/Transactions'));

function App() {
  return (
    <BytebankThemeProvider>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>}>
        <Box className="App">
          <h1>Transações Bytebank</h1>
          <Suspense fallback={<div>Carregando transações...</div>}>
            <Transactions onViewMore={() => console.log('Ver mais transações')} />
          </Suspense>
        </Box>
      </Suspense>
    </BytebankThemeProvider>
  );
}

export default App;
