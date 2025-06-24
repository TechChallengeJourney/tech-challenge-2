import { styled, TextField } from "@mui/material";
import { BytebankInputProps } from "./index";

export const StyledInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "palette" && prop !== "error",
})<BytebankInputProps & { palette: any }>(({ palette, error }) => ({
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
}));
