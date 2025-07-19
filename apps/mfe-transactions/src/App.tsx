import { Suspense } from 'react';
import './App.scss';
import { BytebankThemeProvider } from '@repo/utils';
import { BytebankExtract } from './components/extract';

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
