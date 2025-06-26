import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type CustomProps = {
  palette: Record<string, any>;
};

export const StyledInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "palette",
})<TextFieldProps & CustomProps>(({ palette, error }) => ({
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-input": {
      color: palette["grey.main"],
    },
    "& fieldset": {
      borderColor: palette["grey.main"],
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${palette["grey.main"]} !important`,
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
}));