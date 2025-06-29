import {
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps,
  Select,
} from "@mui/material";
import { useId } from "react";

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
  const reactId = useId();
  const selectId = `select-${reactId}`;

  return (
    <FormControl variant="outlined" fullWidth margin="normal" error={error}>
      <InputLabel id={`${selectId}-label`} htmlFor={selectId}>
        {label}
      </InputLabel>
      <Select
        id={selectId}
        labelId={`${selectId}-label`}
        value={value ?? ""}
        onChange={(e: any) => onChange(e.target.value)}
        label={label}
        color={color}
        aria-describedby={helperText ? `${selectId}-helper` : undefined}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText id={`${selectId}-helper`}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
