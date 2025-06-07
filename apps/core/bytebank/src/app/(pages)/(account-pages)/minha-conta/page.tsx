'use client';
import './style.scss';
import { BytebankButton, BytebankCard, BytebankInputController, BytebankSnackbar, BytebankText, User, useUser, SnackbarData, BytebankIllustration } from '@bytebank/shared';
import { Box, Theme, useMediaQuery, useTheme } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export default function Index(): ReactElement {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isLoading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const formMethods = useForm<Partial<User>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    formMethods.reset({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  }, [user, formMethods]);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const handleUpdate = async (data: Partial<User>) => {
    setLoading(true);
    const response = await fetch('/api/users/' + user?.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user?.id, ...data }),
    });

    if (response.ok) {
      const responseData = (await response.json()) as { data: User, message: string };
      setUser(responseData.data);
      setSnackbarData({ status: 'success', message: responseData.message });
    } else {
      const responseError = (await response.json()) as { error: string };
      setSnackbarData({ status: 'error', message: responseError.error });
    }
    setLoading(false);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Box my={4} className='my-account'>
        <BytebankCard bgIllustration="grey" className='my-account__card'>
          <Box p={4}>
            <BytebankText variant={'md'} fontWeight={'bold'}>Minha conta</BytebankText>
            <Box mt={4} display={'flex'} flexDirection={!isMobile ? 'row' : 'column-reverse'}>
              <Box className='my-account__card-image'>
                <BytebankIllustration name="my-account" />
              </Box>
              <Box flex={'auto'}>
                <FormProvider {...formMethods}>
                  <form onSubmit={formMethods.handleSubmit(handleUpdate)}>
                    <BytebankInputController
                      name="name"
                      autoComplete="name"
                      type="text"
                      label="Nome"
                      placeholder="Digite seu nome"
                    />
                    <BytebankInputController
                      name="email"
                      autoComplete="email"
                      type="email"
                      label="E-mail"
                      placeholder="Digite seu e-mail"
                    />
                    <BytebankInputController
                      name="password"
                      autoComplete="new-password"
                      type="password"
                      label="Senha"
                      placeholder="Digite sua senha"
                    />
                    <Box display={'flex'} py={4} justifyContent={'start'}>
                      <BytebankButton
                        label={'Salvar alterações'}
                        color={'secondary'}
                        variant={'contained'}
                        loading={isLoading}
                        fullWidth
                      ></BytebankButton>
                    </Box>
                  </form>
                </FormProvider>
              </Box>
            </Box>
          </Box>
        </BytebankCard>
      </Box>
      <BytebankSnackbar open={isSnackbarOpen} data={snackbarData} onClose={closeSnackbar} />
    </>
  );
}
