import { Meta, StoryObj } from '@storybook/react';
import { BytebankModal } from './modal';
import { useState } from 'react';
import { BytebankButton } from '../button/button';
import { BytebankModalProps } from '../../classes';

const meta: Meta<BytebankModalProps> = {
  title: 'Components/Modal',
  component: BytebankModal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    onClose: { description: '' },
  },
};

export default meta;

type Story = StoryObj<BytebankModalProps>;

export const Default: Story = {
  args: {
    open: false,
    title: 'Este é o titulo do modal',
    illustration: 'register',
    illustrationSize: 'lg',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <BytebankButton
          label="Abrir Modal"
          color="primary"
          variant="contained"
          sendSubmit={() => setOpen(true)}
        />
        <BytebankModal
          title={args.title}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p style={{ marginTop: 16, textAlign: 'center' }}>
            Aqui vai o conteúdo do modal.
          </p>
        </BytebankModal>
      </>
    );
  },
};
