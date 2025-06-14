import React from 'react';
// @ts-ignore: Module 'remote/Button' might be dynamically loaded via Module Federation
import MfeButton from 'remote/Button';
import { BytebankButton, BytebankCard, defaultTheme } from '@repo/ui';
import './App.scss';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <BytebankCard>
          <Box textAlign="left" minHeight={'10rem'} p={4}>
            <Box pb={4} display={'flex'} flexDirection={'column'} gap={2}>
              <Typography fontWeight={'bold'} variant="h6" color="black">
                Nova transação
              </Typography>
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'contained'} color={'primary'} />
              <MfeButton />
            </Box>
          </Box>
        </BytebankCard>
      </div>
    </ThemeProvider>
  );
}

export default App;
