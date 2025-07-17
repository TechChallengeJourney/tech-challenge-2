import { Box } from "@mui/material";
import {
  BytebankButton,
  BytebankCard,
  BytebankInput,
  BytebankSelect,
  BytebankTabs,
  BytebankText,
  BytebankChip,
  SnackbarData,
  BytebankSnackbar,
  BytebankButtonFileUpload,
  BytebankAutoComplete,
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
import { BytebankCreateCardModal } from "../../modals/create-card/create-modal";
const apiUrl = import.meta.env.PUBLIC_API_URL;

function formatSelectData(items: any[]) {
  return items.map((item) => ({
    label: item.name,
    value: item._id,
  }));
}

//   {
//     _id: "i686367017dad6840720d6282",
//     userId: "6861d7cf2e40177f08d6b236",
//     cardNumber: 2429280541397358,
//     name: "cartão teste 2",
//     functions: ["credit"],
//     variant: "platinum",
//     expirationDate: "2028-07-01T04:41:37.174Z",
//     cvv: 527,
//     flag: "Visa",
//     blocked: false,
//     __v: 0,
//   },
//   {
//     _id: "686367017dad6840720d6282",
//     userId: "6861d7cf2e40177f08d6b236",
//     cardNumber: 2429280541397853, // 24292.80541.397853 2429.2805.4139.7853
//     name: "cartão teste 1",
//     functions: ["credit"],
//     variant: "platinum",
//     expirationDate: "2028-07-01T04:41:37.174Z",
//     cvv: 527,
//     flag: "Visa",
//     blocked: false,
//     __v: 0,
//   },
// ];

interface TransactionFormProps {
  type: string;
}

function TransactionForm({ type }: TransactionFormProps) {
  const { control, watch, handleSubmit, setValue } = useFormContext();
  const { request, loading, error } = useFetch();
  const [sessionToken] = useSession<string | null>("token");
  const [methods, setMethods] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const { user } = useUser();

  const selectedPaymentType = watch("methodId");
  const isMethodCredit = selectedPaymentType === "686c5a6b56268262e407a484"
  const showCardSection = type === "expense" && selectedPaymentType === "686c5a6b56268262e407a484";

  const createCategory = async (name: string) => {
    try {
      const {json, response} = await request(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
        }),
      });

      if (response.ok) {
        const newCategory = {
          label: json.name,
          value: json._id,
        };

        setCategories((prev) => [...prev, newCategory]);
        setValue("categoryId", newCategory.value);

        setSnackbarData({
          status: "success",
          message: `Categoria "${name}" criada com sucesso.`,
        });
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarData({
        status: "error",
        message: `Erro ao criar a categoria "${name}".`,
      });
      setSnackbarOpen(true);
      console.error("Erro ao criar categoria:", err);
    }
  };

