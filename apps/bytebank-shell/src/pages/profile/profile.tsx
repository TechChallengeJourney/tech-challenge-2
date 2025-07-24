import { FC, useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import { BytebankCard, BytebankButton, BytebankModal, BytebankText, SnackbarData, BytebankIllustration, BytebankInputController, BytebankSnackbar } from '@repo/ui';
import { useTheme } from '@repo/utils';
import { getUserAddress, updateUser, updateUserProfileImage, useUser } from '@repo/data-access';
import { FormProvider, useForm } from 'react-hook-form';
import "./profile.scss";

interface BytebankProfileProps { }

interface ProfileFormValues {
    name: string;
    email: string;
    document: string;
    password: string;
    newPassword: string;
    address: string;
    city: string;
    state: string;
    complement: string;
}

const BytebankProfilePage: FC<BytebankProfileProps> = () => {
    const [hasUserImage, setHasUserImage] = useState(false);
    const { colors } = useTheme();
    const { user, setUser, loading } = useUser();
    const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [file, setFile] = useState(null);

    const userMethods = useForm<ProfileFormValues>({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            document: user?.document || '',
            password: '',
            newPassword: '',
            address: '',
            city: '',
            state: '',
            complement: '',
        },
    });

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: any) => {
        const formData = userMethods.getValues();

        const body = {
            name: formData.name,
            email: formData.email,
            document: formData.document,
            password: formData.password,
            newPassword: formData.newPassword,
            address: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                complement: formData.complement
            }
        }

        if (!user) throw new Error('É necessário user id');

        const request = await updateUser(user?._id, body)

        if (request.status == 200) {
            setUser(request.data)

            if (request.data['passwordUpdated']) {
                handlePasswrodUpdatedModal()
            }
        } else {
            setSnackbarData({
                status: "error",
                message: request.data.message
            })
            userMethods.reset({
                password: '',
                newPassword: ''
            })
            getData()
            setSnackbarOpen(true);
        }
    };

    const handlePasswrodUpdatedModal = () => {
        setSnackbarData({
            status: "success",
            message: "Senha atualizada com sucesso"
        })
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => { setSnackbarOpen(false); setSnackbarData(null); };

    const updateImage = async (e: any) => {
        try {
            const file = e.target.files?.[0];

            if (!file) return alert('Selecione uma imagem.');
            if (!user) throw new Error('É necessário user id');

            const data = await updateUserProfileImage(user?._id, file)

            setUser(data)
            e.target.value = '';
        } catch (err) {
            console.error('Erro no upload:', err);
        }
    };

    const getData = async () => {
        if (!user) return;
        setHasUserImage(!!user?.image)
        const { data } = await getUserAddress(user._id)

        userMethods.reset({
            name: user?.name || '',
            email: user?.email || '',
            document: user?.document || '',
            address: data?.address,
            city: data?.city,
            state: data?.state,
            complement: data?.complement,
        })
    };

    useEffect(() => {

        getData();
    }, [user, userMethods]);

    return (
        <Container maxWidth="xl">
            <Box width={'100%'} pt={4} mb={4} display={'flex'} flexDirection={'column'} gap={1}>
                <BytebankText variant="xxl" fontWeight={'bolder'} align="center">
                    Meu perfil
                </BytebankText>
                <BytebankText variant="sm" align="center">
                    Edite seus dados pessoais ou altere sua foto de perfil.
                </BytebankText>
            </Box>

            <Box width={'100%'} display={'flex'} gap={4}>
                <BytebankCard styles={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "16px 0 48px"
                }}>
                    <Box padding='1.25rem'>
                        <BytebankText variant='lg' color={colors['lime.highcontrast']} textTransform='capitalize' fontWeight='bold'>{user?.name}</BytebankText>
                    </Box>
                    <Box flexGrow={1} px={'60px'}>
                        {hasUserImage ?
                            <BytebankIllustration className="user-image" src={user?.image} alt="Imagem de perfil do usuário" /> :
                            <BytebankIllustration name="user-circle-icon.png" alt="Imagem padrão de usuário" />
                        }

                    </Box>
                    <Box>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ opacity: 0, position: 'absolute', width: 0, height: 0 }}
                            onChange={updateImage}
                        />
                        <BytebankButton
                            sendSubmit={handleEditClick}
                            label="Editar foto"
                            variant={"outlined"}
                            color={"primary"}
                        />
                    </Box>
                </BytebankCard>

                <BytebankCard styles={{
                    flex: "1",
                    padding: "36px 40px"
                }}>
                    <Box pb={4}>
                        <BytebankText variant='lg' color={colors['lime.highcontrast']} textTransform='capitalize' fontWeight='bold'>Dados pessoais</BytebankText>
                    </Box>

                    <FormProvider {...userMethods}>
                        <form onSubmit={userMethods.handleSubmit(handleSubmit)}>
                            <Box display="flex" gap={3}>
                                <Box width="50%">
                                    <BytebankInputController
                                        name="name"
                                        autoComplete="name"
                                        type="text"
                                        label="Nome completo"
                                        placeholder="Digite seu nome"
                                    />
                                </Box>
                                <Box width="50%">
                                    <BytebankInputController
                                        name="email"
                                        autoComplete="email"
                                        type="email"
                                        label="E‑mail"
                                        placeholder="Digite seu e‑mail"
                                    />
                                </Box>
                            </Box>

                            <Box display="flex" gap={3} pt={2}>
                                <Box width="20%">
                                    <BytebankInputController
                                        name="document"
                                        type="text"
                                        label="RG / CPF"
                                        placeholder="Digite seu RG ou CPF"
                                    />
                                </Box>
                                <Box width="35%">
                                    <BytebankInputController
                                        name="address"
                                        type="text"
                                        label="Endereço"
                                        placeholder="Rua, número, etc."
                                    />
                                </Box>
                                <Box width="15%">
                                    <BytebankInputController
                                        name="city"
                                        type="text"
                                        label="Cidade"
                                        placeholder="Digite sua cidade"
                                    />
                                </Box>
                                <Box width="15%">
                                    <BytebankInputController
                                        name="state"
                                        type="text"
                                        label="Estado"
                                        placeholder="SP, RJ..."
                                    />
                                </Box>
                                <Box width="15%">
                                    <BytebankInputController
                                        name="complement"
                                        type="text"
                                        label="Complemento"
                                        placeholder="Casa, apto..."
                                    />
                                </Box>
                            </Box>
                            <Box pt={'40px'}>
                                <BytebankText variant='md' color={colors['lime.highcontrast']} textTransform='capitalize' fontWeight='bold'>Atualizar senha</BytebankText>
                            </Box>
                            <Box display="flex" gap={3} pt={2}>
                                <Box width="50%">
                                    <BytebankInputController
                                        name="password"
                                        autoComplete="new-password"
                                        type="password"
                                        label="Senha"
                                        placeholder="Digite sua senha"
                                    />
                                </Box>
                                <Box width="50%">
                                    <BytebankInputController
                                        name="newPassword"
                                        autoComplete="new-password"
                                        type="password"
                                        label="Nova senha"
                                        placeholder="Digite a nova senha"
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" pt={4} justifyContent="end">
                                <BytebankButton
                                    style={{ padding: '0 16px' }}
                                    type="submit"
                                    label="Alterar dados"
                                    color="primary"
                                    variant="contained"
                                    loading={isLoading}
                                />
                            </Box>
                        </form>
                    </FormProvider>

                </BytebankCard>
            </Box>
            <BytebankSnackbar open={snackbarOpen} data={snackbarData} onClose={closeSnackbar} />
        </Container>
    );
};

export default BytebankProfilePage;
