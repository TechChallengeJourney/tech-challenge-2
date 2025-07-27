import { Box } from "@mui/material";
import { BytebankButton, BytebankSnackbar, SnackbarData } from "@repo/ui";
import { useDeleteCard, useBlockCard } from "@repo/data-access";
import { useState } from "react";

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

  const { handleDelete, loading: loadingDelete } = useDeleteCard();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);

  const blockButtonLabel = getBlockButtonLabel(blocked, loadingBlock);

  const showSnackbar = (data: SnackbarData) => {
    setSnackbarData(data);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const handleBlockCard = async () => {
    try {
      const success = await handleBlock(cardId);
      if (success) {
        showSnackbar({
          message: blocked
            ? "Cartão desbloqueado com sucesso!"
            : "Cartão bloqueado com sucesso!",
          status: "success",
        });
        if (onCardUpdate)
          setTimeout(() => {
            onCardUpdate?.();
          }, 1000);
      } else {
        showSnackbar({
          message: "Não foi possível alterar o estado do cartão.",
          status: "error",
        });
      }
    } catch (error) {
      showSnackbar({
        message: "Erro ao bloquear/desbloquear o cartão.",
        status: "error",
      });
    }
  };

  const handleDeleteCard = async () => {
    try {
      const success = await handleDelete(cardId);
      if (success) {
        showSnackbar({
          message: "Cartão excluído com sucesso!",
          status: "success",
        });
        if (onCardUpdate)
          setTimeout(() => {
            onCardUpdate?.();
          }, 1000);
      } else {
        showSnackbar({
          message: "Não foi possível excluir o cartão.",
          status: "error",
        });
      }
    } catch (error) {
      showSnackbar({
        message: "Erro ao excluir o cartão.",
        status: "error",
      });
    }
  };

  return (
    <Box
      mt={{ xs: 3, md: 3 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box width="100%">
        <BytebankSnackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          data={snackbarData}
        />
        <BytebankButton
          fullWidth
          variant="contained"
          color="primary"
          label={blockButtonLabel}
          disabled={loadingBlock}
          onClick={handleBlockCard}
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
