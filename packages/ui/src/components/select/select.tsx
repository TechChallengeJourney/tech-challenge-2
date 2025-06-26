import {
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps,
} from "@mui/material";
import "./style.scss";
import { useTheme } from "@repo/utils";
import { StyledSelect } from "./styled-select";

export interface SelectOption {
  label: string;
  value: string;
}

export type BytebankSelectProps = SelectProps & {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: SelectOption[];
  error?: boolean;
  helperText?: string;
  /**
   * As cores do select
   */
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
};

export function BytebankSelect({
  value,
  onChange,
  label,
  options,
  error = false,
  helperText = "",
  color,
}: BytebankSelectProps) {
  const { colors } = useTheme();
  const palette = colors;

  return (
    <FormControl variant="outlined" fullWidth margin="normal" error={error}>
      <InputLabel>{label}</InputLabel>
      <StyledSelect
        value={value ?? ""}
        onChange={(e: any) => onChange(e.target.value)}
        label={label}
        color={color}
        palette={palette}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
