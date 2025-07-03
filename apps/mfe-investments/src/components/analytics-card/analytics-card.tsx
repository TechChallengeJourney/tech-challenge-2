import { Box } from "@mui/material";
import {
  BytebankCard,
  BytebankText,
  BytebankButton,
  BytebankLinearProgress,
} from "@repo/ui";
import { formatCurrencyBRL } from "@repo/utils";


export function BytebankAnalytics() {
  const category = "Lazer";

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
            {formatCurrencyBRL(120)}
          </BytebankText>
        </Box>
        <BytebankLinearProgress value={75} />
        <Box display="flex" justifyContent="space-between" marginTop="2rem">
          <BytebankText variant="md" fontWeight="bold">
            Despesas do mês
          </BytebankText>
          <BytebankText variant="md" fontWeight="bold">
            {formatCurrencyBRL(40)}
          </BytebankText>
        </Box>
        <BytebankLinearProgress variant="secondary" value={55} />
        <Box marginY="2rem">
          <BytebankText variant="sm">
            Neste mês, suas receitas superaram as despesas, resultando em um
            saldo positivo. Recomendamos revisar seus gastos com{" "}
            <span style={{ fontWeight: "600" }}>{`${category}`}</span>, que
            representaram{" "}
            <span style={{ fontWeight: "600" }}>{`${55}`}%</span> das
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
