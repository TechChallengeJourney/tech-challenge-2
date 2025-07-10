import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { useId } from "react";
import "./style.scss";

export type BytebankDatePickerProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  id?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  views?: ('year' | 'month' | 'day')[];
  format?: string;
};

export function BytebankDatePicker({
  value,
  onChange,
  label,
  minDate,
  maxDate,
  disabled = false,
  error = false,
  helperText = "",
  id,
  disableFuture,
  disablePast,
  views,
  format = "dd/MM/yyyy",
}: BytebankDatePickerProps) {
  const reactId = useId();
  const datepickerId = id || `datepicker-${reactId}`;
  const helperId = helperText ? `${datepickerId}-helper` : undefined;

  return (
    <Box className="bytebank-datepicker">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <MuiDatePicker
          label={label}
          value={value}
          onChange={onChange}
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          disableFuture={disableFuture}
          disablePast={disablePast}
          views={views}
          slotProps={{
            textField: {
              id: datepickerId,
              fullWidth: true,
              error: error,
              helperText: helperText,
              margin: "normal",
              "aria-describedby": helperId,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
