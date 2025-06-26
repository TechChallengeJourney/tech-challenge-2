import { Box } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { useTheme } from "@repo/utils";
import "./style.scss";
import { StyledInput } from "./styled-input";

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    tertiary: true;
    black: true;
    white: true;
  }
}

export type BytebankInputProps = Omit<TextFieldProps, "onChange" | "value"> & {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  autoComplete?: string;
  mask?: "currency";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "black"
    | "white";
  variant?: "contained" | "text" | "outlined";
};

function formatCurrency(value: string) {
  const numeric = value.replace(/\D/g, "");
  const number = Number(numeric) / 100;
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function BytebankInput({
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  error = false,
  helperText = "",
  autoComplete = "",
  mask,
  color,
  ...props
}: BytebankInputProps) {
  const { colors } = useTheme();
  const palette = colors;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (mask === "currency") {
      newValue = newValue.replace(/\D/g, "");
      newValue = newValue.replace(/^0+/, ""); // Remove zeros à esquerda
    }

    onChange(newValue);
  };

  const displayValue =
    mask === "currency" && typeof value === "string"
      ? formatCurrency(value)
      : value || "";

  return (
    <Box className="bytebank-input">
      <StyledInput
        {...props}
        value={displayValue}
        onChange={handleChange}
        label={label}
        type={type}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        autoComplete={autoComplete}
        margin="normal"
        variant={"outlined"}
        fullWidth
        color={color}
        palette={palette}
      />
    </Box>
  );
}
