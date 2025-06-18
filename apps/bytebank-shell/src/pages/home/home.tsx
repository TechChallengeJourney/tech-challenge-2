import React, { FC } from 'react';
import { BytebankButton, BytebankCard, useTheme } from '@repo/ui';
import { Box, Typography } from '@mui/material';
// @ts-ignore
import MfeButton from 'remote/Button';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';

interface BytebankHomeProps {}

const BytebankHomePage: FC<BytebankHomeProps> = () => {
  const { theme } = useTheme();
  const textColor = theme.palette.text.primary;

  return (
      <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
        <BytebankBalanceCard />
        <BytebankCard>
          <Box textAlign="left" minHeight={'10rem'} p={4}>
            <Box pb={4} display={'flex'} gap={2}>
              <Typography fontWeight={'bold'} variant="lg" style={{ color: textColor }}>
                Nova transação
              </Typography>
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

              <MfeButton onClick={() => console.log('Clicou no botão')}/>
          </Box>
        </BytebankCard>
      </Box>
      );
};

export default BytebankHomePage;
