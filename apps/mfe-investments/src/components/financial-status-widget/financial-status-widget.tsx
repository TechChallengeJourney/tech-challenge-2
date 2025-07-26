import { Box, Skeleton } from "@mui/material";
import {
  BytebankCard,
  BytebankText,
  BytebankIllustration,
} from "@repo/ui";
import { useTheme } from "@repo/utils";
import { fetchWidgetData } from "../../services/widgets";
import { useEffect, useState } from "react";
import { useFinancialData, WidgetKey } from "@repo/data-access";

interface WidgetAnalyticsProps {
  status: "positivo" | "negativo";
  description: string;
}

export function BytebankFinancialStatusWidget({ userId }: { userId: string }) {
  const { colors } = useTheme();
  const { extract } = useFinancialData();
  const [isLoading, setLoading] = useState(true);
  const [widgetData, setWidgetData] = useState<WidgetAnalyticsProps | null>(
    null
  );

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
  }, [userId, extract]);

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
              <Box display="flex" justifyContent="space-between" marginTop={2} gap={1} flexDirection={'column'}>
                <BytebankText variant={"h4"} fontWeight="bold" color={widgetData.status === "positivo" ? colors["lime.700"] : "error.light"}>
                  {widgetData.status.toUpperCase()}
                </BytebankText>
                <BytebankText variant="sm">
                  {widgetData.description}
                </BytebankText>
              </Box>
              <BytebankIllustration name={widgetData.status === "positivo" ? "status-positive" : "status-negative"} justifyContent={"end"} type={"gif"} width="140px" height="140px"></BytebankIllustration>
            </Box>
          </>
        ) : (
          <>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
              <Box display="flex" justifyContent="space-between" marginTop={2} gap={1} flexDirection={'column'}>
                <BytebankText variant={"h4"} fontWeight="bold" color={colors["lime.900"]}>
                  Pendente
                </BytebankText>
                <BytebankText variant="sm">
                  Adicione novas transações para ver o seu status financeiro.
                </BytebankText>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </BytebankCard>
  );
}
