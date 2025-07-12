import React from "react";
import { Box } from "@mui/material";
import { BytebankCardSection } from "./card-section";
import { CardsInfoWidgets } from "./cards-info-widgets";
import { BytebankBalanceCard } from "../../components/balance-card/balance-card";

export const BytebankCardsPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        minHeight: { xs: "100vh", md: "auto" },
        minWidth: { xs: "100vw", md: "auto" },
        ml: { xs: 0, md: "70px" },
      }}
    >
      <BytebankBalanceCard />
      <Box mb={{ xs: "37px", md: "77px" }} mt={{ xs: "37px", md: "77px" }}>
        <CardsInfoWidgets />
      </Box>
      <BytebankCardSection />
    </Box>
  );
};
