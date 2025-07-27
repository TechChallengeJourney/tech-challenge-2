import { Box } from "@mui/material";
import { BytebankButton, BytebankModal, BytebankText } from "@repo/ui";

export interface DeleteCardModalProps {
  open: boolean;
  onClose: () => void;
  cardId: string | null;
  onConfirm: (cardId: string) => void;
}

export const DeleteCardModal = ({
  open,
  onClose,
  onConfirm,
  cardId,
}: DeleteCardModalProps) => {
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
          Tem certeza que deseja excluir este cartão?
        </BytebankText>
        <Box style={{ display: "flex", gap: 8 }}>
          <BytebankButton
            label="Sim"
            color="error"
            variant="contained"
            onClick={() => {
              if (cardId) onConfirm(cardId);
            }}
          />
          <BytebankButton
            label="Não"
            color="secondary"
            variant="outlined"
            onClick={onClose}
          />
        </Box>
      </Box>
    </BytebankModal>
  );
};
