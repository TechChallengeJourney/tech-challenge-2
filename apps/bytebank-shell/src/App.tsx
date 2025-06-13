import React from 'react';
import Button from 'remote/Button';
import { BytebankCard } from '@repo/ui';
import './App.scss';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Button />
      <BytebankCard title={'Titulo do card'}>
        <Box textAlign="left" minHeight={'10rem'} p={4}>
          <Box pb={4}>
            <Typography fontWeight={'bold'} variant="h6" color="black">
              Nova transação
            </Typography>
          </Box>
        </Box>
      </BytebankCard>
    </div>
  );
}

export default App;
