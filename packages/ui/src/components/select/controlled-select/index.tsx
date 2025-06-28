import React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { SelectOption, BytebankSelect } from '../select';

interface ControlledSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  rules?: RegisterOptions;
  color:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
}

export const BytebankSelectController: React.FC<ControlledSelectProps> = ({
  name,
  label,
  rules,
  options,
  color,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <BytebankSelect
          value={field.value ?? ''}
          onChange={(value) => field.onChange(value)}
          label={label}
          options={options}
          error={!!error}
          helperText={error?.message}
          color={color}
        />
      )}
    />
  );
};
