import React from "react";
import { Box } from "@mui/material";
import { BytebankCardSection } from "./card-section";

export const BytebankCardsPage: React.FC = () => {
  return (
    <Box ml={{ xs: "15px", md: "30px" }}>
      <BytebankCardSection />
    </Box>
  );
};
