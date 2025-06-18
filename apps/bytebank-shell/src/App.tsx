import React from "react";
import { Box, Typography } from "@mui/material";
import {
  BytebankButton,
  BytebankToggleButton,
  BytebankCard,
  useTheme,
  BytebankText,
  BytebankDivider,
  BytebankInput,
  BytebankSelect,
} from "@repo/ui";
// @ts-ignore
import MfeButton from "remote/Button";
import "./App.scss";

function App() {
  const { theme } = useTheme();
  const textColor = theme.palette.text.primary;

  return (
    <>
      <Box className="App">
        <BytebankCard>
          <Box textAlign="left" minHeight={"10rem"} p={4}>
            <Box pb={4} display={"flex"} gap={2}>
              <Typography
                fontWeight={"bold"}
                variant="lg"
                style={{ color: textColor }}
              >
                Nova transação
              </Typography>
              <BytebankToggleButton />
            </Box>
            <BytebankButton
              label={"Botão no Bytebank Shell"}
              variant={"outlined"}
              color={"primary"}
            />
            <BytebankButton
              label={"Botão no Bytebank Shell"}
              variant={"contained"}
              color={"primary"}
            />
            <BytebankButton
              label={"Botão no Bytebank Shell"}
              variant={"text"}
              color={"primary"}
            />
            <br />
            <br />
            <BytebankButton
              label={"Botão no Bytebank Shell"}
              variant={"outlined"}
              color={"secondary"}
            />
            <BytebankButton
              label={"Botão no Bytebank Shell"}
              variant={"contained"}
              color={"secondary"}
            />
            <BytebankButton
              label={"Botão no Bytebank Shell"}
              variant={"text"}
              color={"secondary"}
            />
            <br />
            <br />
            <BytebankButton
              label={"Botão no Bytebank Shell"}
              variant={"outlined"}
              color={"tertiary"}
            />
            <BytebankButton
              label={"Botão no Bytebank Shell"}
              variant={"contained"}
              color={"tertiary"}
            />

            <MfeButton onClick={() => console.log("Clicou no botão")} />
            <br />
            <br />
            <BytebankText variant="h1" color="primary">
              Componente de texto da ui
            </BytebankText>
            <BytebankText variant="md" color="secondary">
              Componente de texto da ui
            </BytebankText>
            <br />
            <br />
            <BytebankDivider type="horizontal" color="primary" />
            <br />
            <BytebankInput
              label="Valor"
              value={""}
              onChange={() => {}}
              type="text"
              placeholder="Digite o valor"
              error={false}
              helperText="Digite o valor da transação"
              autoComplete="off"
              mask="currency"
            />
            <br />
            <BytebankSelect
              value={""}
              onChange={() => {}}
              label="Selecione uma opção"
              options={[
                { label: "Opção 1", value: "opcao1" },
                { label: "Opção 2", value: "opcao2" },
                { label: "Opção 3", value: "opcao3" },
              ]}
              error={false}
              helperText="Selecione uma opção"
            />
            <br />
          </Box>
        </BytebankCard>
      </Box>
    </>
  );
}

export default App;
