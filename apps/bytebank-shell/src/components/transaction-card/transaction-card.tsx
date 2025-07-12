import { Box } from "@mui/material";
import {
  BytebankButton,
  BytebankCard,
  BytebankInput,
  BytebankSelect,
  BytebankTabs,
  BytebankText,
  BytebankChip,
  BytebankInputFileUpload,
} from "@repo/ui";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useEffect, useState } from "react";

interface categoriesProps {
  label: string;
  value: string;
}

interface optionsProps {
  selectValues: categoriesProps[];
  categories: categoriesProps[];
}

const mockCards = [
  {
    _id: "i686367017dad6840720d6282",
    userId: "6861d7cf2e40177f08d6b236",
    cardNumber: 2429280541397358,
    name: "cartão teste 2",
    functions: ["credit"],
    variant: "platinum",
    expirationDate: "2028-07-01T04:41:37.174Z",
    cvv: 527,
    flag: "Visa",
    blocked: false,
    __v: 0,
  },
  {
    _id: "686367017dad6840720d6282",
    userId: "6861d7cf2e40177f08d6b236",
    cardNumber: 2429280541397853, // 24292.80541.397853 2429.2805.4139.7853
    name: "cartão teste 1",
    functions: ["credit"],
    variant: "platinum",
    expirationDate: "2028-07-01T04:41:37.174Z",
    cvv: 527,
    flag: "Visa",
    blocked: false,
    __v: 0,
  },
];

const expanseOptions = {
  selectValues: [
    {
      label: "Cartão de Crédito",
      value: "credit",
    },
    {
      label: "PIX",
      value: "pix",
    },
    {
      label: "BOLETO",
      value: "boleto",
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
      value: "doc/ted",
    },
    {
      label: "PIX",
      value: "pix",
    },
    {
      label: "BOLETO",
      value: "boleto",
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

function getCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function maskCardNumber(cardNumber: number | string): string {
  const digits = cardNumber.toString().replace(/\D/g, "");
  const lastFour = digits.slice(-4);
  return "**** **** **** " + lastFour;
}

function formRender(options: optionsProps, isActive: boolean) {
  const { selectValues, categories } = options;
  const [cards, setCards] = useState<any>([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>(
    selectValues[0].value,
  );
  const [selectedCreditCard, setSelectedCreditCard] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [transactionDate, setTransactionDate] = useState<string>("");
  const [transactionValue, setTransactionValue] = useState<string>("");
  const showCardSection =
    isActive && selectedPaymentType === expanseOptions.selectValues[0].value;

  useEffect(() => {
    const listCards = mockCards.map((card) => ({
      label: maskCardNumber(card.cardNumber),
      value: card._id,
    }));
    setCards(listCards);
  }, []);

  return (
    <>
      <BytebankSelect
        value={selectedPaymentType}
        onChange={(e) => setSelectedPaymentType(e + "")}
        label="Selecione o tipo da transação"
        options={selectValues}
      />
      <BytebankInput
        onChange={(e) => setTransactionDate(e)}
        name="date"
        type="date"
        label="Data da transação"
        value={transactionDate ? transactionDate : getCurrentDate()}
      />
      <BytebankInput
        onChange={(e) => setTransactionValue(e)}
        name="value"
        type="number"
        value={transactionValue}
        label="Valor"
        placeholder="R$ 00,00"
      />
      <BytebankSelect
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e + "")}
        label="Categoria"
        options={categories}
      />
      <Box
        marginBottom="1rem"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        {categories.map((e) => (
          <BytebankChip
            key={e.value}
            label={e.label}
            onClick={() => setSelectedCategory(e.value)}
          />
        ))}
      </Box>
      <Box marginBottom="1rem">
        <BytebankInputFileUpload label="FAZER UPLOAD DE ARQUIVO" />
      </Box>

      {showCardSection && (
        <Box>
          <BytebankText>
            A transação foi paga com cartão? Escolha o cartão utilizado ou crie
            um novo.
          </BytebankText>
          <BytebankSelect
            value={selectedCreditCard}
            onChange={(e) => setSelectedCreditCard(e + "")}
            label="Selecione o tipo da transação"
            options={cards}
          />
          <BytebankButton
            fullWidth
            label={"Criar um novo cartão"}
            startIcon={<ControlPointIcon />}
            variant={"text"}
            color={"secondary"}
          />
        </Box>
      )}

      <Box marginTop="1rem" display="flex" justifyContent="center">
        <BytebankButton
          label={"Concluir"}
          variant={"contained"}
          color={"primary"}
        />
      </Box>
    </>
  );
}

export function BytebankTransactionCard() {
  const [activeTab, setActiveTab] = useState(0);

  const options = [
    {
      label: "Entrada",
      content: formRender(incomingOptions, false), // não mostra o bloco de cartão
    },
    {
      label: "Saída",
      content: formRender(expanseOptions, true), // mostra o bloco de cartão
    },
  ];

  return (
    <BytebankCard>
      <Box sx={{ width: "100%" }} padding="2rem">
        <BytebankText variant="lg">Nova Transação</BytebankText>
        <Box marginTop={2}>
          <BytebankTabs options={options} onChangeTab={setActiveTab} />
        </Box>
      </Box>
    </BytebankCard>
  );
}
