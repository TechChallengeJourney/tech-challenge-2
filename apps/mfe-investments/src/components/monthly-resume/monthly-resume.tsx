import { Box } from "@mui/material";
import { BytebankCard, BytebankText } from "@repo/ui";
import { useTheme } from "@repo/utils";
import Chart from "react-apexcharts";


// Cores do gráfico
const RECEITA_COLOR = "#D1EA3C"; // verde-limão claro
const DESPESA_COLOR = "#333333"; // preto/cinza escuro

// const options: ApexCharts.ApexOptions = {
//   chart: {
//     type: "bar",
//     height: 350,
//     toolbar: { show: false },
//   },
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       columnWidth: "85%",
//       borderRadius: 6,
//     },
//   },
//   dataLabels: {
//     enabled: false, // para não mostrar os valores nas barras
//   },
//   stroke: {
//     show: true,
//     width: 2,
//     colors: ["transparent"],
//   },
//   xaxis: {
//     categories: ["Group", "Group", "Group", "Group", "Group", "Group", "Group"],
//     labels: {
//     show: true,
//     // position: "bottom", // isso já é o padrão
//     style: {
//       fontSize: "12px",
//       colors: "#333",
//     },
//   },
//   axisBorder: {
//     show: false,
//     color: "#ccc",
//   },
//   axisTicks: {
//     show: true,
//     color: "#ccc",
//   },
//   },
//   yaxis: {
//     max: 100,
//     min: 0,
//     tickAmount: 5,
//   },
//   fill: {
//     opacity: 1,
//     colors: [RECEITA_COLOR, DESPESA_COLOR],
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "center",
//     markers: {
//       fillColors: [RECEITA_COLOR, DESPESA_COLOR],
//     },
//   },
//   colors: [RECEITA_COLOR, DESPESA_COLOR],
//   tooltip: {
//     y: {
//       formatter: function (val) {
//         return val + '%';
//       },
//     },
//   },
//   responsive: [
//     {
//       breakpoint: 480,
//       options: {
//         chart: { width: 300 },
//         legend: { position: "bottom" },
//       },
//     },
//   ],
// };

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


export default function MfeBytebankMonthlyResume({
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
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: "bottom" },
      },
    },
  ],
};




  return (
    <BytebankCard>
      <Box padding='1.25rem'>
        <BytebankText fontSize='1.5rem' fontWeight='bold'>Resumo Financeiro Mensal</BytebankText>
        <Box marginTop="1rem">
          <Chart options={options} series={series} type="bar" width="100%" />
        </Box>
      </Box>
    </BytebankCard>
  );
}
