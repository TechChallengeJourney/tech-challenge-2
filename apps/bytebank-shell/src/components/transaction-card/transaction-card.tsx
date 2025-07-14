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
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { useFetch, useSession, useUser } from "@repo/data-access";

interface categoriesProps {
  label: string;
  value: string;
}

  const apiUrl = import.meta.env.PUBLIC_API_URL;

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

function maskCardNumber(cardNumber: number | string): string {
  const digits = cardNumber.toString().replace(/\D/g, "");
  const lastFour = digits.slice(-4);
  return "**** **** **** " + lastFour;
}


function TransactionForm({ options, isActive }: { options: optionsProps; isActive: boolean }) {
  const [sessionToken] = useSession<string | null>('token');
  const { control, watch, handleSubmit, setValue } = useFormContext();
  const {request, loading, error} = useFetch();

  console.log(sessionToken === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmM1OWUxMzdlNzE1OWY5MzA5OTZmOCIsImVtYWlsIjoic2VpbGFAdGVzdGUuY29tIiwiaWF0IjoxNzUyNTM2MDQ0LCJleHAiOjE3NTI2MjI0NDR9.o2HGDnslaNzGqY_7Uy4vF4mtbInqA3WyxfbUbvQc7_w')

  const selectedPaymentType = watch("paymentType");
  const showCardSection = isActive && selectedPaymentType === "credit";

  const onSubmit = (data: any) => {
    console.log(data);
  }

  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const listCards = mockCards.map((card) => ({
      label: maskCardNumber(card.cardNumber),
      value: card._id,
    }));
    setCards(listCards);
  }, []);

    useEffect(() => {
      setValue("type", isActive ? "expense" : "income");
    }, [isActive]);


    useEffect(() => {
      // const fetchData = async () => {
      //   const {json} = await request(`${apiUrl}/categories/types/expense`, {method: 'GET', headers: {Authorization: 'Bearer ' + value}});
      //   console.log(json, error);
      // }
      const fetchData = async () => {
        const res = await fetch(`${apiUrl}/categories/types/expense`,{method: 'GET', headers: {Authorization: 'Bearer ' + sessionToken}})
        const json = await res.json()
        console.log(json);
      }
      fetchData()
    },[])

  return (
    <>
      <Controller
        name="paymentType"
        control={control}
        render={({ field }) => (
          <BytebankSelect {...field} label="Selecione o tipo da transação" options={options.selectValues} />
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <BytebankInput {...field} type="date" label="Data da transação" value={field.value} />
        )}
      />

      <Controller
        name="value"
        control={control}
        render={({ field }) => (
          <BytebankInput {...field} type="number" label="Valor" placeholder="R$ 00,00" />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <BytebankSelect {...field} label="Categoria" options={options.categories} />
        )}
      />

      <Box marginBottom="1rem" display="flex" justifyContent="space-around" flexWrap="wrap" gap={1}>
        {options.categories.map((cat) => (
          <BytebankChip key={cat.value} label={cat.label} onClick={() => setValue("category", cat.value)} />
        ))}
      </Box>
      <Box marginBottom="1rem">
        <BytebankInputFileUpload label="FAZER UPLOAD DE ARQUIVO" />
      </Box>
      {showCardSection && (
        <Box>
          <BytebankText>
            A transação foi paga com cartão? Escolha o cartão utilizado ou crie um novo.
          </BytebankText>
          <Controller
            name="creditCard"
            control={control}
            render={({ field }) => (
              <BytebankSelect {...field} label="Selecione o cartão" options={cards} />
            )}
          />
          <BytebankButton
            fullWidth
            label="Criar um novo cartão"
            startIcon={<ControlPointIcon />}
            variant="text"
            color="secondary"
          />
        </Box>
      )}
      <Box marginTop="1rem" display="flex" justifyContent="center">
        <BytebankButton
          label="Concluir"
          variant="contained"
          color="primary"
          sendSubmit={handleSubmit(onSubmit)}
        />
      </Box>
    </>
  );
}

export function BytebankTransactionCard() {
  const [activeTab, setActiveTab] = useState(0);

  const methods = useForm({
    defaultValues: {
      paymentType: "credit",
      creditCard: "",
      category: "",
      date: format(new Date(), 'yyyy-MM-dd'),
      value: "",
      type: "income"
    },
  });


  return (
    <BytebankCard>
      <Box sx={{ width: "100%" }} padding="2rem">
        <BytebankText variant="lg">Nova Transação</BytebankText>
        <Box marginTop={2}>
          <BytebankTabs
            onChangeTab={(e) => setActiveTab(e)}
            options={[
              {
                label: "Entrada",
                content: (
                  <FormProvider {...methods}>
                    <TransactionForm options={incomingOptions} isActive={activeTab === 0 ? false : true} />
                  </FormProvider>
                ),
              },
              {
                label: "Saída",
                content: (
                  <FormProvider {...methods}>
                    <TransactionForm options={expanseOptions} isActive={activeTab === 1 ? true : false} />
                  </FormProvider>
                ),
              },
            ]}
          />
        </Box>
      </Box>
    </BytebankCard>
  );
}