import { BytebankButton, BytebankIllustration, BytebankText } from "@repo/ui";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "@repo/data-access";

export default function NotFound() {
  const { user } = useUser();
  const isLogged = !!user;
  const navigate = useNavigate();
  const handleRedirect = () => navigate((isLogged ? '/dashboard' : '/'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      gap={2}
      minHeight="100vh"
      px={{ xs: '2', sm: '4', md: '6' }}
      p={4}
      boxSizing="border-box"
      textAlign="center"
    >
      <Box width={{ xs: "80%", sm: "60%", md: "40%" }} maxWidth={400}>
        <BytebankIllustration variant="auto" name="not-found.svg" alt="ilustração de duas folhas e uma lupa"/>
      </Box>

      <BytebankText variant="xxl" align="center">
        Página não encontrada!
      </BytebankText>

      <BytebankText
        variant="md"
        style={{ whiteSpace: "pre-line", marginTop: 8 }}
      >
        {`Desculpe! Não encontramos o que você está procurando.\nQue tal voltar para a nossa página inicial ou explorar outras áreas do seu dashboard?`}
      </BytebankText>

      <Box marginTop={4}>
        <BytebankButton
          label="Voltar ao início"
          variant="contained"
          color="primary"
          onClick={handleRedirect}
        />
      </Box>
    </Box>
  );
}
