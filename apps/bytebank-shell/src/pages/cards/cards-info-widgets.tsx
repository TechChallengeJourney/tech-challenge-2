import React from "react";
import { Box } from "@mui/material";
import { BytebankText, CardWidget } from "@repo/ui";
import { CreditCard } from "@mui/icons-material";

const cardsData = [
  { title: "Total de Cartões", value: "4" },
  { title: "Limite total", value: "R$2.000,00" },
  { title: "Limite usado", value: "R$450,00" },
  { title: "Gasto mensal", value: "R$450,00" },
];

export const CardsInfoWidgets: React.FC = () => {
  return (
    <Box>
      <Box  display="flex" justifyContent={{ xs: "center", md: "flex-start" }}>
        <BytebankText variant="lg" fontWeight="bold">
          Meus Cartões
        </BytebankText>
      </Box>
      <Box
        display="flex"
        gap={{ xs: 2, md: 5 }}
        flexDirection={{ xs: "column", md: "row" }}
        mt={2}
      >
        {cardsData.map(({ title, value }, index) => (
          <CardWidget
            key={index}
            title={title}
            value={value}
            icon={<CreditCard />}
          />
        ))}
      </Box>
    </Box>
  );
};
