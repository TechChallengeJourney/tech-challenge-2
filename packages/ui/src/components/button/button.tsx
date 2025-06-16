'use client';
import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { JSX } from 'react';
import { useTheme } from '../../contexts/theme.context';
import { colorsPalette } from '../../styles/palette';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    black: true;
    white: true;
  }
}

export interface BytebankButtonProps extends ButtonProps {
  /**
   * O texto do botão
   */
  label: string;
  /**
   * A cor do botão
   */
  color:
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'black'
  | 'white';
  /**
   * O estilo do botão
   */
  variant?: 'contained' | 'text' | 'outlined';
  sendSubmit?: () => void;
}

export function BytebankButton({
  label,
  color,
  variant,
  sendSubmit,
  ...props
}: BytebankButtonProps): JSX.Element {
  const { isDarkMode } = useTheme();
  const palette = !isDarkMode ? colorsPalette.light : colorsPalette.dark;

const ButtonColor = styled(Button)<ButtonProps>(() => ([{
  '&.MuiButton-outlinedSecondary': {
    borderColor: palette['lime.600'],
    color: palette['lime.600'],
  },
  '&.MuiButton-textSecondary': {
  color: palette['lime.600'],
  },
  '&.MuiButton-colorTertiary': {
    color: palette['lime.highcontrast'],
  },
  '&.MuiButton-textTertiary': {
    color: palette['lime.highcontrast'],
  },
  '&.MuiButton-outlinedTertiary': {
    borderColor: palette['lime.400'],
    color: palette['lime.highcontrast'],
  },
  '&.MuiButton-outlinedPrimary': {
    backgroundColor: palette['lime.50'],
    borderColor: palette['lime.700'],
    color: palette['lime.900'],
  },
  '&.MuiButton-textPrimary': {
    color: palette['lime.900'],
  },
  '&.Mui-disabled': {
    color: '#3E3E3E',
    backgroundColor: '#A7A7A7',
  },
  '&': {
    borderWidth: '1px',
    borderRadius: '5rem',
    padding: '.6rem 1.2rem',
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 400,
  },
  '&.MuiButton-contained:hover,&.MuiButton-outlined:hover': {
    boxShadow: '0px 1px 1px -2px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.1),1px 1px 4px 0px rgba(0,0,0,0.1)',
  }
}
]));

  return (
    <ButtonColor
      type="submit"
      variant={variant}
      color={color}
      onClick={sendSubmit}
      {...props}
    >
      {label}
    </ButtonColor>
  );
}
