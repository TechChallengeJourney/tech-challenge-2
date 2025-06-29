import { Box } from "@mui/material";
import {
  BytebankCard,
  BytebankInput,
  BytebankInputController,
  BytebankSelect,
  BytebankTabs,
  BytebankText,
} from "@repo/ui";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

  const loginMethods = useForm<{ email: string; password: string }>({
      defaultValues: {
          email: "",
          password: "",
      },
  });


    
export function BytebankTransactionCard() {
  function renderExpenseContent() {
    return (
      <>
      <FormProvider {...loginMethods}>
                        <form onSubmit={loginMethods.handleSubmit(() => null)}>
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
<BytebankSelect value="seila1"
          onChange={() => null}
          label="Selecione o tipo da transação"
          options={[
            {
              label: "DOC/TED",
              value: "seila1",
            },
            {
              label: "PIX",
              value: "seila2",
            },
            {
              label: "BOlETO",
              value: "seila3",
            },
          ]}
        />
        <BytebankInput label="Data da transação" onChange={() => null} type="date"/>

                        </form>
                    </FormProvider>


        <BytebankSelect value="seila1"
          onChange={() => null}
          label="Selecione o tipo da transação"
          options={[
            {
              label: "DOC/TED",
              value: "seila1",
            },
            {
              label: "PIX",
              value: "seila2",
            },
            {
              label: "BOlETO",
              value: "seila3",
            },
          ]}
        />
        <BytebankInput label="Data da transação" onChange={() => null} type="date"/>
      </>
    );
  }

  function renderIncommingContent() {
    return (
      <>
        <h1>Entrada</h1>
      </>
    );
  }

  const options = [
    {
      label: "Entrada",
      content: renderIncommingContent(),
    },
    {
      label: "Saída",
      content: renderExpenseContent(),
    },
  ];

  return (
    <BytebankCard>
      <Box sx={{ width: "100%" }} padding="2rem">
        <BytebankText variant="lg">Nova Transação</BytebankText>
        <Box marginTop={2}>
          <BytebankTabs options={options} />
        </Box>
      </Box>
    </BytebankCard>
  );
}
