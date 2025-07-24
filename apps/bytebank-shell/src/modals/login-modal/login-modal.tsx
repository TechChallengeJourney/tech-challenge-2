import { Box, Link } from "@mui/material";
import { ReactElement, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { User, useSession, useUser } from "@repo/data-access";
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
  const [, setSessionValue] = useSession<string | null>("token");

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = (await response.json()) as {
        user: User;
        accessToken: string;
      };
      const userData = responseData.user;

      loginMethods.reset();
      setUser(userData);
      setSessionValue(responseData.accessToken);
      onSubmit({ status: "success" });
    } else {
      const responseError = (await response.json()) as { message: string };
      onSubmit({ status: "error", message: responseError.message });
    }
    setLoading(false);
  };

  return (
    <>
      <BytebankModal
        title={"Login"}
        open={open}
        illustrationShow
        onClose={() => { loginMethods.reset(); onClose(); }}
      >
        <>
          <FormProvider {...loginMethods}>
            <form onSubmit={loginMethods.handleSubmit(handleLogin)}>
              <BytebankInputController
                control={loginMethods.control}
                rules={{ required: true }}
                name="email"
                autoComplete="email"
                type="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
              />
              <BytebankInputController
                control={loginMethods.control}
                rules={{ required: true }}
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
              onClick={() => openModal(AccessModalType.LOGIN)}
            >
              Crie uma agora!
            </Link>
          </Box>
        </>
      </BytebankModal>
    </>
  );
}
