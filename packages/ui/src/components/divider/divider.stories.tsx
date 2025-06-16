import * as DocBlock from '@storybook/blocks';
import { Meta, StoryObj } from '@storybook/react';
import { BytebankDivider } from './divider';

const meta = {
  title: 'Components/BytebankDivider', // O título aqui deve estar correto
  component: BytebankDivider,
  tags: ['autodocs'],
  parameters: {
         docs: {
        page: () =>
          <>
          <DocBlock.Title />
          <DocBlock.Description />

          <DocBlock.Primary />
          <DocBlock.Controls />

          <DocBlock.Title>Variações</DocBlock.Title>
          <DocBlock.Stories />
          </>
      }
    }
} satisfies Meta<typeof BytebankDivider>;

export default meta;

type Story = StoryObj<typeof BytebankDivider>;

export const Primary: Story = {
  args: {
    color: 'primary',
    type: 'horizontal',
  },
};