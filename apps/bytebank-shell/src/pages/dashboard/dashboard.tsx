import React, { FC, useState } from 'react';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';
import { Box, Typography } from '@mui/material';
import { BytebankCard, BytebankButton, BytebankModal, BytebankText } from '@repo/ui';
// @ts-ignore
import {BytebankAnalytics, BytebankMobility, BytebankSalary, BytebankSpend, BytebankMonthlyResume} from 'remote/components'
import { useTheme } from '@repo/utils';
import { BytebankTransactionCard } from '../../components/transaction-card/transaction-card';
import { UserProvider } from '@repo/data-access';
// @ts-ignore
const BytebankExtract = React.lazy(() => import('transactions/BytebankExtract').then((module) => ({
    default: module.default || module.BytebankExtract,
  }))
);

interface BytebankDashboardProps { }

const BytebankDashboardPage: FC<BytebankDashboardProps> = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const textColor = theme.palette.text.primary;

  return (
    <>
      <Box width={'100%'} px={4} pb={2} display={'flex'} flexDirection={'column'} gap={2}>
        <Box>
          <BytebankBalanceCard />
        </Box>

        <Box>
          <BytebankCard>
            <Box textAlign="left" minHeight={'10rem'} p={4}>
              <Box pb={4} display={'flex'} gap={2}>
                <Typography fontWeight={'bold'} variant="lg">
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

              <BytebankButton label="Abrir modal" sendSubmit={() => setOpen(true)} color={'primary'}></BytebankButton>

            </Box>
          </BytebankCard>
          <Box width="515px" marginTop={3}>
            <BytebankTransactionCard />
          </Box>
          <Box display="grid" marginTop="2rem" gridTemplateColumns="1fr 1fr 1fr" gap="30px" sx={{gridTemplateColumns: {xs: '1fr',sm: '1fr 1fr', md: '1fr 1fr 1fr'}}}>
            <BytebankMobility />
            <BytebankSalary />
            <BytebankSpend />
          </Box>
          <Box display="grid" marginY="2rem" gridTemplateColumns="1fr 1fr" gap="30px" sx={{gridTemplateColumns: {sm: '1fr', md: '1fr 1fr'}}}>
            <BytebankMonthlyResume />
            <BytebankAnalytics />
          </Box>
          <BytebankCard >
            <Box textAlign="left" minHeight={'10rem'} p={4}>
              <Typography fontWeight={'bold'} variant="lg" mb={2}>
                Extrato
              </Typography>
              <React.Suspense fallback={<div>Carregando extrato...</div>}>
                  <BytebankExtract />
              </React.Suspense>
            </Box>
          </BytebankCard>
        </Box>
        <BytebankModal
          open={open}
          title="Confirmar exclusão"
          illustrationShow={false}
          onClose={() => setOpen(false)}
        >
          <Box>
            <Typography style={{ marginBottom: 16 }}>
              Tem certeza que deseja excluir este item?
            </Typography>
            <Box style={{ display: 'flex', gap: 8 }}>
              <BytebankButton
                label="Sim"
                color="secondary"
                variant="outlined"
              />
              <BytebankButton
                label="Não"
                color="secondary"
                variant="contained"
              />
            </Box>
          </Box>
        </BytebankModal>
      </Box>
    </>
  );
};

export default BytebankDashboardPage;
