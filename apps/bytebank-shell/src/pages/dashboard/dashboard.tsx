import React, { FC } from 'react';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';
import { Box } from '@mui/material';

interface BytebankDashboardProps { }

const BytebankDashboardPage: FC<BytebankDashboardProps> = () => {

  return (
    <Box width={'100%'}>
      <BytebankBalanceCard />
    </Box>
  );
};

export default BytebankDashboardPage;
