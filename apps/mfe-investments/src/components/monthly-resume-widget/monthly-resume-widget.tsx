import { Box, Skeleton } from "@mui/material";
import { useFinancialData, WidgetKey } from "@repo/data-access";
import { BytebankCard, BytebankIllustration, BytebankText } from "@repo/ui";
import { formatCurrencyBRL, useTheme } from "@repo/utils";
import { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { fetchWidgetData } from "../../services/widgets";

function getDatesOfCurrentMonthUntilToday(): string[] {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const today = now.getDate();
  const dates: string[] = [];

  for (let day = 1; day <= today; day++) {
    dates.push(`${day.toString().padStart(2, "0")}/${month}`);
  }
  return dates;
}

interface BytebankMonthlyResumeProps {
  name?: string;
  data?: any;
}

interface BytebankMonthlyResumeResponse {
  minValue: number;
  maxValue: number;
  monthDates: string[];
  data: BytebankMonthlyResumeProps[];
}

export function BytebankMonthlyResumeWidget({ userId }: { userId: string }) {
  const hasFetchedOnce = useRef(false)
  const [isLoading, setLoading] = useState(true);
  const [widgetData, setWidgetData] = useState<BytebankMonthlyResumeResponse>();
  
  const { extract } = useFinancialData();
  const { colors, isDarkMode } = useTheme();

  let options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "100%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 2,
      colors: [colors["lime.500"], colors["lime.900"]],
    },
    fill: {
      opacity: 1,
      colors: [colors["lime.500"], colors["lime.900"]],
    },
    xaxis: {
      categories: getDatesOfCurrentMonthUntilToday(),
      labels: {
        show: true,
        style: {
          fontSize: "12.5px",
          colors: colors["lime.contrast"],
        },
      },
      axisTicks: {
        show: true,
        color: colors["grey.800"],
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          colors: colors["lime.contrast"],
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      markers: {
        fillColors: [colors["lime.500"], colors["lime.900"]],
        strokeWidth: 0,
      },
      labels: {
        colors: colors["lime.contrast"],
      }
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      style: {
        fontSize: "15px",
        fontFamily: "Roboto, sans-serif",
      },
      y: {
        formatter: (value: number) => formatCurrencyBRL(value),
        title: {
          formatter: (seriesName) => seriesName + ":",
        },
      },
    },
    grid: {
      borderColor: isDarkMode ? colors["grey.800"] : colors["grey.200"],
    },
    responsive: [
      {
        breakpoint: 900,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "80%",
            }
          },
          xaxis: {
            labels: {
              style: { fontSize: "10px" },
            },
          },
          legend: {
            position: 'top',
            fontSize: '13px',
            color: colors["lime.contrast"],
          },
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      // só ativa loading se for a primeira vez da montagem do componente
      if (!hasFetchedOnce.current) {
        setLoading(true);
      }

      try {
        const data = await fetchWidgetData<BytebankMonthlyResumeResponse>(
          WidgetKey.MonthlySummary,
          userId
        );

        if (options.yaxis && !Array.isArray(options.yaxis)) {
          options.yaxis.max = data?.maxValue || 0;
          options.yaxis.min = data?.minValue || 0;
        }

        setWidgetData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do widget:", error);
      } finally {
        if (!hasFetchedOnce.current) {
          setLoading(false); // finaliza o loading inicial
          hasFetchedOnce.current = true;
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
        <Skeleton variant={"rectangular"} width={"100%"} height={60} />
        <Skeleton variant={"rectangular"} width={"100%"} height={60} />
        <Skeleton variant={"rectangular"} width={"100%"} height={60} />
      </Box>
    ) : null;

  return (
    <BytebankCard>
      <Box padding={4} width="100%">
        <BytebankText variant="md" fontWeight="bold">
          Resumo Financeiro Mensal
        </BytebankText>
        {renderLoading()}
        {widgetData && !isLoading ? (
          <>
            <Box marginTop={2} width="100%">
              <Chart
                options={options}
                series={widgetData.data as ApexAxisChartSeries}
                type="bar"
                width="100%"
                minheight={400}
              />
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={4}
            py={4}
          >
            <BytebankIllustration
              name={"no-dashboard"}
              variant={"lg"}
            ></BytebankIllustration>
            <BytebankText
              variant="sm"
              color="textSecondary"
              textAlign={"center"}
            >
              <Box display={"flex"} justifyContent={"center"}>
                Não podemos exibir os dados do resumo financeiro. <br />
                Tente criar uma nova transação ou recarregar a página.
              </Box>
            </BytebankText>
          </Box>
        )}
      </Box>
    </BytebankCard>
  );
}
