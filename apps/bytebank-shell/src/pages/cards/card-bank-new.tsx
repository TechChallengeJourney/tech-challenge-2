import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BytebankText, BytebankCard } from "@repo/ui";

export const BytebankNewCardBank = () => {
  return (
    <BytebankCard variant="outlined">
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        maxWidth={{ xs: "98vw", md: "100%"}}
        maxHeight={{ xs: "100%", md: "100%" }}
        height={{ xs: "100%", md: "330px" }}
        p="95px"
        textAlign="center"
      >
        <IconButton
          sx={{
            border: "1px solid",
            color: "primary.main",
            borderRadius: "50%",
            width: 48,
            height: 48,
            mb: 2,
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>

        <BytebankText variant="sm" fontWeight="bold" align="center">
          Criar novo cartão
        </BytebankText>

        <BytebankText variant="sm" color="secondary" align="center" style={{ whiteSpace: "pre-line"}}>
         {` Adicione um novo cartão \nde crédito a sua conta`}
        </BytebankText>
      </Box>
    </BytebankCard>
  );
};
