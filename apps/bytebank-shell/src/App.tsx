import AppRoutes from "./routes";
import "./App.scss";
import {
  BytebankText,
  BytebankDivider,
  BytebankInput,
  BytebankSelect,
} from "@repo/ui";

function App() {
  return (
    <>
      <AppRoutes />
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
    </>
  );
}

export default App;