useEffect(() => {
  if (!sessionToken || !isMethodCredit) return;

  const fetchUserCards = async () => {
    const { json } = await request(`${apiUrl}/cards?userId=${user?._id}`, {
      headers: { Authorization: "Bearer " + sessionToken },
    });

    if (Array.isArray(json)) {
      const listCards = json.map((card) => ({
        label: "**** **** **** " + card.cardNumber.toString().slice(-4),
        value: card._id,
      }));
      console.log(json);
      setCards(listCards);
    }
  };

  fetchUserCards();
}, [isMethodCredit, sessionToken, user?._id, request]);

  useEffect(() => {
    if (!sessionToken) {
      return;
    }

    const fetchDataForType = async () => {
      setValue("categoryId", "");
      setValue("methodId", "");
      setMethods([]);
      setCategories([]);

      const categoriesResp = await request(`${apiUrl}/categories/types/${type}`, {
          headers: { Authorization: "Bearer " + sessionToken },
        },
      );

      if (categoriesResp.json)
        setCategories(formatSelectData(categoriesResp.json));

      const methodsResp = await request(`${apiUrl}/methods/types/${type}`, {
        headers: { Authorization: "Bearer " + sessionToken },
      });
      if (methodsResp.json) setMethods(formatSelectData(methodsResp.json));
    };

    setValue("type", type);
    fetchDataForType();
  }, [type, sessionToken, setValue, request]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("userId", user?._id);
    formData.append("value", data.value);
    formData.append("type", data.type);
    formData.append("createdAt", data.createdAt); 
    formData.append("categoryId", data.categoryId); 
    formData.append("methodId", data.methodId); 

    if (data.creditCard) {
      formData.append("cardId", data.creditCard); 
    }

    if (data.file instanceof File) {
      formData.append("file", data.file);
    }

    try {
      const {response, json} = await request(`${apiUrl}/transactions`, {
        method: "POST",
        headers: { Authorization: "Bearer " + sessionToken },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(error || "Erro desconhecido");
      }

      setSnackbarData({
        status: "success",
        message: "Transação criada com sucesso!",
      });
      setSnackbarOpen(true);
    } catch (err: any) {
      setSnackbarData({
        status: "error",
        message: err.message || "Erro ao enviar transação.",
      });
      setSnackbarOpen(true);
      console.error("Erro ao criar transação:", err);
    }
  };

  return (
    <>
      <Controller
        name="methodId"
        control={control}
        rules={{ required: "Tipo de pagamento é obrigatório" }}
        render={({ field, fieldState }) => (
          <BytebankSelect
            {...field}
            loading={loading && methods.length === 0}
            label="Selecione o tipo da transação"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            options={methods}
          />
        )}
      />

      <Controller
        name="createdAt"
        control={control}
        rules={{ required: "Data é obrigatória" }}
        render={({ field, fieldState }) => (
          <BytebankInput
            {...field}
            type="date"
            label="Data da transação"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            value={field.value}
          />
        )}
      />

      <Controller
        name="value"
        rules={{ required: "Valor é obrigatório", min: { value: 0.01, message: "O valor deve ser maior que zero" } }}
        control={control}
        render={({ field, fieldState }) => (
          <BytebankInput
            {...field}
            type="number"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            label="Valor"
            placeholder="R$ 00,00"
          />
        )}
      />

      <Box marginTop="1.5rem">
        <Controller
          name="categoryId"
          rules={{ required: "Categoria é obrigatória" }}
          control={control}
          render={({ field, fieldState }) => {
            const selected =
              categories.find((cat) => cat.value === field.value) || null;
            return (
              <BytebankAutoComplete
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Categoria"
                onCreateOption={createCategory}
                loading={loading && categories.length === 0}
                options={categories}
                value={selected}
                onChange={(val) => field.onChange(val?.value || "")}
              />
            );
          }}
        />
      </Box>


      <Box
        marginY="1rem"
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        gap={1}
      >
        {categories?.slice(0, 3).map(({ label, value }) => (
          <BytebankChip
            key={value}
            label={label}
            onClick={() => setValue("categoryId", value)}
          />
        ))}
      </Box>

      <Box marginBottom="1rem">
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <BytebankButtonFileUpload
              label="FAZER UPLOAD DE ARQUIVO"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Box>

{showCardSection && (
  <Box>
    <BytebankText>
      A transação foi paga com cartão? Escolha o cartão utilizado ou crie
      um novo.
    </BytebankText>
    {cards.length > 0 ? (
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
    ) : null}

    <BytebankButton
      fullWidth
      label="Criar um novo cartão"
      startIcon={<ControlPointIcon />}
      variant="text"
      color="secondary"
      sendSubmit={() => setCardModalOpen(true)}
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
      <BytebankSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        data={snackbarData}
      />
      <BytebankCreateCardModal
        openModal={()=> null}
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSubmit={(res) => {
          if (res.status === "success") {
            // Atualize a lista de cartões aqui se necessário
          }

          setSnackbarData({
            status: res.status,
            message: res.message ?? (res.status === "success" ? "Cartão criado com sucesso!" : "Erro ao criar cartão"),
          });
          setSnackbarOpen(true);
        }}
      />
    </>
  );
}

export function BytebankTransactionCard() {
  const [activeTab, setActiveTab] = useState("income");

  const methods = useForm({
    defaultValues: {
      methodId: "",
      creditCard: "",
      categoryId: "",
      createdAt: format(new Date(), "yyyy-MM-dd"),
      value: "",
      type: "income",
      file: null,
    },
  });

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
              <TransactionForm type={activeTab} />
            </FormProvider>
          </BytebankTabs>
        </Box>
      </Box>
    </BytebankCard>
  );
}


// TODO: Listagem de cartões

// TODO: Modal para criação do cartão

// TODO: Mascara de valor para moeda em reais no input de valor

// TODO: Valor da transação junto ao saldo

//TODO: Arrumar a cor do "No Options" no autoComplete

//TODO: Ver com a Dani lugar onde colocar as tipagens

// Completos 
// TODO: Validação do formulário no geral = feito
// TODO: Mostrar seleção de cartão no tab de saidas = feito
// TODO: Componente de categorias = feito
// TODO: limitar categorias componentes chips = feito
// TODO: Anexo de arquivo junto ao react-hook-form = feito
