import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { colorsPalette } from "../styles/palette";

declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    xs?: TypographyVariantsOptions["h1"];
    sm?: TypographyVariantsOptions["h1"];
    md?: TypographyVariantsOptions["h1"];
    lg?: TypographyVariantsOptions["h1"];
    xxl?: TypographyVariantsOptions["h1"];
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xxl: true;
  }
}
const lightPalette = colorsPalette.light;
const darkPalette = colorsPalette.dark;

let defaultTheme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: { fontSize: 25, fontWeight: 600 },
    xs: { fontSize: 13, fontFamily: "Inter, sans-serif" },
    sm: { fontSize: 16, fontFamily: "Inter, sans-serif" },
    md: { fontSize: 22, fontFamily: "Inter, sans-serif" },
    lg: { fontSize: 26, fontFamily: "Inter, sans-serif", fontWeight: 500 },
    xxl: { fontSize: 34, fontFamily: "Inter, sans-serif", fontWeight: 500 },
    button: { fontSize: 15 },
  },
  spacing: [0, 8, 16, 24, 32, 64],
});

defaultTheme = responsiveFontSizes(defaultTheme);

export const lightTheme = createTheme(defaultTheme, {
  palette: {
    mode: "light",
    background: {
      paper: lightPalette["background"],
      default: lightPalette["background"],
      gradient: lightPalette["background.gradient"],
    },
    primary: {
      main: lightPalette["lime.contrast"],
      light: lightPalette["lime.700"],
      dark: lightPalette["lime.contrast"],
      contrastText: lightPalette["lime.50"],
    },
    secondary: {
      main: lightPalette["lime.500"],
      light: lightPalette["lime.400"],
      dark: lightPalette["lime.600"],
      contrastText: lightPalette["lime.contrast"],
    },
    tertiary: defaultTheme.palette.augmentColor({
      color: {
        main: lightPalette["lime.100"],
        light: lightPalette["lime.50"],
        dark: lightPalette["lime.200"],
        contrastText: lightPalette["lime.highcontrast"],
      },
      name: "tertiary",
    }),
    black: defaultTheme.palette.augmentColor({
      color: {
        main: lightPalette["black.main"],
        contrastText: lightPalette["white.main"],
      },
      name: "black",
    }),
    white: defaultTheme.palette.augmentColor({
      color: {
        main: lightPalette["white.main"],
        contrastText: lightPalette["black.main"],
      },
      name: "white",
    }),
    text: {
      primary: lightPalette["lime.900"],
      secondary: lightPalette["lime.500"],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: lightPalette["navigation"],
          color: lightPalette["lime.contrast"],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: lightPalette["lime.900"],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: lightPalette["lime.800"],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--variant-textColor": lightPalette["lime.800"],
          "--variant-outlinedBorder": lightPalette["lime.700"],
          "--Paper-overlay": "none !important",
        },
        body: {
          backgroundColor: lightPalette.background,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: lightPalette["lime.900"],
        },
        underline: {
          "&:before": {
            borderBottomColor: lightPalette["lime.400"],
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: lightPalette["lime.700"],
          },
          "&:after": {
            borderBottomColor: lightPalette["lime.900"],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: lightPalette["lime.900"],
        },
        icon: {
          color: lightPalette["lime.900"],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: lightPalette["grey.main"],
          "&.Mui-focused": {
            color: lightPalette["grey.main"], // Força manter a cor no foco
          },
          "&.Mui-error": {
            color: lightPalette["red.700"],
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: lightPalette["grey.main"],
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: lightPalette["lime.400"],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: lightPalette["lime.700"],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: lightPalette["lime.500"], // Focus color
          },
        },
        input: {
          color: lightPalette["lime.900"],
        },
      },
    },
  },
  cssVariables: true,
});

export const darkTheme = createTheme(defaultTheme, {
  palette: {
    mode: "dark",
    background: {
      paper: darkPalette["background"],
      default: darkPalette["background"],
      gradient: darkPalette["background.gradient"],
    },
    primary: {
      main: darkPalette["lime.contrast"],
      light: darkPalette["lime.700"],
      dark: darkPalette["lime.contrast"],
      contrastText: darkPalette["lime.50"],
    },
    secondary: {
      main: darkPalette["lime.500"],
      light: darkPalette["lime.400"],
      dark: darkPalette["lime.600"],
      contrastText: darkPalette["lime.subcontrast"],
    },
    tertiary: defaultTheme.palette.augmentColor({
      color: {
        main: darkPalette["lime.100"],
        light: darkPalette["lime.50"],
        dark: darkPalette["lime.200"],
        contrastText: darkPalette["lime.subcontrast"],
      },
      name: "tertiary",
    }),
    black: defaultTheme.palette.augmentColor({
      color: {
        main: darkPalette["black.main"],
        contrastText: darkPalette["white.main"],
      },
      name: "black",
    }),
    white: defaultTheme.palette.augmentColor({
      color: {
        main: darkPalette["white.main"],
        contrastText: darkPalette["black.main"],
      },
      name: "white",
    }),
    text: {
      primary: darkPalette["lime.900"],
      secondary: darkPalette["lime.500"],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkPalette["navigation"],
          color: darkPalette["lime.contrast"],
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: darkPalette["grey.main"],
          backgroundColor: darkPalette["lime.700"],
          color: darkPalette["lime.50"],
        },
        "&.Mui-selected:hover": {
          backgroundColor: darkPalette["lime.600"],
        },
        "&:hover": {
          backgroundColor: darkPalette["lime.200"], //hover do options do select
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: darkPalette["lime.900"],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: darkPalette["lime.600"],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--variant-textColor": darkPalette["lime.highcontrast"],
        },
        ".MuiPaper-root": {
          "--Paper-overlay": "none !important",
        },
        body: {
          backgrounColor: darkPalette.background,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: darkPalette["lime.900"],
        },
        underline: {
          "&:before": {
            borderBottomColor: darkPalette["lime.400"],
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: darkPalette["lime.700"],
          },
          "&:after": {
            borderBottomColor: darkPalette["lime.800"],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: darkPalette["lime.900"],
        },
        icon: {
          color: darkPalette["lime.900"],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: darkPalette["grey.main"],
          "&.Mui-focused": {
            color: darkPalette["grey.main"], // Força manter a cor no foco
          },
          "&.Mui-error": {
            color: darkPalette["red.700"],
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: darkPalette["grey.main"],
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: darkPalette["lime.400"],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: darkPalette["lime.700"],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: darkPalette["lime.500"], // Focus color
          },
        },
        input: {
          color: darkPalette["lime.50"],
        },
      },
    },
  },
  cssVariables: true,
});

export default defaultTheme;
