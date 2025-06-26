import { Select, SelectProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type CustomProps = {
  palette: Record<string, any>;
};

export const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "palette",
})<SelectProps & CustomProps>(({ palette, error }) => ({
  "& .MuiOutlinedInput-root": {
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
  // Customização do menu dropdown
  "& .MuiMenu-paper .MuiMenuItem-root": {
    color: palette["grey.main"],
  },
  "& .MuiMenu-paper .MuiMenuItem-root.Mui-selected": {
    color: palette["grey.900"],
  },
  "& .MuiMenu-paper .MuiMenuItem-root:hover": {
    backgroundColor: palette["grey.200"],
  },
}));
