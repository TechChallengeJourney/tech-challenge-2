import React from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BytebankButton, BytebankCard, BytebankWrapper, defaultTheme } from '@repo/ui';
// @ts-ignore: Module 'remote/Button' might be dynamically loaded via Module Federation
import MfeButton from 'remote/Button';
import './App.scss';

function App() {
  return (
    <BytebankWrapper>
      <div className="App">
        <BytebankCard>
          <Box textAlign="left" minHeight={'10rem'} p={4}>
            <Box pb={4} display={'flex'} flexDirection={'column'} gap={2}>
              <Typography fontWeight={'bold'} variant="h6" color="black">
                Nova transação
              </Typography>
            </Box>
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'contained'} color={'primary'} />
              <MfeButton />
          </Box>
        </BytebankCard>
      </div>
    </BytebankWrapper>
  );
}

export default App;
