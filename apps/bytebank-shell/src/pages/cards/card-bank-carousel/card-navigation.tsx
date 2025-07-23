import React from "react";
import { Box } from "@mui/material";
import { BytebankNavigation } from "@repo/ui";

interface CardNavigationProps {
    onPrev: () => void;
    onNext: () => void;
    cards: any;
}

export const CardNavigation: React.FC<CardNavigationProps> = ({ onPrev, onNext, cards}) => {

  const hasCard = cards.length === 1

  return(
  <Box
    display="flex"
    mb={{ xs: 2, md: 1 }}
    mt={2}
    justifyContent={{ xs: "center", md: "flex-end" }}
  >
    <BytebankNavigation onPrev={onPrev} onNext={onNext} disabled={hasCard} />
  </Box>
)};
