import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BytebankDatePicker } from './datepicker';

const meta: Meta<typeof BytebankDatePicker> = {
  title: 'Components/DatePicker',
  component: BytebankDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BytebankDatePicker>;

type DatePickerStoryProps = {
  label?: string;
  value?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  views?: ('year' | 'month' | 'day')[];
  format?: string;
};

const DatePickerWithState = (args: DatePickerStoryProps) => {
  const [value, setValue] = useState<Date | null>(args.value || null);
  return (
    <BytebankDatePicker 
      label={args.label || ""}
      value={value}
      onChange={setValue}
      minDate={args.minDate}
      maxDate={args.maxDate}
      disabled={args.disabled}
      error={args.error}
      helperText={args.helperText}
      disableFuture={args.disableFuture}
      disablePast={args.disablePast}
      views={args.views}
      format={args.format}
    />
  );
};

export const Default: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    label: 'Select a date',
  },
};

export const WithMinMaxDates: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    label: 'Select a date within range',
    minDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    maxDate: new Date(new Date().setDate(new Date().getDate() + 5)),
  },
};

export const DisableFutureDates: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    label: 'Select a date (no future)',
    disableFuture: true,
  },
};

export const DisablePastDates: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    label: 'Select a date (no past)',
    disablePast: true,
  },
};

export const WithError: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    label: 'Date with error',
    error: true,
    helperText: 'Please select a valid date',
  },
};

export const Disabled: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    label: 'Disabled date picker',
    disabled: true,
  },
};

export const YearMonthOnly: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    label: 'Year and Month only',
    views: ['year', 'month'],
    format: 'MM/yyyy',
  },
};
