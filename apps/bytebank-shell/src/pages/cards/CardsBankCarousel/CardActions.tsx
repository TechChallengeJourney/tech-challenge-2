import { Box } from "@mui/material";
import { BytebankButton } from "@repo/ui";

export const CardActions = () => {
  const handleBlockCard = () => {
    alert("Bloquear cartão");
  };

  const handleSetAsPrimary = () => {
    alert("Marcar como principal");
  };

  const handleDeleteCard = () => {
    alert("Excluir cartão");
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
          label="Bloquear cartão"
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
          label="Excluir cartão"
          color="primary"
          variant="text"
          onClick={handleDeleteCard}
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
