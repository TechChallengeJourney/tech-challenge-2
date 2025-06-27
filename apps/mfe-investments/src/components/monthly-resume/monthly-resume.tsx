import { Box } from "@mui/material";
import { BytebankCard, BytebankText } from "@repo/ui";
import { useTheme } from "@repo/utils";
import Chart from "react-apexcharts";

const series = [
  {
    name: "Receitas",
    data: [30, 60, 15, 60, 15, 60, 30],
  },
  {
    name: "Despesas",
    data: [15, 30, 30, 30, 30, 30, 30],
  },
];

interface BytebankMonthlyResumeProps {
  data?: any;
}


export  function BytebankMonthlyResume({
  data,
}: BytebankMonthlyResumeProps) {
  const { colors } = useTheme();

const options: ApexCharts.ApexOptions = {
  chart: {
    type: "bar",
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "85%",
      borderRadius: 6,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: [colors["lime.500"], colors["lime.900"]],
  },
  xaxis: {
    categories: ["Group", "Group", "Group", "Group", "Group", "Group", "Group"],
    labels: {
    show: true,
    style: {
      fontSize: "12px",
      colors: colors["lime.contrast"]
    },
  },
  axisTicks: {
    show: true,
    color: colors["grey.500"],
  },
  },
  yaxis: {
    max: 100,
    min: 0,
    tickAmount: 5,
    labels: {
      style: {
        colors: colors["lime.contrast"]
      }
    }
  },
  fill: {
    opacity: 1,
    colors: [colors["lime.500"], colors["lime.900"]],
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
    markers: {
      fillColors: [colors["lime.500"], colors["lime.900"]],
      strokeWidth: 0
    },
  },
  tooltip: {
  theme: "dark",

  style: {
    fontSize: "14px",
    fontFamily: "Roboto, sans-serif",
  },

  y: {
    formatter: function (val) {
      return val + "%";
    },
    title: {
      formatter: (seriesName) => seriesName + ":",
    },
  },
},
  grid: {
    borderColor: colors["grey.200"]
  },
  responsive: [
    {
      breakpoint: 600, // abaixo de 600px (celular)
      options: {
        plotOptions: {
          bar: {
            columnWidth: "70%", // barras um pouco mais largas para celular
          }
        },
        xaxis: {
          labels: {
            style: { fontSize: '10px' }
          }
        },
        legend: {
          position: 'bottom',
          fontSize: '12px',
        },
      }
    }
  ],
};




  return (
    <BytebankCard>
    <Box padding="1.25rem" width="100%">
      <BytebankText variant="lg" fontWeight="bold">
        Resumo Financeiro Mensal
      </BytebankText>
      <Box marginTop="1rem" width="100%">
        <Chart options={options} series={series} type="bar" width="100%" height={300} />
      </Box>
    </Box>
    </BytebankCard>
  );
}
