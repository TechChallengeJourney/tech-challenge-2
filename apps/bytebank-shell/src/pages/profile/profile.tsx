import { FC, useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import { BytebankCard, BytebankButton, BytebankText, SnackbarData, BytebankIllustration, BytebankInputController, BytebankSnackbar, BytebankSelectController } from '@repo/ui';
import { formatCPF, useTheme, validateCPF } from '@repo/utils';
import { getUserAddress, STATES_LIST, updateUser, updateUserProfileImage, useUser } from '@repo/data-access';
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
    const { isDarkMode, colors } = useTheme();
    const { user, setUser, loading } = useUser();
    const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

        console.log(userMethods)

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

        setLoading(true);
        const request = await updateUser(user?._id, body)

        if (request.status == 200) {
            setUser(request.data)

            if (request.data['passwordUpdated']) {
                handlePasswrodUpdatedModal()
            } else {
                handleUserUpdatedModal()
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
        setLoading(false);
    };

    const handlePasswrodUpdatedModal = () => {
        setSnackbarData({
            status: "success",
            message: "Senha atualizada com sucesso"
        })
        setSnackbarOpen(true);
    };

    const handleProfileImageUpdatedModal = () => {
        setSnackbarData({
            status: "success",
            message: "Foto de perfil atualizada com sucesso"
        })
        setSnackbarOpen(true);
    };

    const handleUserUpdatedModal = () => {
        setSnackbarData({
            status: "success",
            message: "Dados atualizados com sucesso"
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

            handleProfileImageUpdatedModal()

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
        <Container maxWidth="xl" sx={{ marginBottom: '100px' }}>
            <Box width={'100%'} pt={4} mb={4} display={'flex'} flexDirection={'column'} gap={1}>
                <BytebankText variant="xxl" fontWeight={'bolder'} align="center">
                    Meu perfil
                </BytebankText>
                <BytebankText variant="sm" align="center">
                    Edite seus dados pessoais ou altere sua foto de perfil.
                </BytebankText>
            </Box>

            <Box width={'100%'} display={'flex'} gap={4} className="content">
                <BytebankCard styles={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "16px 0 48px"
                }} className="image-section">
                    <Box padding='1.25rem'>
                        <BytebankText variant='lg' color={colors['lime.highcontrast']} textTransform='capitalize' fontWeight='bold'>{user?.name}</BytebankText>
                    </Box>
                    <Box flexGrow={1} px={'60px'} maxWidth={'445px'} >
                        {hasUserImage ?
                            <BytebankIllustration className="user-image" src={user?.image} alt="Imagem de perfil do usuário" /> :
                            <BytebankIllustration className={isDarkMode ? "darkmode-user-image" : ''} name="user-circle-icon" type="png" alt="Imagem padrão de usuário" />
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
                            onClick={handleEditClick}
                            label="Editar foto"
                            variant={"outlined"}
                            color={"primary"}
                            sx={{
                                mt: 3
                            }}
                        />
                    </Box>
                </BytebankCard>

                <BytebankCard styles={{
                    flex: "1",
                    padding: "36px 40px"
                }} className="form-section">
                    <Box pb={4}>
                        <BytebankText variant='md' color={colors['lime.highcontrast']} textTransform='capitalize' fontWeight='bold'>Dados pessoais</BytebankText>
                    </Box>

                    <FormProvider {...userMethods}>
                        <form onSubmit={userMethods.handleSubmit(handleSubmit)}>
                            <Box display="flex" gap={3} sx={{ flexDirection: { xs: "column", md: "row"}}}>
                                <Box sx={{ width: { xs: "100%", md: "50%"}}}>
                                    <BytebankInputController
                                        name="name"
                                        autoComplete="name"
                                        type="text"
                                        label="Nome completo"
                                        placeholder="Digite seu nome"
                                        rules={{
                                            required: "Nome é obrigatório",
                                        }}
                                    />
                                </Box>
                                <Box sx={{ width: { xs: "100%", md: "50%"}}}>
                                    <BytebankInputController
                                        name="email"
                                        autoComplete="email"
                                        type="email"
                                        label="E‑mail"
                                        placeholder="Digite seu e‑mail"
                                        rules={{
                                            required: "E-mail é obrigatório",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "E-mail inválido"
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box display="flex" gap={3} pt={2} sx={{ flexDirection: { xs: "column", md: "row"}}}>
                                <Box sx={{ width: { xs: "100%", md: "20%"}}}>
                                    <BytebankInputController
                                        name="document"
                                        type="text"
                                        label="CPF"
                                        placeholder="Digite seu CPF"
                                        rules={{
                                            validate: validateCPF,
                                        }}
                                        onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                            const formatted = formatCPF(e.target.value);
                                            userMethods.setValue("document", formatted, { shouldValidate: true });
                                        }}
                                    />
                                </Box>
                                <Box sx={{ width: { xs: "100%", md: "35%"}}}>
                                    <BytebankInputController
                                        name="address"
                                        type="text"
                                        label="Endereço"
                                        placeholder="Rua, número, etc."
                                    />
                                </Box>
                                <Box sx={{ width: { xs: "100%", md: "15%"}}}>
                                    <BytebankInputController
                                        name="city"
                                        type="text"
                                        label="Cidade"
                                        placeholder="Digite sua cidade"
                                    />
                                </Box>
                                <Box sx={{ width: { xs: "100%", md: "15%"}}}>
                                    <BytebankSelectController
                                        color='primary'
                                        name="state"
                                        label="Estado"
                                        options={STATES_LIST.map(state => ({
                                            value: state.name,
                                            label: state.acronym
                                        }))}
                                    />
                                </Box>
                                <Box sx={{ width: { xs: "100%", md: "15%"}}}>
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
                            <Box display="flex" gap={3} pt={2} sx={{ flexDirection: { xs: "column", md: "row"}}}>
                                <Box sx={{ width: { xs: "100%", md: "50%"}}}>
                                    <BytebankInputController
                                        name="password"
                                        autoComplete="new-password"
                                        type="password"
                                        label="Senha"
                                        placeholder="Digite sua senha"
                                    />
                                </Box>
                                <Box sx={{ width: { xs: "100%", md: "50%"}}}>
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
