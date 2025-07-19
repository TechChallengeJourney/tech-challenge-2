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
  BytebankDatePicker,
} from "@repo/ui";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { format, parse } from "date-fns";
import {
  useFetch,
  useFinancialData,
  useSession,
  useUser,
} from "@repo/data-access";
import { BytebankCreateCardModal } from "../../modals/create-card/create-modal";
const apiUrl = import.meta.env.PUBLIC_API_URL;

function formatSelectData(items: any) {
  return items.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
}

interface TransactionFormProps {
  type: string;
}

interface OptionsFields {
  label: string;
  value: string;
}

function TransactionForm({ type }: TransactionFormProps) {
  const { fetchTransactions } = useFinancialData();
  const { control, watch, handleSubmit, setValue } = useFormContext();
  const { request, loading, error } = useFetch();
  const [sessionToken] = useSession<string | null>("token");
  const [methods, setMethods] = useState<OptionsFields[]>([]);
  const [categories, setCategories] = useState<OptionsFields[]>([]);
  const [cards, setCards] = useState<OptionsFields[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const { user } = useUser();

  const selectedPaymentType = watch("methodId");
  const isMethodCredit = selectedPaymentType === "686c5a6b56268262e407a484";
  const showCardSection =
    type === "expense" && selectedPaymentType === "686c5a6b56268262e407a484";

  const createCategory = async (name: string) => {
    try {
      const { json, response } = await request(`${apiUrl}/categories`, {
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

      if (response && response.ok) {
        const categoryJson = json as { name: string; _id: string };
        const newCategory = {
          label: categoryJson.name,
          value: categoryJson._id,
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
        message: `Erro ao criar a categoria "${name}". ${error}`,
      });
      setSnackbarOpen(true);
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
        setCards(listCards);
      }
    };

    fetchUserCards();
  }, [isMethodCredit, sessionToken, request]);

  useEffect(() => {
    if (!sessionToken) {
      return;
    }

    const fetchDataForType = async () => {
      setValue("categoryId", "");
      setValue("methodId", "");
      setMethods([]);
      setCategories([]);

      const categoriesResp = await request(
        `${apiUrl}/categories/types/${type}`,
        {
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
    if (user?._id) formData.append("userId", user?._id);
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
      const { response } = await request(`${apiUrl}/transactions`, {
        method: "POST",
        headers: { Authorization: "Bearer " + sessionToken },
        body: formData,
      });

      if (response && !response.ok) {
        throw new Error(error || "Erro desconhecido");
      }

      if (user) {
        fetchTransactions(user);
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
  render={({ field, fieldState }) => {
    const stringValue = field.value; // Ex: "2025-07-19"
    const parsedDate = stringValue
      ? parse(stringValue, "yyyy-MM-dd", new Date())
      : null;

    const handleChange = (date: Date | null) => {
      const formatted = date ? format(date, "yyyy-MM-dd") : "";
      field.onChange(formatted); // envia como string para o form
    };

    return (
      <BytebankDatePicker
        label="Data da transação"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        value={parsedDate}
        onChange={handleChange}
      />
    );
  }}
/>

      <Controller
        name="value"
        rules={{
          required: "Valor é obrigatório",
          min: { value: 0.01, message: "O valor deve ser maior que zero" },
        }}
        control={control}
        render={({ field, fieldState }) => (
          <BytebankInput
            {...field}
            type="text"
            mask="currency"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            label="Valor"
            placeholder="R$ 00,00"
          />
        )}
      />

      <Box marginTop="1rem">
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
        justifyContent="flex-start"
        gap="0.875rem"
      >
        {categories
          ?.slice(0, 3)
          .map(({ label, value }) => (
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
        openModal={() => null}
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSubmit={(res) => {
          if (res.status === "success") {
            setCards(() => [
              ...cards,
              {
                label:
                  "**** **** **** " + res.data?.cardNumber.toString().slice(-4),
                value: res.data?._id,
              },
            ]);
          }
          setSnackbarData({
            status: res.status,
            message:
              res.message ??
              (res.status === "success"
                ? "Cartão criado com sucesso!"
                : "Erro ao criar cartão"),
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
        <BytebankText variant="md" fontWeight="700">Nova Transação</BytebankText>
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
