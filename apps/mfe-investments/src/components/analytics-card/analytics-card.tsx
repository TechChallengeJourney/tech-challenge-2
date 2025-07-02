import { Box } from "@mui/material";
import {
  BytebankCard,
  BytebankText,
  BytebankButton,
  BytebankLinearProgress,
} from "@repo/ui";
import { useTheme } from "@repo/utils";
import { useUser } from "@repo/data-access";

interface BytebankMobilityProps {
  value?: string;
}

export function BytebankAnalytics({ value }: BytebankMobilityProps) {
  const { colors } = useTheme();
  const category = "Lazer";
  const percentage = "25%";
  const { isAuthenticated } = useUser();

  console.log(isAuthenticated);

  return (
    <BytebankCard>
      <Box padding="1.25rem">
        <BytebankText variant="lg" fontWeight="bold">
          Análise Financeira
        </BytebankText>
        <Box display="flex" justifyContent="space-between" marginTop="2.25rem">
          <BytebankText variant="md" fontWeight="bold">
            Receitas do mês
          </BytebankText>
          <BytebankText variant="md" fontWeight="bold">
            R$ 120,00
          </BytebankText>
        </Box>
        <BytebankLinearProgress value={50} />
        <Box display="flex" justifyContent="space-between" marginTop="2rem">
          <BytebankText variant="md" fontWeight="bold">
            Despesas do mês
          </BytebankText>
          <BytebankText variant="md" fontWeight="bold">
            R$ 40,00
          </BytebankText>
        </Box>
        <BytebankLinearProgress variant="secondary" value={50} />
        <Box marginY="2rem">
          <BytebankText variant="sm">
            Neste mês, suas receitas superaram as despesas, resultando em um
            saldo positivo. Recomendamos revisar seus gastos com{" "}
            <span style={{ fontWeight: "600" }}>{`${category}`}</span>, que
            representaram{" "}
            <span style={{ fontWeight: "600" }}>{`${percentage}`}</span> das
            suas despesas. Considere aumentar seus aportes em Investimentos para
            otimizar seus rendimentos futuros.
          </BytebankText>
        </Box>
        <BytebankButton
          onClick={() => console.log("teste")}
          label="Ver análise detalhada"
          variant={"contained"}
          color={"primary"}
        />
      </Box>
    </BytebankCard>
  );
}
