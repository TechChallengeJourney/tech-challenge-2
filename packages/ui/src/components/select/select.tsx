import {
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps,
} from "@mui/material";
import "./style.scss";
import { StyledSelect } from "./styled-select";
import { useTheme } from "@repo/utils";

export interface SelectOption {
  label: string;
  value: string;
}

declare module "@mui/material/Select" {
  interface SelectPropsColorOverrides {
    tertiary: true;
    black: true;
    white: true;
  }
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
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "black"
    | "white";
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
  const { colors: palette } = useTheme();

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
