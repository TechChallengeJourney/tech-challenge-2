import React from "react";
import { Box } from "@mui/material";
import { BytebankNavigation } from "@repo/ui";

interface CardNavigationProps {
    onPrev: () => void;
    onNext: () => void;
}

export const CardNavigation: React.FC<CardNavigationProps> = ({ onPrev, onNext }) => (
  <Box
    display="flex"
    mb={{ xs: 2, md: 1 }}
    mt={2}
    justifyContent={{ xs: "center", md: "flex-end" }}
  >
    <BytebankNavigation onPrev={onPrev} onNext={onNext} />
  </Box>
);
