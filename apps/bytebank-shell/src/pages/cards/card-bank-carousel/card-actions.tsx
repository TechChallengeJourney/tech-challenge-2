import { Box, Alert } from "@mui/material";
import { BytebankButton } from "@repo/ui";
import { useDeleteCard, useBlockCard } from "@repo/data-access";

interface CardActionsProps {
  cardId: string;
  isBlocked: boolean;
  onCardUpdate?: () => void;
}

function getBlockButtonLabel(isBlocked: boolean, loading: boolean) {
  if (loading) {
    return isBlocked ? "Desbloqueando..." : "Bloqueando...";
  }
  return isBlocked ? "Desbloquear cartão" : "Bloquear cartão";
}

export const CardActions = ({
  cardId,
  isBlocked,
  onCardUpdate,
}: CardActionsProps) => {
  const {
    handleBlock,
    loading: loadingBlock,
    blocked,
  } = useBlockCard(isBlocked);
  const { handleDelete, loading: loadingDelete, error } = useDeleteCard();

  const blockButtonLabel = getBlockButtonLabel(blocked, loadingBlock);

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
        {error && (
          <Box mt={2} width="100%">
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <BytebankButton
          fullWidth
          variant="contained"
          color="primary"
          label={blockButtonLabel}
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
        {error && (
          <Box mt={2} width="100%">
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
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
