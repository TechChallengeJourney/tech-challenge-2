import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BytebankText, BytebankCard } from "@repo/ui";

export const BytebankNewCardBank = () => {
  return (
    <BytebankCard variant="outlined">
      <Box
        display="flex"
        gap={2}
        flexDirection="column"
        alignContent={"center"}
        alignItems="center"
        justifyContent="center"
        maxWidth={{ xs: "98vw", md: "100%" }}
        maxHeight={{ xs: "100%", md: "100%" }}
        p="30px"
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

        <BytebankText variant="xs" fontWeight="bold" align="justify">
          Criar novo cartão
        </BytebankText>

        <BytebankText variant="xs" color="secondary" style={{ whiteSpace: "pre-line"}}>
         {` Adicione um novo cartão de \ncrédito a sua conta`}
        </BytebankText>
      </Box>
    </BytebankCard>
  );
};
