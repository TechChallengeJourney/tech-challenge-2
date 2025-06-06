import { Box } from '@mui/material';
import {
  BytebankText,
  BytebankInputController,
  BytebankButton,
  BytebankSelectController,
  BytebankCard,
  useUser,
  palette,
  Transaction,
  BytebankSnackbar,
  SnackbarData,
  BytebankIllustration,
  useFinancialData,
} from '@bytebank/shared';
import './style.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';

type Props = {
  onSuccess?: () => void;
};

export function BytebankCardTransaction({ onSuccess }: Props) {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const { fetchTransactions } = useFinancialData();
  const transactionMethods = useForm<Partial<Transaction>>({
    defaultValues: {
      type: '',
      value: '',
    },
  });

  const { user } = useUser();

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const handleTransaction = async (data: Partial<Transaction>) => {
    data.value = Number(data.value) / 100;

    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user?.id, ...data, date: new Date() }),
    });

    if (response.ok) {
      transactionMethods.reset({ value: '', type: '' });
      setSnackbarData({
        status: 'success',
        message: 'Transação adicionada com sucesso!',
      });
      setSnackbarOpen(true);
      onSuccess?.();
      if (user) {
        fetchTransactions(user);
      }
    } else {
      setSnackbarData({
        status: 'error',
        message: 'Algo deu errado. Por favor, aguarde e tente novamente!',
      });
      setSnackbarOpen(true);
    }
  };

  const selectOptions = [
    { label: 'Câmbio de Moeda', value: 'Câmbio de Moeda' },
    { label: 'DOC/TED', value: 'DOC/TED' },
    { label: 'Empréstimo e Financeiro', value: 'Empréstimo e Financeiro' },
  ];

  return (
    <>
      <BytebankCard
        className="bytebank-card-content"
        bgcolor={palette['grey.300']}
      >
        <Box textAlign="left" p={4}>
          <Box pb={4}>
            <BytebankText fontWeight={'bold'} variant="md" color="black">
              Nova transação
            </BytebankText>
          </Box>
          <FormProvider {...transactionMethods}>
            <form onSubmit={transactionMethods.handleSubmit(handleTransaction)}>
              <BytebankSelectController
                rules={{ required: "Este campo é obrigatório" }}
                name="type"
                label="Selecione o tipo de transação"
                options={selectOptions}
              />
              <Box
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'center'}
              >
                <Box flexGrow={'1'}>
                  <BytebankInputController
                    rules={{ required: "Este campo é obrigatório" }}
                    name="value"
                    label="Valor"
                    type="text"
                    mask="currency"
                  />
                  <Box mt={4}>
                    <BytebankButton
                      label={'Concluir transação'}
                      color={'secondary'}
                      variant={'contained'}
                      disabled={!transactionMethods.formState.isValid}
                      fullWidth
                    />
                  </Box>
                </Box>
                <Box mt={2}>
                  <BytebankIllustration variant="auto" name="card-holding" />
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </BytebankCard>
      <BytebankSnackbar
        open={isSnackbarOpen}
        data={snackbarData}
        onClose={closeSnackbar}
      />
    </>
  );
}
