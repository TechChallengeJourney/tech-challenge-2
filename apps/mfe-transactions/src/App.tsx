import React, { Suspense } from 'react';
import './App.scss';
import { BytebankThemeProvider } from '@repo/utils';
import { Box } from '@mui/material';
import BytebankExtract  from './components/extract';

// Lazy load the Transactions component to create an async boundary

function App() {
  return (
    <BytebankThemeProvider>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando...</div>}>
                    <BytebankExtract />

      </Suspense>
    </BytebankThemeProvider>
  );
}

export default App;
