'use client';
import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { palette } from '../../styles/palette';
import { JSX } from 'react';

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
}: BytebankButtonProps): JSX.Element {
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
