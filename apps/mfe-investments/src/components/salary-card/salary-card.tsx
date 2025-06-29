import { Box } from '@mui/material';
import { BytebankCard, BytebankText } from '@repo/ui';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { formatCurrencyBRL } from '@repo/utils';

interface BytebankMobilityProps {
  value?: string;
}

export function BytebankSalary({ value } : BytebankMobilityProps) {
  return (
    <BytebankCard>
      <Box padding='1.25rem'>
        <Box display='flex' alignItems="center" gap="1rem">
          <TrendingUpIcon fontSize='large' />
          <BytebankText variant='sm' color='primary'>Sua maior receita neste mês foi:</BytebankText>
        </Box>
          <BytebankText variant='md' fontWeight='bold'>Salário líquido</BytebankText>
          <BytebankText variant='sm'>Valor: <span style={{fontWeight: "700"}}>{formatCurrencyBRL(value ? value : '00')}</span></BytebankText>
      </Box>
    </BytebankCard>
  )
}
