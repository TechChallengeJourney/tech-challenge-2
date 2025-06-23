import React from 'react';
import './App.scss';
import MfeButton from './components/Button';
import { BytebankThemeProvider } from '@repo/utils';
import { Box } from '@mui/material';

function App() {
  return (
    <BytebankThemeProvider>
      <Box className="App">
        This is my MFE Investments <br /><br />
        <MfeButton />
      </Box>
    </BytebankThemeProvider>
  );
}

export default App;
