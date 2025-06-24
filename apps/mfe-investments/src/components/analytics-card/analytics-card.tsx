import { Box } from '@mui/material';
import { BytebankCard, BytebankText, BytebankButton } from '@repo/ui';
import { useTheme } from '@repo/utils';
import { useState } from 'react';

interface BytebankMobilityProps {
  value?: string;
}

export default function MfeBytebankAnalytics({ value } : BytebankMobilityProps) {
  const { colors } = useTheme();
  const category = 'Lazer'
  const percentage = '25%'
  const [valor, setValue] = useState(10);
  
  function handleClick() {
    setValue(valor + 20);
    console.log(valor);
  }

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
          <Box width="45%" height="100%"  borderRadius="1000px" bgcolor={colors['lime.900']}></Box>
        </Box>
        <Box marginY="2rem">
          <BytebankText fontSize='1rem'>Neste mês, suas receitas superaram as despesas, resultando em um saldo positivo. Recomendamos revisar seus gastos com <span style={{fontWeight:"600"}}>{`${category}`}</span>, que representaram <span style={{fontWeight:"600"}}>{`${percentage}`}</span> das suas despesas. Considere aumentar seus aportes em Investimentos para otimizar seus rendimentos futuros.</BytebankText>
        </Box>
        <BytebankButton onClick={() => console.log('tesad')} label='Ver análise detalhada'variant={'contained'} color={'primary'} />
      </Box>
    </BytebankCard>
  )
}
