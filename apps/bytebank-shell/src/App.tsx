import AppRoutes from "./routes";
import "./App.scss";
import {
  BytebankText,
  BytebankDivider,
  BytebankInput,
  BytebankSelect,
} from "@repo/ui";
import Box from "@mui/material/Box";

function App() {
  return (
    <>
      <AppRoutes />
      {/* <Box display="flex" flexDirection="column" gap={2} p={2}>
        <BytebankText variant="h1" color="primary">
          Componente de texto da ui
        </BytebankText>
        <BytebankText variant="md" color="secondary">
          Componente de texto da ui
        </BytebankText>

        <BytebankDivider type="horizontal" color="primary" />

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
      </Box> */}
    </>
  );
}

export default App;
