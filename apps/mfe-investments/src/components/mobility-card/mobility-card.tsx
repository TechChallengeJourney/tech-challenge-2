import { Box } from '@mui/material';
import { BytebankCard, BytebankText } from '@repo/ui';
import { formatCurrencyBRL } from '@repo/utils';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface BytebankMobilityProps {
  value?: string;
}

export const BytebankMobility = ({ value } : BytebankMobilityProps) => {
  return (
    <BytebankCard>
      <Box padding='1.25rem'>
        <Box display='flex' alignItems="center" gap="1rem">
          <TrendingDownIcon fontSize='large' />
          <BytebankText variant='sm' color='primary'>Sua maior despesa neste mês foi em:</BytebankText>
        </Box>
          <BytebankText variant='md' fontWeight='bold'>Mobilidade</BytebankText>
          <BytebankText variant='sm'>Valor: <span style={{fontWeight: "700"}}>{formatCurrencyBRL(value ? value : '00')}</span></BytebankText>
      </Box>
    </BytebankCard>
  )
}
