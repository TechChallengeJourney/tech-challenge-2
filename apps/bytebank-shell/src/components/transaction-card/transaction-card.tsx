import { Box } from "@mui/material";
import {
  BytebankButton,
  BytebankCard,
  BytebankInput,
  BytebankSelect,
  BytebankTabs,
  BytebankText,
  BytebankChip,
  BytebankInputFileUpload
} from "@repo/ui";

interface categoriesProps {
  label: string;
  value: string;
}


interface optionsProps {
  selectValues: categoriesProps[];
  categories: categoriesProps[];
}


const expanseOptions = {
  selectValues: [
    {
      label: "Cartão de Crédito",
      value: "seila1",
    },
    {
      label: "PIX",
      value: "seila2",
    },
    {
      label: "BOLETO",
      value: "seila3",
    },
  ],
  categories: [
    {
      label: "Transporte",
      value: "transporte",
    },
    {
      label: "Alimentação",
      value: "alimentacao",
    },
    {
      label: "Lazer",
      value: "lazer",
    },
    {
      label: "Saúde",
      value: "saude",
    },
  ],
};

const incomingOptions = {
  selectValues: [
    {
      label: "DOC/TED",
      value: "seila1",
    },
    {
      label: "PIX",
      value: "seila2",
    },
    {
      label: "BOLETO",
      value: "seila3",
    },
  ],
  categories: [
  {
    label: "Categoria 1",
    value: "categoria1",
  },
  {
    label: "Categoria 2",
    value: "categoria2",
  },
  {
    label: "Categoria 3",
    value: "categoria3",
  },
    {
    label: "Categoria 4",
    value: "categoria4",
  },
  ],
};


function formRender(options: optionsProps) {
  const {selectValues, categories} = options
  return (
    <>
      <form>
        <BytebankSelect
          value={selectValues[0].value}
          onChange={() => null}
          label="Selecione o tipo da transação"
          options={selectValues}
        />
        <BytebankInput
          onChange={() => null}
          name="date"
          type="date"
          label="Data da transação"
          value="1900-12-27"
        />
        <BytebankInput
          onChange={(e) => null}
          name="value"
          type="number"
          label="Valor"
          placeholder="R$ 00,00"
        />
        <BytebankSelect
          value={categories[0].value}
          onChange={() => null}
          label="Categoria"
          options={categories}
        />
      </form>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        {categories.map((e) => {
          return (
            <>
              <BytebankChip
                label={e.label}
                onClick={() => console.log("clicou aa")}
                // deleteIcon={<DoneIcon />}
              />
            </>
          );
        })}
      </Box>
    </>
  );
}

export function BytebankTransactionCard() {
  const options = [
    {
      label: "Entrada",
      content: formRender(incomingOptions),
    },
    {
      label: "Saída",
      content: formRender(expanseOptions),
    },
  ];

  return (
    <BytebankCard>
      <Box sx={{ width: "100%" }} padding="2rem">
        <BytebankText variant="lg">Nova Transação</BytebankText>
        <Box marginTop={2}>
          <BytebankTabs options={options} />
          <Box marginBottom="1.5rem">
            <BytebankInputFileUpload  />
          </Box>
          <BytebankButton
            label={"Concluir"}
            variant={"contained"}
            color={"primary"}
          />
        </Box>
      </Box>
    </BytebankCard>
  );
}
