import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { BytebankHeader } from './header';

const meta = {
  title: 'Components/Header',
  component: BytebankHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof BytebankHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
