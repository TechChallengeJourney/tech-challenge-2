import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  BytebankText,
  BytebankCard,
  BytebankSnackbar,
  SnackbarData,
} from "@repo/ui";
import { useState } from "react";
import { BytebankCreateCardModal } from "../../modals/create-card/create-modal";

interface BytebankNewCardBankProps {
  refetchCards: () => Promise<void>;
}

export const BytebankNewCardBank = ({
  refetchCards,
}: BytebankNewCardBankProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [open, setOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const handleCreateCard = () => {
    setOpen(true);
  };

  return (
    <BytebankCard variant="outlined">
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        maxWidth={{ xs: "98vw", md: "100%" }}
        maxHeight={{ xs: "100%", md: "100%" }}
        height={{ xs: "100%", md: "330px" }}
        p={{xs:"60px" ,md: "95px"}}
        textAlign="center"
      >
        <IconButton
          onClick={handleCreateCard}
          sx={{
            border: "1px solid",
            color: "primary.main",
            borderRadius: "50%",
            width: 48,
            height: 48,
            mb: 2,
          }}
          aria-label="Criar um novo cartão"
        >
          <AddIcon fontSize="large" />
        </IconButton>

        <BytebankSnackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          data={snackbarData}
        />

        <BytebankCreateCardModal
          openModal={() => null}
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={(res) => {
            setSnackbarData({
              status: res.status,
              message:
                res.message ??
                (res.status === "success"
                  ? "Cartão criado com sucesso!"
                  : "Erro ao criar cartão"),
            });
            setSnackbarOpen(true);
            refetchCards();
          }}
        />

        <BytebankText variant="sm" fontWeight="bold" align="center">
          Criar novo cartão
        </BytebankText>

        <BytebankText
          variant="sm"
          color="secondary"
          align="center"
          style={{ whiteSpace: "pre-line" }}
        >
          {` Adicione um novo cartão \nde crédito a sua conta`}
        </BytebankText>
      </Box>
    </BytebankCard>
  );
};
