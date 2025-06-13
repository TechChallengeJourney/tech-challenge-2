'use client';
import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { palette } from '../../styles/palette';

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

const ButtonColor = styled(Button)<ButtonProps>(() => ([{
  '&.MuiButton-containedSecondary': {
    backgroundColor: palette['secondary.main'],
    color: palette['grey.900'],
  },
  '&.MuiButton-containedSecondary:hover': {
    backgroundColor: palette['primary.light'],
  },
  '&.MuiButton-outlinedSecondary': {
    borderColor: palette['secondary.light'],
    color: palette['secondary.main'],
  },
  '&.MuiButton-textSecondary': {
    color: palette['secondary.main'],
  },
  '&.MuiButton-colorTertiary': {
    color: palette['tertiary.dark'],
  },
  '&.MuiButton-containedTertiary': {
    backgroundColor: palette['tertiary.light'],
  },
  '&.MuiButton-containedPrimary': {
    backgroundColor: palette['grey.900'],
    color: palette['primary.light'],
  },
  '&.MuiButton-outlinedPrimary': {
    borderColor: palette['grey.300'],
    color: palette['grey.900'],
  },
  '&.MuiButton-textPrimary': {
    color: palette['grey.900'],
  },
  '&.Mui-disabled': {
    color: '#3E3E3E',
    backgroundColor: '#A7A7A7',
  },
  '&': {
    borderWidth: '3px',
    borderRadius: '10rem',
    padding: '15px 30px',
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 500,
  },
}
]));

export function BytebankButton({
  label,
  color,
  variant,
  sendSubmit,
  ...props
}: BytebankButtonProps) {
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
