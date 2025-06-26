import type { Meta, StoryObj } from '@storybook/react-vite';
import { BytebankHeader } from './header';

const meta = {
  title: 'Components/Header',
  component: BytebankHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof BytebankHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
