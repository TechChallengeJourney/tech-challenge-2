import React, { useEffect } from 'react';
import { BytebankModal, Transaction } from '@bytebank/shared';
import { BytebankInputController } from '@bytebank/shared';
import { FormProvider, useForm } from 'react-hook-form';
import { BytebankButton } from '@bytebank/shared';

export interface EditExtractModalProps {
  open: boolean;
  onClose: () => void;
  item: Transaction;
  onSave: (value: string) => void;
}

export default function EditExtractModal({
  open,
  onClose,
  item,
  onSave,
}: EditExtractModalProps) {
  const methods = useForm({ defaultValues: { value: item?.value || '' } });
  const handleSubmit = (data: { value: string | number }) => {
    onSave(String(data.value));
    onClose();
  };
  useEffect(() => {
    
    methods.reset({ value: (Number(item?.value) * 100).toString() || '' });

  }, [item])
  return (
    <BytebankModal
      open={open}
      onClose={onClose}
      title="Editar valor"
      illustration="graphic"
      illustrationSize="md"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <BytebankInputController
            name="value"
            label="Novo valor"
            type="text"
            mask="currency"
          />
          <BytebankButton
            label="Salvar"
            color="primary"
            variant="contained"
            type="submit"
            style={{ marginTop: 16 }}
          />
        </form>
      </FormProvider>
    </BytebankModal>
  );
}
