import { BytebankButton, BytebankIllustration, BytebankText } from "@repo/ui";
import { Box } from "@mui/material";
// import { useRouter } from "next/navigation";

export default function NotFound() {
  // const router = useRouter();
  const handleRedirect = () => console.log("Redirecting to home page");

  console.log("NotFound page loaded");

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        flexWrap={"wrap"}
        gap={2}
        height="100vh"
      >
        <BytebankIllustration variant="lg" name={"not-found"} />

        <BytebankText variant="lg"> Página não encontrada! </BytebankText>
        <BytebankText variant="sm">
          Desculpe! Não encontramos o que você está procurando. Que tal voltar
          para a nossa página inicial ou explorar outras áreas do seu dashboard?
        </BytebankText>
        <Box marginTop={4}>
          <BytebankButton
            label="Voltar ao início"
            variant={"contained"}
            color={"primary"}
            sendSubmit={() => handleRedirect()}
          />
        </Box>
      </Box>
    </>
  );
}
