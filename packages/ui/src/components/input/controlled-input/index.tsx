import React from "react";
import { Controller, useFormContext, RegisterOptions, Control } from "react-hook-form";
import { BytebankInput } from "../input";

interface ControlledInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  mask?: "currency";
  rules?: RegisterOptions;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "black"
    | "white";
  control?: Control<any>;
}

export const BytebankInputController: React.FC<ControlledInputProps> = ({
  control: controlProp,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  mask,
  rules,
  color,
}) => {
  const formContext = useFormContext();
  const control = controlProp ?? formContext?.control;

  if (!control) {
    throw new Error(
      "BytebankInputController deve ser usado dentro de um FormProvider ou receber a prop 'control'"
    );
  }

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
          color={color}
        />
      )}
    />
  );
};
