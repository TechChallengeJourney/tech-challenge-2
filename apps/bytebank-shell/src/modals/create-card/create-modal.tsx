import { Box } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import {
  BytebankAccessModalProps,
  BytebankModal,
  BytebankInputController,
  BytebankSelect,
  BytebankButton,
  BytebankSnackbar,
  SnackbarData,
} from "@repo/ui";
import { useUser } from "@repo/data-access";
import { useCreateCardBank } from "@repo/data-access";

export interface NewCardData {
  userId: string;
  name: string;
  functions: string[];
  variant: string;
}

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
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { user } = useUser();
  const { createCard, loading, error } = useCreateCardBank();

  const methods = useForm({
    defaultValues: {
      name: "",
      functions: [],
      variant: "",
    },
  });

<<<<<<< Updated upstream
  const handleCreateCard = async (data: any) => {
    if (!user?._id) return;
=======
<<<<<<< Updated upstream
const handleCreateCard = async (data: any) => {
  if (!user?._id || !sessionToken) return;
  setLoading(true);
=======
  const handleCreateCard = async (data: any) => {
    console.log("handleCreateCard aqui")
    if (!user?._id) return;
>>>>>>> Stashed changes
>>>>>>> Stashed changes

    const result = await createCard({
      userId: user._id,
      name: data.name,
      functions: data.functions,
      variant: data.variant,
    });

    if (result) {
      setSnackbarData({
        status: "success",
        message: "Cartão criado com sucesso!",
      });

      onSubmit?.({ status: "success", data: result });
      methods.reset();
      onClose();
    } else {
      setSnackbarData({
        status: "error",
        message: error ?? "Erro ao criar cartão.",
      });
    }
<<<<<<< Updated upstream

<<<<<<< Updated upstream
=======
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
=======
    console.log(result);
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    setSnackbarOpen(true);
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
                  multiple
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
                loading={loading}
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
