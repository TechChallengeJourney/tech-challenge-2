import React, { FC, useState } from 'react';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';
import { Box, Typography } from '@mui/material';
import { BytebankCard, BytebankButton, BytebankModal } from '@repo/ui';
// @ts-ignore
import { BytebankAnalytics, BytebankMobility, BytebankSalary, BytebankSpend, BytebankMonthlyResume } from 'remote/components'
import { useTheme } from '@repo/utils';
// @ts-ignore
const BytebankExtract = React.lazy(() => 
  import('transactions/BytebankExtract').then((module) => ({
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
          <Box display={'flex'} justifyContent={'flex-end'} pb={2}>
          <BytebankButton label={'Customizar widgets'} variant={'contained'} color={'secondary'} />
          </Box>
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="30px" sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
            <BytebankMobility />
            <BytebankSalary />
            <BytebankSpend />
          </Box>
          <Box display="grid" marginY="2rem" gridTemplateColumns="1fr 1fr" gap="30px" sx={{ gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' } }}>
            <BytebankMonthlyResume />
            <BytebankAnalytics />
          </Box>
          
        </Box>
        <Box>
          <Box display="grid" gridTemplateColumns="1fr 2fr " gap="30px" sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr', md: '1fr 2fr' } }}>
            <Box>
              <BytebankCard >
                <Box p={4}>
                  Nova Transaçao
                </Box>
              </BytebankCard>
            </Box>
            <Box textAlign="left" minHeight={'10rem'}>
              <React.Suspense fallback={<div>Carregando extrato...</div>}>
                <BytebankExtract />
              </React.Suspense>
            </Box>
          </Box>
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
