import React from "react";
import { Box } from "@mui/material";
import { BytebankCardBank } from "@repo/ui";

export const CardVisual: React.FC<{ card: any }> = ({ card }) => (
  <Box>
    <BytebankCardBank
      variant={card?.variant[0] || []}
      name={card?.name}
      cardNumber={card?.cardNumber}
      expirationDate={card?.expirationDate}
    />
  </Box>
);