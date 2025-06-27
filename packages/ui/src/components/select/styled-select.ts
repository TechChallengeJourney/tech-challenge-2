import { Select, SelectProps, OutlinedInput } from "@mui/material";
import { styled } from "@mui/material/styles";

type CustomProps = {
  palette: Record<string, any>;
};

export const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "palette",
})<SelectProps & CustomProps>(({ palette, error }) => ({
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-input, & .MuiSelect-select": {
      color: palette["grey.main"],
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: palette["grey.main"],
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
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
