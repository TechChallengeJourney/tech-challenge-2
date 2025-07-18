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
      <Box padding={4}>
        <BytebankText variant="md" fontWeight="bold">
          Análise Financeira
        </BytebankText>
        {renderLoading()}
        {widgetData && !isLoading ? (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              marginTop={2}
            >
              <BytebankText variant="sm" fontWeight="bold">
                Receitas do mês
              </BytebankText>
              <BytebankText variant="sm" fontWeight="bold">
                {formatCurrencyBRL(widgetData.income)}
              </BytebankText>
            </Box>
            <BytebankLinearProgress value={widgetData.income > 0
                  ? (widgetData.income /
                      (widgetData.income + widgetData.expense)) *
                    100
                  : 0} />
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <BytebankText variant="sm" fontWeight="bold">
                Despesas do mês
              </BytebankText>
              <BytebankText variant="sm" fontWeight="bold">
                {formatCurrencyBRL(widgetData.expense)}
              </BytebankText>
            </Box>
            <BytebankLinearProgress
              variant="secondary"
              value={widgetData.category.percentage}
            />
            <Box mt={2}>
              <BytebankText variant="sm">
                Neste mês, suas receitas superaram as despesas, resultando em um
                saldo positivo. Recomendamos revisar seus gastos com{" "}
                <span
                  style={{ fontWeight: "600" }}
                >{`${widgetData.category.name}`}</span>
                , que representaram{" "}
                <span style={{ fontWeight: "600" }}>
                  {`${widgetData.category.percentage}`}%
                </span>das suas despesas.
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
