import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from '../styles/palette';

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

let defaultTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontSize: 25, fontWeight: 600 },
    xs: { fontSize: 13, fontFamily: 'Roboto, sans-serif', },
    sm: { fontSize: 16, fontFamily: 'Roboto, sans-serif', },
    md: { fontSize: 28, fontFamily: 'Roboto, sans-serif', },
    lg: { fontSize: 34, fontFamily: 'Roboto, sans-serif', fontWeight: 500 },
    button: { fontSize: 16 },
  },
  spacing: [0, 8, 16, 24, 32, 64],
});

defaultTheme = createTheme(defaultTheme, {
  palette: {
    primary: {
      main: palette['primary.main'],
      light: palette['primary.light'],
      dark: palette['primary.dark'],
    },
    secondary: {
      main: palette['secondary.main'],
      light: palette['secondary.light'],
      dark: palette['secondary.dark'],
    },
    tertiary: defaultTheme.palette.augmentColor({
      color: {
        main: palette['tertiary.main'],
        light: palette['tertiary.light'],
        dark: palette['tertiary.dark'],
        contrastText: palette['tertiary.dark'],
      },
      name: 'tertiary',
    }),
    black: defaultTheme.palette.augmentColor({
      color: {
        main: palette['black.main'],
        contrastText: palette['white.main'],
      },
      name: 'black',
    }),
    white: defaultTheme.palette.augmentColor({
      color: {
        main: palette['white.main'],
        contrastText: palette['black.main']
      },
      name: 'white',
    }),
  },
  cssVariables: true,
});

defaultTheme = responsiveFontSizes(defaultTheme);
export default defaultTheme;
