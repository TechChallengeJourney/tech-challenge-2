import React, { FC, useEffect, useState } from 'react';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';
import { Box, Typography } from '@mui/material';
import { BytebankButton, BytebankModal } from '@repo/ui';
import { BytebankTransactionCard } from '../../components/transaction-card/transaction-card';

// @ts-ignore
import { BytebankGeneralCardsWidget, BytebankMonthlyResumeWidget, BytebankAnalyticsWidget, BytebankFinancialStatusWidget, BytebankWidgetDrawer } from 'investments/components'
import { useUser, WidgetKey } from '@repo/data-access';
// @ts-ignore
const BytebankExtract = React.lazy(() =>
  // @ts-ignore
  import('transactions/BytebankExtract').then((module) => ({
    default: module.default || module.BytebankExtract,
  }))
);

interface BytebankDashboardProps { }

const BytebankDashboardPage: FC<BytebankDashboardProps> = () => {

  const [openModal, setModalOpen] = useState(false);
  const [openDrawer, setDrawerOpen] = useState(false);
  const { user } = useUser();
  const selectedWidgets = user?.selectedWidgets ?? [];

  const validateUserWidget = (widget: WidgetKey) => selectedWidgets.includes(widget);

  useEffect(() => { }, [user])
  const openWidgetDrawer = (value: boolean = true) => { setDrawerOpen(value); };

  return (
    <>
      <Box width={'100%'} px={4} pb={2} display={'flex'} flexDirection={'column'} gap={2}>
        <Box>
          <BytebankBalanceCard />
        </Box>
        <Box>
          <Box display={'flex'} justifyContent={'flex-end'} pb={2}>
          <BytebankButton label={'Customizar widgets'} variant={'contained'} color={'secondary'} onClick={() => openWidgetDrawer()} />
          </Box>
          <BytebankGeneralCardsWidget />
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} sx={{ gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' } }}>
            {validateUserWidget(WidgetKey.MonthlySummary) ? <BytebankMonthlyResumeWidget userId={user?._id} /> : null}
            <Box display={'flex'} gap={2} flexDirection={'column'}>
              {validateUserWidget(WidgetKey.FinancialAnalysis) ? <BytebankAnalyticsWidget userId={user?._id} /> : null}
              {validateUserWidget(WidgetKey.FinancialStatus) ? <BytebankFinancialStatusWidget userId={user?._id} /> : null}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box display="grid" gridTemplateColumns="1fr 2fr " gap={2} sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr', md: '1fr 2fr' } }}>
            <Box>
              <BytebankTransactionCard />
            </Box>
            <Box textAlign="left" minHeight={'10rem'}>
              <React.Suspense fallback={<div>Carregando extrato...</div>}>
                <BytebankExtract />
              </React.Suspense>
            </Box>
          </Box>
        </Box>
        <BytebankModal
          open={openModal}
          title="Confirmar exclusão"
          illustrationShow={false}
          onClose={() => setModalOpen(false)}
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
      <BytebankWidgetDrawer openDrawer={openDrawer} onClose={() => openWidgetDrawer(false)} />
    </>
  );
};

export default BytebankDashboardPage;
