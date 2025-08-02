import { Box } from "@mui/material";
import {
  BytebankButton,
  BytebankCard,
  BytebankTabs,
  BytebankText,
  BytebankChip,
  SnackbarData,
  BytebankSnackbar,
  BytebankButtonFileUpload,
  BytebankDatePickerController,
  BytebankSelectController,
  BytebankInputController,
  BytebankAutoCompleteController,
} from "@repo/ui";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { format } from "date-fns";
import { api, useFinancialData, useUser } from "@repo/data-access";
import { BytebankCreateCardModal } from "../../modals/create-card/create-modal";

function formatDataByType(list: any, type: string) {
  return list
    .filter((e: any) => e.type === type)
    .map((e: any) => ({
      label: e.name,
      value: e._id,
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
  const { fetchTransactions, categories } = useFinancialData();
  const [localCategories, setLocalCategories] = useState<OptionsFields[]>([]);
  const { control, handleSubmit, setValue, reset } = useFormContext();
  const [methods, setMethods] = useState([]);
  const filterMethods = formatDataByType(methods, type);
  const [cards, setCards] = useState<OptionsFields[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const { user } = useUser();

  const selectedPaymentType = useWatch({ name: "methodId", control });
  const isMethodCredit = selectedPaymentType === "686c5a6b56268262e407a484";
  const showCardSection = type === "expense" && isMethodCredit;

  const createCategory = async (name: string) => {
    try {
      const { status, data } = await api.post("/categories", { name, type });

      if (status === 201) {
        const categoryJson = data as { name: string; _id: string };
        const newCategory = {
          label: categoryJson.name,
          value: categoryJson._id,
        };

        setLocalCategories((prev) => [...prev, newCategory]);

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
        message: `Erro ao criar a categoria "${name}". ${err}`,
      });
      setSnackbarOpen(true);
    }
  };

  const onSubmit = async (data: any) => {
    console.log(new Date(data.createdAt).toISOString())
    const formData = new FormData();
    if (user?._id) formData.append("userId", user?._id);
    formData.append("value", data.value);
    formData.append("type", data.type);
    formData.append("createdAt", new Date(data.createdAt).toISOString());
    formData.append("categoryId", data.categoryId);
    formData.append("methodId", data.methodId);

    if (data.creditCard) {
      formData.append("cardId", data.creditCard);
    }

    if (data.file instanceof File) {
      formData.append("file", data.file);
    }

    try {
      const { status, statusText } = await api.post("/transactions", formData);

      if (status != 201) throw new Error(statusText || "Erro desconhecido");

      if (user) {
        fetchTransactions(user);
      }

      setSnackbarData({
        status: "success",
        message: "Transação criada com sucesso!",
      });
      setSnackbarOpen(true);
      reset({
        methodId: "",
        creditCard: "",
        categoryId: "",
        createdAt: "",
        value: "",
        type: type,
        file: null,
      });
    } catch (err: any) {
      setSnackbarData({
        status: "error",
        message: err.message || "Erro ao enviar transação.",
      });
      setSnackbarOpen(true);
      console.error("Erro ao criar transação:", err);
    }
  };

  useEffect(() => {
    setValue("type", type);
    const fetchPaymentMethods = async () => {
      try {
        const { data } = await api.get(`/methods`);
        if (data.length > 0) {
          setMethods(data);
        }
      } catch (err) {
        setSnackbarData({
          status: "error",
          message: "Erro ao buscar métodos  de pagamento.",
        });
        setSnackbarOpen(true);
      }
    };

    const fetchUserCards = async () => {
      const { data } = await api.get(`/cards?userId=${user?._id}`);
      if (data.length > 0) {
        const listCards = data.map((card: any) => ({
          label: "**** **** **** " + card.cardNumber.toString().slice(-4),
          value: card._id,
        }));
        setCards(listCards);
      }
    };

    fetchPaymentMethods();
    if (isMethodCredit) fetchUserCards();
  }, [type, selectedPaymentType]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const filtered = formatDataByType(categories, type);
      setLocalCategories(filtered);
    }
  }, [categories, type]);

  return (
    <>
      <BytebankSelectController
        name="methodId"
        label="Selecione o tipo da transação"
        rules={{ required: "Tipo de pagamento é obrigatório" }}
        options={filterMethods}
        color="primary"
      />

      <BytebankDatePickerController
        name="createdAt"
        label="Data da transação"
        rules={{ required: "Data é obrigatória" }}
      />

      <BytebankInputController
        type="text"
        mask="currency"
        label="Valor"
        name="value"
        rules={{
          required: "Valor é obrigatório",
          min: { value: 0.01, message: "O valor deve ser maior que zero" },
        }}
        placeholder="R$ 00,00"
      />

      <Box marginTop="1rem">
        <BytebankAutoCompleteController
          name="categoryId"
          label="Categoria"
          rules={{ required: "Categoria é obrigatória" }}
          loading={localCategories.length === 0}
          options={localCategories}
          onCreateOption={createCategory}
        />
      </Box>

      <Box
        marginY="1rem"
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        gap="0.875rem"
      >
        {localCategories.slice(0, 3).map(({ label, value }) => (
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
            <BytebankSelectController
              name="creditCard"
              label="Selecione o cartão"
              options={cards}
              color="primary"
            />
          ) : null}

          <BytebankButton
            fullWidth
            label="Criar um novo cartão"
            startIcon={<ControlPointIcon />}
            variant="text"
            color="secondary"
            onClick={() => setCardModalOpen(true)}
          />
        </Box>
      )}

      <Box marginTop="1rem" display="flex" justifyContent="center">
        <BytebankButton
          label="Concluir"
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
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
      createdAt: "",
      value: "",
      type: "income",
      file: null,
    },
  });

  return (
    <BytebankCard>
      <Box sx={{ width: "100%" }} padding="2rem">
        <BytebankText variant="md" fontWeight="700">
          Nova Transação
        </BytebankText>
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
