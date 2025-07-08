import { Box, Link } from "@mui/material";
import { ReactElement, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { MOCK_USER, User, useUser } from "@repo/data-access";
import {
    BytebankAccessModalProps,
    BytebankModal,
    BytebankInputController,
    BytebankButton,
    BytebankText,
    AccessModalType,
} from "@repo/ui";

export function BytebankLoginModal({
    open,
    onClose,
    onSubmit,
    openModal,
}: BytebankAccessModalProps): ReactElement {
    const [isLoading, setLoading] = useState(false);
    const { setUser } = useUser();

    const loginMethods = useForm<{ email: string; password: string }>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (data: { email: string; password: string }) => {
        setLoading(true);

        const apiUrl = import.meta.env.PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const userData = MOCK_USER;
            setUser(userData);
            loginMethods.reset();
            onSubmit({ status: "success" });
        } else {
            const responseError = (await response.json()) as { error: string };
            onSubmit({ status: "error", message: responseError.error });
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <>
            <BytebankModal
                title={"Login"}
                open={open}
                illustrationShow
                onClose={() => onClose()}
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
                                mt={1}
                                display={"flex"}
                                gap={4}
                                flexDirection={"column"}
                                justifyContent={"center"}
                            >
                                <Link component="button" variant="sm" color={"secondary"}>
                                    Esqueceu sua senha?
                                </Link>
                                <BytebankButton
                                    label={"Entrar"}
                                    color={"secondary"}
                                    variant={"contained"}
                                    loading={isLoading}
                                    fullWidth
                                ></BytebankButton>
                            </Box>
                        </form>
                    </FormProvider>
                    <Box
                        pt={4}
                        display={"flex"}
                        gap={1}
                        justifyContent={"center"}
                        flexWrap={"wrap"}
                    >
                        <BytebankText>Não tem uma conta?</BytebankText>
                        <Link
                            component="button"
                            variant="sm"
                            color={"secondary"}
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
