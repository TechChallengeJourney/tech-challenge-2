import { Box, Skeleton } from "@mui/material";
import {
  BytebankCard,
  BytebankText,
  BytebankButton,
  BytebankLinearProgress,
  BytebankIllustration,
} from "@repo/ui";
import { formatCurrencyBRL, useTheme } from "@repo/utils";
import { fetchWidgetData } from "../../services/widgets";
import { useEffect, useState } from "react";
import { useUser, WidgetKey } from "@repo/data-access";

interface WidgetAnalyticsProps {
  status: "positivo" | "negativo";
  description: string;
}

export function BytebankFinancialStatus() {
  const {colors} = useTheme();
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
            WidgetKey.FinancialStatus,
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
        <Skeleton variant="rounded" width={"60"} height={60} />
      </Box>
    ) : null;

  return (
    <BytebankCard>
      <Box padding="1.25rem">
        <BytebankText variant="sm">
          Status financeiro
        </BytebankText>
        {renderLoading()}
        {widgetData && !isLoading ? (
          <>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
              <Box display="flex" justifyContent="space-between" marginTop={2} gap={2} flexDirection={'column'}>
                <BytebankText variant="lg" fontWeight="bold" color={widgetData.status === "positivo" ? colors["lime.700"] : colors["grey.900"]}>
                  {widgetData.status.toUpperCase()}
                </BytebankText>
                <BytebankText variant="sm">
                  {widgetData.description}
                </BytebankText>
              </Box>
              <BytebankIllustration name={"status"} type={"gif"} width="140px" height="140px"></BytebankIllustration>
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
            <BytebankText variant="sm" color="textSecondary" textAlign={"center"}>
              Não foi possível carregar os dados. <br />Tente
              criar uma nova transação ou recarregar a página.
            </BytebankText>
          </Box>
        )}
      </Box>
    </BytebankCard>
  );
}
