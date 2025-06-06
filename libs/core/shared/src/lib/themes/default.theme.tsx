import { Inter } from 'next/font/google';
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

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
});

let defaultTheme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontSize: 25, fontWeight: 700 },
    xs: { fontSize: 13, fontFamily: inter.style.fontFamily },
    sm: { fontSize: 16, fontFamily: inter.style.fontFamily },
    md: { fontSize: 28, fontFamily: inter.style.fontFamily },
    lg: { fontSize: 34, fontFamily: inter.style.fontFamily, fontWeight: 500 },
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
