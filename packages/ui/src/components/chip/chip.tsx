import { JSX } from "react";
import { Chip, Tooltip } from "@mui/material";
import { useTheme } from "@repo/utils";

export interface BytebankChipProps {
  label: string;
  onClick?: () => void;
}

export function BytebankChip({
  label,
  onClick,
}: BytebankChipProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <Chip
      sx={{
        bgcolor: colors["lime.100"],
        "&:hover": {
          color: colors["lime.800"],
          bgcolor: colors["lime.300"],
          cursor: "pointer",
        },
      }}
      label={label}
      onClick={onClick}
    />
  );
}
