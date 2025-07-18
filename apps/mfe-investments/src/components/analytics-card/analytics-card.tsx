import { Box, Skeleton } from "@mui/material";
import {
  BytebankCard,
  BytebankText,
  BytebankButton,
  BytebankLinearProgress,
  BytebankIllustration,
} from "@repo/ui";
import { formatCurrencyBRL } from "@repo/utils";
import { fetchWidgetData } from "../../services/widgets";
import { useEffect, useState } from "react";
import { useUser, WidgetKey } from "@repo/data-access";

interface WidgetAnalyticsProps {
  income: number;
  expense: number;
  category: { name: string; percentage: number };
}

export function BytebankAnalytics() {
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();
  const [widgetData, setWidgetData] = useState<WidgetAnalyticsProps | null>(
    null
  );
  const userId = user?._id ?? "";

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setLoading(true);
        try {
          const data = await fetchWidgetData<WidgetAnalyticsProps>(
            WidgetKey.FinancialAnalysis,
            userId
          );
          setWidgetData(data);
        } catch (error) {
          console.error("Erro ao buscar dados do widget:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [userId]);

  const renderLoading = () =>
    isLoading ? (
      <Box
        display={"flex"}
        justifyContent="center"
        flexDirection={"column"}
        py={2}
        gap={2}
      >
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" width={"100%"} height={60} />
        <Skeleton variant="rectangular" width={"100%"} height={60} />
      </Box>
    ) : null;

  return (
    <BytebankCard>
      <Box padding="1.25rem">
        <BytebankText variant="lg" fontWeight="bold">
          Análise Financeira
        </BytebankText>
        {renderLoading()}
        {widgetData && !isLoading ? (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              marginTop="2.25rem"
            >
              <BytebankText variant="md" fontWeight="bold">
                Receitas do mês
              </BytebankText>
              <BytebankText variant="md" fontWeight="bold">
                {formatCurrencyBRL(widgetData.income)}
              </BytebankText>
            </Box>
            <BytebankLinearProgress value={75} />
            <Box display="flex" justifyContent="space-between" marginTop="2rem">
              <BytebankText variant="md" fontWeight="bold">
                Despesas do mês
              </BytebankText>
              <BytebankText variant="md" fontWeight="bold">
                {formatCurrencyBRL(widgetData.expense)}
              </BytebankText>
            </Box>
            <BytebankLinearProgress
              variant="secondary"
              value={
                widgetData.expense > 0
                  ? (widgetData.expense /
                      (widgetData.income + widgetData.expense)) *
                    100
                  : 0
              }
            />
            <Box marginY="2rem">
              <BytebankText variant="sm">
                Neste mês, suas receitas superaram as despesas, resultando em um
                saldo positivo. Recomendamos revisar seus gastos com{" "}
                <span
                  style={{ fontWeight: "600" }}
                >{`${widgetData.category.name}`}</span>
                , que representaram{" "}
                <span style={{ fontWeight: "600" }}>
                  {`${widgetData.category.percentage.toFixed(2)}`}%
                </span>{" "}
                das suas despesas. Considere aumentar seus aportes em
                Investimentos para otimizar seus rendimentos futuros.
              </BytebankText>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
            py={4}
          >
            <BytebankIllustration name={"empty"} variant={"lg"}></BytebankIllustration>
            <BytebankText variant="sm" color="textSecondary">
              Não foi possível carregar os dados da análise financeira. <br />Tente
              criar uma nova transação ou recarregar a página.
            </BytebankText>
          </Box>
        )}
      </Box>
    </BytebankCard>
  );
}
