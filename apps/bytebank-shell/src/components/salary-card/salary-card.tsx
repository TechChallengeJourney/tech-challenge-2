import { Box } from '@mui/material';
import { BytebankCard, BytebankText } from '@repo/ui';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { formatCurrencyBRL } from '../../utils/index'

interface BytebankMobilityProps {
  value?: string;
}

export default function BytebankSalary({ value } : BytebankMobilityProps) {
  return (
    <BytebankCard>
      <Box padding='1rem'>
        <Box display='flex' alignItems="center" gap="1rem">
          <TrendingUpIcon fontSize='large' />
          <BytebankText fontSize='1rem' color='primary'>Sua maior receita neste mês foi:</BytebankText>
        </Box>
          <BytebankText fontSize='1.25rem' fontWeight='bold'>Salário líquido</BytebankText>
          <BytebankText fontSize='1rem'>Valor: <span style={{fontWeight: "700"}}>{formatCurrencyBRL(value ? value : '00')}</span></BytebankText>
      </Box>
    </BytebankCard>
  )
}
