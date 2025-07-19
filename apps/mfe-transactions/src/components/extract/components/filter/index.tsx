import React, { useEffect } from 'react';
import { BytebankModal, BytebankInputController, BytebankButton, BytebankDatePickerController, BytebankSelectController } from "@repo/ui";
import { FormProvider, useForm } from 'react-hook-form';
import { ExtractFilter, Transaction, useFinancialData, useUser } from '@repo/data-access';

export interface IForm {
    categoryId?: string
    minValue?: number
    maxValue?: number
    startDate?: Date | null
    endDate?: Date | null
}

export interface FilterExtractProps {
   toggleDrawer: (newOpen: boolean) => () => void
}

export default function FilterExtract({
  toggleDrawer
}: FilterExtractProps) {
  const { user } = useUser();
  const { categories, fetchTransactions } = useFinancialData();
  const methods = useForm<IForm>({
    defaultValues: {
      categoryId: '',
      minValue: undefined,
      maxValue: undefined,
      startDate: null,
      endDate: null
    }
  });
  
  const handleSubmit = (data: IForm) => {
    const filterParams: ExtractFilter = {
      categoryId: data.categoryId,
      minValue: data.minValue,
      maxValue: data.maxValue,
      startDate: data.startDate ? data.startDate.toISOString() : undefined,
      endDate: data.endDate ? data.endDate.toISOString() : undefined,
    };
    if(user){
      fetchTransactions(user, filterParams);
      toggleDrawer(false)()
    }
  };
  
  return (
    
      <FormProvider {...methods}>
        <form onSubmit={ methods.handleSubmit(handleSubmit) }>
          {categories && categories.length > 0 && (
            <BytebankSelectController
              color='primary'
              name="categoryId"
              label="Tipo"
              options={categories.map(category => ({
                value: category._id,
                label: category.name
            }))}
            />
          )}

          <BytebankInputController
            name="minValue"
            label="Valor Minimo"
            type="text"
          />

          <BytebankInputController
            name="maxValue"
            label="Valor Máximo"
            type="text"
          />
          
          <BytebankDatePickerController
            name="startDate"
            label="Data inicial"
          />
          <BytebankDatePickerController
            name="endDate"
            label="Data final"
          />
          <BytebankButton
            label="Confirmar"
            color="secondary"
            variant="contained"
            type="submit"
            style={{ marginTop: 16 }}
          />
        </form>
      </FormProvider>
  );
}