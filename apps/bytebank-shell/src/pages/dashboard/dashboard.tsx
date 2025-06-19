import { FC } from 'react';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';
import { Box, Typography } from '@mui/material';
import { BytebankCard, BytebankButton, useTheme } from '@repo/ui';
// @ts-ignore
import MfeButton from 'remote/Button';

interface BytebankDashboardProps { }

const BytebankDashboardPage: FC<BytebankDashboardProps> = () => {
  const { theme } = useTheme();
  const textColor = theme.palette.text.primary;

  return (
    <>
      <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
        <Box>
          <BytebankBalanceCard />
        </Box>

        <Box>
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

              <MfeButton onClick={() => console.log('Clicou no botão')} />
            </Box>
          </BytebankCard>
        </Box>
      </Box>
    </>
  );
};

export default BytebankDashboardPage;
