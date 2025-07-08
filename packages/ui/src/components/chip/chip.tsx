import { JSX } from "react";
import { Chip } from "@mui/material";
import { useTheme } from "@repo/utils";

export interface BytebankChipProps {
  label: string;
  onClick?: () => void;
}

export function BytebankChip({ label, onClick }: BytebankChipProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <Chip
      sx={{
        bgcolor: colors["lime.100"], // cor de fundo normal
        "&:hover": {
          color: colors["lime.800"],
          bgcolor: colors["lime.300"], // cor de fundo no hover
          cursor: "pointer", // opcional: mostra que é clicável
        },
      }}
      label={label}
      onClick={onClick}
      // deleteIcon={<DoneIcon />}
    />
  );
}
