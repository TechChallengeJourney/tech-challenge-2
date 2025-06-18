import { FC } from 'react';
import { Box } from '@mui/material';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';

interface BytebankHomeProps { }

const BytebankHomePage: FC<BytebankHomeProps> = () => {
  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
      <BytebankBalanceCard />
    </Box>
  );
};

export default BytebankHomePage;
