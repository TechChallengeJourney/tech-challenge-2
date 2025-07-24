import { Box, Link } from "@mui/material";
import { User } from "@repo/data-access";
import {
  AccessModalType,
  BytebankAccessModalProps,
  BytebankButton,
  BytebankInputController,
  BytebankModal,
  BytebankText,
} from "@repo/ui";
import { ReactElement, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

export function BytebankRegisterModal({
  open,
  onClose,
  onSubmit,
  openModal,
}: BytebankAccessModalProps): ReactElement {
  const [isLoading, setLoading] = useState(false);

  const registerMethods = useForm<Partial<User>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data: Partial<User>) => {
    setLoading(true);
    const apiUrl = import.meta.env.PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      registerMethods.reset();
      onSubmit({
        status: "success",
        message: "Cadastro realizado com sucesso!",
      });
    } else {
      const responseError = (await response.json()) as { message: string };
      onSubmit({ status: "error", message: responseError.message });
    }

    setLoading(false);
  };

  return (
    <>
      <BytebankModal
        title={"Criar uma conta"}
        open={open}
        illustrationShow
        onClose={() => { registerMethods.reset(); onClose(); }}
      >
        <>
          <BytebankText>
            Preencha os campos abaixo para criar sua conta corrente!
          </BytebankText>
          <FormProvider {...registerMethods}>
            <form onSubmit={registerMethods.handleSubmit(handleRegister)}>
              <BytebankInputController
                control={registerMethods.control}
                rules={{ required: true }}
                name="name"
                autoComplete="name"
                type="text"
                label="Nome"
                placeholder="Digite seu nome"
              />
              <BytebankInputController
                control={registerMethods.control}
                rules={{ required: true }}
                name="email"
                autoComplete="email"
                type="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
              />
              <BytebankInputController
                control={registerMethods.control}
                rules={{ required: true }}
                name="password"
                autoComplete="new-password"
                type="password"
                label="Senha"
                placeholder="Digite sua senha"
              />
              <Box display={"flex"} pt={2} justifyContent={"center"}>
                <BytebankButton
                  label={"Criar conta"}
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
            <BytebankText>Já tem uma conta?</BytebankText>
            <Link
              component="button"
              variant="sm"
              color={"secondary"}
              onClick={() => openModal(AccessModalType.REGISTER)}
            >
              Fazer login
            </Link>
          </Box>
        </>
      </BytebankModal>
    </>
  );
}
