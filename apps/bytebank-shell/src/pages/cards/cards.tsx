import React from "react";
import { Box } from "@mui/material";
import { BytebankCardSection } from "./card-section";

export const BytebankCardsPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        minHeight: { xs: "100vh", md: "auto" },
        minWidth: { xs: "100vw", md: "auto" },
        ml: { xs: 0, md: "30px" },
      }}
    >
      <BytebankCardSection />
    </Box>
  );
};