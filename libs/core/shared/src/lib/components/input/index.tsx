'use client';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import './style.scss';

export interface InputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  autoComplete?: string;
  mask?: 'currency';
}

function formatCurrency(value: string) {
  const numeric = value.replace(/\D/g, '');
  const number = Number(numeric) / 100;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function BytebankInput({
  value,
  onChange,
  label,
  type = 'text',
  placeholder,
  error = false,
  helperText = '',
  autoComplete = '',
  mask
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    
    if (mask === 'currency') {
      newValue = newValue.replace(/^0+/, '');

      const event = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      };
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    } else {
      onChange(e);
    }
  };
  return (
    <Box className="bytebank-input">
      <TextField
        value={mask === 'currency' && typeof value === 'string' ? formatCurrency(value) : value}
        onChange={handleChange}
        label={label}
        type={type}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        autoComplete={autoComplete}
        margin="normal"
        variant={'filled'}
        fullWidth
      />
    </Box>
  );
}
