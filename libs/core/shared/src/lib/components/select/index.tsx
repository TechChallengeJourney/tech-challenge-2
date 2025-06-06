'use client';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import './style.scss';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: SelectOption[];
  error?: boolean;
  helperText?: string;
}

export default function BytebankSelect({
  value,
  onChange,
  label,
  options,
  error = false,
  helperText = '',
}: SelectProps) {
  return (
    <FormControl variant='filled' fullWidth margin="normal" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value ?? ''}
        onChange={(e: any) => onChange(e.target.value)}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
