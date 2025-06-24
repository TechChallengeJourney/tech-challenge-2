import { Box } from '@mui/material';
import { BytebankCard, BytebankText } from '@repo/ui';
import PaymentsIcon from '@mui/icons-material/Payments';
import { formatCurrencyBRL } from '../../utils/index'

interface BytebankMobilityProps {
  value?: string;
}

export default function MfeBytebankSpend({ value } : BytebankMobilityProps) {
  return (
    <BytebankCard>
      <Box padding='1.25rem'>
        <Box display='flex' alignItems="center" gap="1rem">
          <PaymentsIcon fontSize='large' />
          <BytebankText fontSize='1rem' color='primary'>Sua maior receita neste mês foi:</BytebankText>
        </Box>
          <BytebankText fontSize='1.5rem' fontWeight='bold'>{formatCurrencyBRL(value ? value : '00')}</BytebankText>
      </Box>
    </BytebankCard>
  )
}
