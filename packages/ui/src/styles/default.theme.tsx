import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { colorsPalette } from '../styles/palette';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    xs?: TypographyVariantsOptions['h1'];
    sm?: TypographyVariantsOptions['h1'];
    md?: TypographyVariantsOptions['h1'];
    lg?: TypographyVariantsOptions['h1'];
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
  }
}
const lightPalette = colorsPalette.light;
const darkPalette = colorsPalette.dark;

let defaultTheme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontSize: 25, fontWeight: 600 },
    xs: { fontSize: 13, fontFamily: 'Inter, sans-serif', },
    sm: { fontSize: 16, fontFamily: 'Inter, sans-serif', },
    md: { fontSize: 22, fontFamily: 'Inter, sans-serif', },
    lg: { fontSize: 26, fontFamily: 'Inter, sans-serif', fontWeight: 500 },
    button: { fontSize: 15 },
  },
  spacing: [0, 8, 16, 24, 32, 64],
});

defaultTheme = responsiveFontSizes(defaultTheme);

export const lightTheme = createTheme(defaultTheme, {
  palette: {
    mode: 'light',
    background: {paper: lightPalette['background'], default: lightPalette['background'], gradient: lightPalette['background.gradient']},
    primary: {
      main: lightPalette['lime.contrast'],
      light: lightPalette['lime.700'],
      dark: lightPalette['lime.contrast'],
      contrastText: lightPalette['lime.50']
    },
    secondary: {
      main: lightPalette['lime.500'],
      light: lightPalette['lime.400'],
      dark: lightPalette['lime.600'],
      contrastText: lightPalette['lime.contrast']
    },
    tertiary: defaultTheme.palette.augmentColor({
      color: {
        main: lightPalette['lime.100'],
        light: lightPalette['lime.50'],
        dark: lightPalette['lime.200'],
        contrastText: lightPalette['lime.highcontrast'],
      },
      name: 'tertiary',
    }),
    black: defaultTheme.palette.augmentColor({
      color: {
        main: lightPalette['black.main'],
        contrastText: lightPalette['white.main'],
      },
      name: 'black',
    }),
    white: defaultTheme.palette.augmentColor({
      color: {
        main: lightPalette['white.main'],
        contrastText: lightPalette['black.main']
      },
      name: 'white',
    }),
    text: {
      primary: lightPalette['lime.900'],
      secondary: lightPalette['lime.500'],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: lightPalette['navigation'],
          color: lightPalette['lime.contrast'],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--Paper-overlay': 'none !important'
        },
        body: {
          backgroundColor: (theme: Theme) =>
            theme.palette.mode === 'dark' ? darkPalette.background : lightPalette.background
        },
      },
    },
  },
  cssVariables: true,
});

export const darkTheme = createTheme(defaultTheme, {
  palette: {
    mode: 'dark',
    background: {paper: darkPalette['background'], default: darkPalette['background'], gradient: darkPalette['background.gradient']},
    primary: {
      main: darkPalette['lime.contrast'],
      light: darkPalette['lime.700'],
      dark: darkPalette['lime.contrast'],
      contrastText: darkPalette['lime.50']
    },
    secondary: {
      main: darkPalette['lime.500'],
      light: darkPalette['lime.400'],
      dark: darkPalette['lime.600'],
      contrastText: darkPalette['lime.subcontrast']
    },
    tertiary: defaultTheme.palette.augmentColor({
      color: {
        main: darkPalette['lime.100'],
        light: darkPalette['lime.50'],
        dark: darkPalette['lime.200'],
        contrastText: darkPalette['lime.subcontrast'],
      },
      name: 'tertiary',
    }),
    black: defaultTheme.palette.augmentColor({
      color: {
        main: darkPalette['black.main'],
        contrastText: darkPalette['white.main'],
      },
      name: 'black',
    }),
    white: defaultTheme.palette.augmentColor({
      color: {
        main: darkPalette['white.main'],
        contrastText: darkPalette['black.main']
      },
      name: 'white',
    }),
    text: {
      primary: darkPalette['lime.900'],
      secondary: darkPalette['lime.500'],
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkPalette['navigation'],
          color: darkPalette['lime.contrast'],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '.MuiPaper-root': {
          '--Paper-overlay': 'none !important'
        },
        body: {
          backgroundColor: (theme: Theme) =>
            theme.palette.mode === 'dark' ? darkPalette.background : lightPalette.background
        },
      },
    },
  },
  cssVariables: true,
});

export default defaultTheme;
