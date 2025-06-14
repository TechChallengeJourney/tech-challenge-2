import React from 'react';
import './App.scss';
import MfeButton from './components/Button';
import { BytebankWrapper } from '@repo/ui';
import { Box } from '@mui/material';

function App() {
  return (
    <BytebankWrapper>
      <Box className="App">
        This is my MFE Investments <br /><br />
        <MfeButton />
      </Box>
    </BytebankWrapper>
  );
}

export default App;
