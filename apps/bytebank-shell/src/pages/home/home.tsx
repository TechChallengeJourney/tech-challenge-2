import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';
import { BytebankButton, BytebankModal } from '@repo/ui';

interface BytebankHomeProps { }

const BytebankHomePage: FC<BytebankHomeProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
      <BytebankBalanceCard />

      <BytebankButton
        label="Abrir modal" sendSubmit={() => setOpen(true)} color={'primary'}></BytebankButton>

      <BytebankModal
        open={open}
        title="Confirmar exclusão"
        illustrationShow={false}
        onClose={() => setOpen(false)}
      >
        <Box>
          <Typography style={{ marginBottom: 16 }}>
            Tem certeza que deseja excluir este item?
          </Typography>
          <Box style={{ display: 'flex', gap: 8 }}>
            <BytebankButton
              label="Sim"
              color="secondary"
              variant="outlined"
            />
            <BytebankButton
              label="Não"
              color="secondary"
              variant="contained"
            />
          </Box>
        </Box>
      </BytebankModal>
    </Box>
  );
};

export default BytebankHomePage;
