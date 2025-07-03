import { BytebankButton, BytebankIllustration, BytebankText } from "@repo/ui";
import { Box, useTheme, useMediaQuery } from "@mui/material";
// import { useRouter } from "next/navigation";

export default function NotFound() {
  // const router = useRouter();
  const handleRedirect = () => console.log("Redirecting to home page");

  console.log("NotFound page loaded");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      gap={2}
      minHeight="100vh"
      px={{ xs: 2, sm: 4, md: 6 }} // padding horizontal responsivo
      py={4} // padding vertical
      boxSizing="border-box"
      textAlign="center"
    >
      <Box width={{ xs: "80%", sm: "60%", md: "40%" }} maxWidth={400}>
        <BytebankIllustration variant="auto" name="not-found" />
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
          sendSubmit={handleRedirect}
        />
      </Box>
    </Box>
  );
}
