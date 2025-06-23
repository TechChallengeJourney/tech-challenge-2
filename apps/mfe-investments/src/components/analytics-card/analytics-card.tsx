import { Box } from '@mui/material';
import { BytebankCard, BytebankText, useTheme } from '@repo/ui';

interface BytebankMobilityProps {
  value?: string;
}

export default function BytebankAnalytics({ value } : BytebankMobilityProps) {
  const { colors } = useTheme();


  return (
    <BytebankCard>
      <Box padding='1.25rem'>
        <BytebankText fontSize='1.5rem' fontWeight='bold'>Análise Financeira</BytebankText>
        <Box display="flex" justifyContent="space-between" marginTop="2.25rem">
          <BytebankText fontSize='1.125rem' fontWeight='bold'>Receitas do mês</BytebankText>
          <BytebankText fontSize='1.125rem' fontWeight='bold'>R$ 120,00</BytebankText>
        </Box>
          <Box width="100%" height="18px" bgcolor="#d9d9d9" borderRadius="1000px" overflow="hidden">
            <Box width="70%" height="100%" borderRadius="1000px" bgcolor={colors['lime.600']}></Box>
          </Box>
        <Box display="flex" justifyContent="space-between" marginTop="2rem">
          <BytebankText fontSize='1.125rem' fontWeight='bold'>Despesas do mês</BytebankText>
          <BytebankText fontSize='1.125rem' fontWeight='bold'>R$ 40,00</BytebankText>
        </Box>
        <Box width="100%" height="18px" bgcolor="#d9d9d9" borderRadius="1000px" overflow="hidden">
          <Box width="70%" height="100%"  borderRadius="1000px" bgcolor={colors['lime.900']}></Box>
        </Box>
      </Box>
    </BytebankCard>
  )
}
