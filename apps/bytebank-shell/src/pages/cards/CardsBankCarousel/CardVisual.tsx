import React from "react";
import { Box } from "@mui/material";
import { BytebankCardBank } from "@repo/ui";

export const CardVisual: React.FC<{ card: any }> = ({ card }) => (
  <Box>
    <BytebankCardBank variant="Físico" details={card} />
  </Box>
);