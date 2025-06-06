import React from 'react';
import { BytebankModal, BytebankText, Transaction } from '@bytebank/shared';
import { BytebankButton } from '@bytebank/shared';
import { Box } from '@mui/material';

export interface DeleteExtractModalProps {
  open: boolean;
  onClose: () => void;
  item: Transaction | null;
  onConfirm: () => void;
}

export default function DeleteExtractModal({
  open,
  onClose,
  onConfirm,
}: DeleteExtractModalProps) {
  return (
    <BytebankModal
      open={open}
      onClose={onClose}
      title="Confirmar exclusão"
      illustration="error"
      illustrationSize="md"
      illustrationShow={false}
    >
      <Box>
        <BytebankText style={{ marginBottom: 16 }}>
          Tem certeza que deseja excluir este item?
        </BytebankText>
        <Box style={{ display: 'flex', gap: 8 }}>
          <BytebankButton
            label="Sim"
            color="error"
            variant="contained"
            sendSubmit={onConfirm}
          />
          <BytebankButton
            label="Não"
            color="secondary"
            variant="outlined"
            sendSubmit={onClose}
          />
        </Box>
      </Box>
    </BytebankModal>
  );
}
