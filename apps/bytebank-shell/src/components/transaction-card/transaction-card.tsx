import { Box } from "@mui/material";
import {
  BytebankButton,
  BytebankCard,
  BytebankInput,
  BytebankSelect,
  BytebankTabs,
  BytebankText,
} from "@repo/ui";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';


interface categoriesProps {
  label: string,
  value: string,
}


const expanseCategories = [
  {
    label: "Categoria1",
    value: "categoria1",
  },
  {
    label: "Categoria2",
    value: "categoria2",
  },
  {
    label: "Categoria3",
    value: "categoria3",
  },
];

const incomingCategories = [
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
];

function formRender(categories: categoriesProps[]) {
  return (
    <>
      <form>
        <BytebankSelect
          value="seila1"
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
              label: "BOLETO",
              value: "seila3",
            },
          ]}
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
      <Box display="flex" justifyContent="space-around" gap="1rem" alignItems="center" flexWrap="wrap">
        {categories.map((e) => {
          return <>
            <BytebankButton sx={{borderRadius:"4px"}} label={e.label} variant={'contained'} color={'tertiary'}/>
          </>
        })}
      
      </Box>
    </>
  );
}

export function BytebankTransactionCard() {
  const options = [
    {
      label: "Entrada",
      content: formRender(incomingCategories),
    },
    {
      label: "Saída",
      content: formRender(expanseCategories),
    },
  ];

  return (
    <BytebankCard>
      <Box sx={{ width: "100%" }} padding="2rem">
        <BytebankText variant="lg">Nova Transação</BytebankText>
        <Box marginTop={2}>
          <BytebankTabs options={options} />
            <Box marginBottom="1.5rem">
              <BytebankButton borderRadius="6px" startIcon={<PublishRoundedIcon/>} fullWidth label={'Botão no Bytebank Shell'} variant={'outlined'} color={'tertiary'} />
            </Box>
            <BytebankButton label={'Concluir'} variant={'contained'} color={'primary'} />
        </Box>
      </Box>
    </BytebankCard>
  );
}
