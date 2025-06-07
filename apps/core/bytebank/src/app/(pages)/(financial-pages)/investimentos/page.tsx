'use client';

import './style.scss';
import { Box } from '@mui/material';
import { BytebankCard, palette, BytebankText, BytebankChart } from '@bytebank/shared';

const Investimentos: React.FC = () => {
  return (
    <BytebankCard bgIllustration="grey">
      <Box textAlign="left" p={4}>
        <Box pb={4}>
          <BytebankText fontWeight={'bold'} variant="md" color="black">
            Investimentos
          </BytebankText>
        </Box>
        <Box pb={4}>
          <BytebankText variant="md" color="primary">
            Total: R$ 50.000,00
          </BytebankText>
        </Box>
        <Box gap={2} display={'flex'} flexDirection={'row'} width={'100%'} flexWrap={'wrap'}>
          <Box
            flexGrow={1}
            bgcolor={palette['primary.main']}
            p={4}
            gap={2}
            borderRadius={2}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <BytebankText variant="sm" color="white">
              Renda Fixa
            </BytebankText>
            <BytebankText variant="md" color="white">
              R$ 36.000,00
            </BytebankText>
          </Box>
          <Box
            flexGrow={1}
            bgcolor={palette['primary.main']}
            p={4}
            gap={2}
            borderRadius={2}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <BytebankText variant="sm" color="white">
              Renda variável
            </BytebankText>
            <BytebankText variant="md" color="white">
              R$ 36.000,00
            </BytebankText>
          </Box>
        </Box>
        <Box py={4}>
          <BytebankText variant="md">
            Estatísticas
          </BytebankText>
        </Box>
        <Box>
          <BytebankChart
            series={[35, 25, 20, 20]}
            labels={[
              'Fundos de investimento',
              'Tesouro Direto',
              'Previdência Privada',
              'Bolsa de Valores',
            ]}
          ></BytebankChart>
        </Box>
      </Box>
    </BytebankCard>
  );
};

export default Investimentos;
