import React from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { BytebankInput } from "../input";

interface ControlledInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  mask?: "currency";
  rules?: RegisterOptions;
}

export const BytebankInputController: React.FC<ControlledInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  mask,
  rules,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <BytebankInput
          {...field}
          label={label}
          type={type}
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
          autoComplete={autoComplete}
          mask={mask}
        />
      )}
    />
  );
};
