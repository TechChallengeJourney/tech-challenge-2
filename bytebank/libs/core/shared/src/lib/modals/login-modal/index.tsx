import { Box, Link } from "@mui/material";
import { ReactElement, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useUser, User, BytebankModal, BytebankInputController, BytebankButton, BytebankText } from "../../shared";
import { BytebankAccessModalProps } from "../../classes/models/access-modal";
import { AccessModalType } from "../../classes/enums/access-modal-type.enum";

export function BytebankLoginModal({ open, onClose, onSubmit, openModal }: BytebankAccessModalProps): ReactElement {
    const [isLoading, setLoading] = useState(false);
    const { setUser } = useUser();

    const loginMethods = useForm<{ email: string; password: string }>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = async (data: { email: string; password: string }) => {
        setLoading(true);
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const userData = (await response.json()) as User;
            setUser(userData);
            loginMethods.reset();
            onSubmit({ status: 'success'});
        } else {
            const responseError = (await response.json()) as { error: string };
            onSubmit({ status: 'error', message: responseError.error });
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <>
            <BytebankModal
                title={'Login'}
                illustration={'login'}
                illustrationSize={'lg'}
                open={open}
                illustrationShow
                onClose={() => onClose()}
                fullHeight
            >
                <>
                    <FormProvider {...loginMethods}>
                        <form onSubmit={loginMethods.handleSubmit(handleLogin)}>
                            <BytebankInputController
                                name="email"
                                autoComplete="email"
                                type="email"
                                label="E-mail"
                                placeholder="Digite seu e-mail"
                            />
                            <BytebankInputController
                                name="password"
                                autoComplete="current-password"
                                type="password"
                                label="Senha"
                                placeholder="Digite sua senha"
                            />
                            <Box
                                display={'flex'}
                                gap={2}
                                flexDirection={'column'}
                                justifyContent={'center'}
                            >
                                <Link component="button" variant="sm" color={'secondary'}>
                                    Esqueceu sua senha?
                                </Link>
                                <BytebankButton
                                    label={'Entrar'}
                                    color={'secondary'}
                                    variant={'contained'}
                                    loading={isLoading}
                                    fullWidth
                                ></BytebankButton>
                            </Box>
                        </form>
                    </FormProvider>
                    <Box pt={4} display={'flex'} gap={1} justifyContent={'center'} flexWrap={'wrap'}>
                        <BytebankText>Não tem uma conta?</BytebankText>
                        <Link
                            component="button"
                            variant="sm"
                            color={'secondary'}
                            onClick={() => openModal(AccessModalType.REGISTER)}
                        >
                            Crie uma agora!
                        </Link>
                    </Box>
                </>
            </BytebankModal>
        </>
    );
}