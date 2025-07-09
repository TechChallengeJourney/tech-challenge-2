import React from "react";
import { Box } from "@mui/material";
import { BytebankCardSection } from "./card-section";

export const BytebankCardsPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      gap={2}
      minHeight="100vh"
      px={{ xs: "2", sm: "4", md: "6" }}
      p={4}
      boxSizing="border-box"
      textAlign="center"
    >
      <BytebankCardSection />
      Bytebank Cards Page - rota funcionando!
    </Box>
  );
};
