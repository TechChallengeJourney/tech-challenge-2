import {
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps,
  styled,
  Select,
} from "@mui/material";
import "./style.scss";
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
  const { colors } = useTheme();
  const palette = colors;

  const StyledSelect = styled(Select)(({ error }: { error?: boolean }) => ({
    "&.MuiOutlinedInput-root": {
      "& .MuiSelect-select": {
        color: palette["grey.main"],
      },
      "& fieldset": {
        borderColor: palette["grey.main"], 
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: `${palette["grey.main"]} !important`, 
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: palette["grey.main"],
      },
    },
    "& .MuiInputLabel-root": {
      color: palette["grey.main"], 
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: `${palette["grey.main"]} !important`,
    },
    "& .MuiFormHelperText-root": {
      color: error ? palette["red.700"] : palette["grey.main"],
    },

    "& .MuiMenu-paper .MuiMenu-list .MuiMenuItem-root": {
      color: palette["grey.main"], 
    },
    "& .MuiMenu-paper .MuiMenu-list .MuiMenuItem-root.Mui-selected": {
      color: palette["grey.900"], 
    },
    "& .MuiMenu-paper .MuiMenu-list .MuiMenuItem-root:hover": {
      backgroundColor: palette["grey.200"], 
    },
  }));

  return (
    <FormControl variant="outlined" fullWidth margin="normal" error={error}>
      <InputLabel>{label}</InputLabel>
      <StyledSelect
        value={value ?? ""}
        onChange={(e: any) => onChange(e.target.value)}
        label={label}
        color={color}
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
