import { Box, Skeleton } from '@mui/material';
import { BytebankCard, BytebankText } from '@repo/ui';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { formatCurrencyBRL } from '@repo/utils';
import { useUser, WidgetKey } from '@repo/data-access';
import { useState, useEffect, JSX } from 'react';
import { fetchWidgetData } from '../../services/widgets';
import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface BytebankGeneralWidgetCardProps {
  icon: JSX.Element;
  label: string;
  key: WidgetKey;
  category: string;
  value: number;
}

const widgets: Partial<BytebankGeneralWidgetCardProps>[] = [{
  icon: <TrendingUpIcon fontSize='large' />,
  label: 'Sua maior receita neste mês foi:',
  key: WidgetKey.HighestIncome
},
{
  icon: <TrendingDownIcon fontSize='large' />,
  label: 'Sua maior despesa neste mês foi:',
  key: WidgetKey.MostExpensiveCategory
},
{
  icon: <PaymentsIcon fontSize='large' />,
  label: 'Média de gastos diários:',
  key: WidgetKey.DailyAverage
}];

export function BytebankGeneralCardsWidget() {
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();
  const [widgetsData, setWidgetsData] = useState<Partial<BytebankGeneralWidgetCardProps>[]>([]);
  const userId = user?._id ?? "";

  useEffect(() => {
    const fetchAllWidgets = async () => {
      if (userId) {
        setLoading(true);
        try {
          const results = await Promise.all(
            [WidgetKey.HighestIncome, WidgetKey.MostExpensiveCategory, WidgetKey.DailyAverage].map(async (widgetType) => {
              const data = await fetchWidgetData<Partial<BytebankGeneralWidgetCardProps>>(widgetType, userId);
              const widgetSelected = widgets.find(widget => widget.key === widgetType);
              return widgetSelected ? { ...widgetSelected, ...data } : null;
            })
          );
          setWidgetsData(results.filter((item): item is Partial<BytebankGeneralWidgetCardProps> => item !== null));
        } catch (error) {
          console.error("Erro ao buscar dados do widget:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAllWidgets();
  }, [userId]);

  if (isLoading) return (
    <Box
      display={"flex"}
      justifyContent="center"
      flexDirection={"row"}
      py={2}
      gap={2}
    >
      <Skeleton variant={"rounded"} width={"140"} height={60} />
      <Skeleton variant="rounded" width={"140"} height={60} />
      <Skeleton variant="rounded" width={"140"} height={60} />
    </Box>
  );
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2} sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
      {widgetsData && widgetsData.length !== 0 ? (
        widgetsData.map(widget => (
          <BytebankCard key={widget.key}>
            <Box padding={2}>
              <Box display='flex' alignItems="center" gap={2}>
                {widget.icon}
                <BytebankText variant='sm' color='primary'>{widget.label}</BytebankText>
              </Box>
              {widget.category ? (
                <>
                  <BytebankText variant='md' fontWeight='bold'>{widget.category}</BytebankText>
                  <BytebankText variant='sm'>Valor: <span style={{ fontWeight: "700" }}>{formatCurrencyBRL(widget?.value ?? 0)}</span></BytebankText>
                </>
              ) : <BytebankText variant='lg' fontWeight='bold'>{formatCurrencyBRL(widget?.value ?? 0)}</BytebankText>}
            </Box>
          </BytebankCard>
        ))
      ) : null}

    </Box>
  );
}
