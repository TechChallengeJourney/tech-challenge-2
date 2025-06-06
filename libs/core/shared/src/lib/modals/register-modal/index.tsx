import { Box, Link } from "@mui/material";
import { ReactElement, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { User, BytebankModal, BytebankInputController, BytebankButton, BytebankText, BytebankAccessModalProps } from "../../shared";
import { AccessModalType } from "../../classes/enums/access-modal-type.enum";

export function BytebankRegisterModal({ open, onClose, onSubmit, openModal }: BytebankAccessModalProps): ReactElement {
    const [isLoading, setLoading] = useState(false);

    const registerMethods = useForm<Partial<User>>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const handleRegister = async (data: Partial<User>) => {
        setLoading(true);
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const res = (await response.json()) as { message: string };
            registerMethods.reset();
            onSubmit({ status: 'success', message: res.message });
        } else {
            const responseError = (await response.json()) as { error: string };
            onSubmit({ status: 'error', message: responseError.error });
        }
        setLoading(false);
    };

    return (
        <>
            <BytebankModal
                title={'Criar uma conta'}
                illustration={'register'}
                illustrationSize={'lg'}
                open={open}
                illustrationShow
                onClose={() => onClose()}
                fullHeight
            >
                <>
                    <BytebankText>
                        Preencha os campos abaixo para criar sua conta corrente!
                    </BytebankText>
                    <FormProvider {...registerMethods}>
                        <form onSubmit={registerMethods.handleSubmit(handleRegister)}>
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
                            <Box display={'flex'} pt={2} justifyContent={'center'}>
                                <BytebankButton
                                    label={'Criar conta'}
                                    color={'secondary'}
                                    variant={'contained'}
                                    loading={isLoading}
                                    fullWidth
                                ></BytebankButton>
                            </Box>
                        </form>
                    </FormProvider>
                    <Box pt={4} display={'flex'} gap={1} justifyContent={'center'} flexWrap={'wrap'}>
                        <BytebankText>Já tem uma conta?</BytebankText>
                        <Link
                            component="button"
                            variant="sm"
                            color={'secondary'}
                            onClick={() => openModal(AccessModalType.LOGIN)}
                        >
                            Fazer login
                        </Link>
                    </Box>
                </>
            </BytebankModal>
        </>
    );
}