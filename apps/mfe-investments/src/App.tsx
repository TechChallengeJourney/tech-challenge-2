import React from 'react';
import './App.scss';
import { BytebankThemeProvider } from '@repo/utils';
import { Box } from '@mui/material';

function App() {
  return (
    <BytebankThemeProvider>
      <Box className="App">
        This is my MFE Investments <br /><br />
      </Box>
    </BytebankThemeProvider>
  );
}

export default App;
