import React from "react";
import { Box, IconButton } from "@mui/material";
import {
  ArrowCircleLeftRounded,
  ArrowCircleRightRounded,
} from "@mui/icons-material";

export interface BytebankNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  size?: "inherit" | "large" | "medium" | "small";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
}

export const BytebankNavigation: React.FC<BytebankNavigationProps> = ({
  onPrev,
  onNext,
  size = "large",
  color = "primary"
}) => {
  return (
    <Box display="flex" gap={1}>
      <IconButton onClick={onPrev} size="small">
        <ArrowCircleLeftRounded fontSize={size} color={color} />
      </IconButton>
      <IconButton onClick={onNext} size="small">
        <ArrowCircleRightRounded fontSize={size} color={color} />
      </IconButton>
    </Box>
  );
};
