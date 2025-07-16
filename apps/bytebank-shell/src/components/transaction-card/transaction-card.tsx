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
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { format } from "date-fns";
import { useFetch, useSession, useUser } from "@repo/data-access";
import AsyncSelectAutocomplete from "@repo/ui/components/auto-complete/auto-complete";
const apiUrl = import.meta.env.PUBLIC_API_URL;

function sortMethodsAndCategories(
  methods: any,
  categories: any
): any {
  const format = (items: any[]) =>
    items.map((item) => ({
      label: item.name,
      value: item._id,
    }));

  const result: any = {
    income: {
      methods: format(methods.filter((item: any) => item.type === "income")),
      categories: format(categories.filter((item: any) => item.type === "income")),
    },
    expense: {
      methods: format(methods.filter((item: any) => item.type === "expense")),
      categories: format(categories.filter((item: any) => item.type === "expense")),
    },
  };
  return result;
}

function formatSelectData(items: any[]) {
  return items.map((item) => ({
    label: item.name,
    value: item._id,
  }));
}

interface categoriesProps {
  label: string;
  value: string;
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

interface TransactionFormProps {
  type: string;
}

function maskCardNumber(cardNumber: number | string): string {
  const digits = cardNumber.toString().replace(/\D/g, "");
  const lastFour = digits.slice(-4);
  return "**** **** **** " + lastFour;
}

function TransactionForm({
  type,
}: TransactionFormProps) {
const { control, watch, handleSubmit, setValue } = useFormContext();
  const { request, loading } = useFetch();
  const [sessionToken] = useSession<string | null>("token");
  const [methods, setMethods] = useState<any[]>([]); // Tipar como array
  const [categories, setCategories] = useState<any[]>([]); // Tipar como array

  const [cards, setCards] = useState<any[]>([]);
  useEffect(() => {
    const listCards = mockCards.map((card) => ({
      label: maskCardNumber(card.cardNumber),
      value: card._id,
    }));
    setCards(listCards);
  }, []);

  // --- CORREÇÃO PRINCIPAL ESTÁ AQUI ---
  useEffect(() => {
    // 1. Adicionamos um "guard clause": se não houver token, não fazemos nada.
    if (!sessionToken) {
      return;
    }

    // Função assíncrona para buscar os dados
    const fetchDataForType = async () => {
        // Limpa os campos antes de buscar novos dados
        setValue("category", "");
        setValue("paymentType", "");
        setMethods([]);
        setCategories([]);

        // Busca categorias
        const categoriesResp = await request(`${apiUrl}/categories/types/${type}`, {
            headers: { Authorization: "Bearer " + sessionToken },
        });
        if (categoriesResp.json) setCategories(formatSelectData(categoriesResp.json));

        // Busca métodos
        const methodsResp = await request(`${apiUrl}/methods/types/${type}`, {
            headers: { Authorization: "Bearer " + sessionToken },
        });
        if (methodsResp.json) setMethods(formatSelectData(methodsResp.json));
    };

    setValue("type", type);
    fetchDataForType();

  // 2. Adicionamos 'sessionToken' ao array de dependências.
  // O hook agora irá re-executar quando o token for carregado.
  }, [type, sessionToken, setValue, request]);

  const selectedPaymentType = watch("paymentType");
  const showCardSection = selectedPaymentType === "credit";

  // As funções getMethods e getCategories não são mais necessárias aqui,
  // pois a lógica foi movida para o useEffect.

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <Controller
        name="paymentType"
        control={control}
        render={({ field }) => (
          <BytebankSelect
            {...field}
            // onOpen não é mais necessário
            loading={loading && methods.length === 0} // Mostra loading apenas se estiver carregando métodos
            label="Selecione o tipo da transação"
            options={methods}
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <BytebankInput
            {...field}
            type="date"
            label="Data da transação"
            value={field.value}
          />
        )}
      />

      <Controller
        name="value"
        control={control}
        render={({ field }) => (
          <BytebankInput
            {...field}
            type="number"
            label="Valor"
            placeholder="R$ 00,00"
          />
        )}
      />

       <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <BytebankSelect
            {...field}
            // onOpen não é mais necessário
            label="Categoria"
            loading={loading && categories.length === 0} // Mostra loading apenas se estiver carregando categorias
            options={categories}
          />
        )}
      />

      <Box
        marginBottom="1rem"
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        gap={1}
      >
        {categories?.map(({ label, value }) => (
          <BytebankChip
            key={value}
            label={label}
            onClick={() => setValue("category", value)}
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
          <Controller
            name="creditCard"
            control={control}
            render={({ field }) => (
              <BytebankSelect
                {...field}
                label="Selecione o cartão"
                options={cards}
              />
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
  const [activeTab, setActiveTab] = useState("income");

  const methods = useForm({
    defaultValues: {
      paymentType: "credit",
      creditCard: "",
      category: "",
      date: format(new Date(), "yyyy-MM-dd"),
      value: "",
      type: "income",
    },
  });

  // useEffect(() => {
  //   console.log(activeTab)
  // }, [activeTab])

  return (
    <BytebankCard>
      <Box sx={{ width: "100%" }} padding="2rem">
        <BytebankText variant="lg">Nova Transação</BytebankText>

        <Box marginTop={2}>
          <BytebankTabs
            options={[
              { label: "Entrada", id: "income" },
              { label: "Saída", id: "expense" },
            ]}
            onChangeTab={(i) => setActiveTab(i)}
          >
            <FormProvider {...methods}>
              <TransactionForm
                type={activeTab}
              />
            </FormProvider>
          </BytebankTabs>
        </Box>
      </Box>
    </BytebankCard>
  );
}
