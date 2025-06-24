import { Box, styled } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useTheme } from "@repo/utils";
import "./style.scss";

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    tertiary: true;
    black: true;
    white: true;
  }
}

export type BytebankInputProps = TextFieldProps & {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  autoComplete?: string;
  mask?: "currency";
  /**
   * As cores do input
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
  const { colors: palette } = useTheme();

  const StyledInput = styled(TextField)<BytebankInputProps>(() => ({
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        color: palette["lime.800"],
      },
      "& fieldset": {
        borderColor: palette["lime.700"],
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: palette["lime.800"] + " !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: palette["lime.700"],
      },
    },
    "& .MuiInputLabel-root": {
      color: palette["lime.900"],
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: palette["lime.800"] + " !important",
    },
    "& .MuiFormHelperText-root": {
      color: error ? palette["red.700"] : palette["lime.800"],
    },
    "&.Mui-focused fieldset": {
      borderColor: palette["lime.800"] + " !important", // <-- Força a borda no foco!
    },
    "&.Mui-disabled": {
      color: "#3E3E3E",
      backgroundColor: "#A7A7A7",
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (e.target as HTMLInputElement).value.replace(/\D/g, "");

    if (mask === "currency") {
      newValue = newValue.replace(/^0+/, "");

      const event = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      };
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    } else {
      onChange(e);
    }
  };
  return (
    <Box className="bytebank-input">
      <StyledInput
        {...props}
        value={
          mask === "currency" && typeof value === "string"
            ? formatCurrency(value)
            : value
        }
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
      />
    </Box>
  );
}
