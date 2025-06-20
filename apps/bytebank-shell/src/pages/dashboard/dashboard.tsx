import { FC, useState } from 'react';
import { BytebankBalanceCard } from '../../components/balance-card/balance-card';
import { Box, Typography } from '@mui/material';
import { BytebankCard, BytebankButton, BytebankSnackbar, BytebankModal } from '@repo/ui';
// @ts-ignore
import MfeButton from 'remote/Button';
import { useTheme } from '@repo/utils';

interface BytebankDashboardProps { }

const BytebankDashboardPage: FC<BytebankDashboardProps> = () => {
  const [snackbar, setSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const textColor = theme.palette.text.primary;

  return (
    <>
      <Box width={'100%'} px={4} pb={2} display={'flex'} flexDirection={'column'} gap={2}>
        <Box>
          <BytebankBalanceCard />
        </Box>

        <Box>
          <BytebankCard>
            <Box textAlign="left" minHeight={'10rem'} p={4}>
              <Box pb={4} display={'flex'} gap={2}>
                <Typography fontWeight={'bold'} variant="lg" style={{ color: textColor }}>
                  Nova transação
                </Typography>
              </Box>
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'outlined'} color={'primary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'contained'} color={'primary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'text'} color={'primary'} />
              <br /><br />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'outlined'} color={'secondary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'contained'} color={'secondary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'text'} color={'secondary'} />
              <br /><br />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'outlined'} color={'tertiary'} />
              <BytebankButton label={'Botão no Bytebank Shell'} variant={'contained'} color={'tertiary'} />

              <MfeButton onClick={() => console.log('Clicou no botão')} />

              <BytebankButton onClick={() => setSnackbar(true)} label={'Abrir SnackBar'} variant={'contained'} color={'primary'} />
              <BytebankButton label="Abrir modal" sendSubmit={() => setOpen(true)} color={'primary'}></BytebankButton>

            </Box>
          </BytebankCard>
        </Box>
        <BytebankSnackbar open={snackbar} onClose={() => setSnackbar(false)} data={{ status: "success", message: "Mensagem do snackbar." }} />



       
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
    </>
  );
};

export default BytebankDashboardPage;
