import React from 'react';
import MfeButton from 'remote/Button';
import { BytebankCard, defaultTheme } from '@repo/ui';
import './App.scss';
import { Box, ThemeProvider, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
      <BytebankCard title={'Titulo do card'}>
        <Box textAlign="left" minHeight={'10rem'} p={4}>
          <Box pb={4}>
            <Typography fontWeight={'bold'} variant="h6" color="black">
              Nova transação
            </Typography>
            <MfeButton />
          </Box>
        </Box>
      </BytebankCard>
      </ThemeProvider>
    </div>
  );
}

export default App;
