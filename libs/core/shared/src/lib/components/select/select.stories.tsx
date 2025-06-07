import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import BytebankSelect, { SelectOption } from './index';
import * as DocBlock from '@storybook/blocks';

export default {
  title: 'Components/Select',
  component: BytebankSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Description />
          <DocBlock.Primary />
          <DocBlock.Controls />
          <DocBlock.Stories />
        </>
      ),
    },
  },
} as Meta<typeof BytebankSelect>;

const options: SelectOption[] = [
  { label: 'Pessoa Física', value: 'pf' },
  { label: 'Pessoa Jurídica', value: 'pj' },
];

const Template: StoryFn<typeof BytebankSelect> = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
      <BytebankSelect {...args} value={value} onChange={handleChange} />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Tipo de Pessoa',
  options,
  error: false,
  helperText: '',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Tipo de Pessoa',
  options,
  error: true,
  helperText: 'Selecione um tipo válido',
};
