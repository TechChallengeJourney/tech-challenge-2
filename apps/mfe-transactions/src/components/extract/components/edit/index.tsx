import { useEffect, useState } from 'react';
import { BytebankModal, BytebankInputController, BytebankButton, BytebankText, BytebankSelectController, BytebankDatePickerController  } from "@repo/ui";
import { FormProvider, useForm } from 'react-hook-form';
import { api, BodyTransactionPut, Method, Transaction, useFinancialData, useUser } from '@repo/data-access';
import { Box } from '@mui/material';

export interface EditExtractProps {
 toggleDrawer: (newOpen: boolean) => () => void
 item : Transaction ;
}

export interface IForm {
    methodId: string;
    categoryId: string
    dateTransaction: Date
    value: string
}

export default function EditExtract({
  toggleDrawer, item
}: EditExtractProps) {
    const { user } = useUser();
  const { categories, fetchTransactions } = useFinancialData();
  const [ types, setTypes ]  = useState<Method[]>([]);
  
  const methods = useForm<IForm>({
    defaultValues: {
      categoryId: item.categoryId,
      methodId: item.methodId,
      value: String(item.value),
      dateTransaction: new Date(item.createdAt)
    }
  });

  const handleMethods = () => {
    api.get(`/methods/types/${item.type}`).then((response) => {
      setTypes(response.data);
    })
  }

  useEffect(() => {
    handleMethods();
  }, []);
  
  const handleSubmit = (data: IForm) => {
    const body: BodyTransactionPut = {
      userId: item.userId || '',
      value: Number(data.value.replace(/[^0-9.-]+/g,"")),
      type: item.type,
      createdAt: data.dateTransaction,
      categoryId: data.categoryId,
      methodId: data.methodId,
    }
    api.put(`/transactions/${item._id}`, body)
      .then((res) => {
        toggleDrawer(false)();
        fetchTransactions(user!);

      })
      .catch((error) => {
        console.error('Error updating transaction:', error);
      })
  }

  return (
    <Box sx={{ width: "100%" }} >
        <Box marginTop={2}>
          <FormProvider {...methods}>
            <form onSubmit={ methods.handleSubmit(handleSubmit) }>
              {types && types.length > 0 && (
                <BytebankSelectController
                  color='primary'
                  name="methodId"
                  label="Selecione o tipo da transação"
                  options={types.map(type => ({
                    value: type._id,
                    label: type.name
                }))}
                />
              )}
              <BytebankDatePickerController
                name="dateTransaction"
                label="Data da transação"
              />
              <BytebankInputController
                mask='currency'
                name="value"
                label="Valor "
                type="text"
              />
              {categories && categories.length > 0 && (
                <BytebankSelectController
                  color='primary'
                  name="categoryId"
                  label="Categorias"
                  options={categories.map(category => ({
                    value: category._id,
                    label: category.name
                }))}
                />
              )}
              <BytebankButton
                label="Confirmar"
                color="secondary"
                variant="contained"
                type="submit"
                style={{ marginTop: 16 }}
              />
            </form>
          </FormProvider>
        </Box>
      </Box>
  );
}