'use client';
import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

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
  '&.MuiButton-containedTertiary:hover': {
    color: 'white',
  },
  '&.Mui-disabled': {
    color: '#3E3E3E',
    backgroundColor: '#A7A7A7',
  },
  '&': {
    borderRadius: '8px',
    padding: '15px 30px',
    boxShadow: 'none',
    textTransform: 'none',
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
