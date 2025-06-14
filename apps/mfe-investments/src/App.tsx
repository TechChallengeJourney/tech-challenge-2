import React from 'react';
import { defaultTheme } from '@repo/ui';
import './App.scss';
import MfeButton from './components/Button';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <MfeButton />
        This is my MFE Investments
      </div>
    </ThemeProvider>
  );
}

export default App;
