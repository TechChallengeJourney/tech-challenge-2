import { Box } from '@mui/material';
import { BytebankCard, BytebankText } from '@repo/ui';
import { formatCurrencyBRL } from '@repo/utils';
import PaymentsIcon from '@mui/icons-material/Payments';

interface BytebankMobilityProps {
  value?: string;
}

export function BytebankSpend({ value } : BytebankMobilityProps) {
  return (
      <BytebankCard>
        <Box padding='1.25rem'>
          <Box display='flex' alignItems="center" gap="1rem">
            <PaymentsIcon fontSize='large' />
            <BytebankText variant='sm' color='primary'>Média de gastos diários:</BytebankText>
          </Box>
            <BytebankText variant='lg' fontWeight='bold'>{formatCurrencyBRL(value ? value : '00')}</BytebankText>
        </Box>
      </BytebankCard>
  )
}
