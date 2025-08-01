import {
  BytebankInputController,
  BytebankButton,
  BytebankDatePickerController,
  BytebankSelectController,
} from "@repo/ui";
import { FormProvider, useForm } from "react-hook-form";
import { ExtractFilter, useFinancialData, useUser } from "@repo/data-access";
import { Box } from "@mui/material";

export interface IForm {
  categoryId?: string;
  minValue?: number | string;
  maxValue?: number | string;
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface FilterExtractProps {
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function FilterExtract({ toggleDrawer }: FilterExtractProps) {
  const { user } = useUser();
  const { categories, fetchTransactions } = useFinancialData();

  const savedFilter =
    typeof window !== "undefined"
      ? sessionStorage.getItem("filterParams")
      : null;
  let defaultValues: IForm = {
    categoryId: "",
    minValue: undefined,
    maxValue: undefined,
    startDate: null,
    endDate: null,
  };

  if (savedFilter) {
    try {
      const parsed = JSON.parse(savedFilter);
      defaultValues = {
        categoryId: parsed.categoryId || "",
        minValue: parsed.minValue,
        maxValue: parsed.maxValue,
        startDate: parsed.startDate ? new Date(parsed.startDate) : null,
        endDate: parsed.endDate ? new Date(parsed.endDate) : null,
      };
    } catch (error) {
      console.error("Erro ao parsear filtro salvo", error);
    }
  }

  const methods = useForm<IForm>({
    defaultValues,
  });

  const handleSubmit = (data: IForm) => {
    const filterParams: ExtractFilter = {
      categoryId: data.categoryId,
      minValue: data.minValue,
      maxValue: data.maxValue,
      startDate: data.startDate ? data.startDate.toISOString() : undefined,
      endDate: data.endDate ? data.endDate.toISOString() : undefined,
    };

    sessionStorage.setItem("filterParams", JSON.stringify(filterParams));

    if (user) {
      fetchTransactions(user, filterParams);
      toggleDrawer(false)();
    }
  };

  const handleClear = () => {
    sessionStorage.removeItem("filterParams");
    methods.reset({
      categoryId: "",
      minValue: "",
      maxValue: "",
      startDate: null,
      endDate: null,
    });
    if (user) {
      fetchTransactions(user, {});
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {categories && categories.length > 0 && (
          <BytebankSelectController
            color="primary"
            name="categoryId"
            label="Tipo"
            options={categories.map((category) => ({
              value: category._id,
              label: category.name,
            }))}
          />
        )}

        <BytebankInputController
          name="minValue"
          label="Valor Minimo"
          type="text"
          mask="currency"
        />

        <BytebankInputController
          name="maxValue"
          label="Valor Máximo"
          type="text"
          mask="currency"
        />

        <BytebankDatePickerController name="startDate" label="Data inicial" />
        <BytebankDatePickerController name="endDate" label="Data final" />
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <BytebankButton
            label="Confirmar"
            color="secondary"
            variant="contained"
            type="submit"
            style={{ marginTop: 16 }}
          />
          <BytebankButton
            label="Limpar"
            color="secondary"
            variant="outlined"
            type="submit"
            style={{ marginTop: 16 }}
            onClick={handleClear}
          />
        </Box>
      </form>
    </FormProvider>
  );
}
