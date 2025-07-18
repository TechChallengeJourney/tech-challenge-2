import { Box } from "@mui/material";
import { ReactElement, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useFetch, useSession, useUser } from "@repo/data-access";
import {
  BytebankAccessModalProps,
  BytebankModal,
  BytebankInputController,
  BytebankSelect,
  BytebankButton,
  BytebankText,
  SnackbarData,
  BytebankSnackbar,
} from "@repo/ui";
const apiUrl = import.meta.env.PUBLIC_API_URL;

const variantOptions = [
  { label: "Platinum", value: "platinum" },
  { label: "Gold", value: "gold" },
  { label: "Black", value: "black" },
];

const functionOptions = [
  { label: "Crédito", value: "credit" },
  { label: "Débito", value: "debit" },
];

export function BytebankCreateCardModal({
  open,
  onClose,
  onSubmit,
}: BytebankAccessModalProps): ReactElement {
  const [isLoading, setLoading] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { request, loading, error } = useFetch();
  const [sessionToken] = useSession<string | null>("token");

  const { user } = useUser();

  const methods = useForm({
    defaultValues: {
      name: "",
      functions: [],
      variant: "",
    },
  });

const handleCreateCard = async (data: any) => {
  if (!user?._id || !sessionToken) return;
  setLoading(true);

  try {
    const { json, response } = await request(`${apiUrl}/cards`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        name: data.name,
        functions: data.functions,
        variant: data.variant,
      }),
    });

    if (!response?.ok) {
      throw new Error(error || "Erro ao criar cartão");
    }

    setSnackbarData({
      status: "success",
      message: "Cartão criado com sucesso!",
    });

    onSubmit({ status: "success", data: json });
    methods.reset();
    onClose();
  } catch (err: any) {
    setSnackbarData({
      status: "error",
      message: err.message || "Erro ao criar cartão",
    });
  } finally {
    setSnackbarOpen(true);
    setLoading(false);
  }
};

  return (
    <>
      <BytebankModal
        title="Criação do novo cartão"
        open={open}
        illustrationShow
        onClose={() => onClose()}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleCreateCard)}>
            <BytebankInputController
              name="name"
              label="Nome do cartão"
              placeholder="Ex: Cartão Nubank"
              rules={{ required: "Nome é obrigatório" }}
            />

          <Controller
            name="functions"
            control={methods.control}
            rules={{ required: "Selecione pelo menos uma função" }}
            render={({ field, fieldState }) => (
              <BytebankSelect
                {...field}
                multiple={true}
                label="Função"
                options={functionOptions}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />


          <Controller
            name="variant"
            control={methods.control}
            rules={{ required: "Selecione o tipo do cartão" }}
            render={({ field, fieldState }) => (
              <BytebankSelect
                {...field}
                name="variant"
                label="Tipo do cartão"
                options={variantOptions}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

            <Box mt={2}>
              <BytebankButton
                label="Criar cartão"
                color="secondary"
                variant="contained"
                loading={isLoading}
                fullWidth
                type="submit"
              />
            </Box>
          </form>
        </FormProvider>
      </BytebankModal>

      <BytebankSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        data={snackbarData}
      />
    </>
  );
}
