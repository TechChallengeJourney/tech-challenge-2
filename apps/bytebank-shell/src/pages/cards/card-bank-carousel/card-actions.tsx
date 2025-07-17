import { Box } from "@mui/material";
import { BytebankButton } from "@repo/ui";
import { useDeleteCard, useBlockCard } from "@repo/data-access";

interface CardActionsProps {
  cardId: string;
  onCardUpdate?: () => void;
}

export const CardActions = ({ cardId, onCardUpdate }: CardActionsProps) => {
  const {
    handleBlock,
    loading: loadingBlock,
    blocked: isBlocked,
  } = useBlockCard();
  const { handleDelete, loading: loadingDelete } = useDeleteCard();

  const handleBlockCard = async () => {
    const success = await handleBlock(cardId);
    if (success && onCardUpdate) onCardUpdate();
  };

  const handleSetAsPrimary = () => {
    alert("Marcado como principal");
  };

  const handleDeleteCard = async () => {
    const success = await handleDelete(cardId);
    if (success && onCardUpdate) onCardUpdate();
  };

  return (
    <Box
      mt={{ xs: 3, md: 3 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box width="100%">
        <BytebankButton
          fullWidth
          variant="contained"
          color="primary"
          label={
            loadingBlock
              ? isBlocked
                ? "Desbloqueando..."
                : "Bloqueando..."
              : isBlocked
                ? "Desbloquear cartão"
                : "Bloquear cartão"
          }
          disabled={loadingBlock}
          onClick={handleBlockCard}
        />
      </Box>

      <Box mt={2} width="100%">
        <BytebankButton
          fullWidth
          color="primary"
          variant="outlined"
          label="Marcar cartão como principal"
          onClick={handleSetAsPrimary}
        />
      </Box>

      <Box mt={2}>
        <BytebankButton
          label={loadingDelete ? "Excluindo..." : "Excluir cartão"}
          color="primary"
          variant="text"
          onClick={handleDeleteCard}
          disabled={loadingDelete}
          sx={{
            textDecoration: "underline",
            textTransform: "none",
            fontWeight: 500,
          }}
        />
      </Box>
    </Box>
  );
};
