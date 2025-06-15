import React from 'react';
import { Box, Typography } from '@mui/material';
import { BytebankButton, BytebankToggleButton, BytebankCard, useTheme } from '@repo/ui';
// @ts-ignore
import MfeButton from 'remote/Button';
import './App.scss';

function App() {
  const { theme } = useTheme();
  const background = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  return (
      <Box className="App" bgcolor={background} width={'100%'} minHeight={'100vh'}>
        <BytebankCard bgcolor=''>
          <Box textAlign="left" minHeight={'10rem'} p={4}>
            <Box pb={4} display={'flex'} gap={2}>
              <Typography fontWeight={'bold'} variant="lg" style={{ color: textColor }}>
                Nova transação
              </Typography>
              <BytebankToggleButton />
            </Box>
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'outlined'} color={'primary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'contained'} color={'primary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'text'} color={'primary'} />
              <br /><br />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'outlined'} color={'secondary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'contained'} color={'secondary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'text'} color={'secondary'} />
              <br /><br />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'outlined'} color={'tertiary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'contained'} color={'tertiary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'text'} color={'tertiary'} />

              <MfeButton onClick={() => console.log('Clicou no botão')}/>
          </Box>
        </BytebankCard>
      </Box>
  );
}

export default App;
