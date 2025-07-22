import React from "react";
import { Box } from "@mui/material";
import { BytebankText, CardWidget } from "@repo/ui";
import { CreditCard } from "@mui/icons-material";

export interface CardsInfoWidgetsProps {
  title?: string;
  icon?: React.ReactNode;
  value?: number | string;
  cards?: any[];
  loading?: boolean;
  error?: any;
  totalFormattedLimit?: string;
}

export const CardsInfoWidgets: React.FC<CardsInfoWidgetsProps> = ({ cards, totalFormattedLimit }) => {
  const totalCards = cards?.length || 0

  const cardsData = [
    { title: "Total de Cartões", value: totalCards },
    { title: "Limite total", value: totalFormattedLimit || "R$ 0,00" },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent={{xs: "center", md: "center", lg:"left"}}>
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
