import React from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { BytebankAutoComplete } from "../auto-complete";

interface OptionType {
  label: string;
  value: string;
}

interface BytebankAutoCompleteControllerProps {
  name: string;
  label: string;
  loading?: boolean;
  options: OptionType[];
  rules?: RegisterOptions;
  onCreateOption?: (label: string) => Promise<void>;
}

export const BytebankAutoCompleteController: React.FC<BytebankAutoCompleteControllerProps> = ({
  name,
  label,
  loading = false,
  options,
  rules,
  onCreateOption,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectedOption =
          options.find((option) => option.value === field.value) || null;

        return (
          <BytebankAutoComplete
            label={label}
            loading={loading}
            options={options}
            value={selectedOption}
            onChange={(val) => field.onChange(val?.value || "")}
            onCreateOption={onCreateOption}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};
