import React, { useEffect } from 'react';
import { BytebankModal, BytebankInputController, BytebankButton, BytebankDatePickerController } from "@repo/ui";
import { FormProvider, useForm } from 'react-hook-form';
import { Transaction } from '@repo/data-access';

export interface IForm {
    type?: string
    minValue?: number
    maxValue?: number
    startDate?: Date | null
    endDate?: Date | null
}

export interface FilterExtractProps {
}

export default function FilterExtract({
}: FilterExtractProps) {
  const methods = useForm<IForm>({
    defaultValues: {
      type: '',
      minValue: undefined,
      maxValue: undefined,
      startDate: null,
      endDate: null
    }
  });
  
  const handleSubmit = (data: IForm) => {
    console.log("Filter applied with value:", data);
  };
  
  return (
    
      <FormProvider {...methods}>
        <form onSubmit={ methods.handleSubmit(handleSubmit) }>
          <BytebankInputController
            name="type"
            label="Tipo"
            type="text"
          />

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