import React from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export interface BytebankNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  size?: "inherit" | "large" | "medium" | "small"; 
}

export const BytebankNavigation: React.FC<BytebankNavigationProps> = ({
  onPrev,
  onNext,
  size = "small",
}) => {
  return (
    <Box display="flex" gap={1}>
      <IconButton onClick={onPrev} size="small">
        <ArrowBackIos fontSize={size} />
      </IconButton>
      <IconButton onClick={onNext} size="small">
        <ArrowForwardIos fontSize={size} />
      </IconButton>
    </Box>
  );
};