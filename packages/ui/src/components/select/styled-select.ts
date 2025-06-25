import { styled, Select, SelectProps} from "@mui/material";

export const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "palette" && prop !== "error",
})<SelectProps & { palette: any }>(({ palette, error }) => ({
  "&.MuiOutlinedInput-root": {
    "& .MuiSelect-select": {
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
}));