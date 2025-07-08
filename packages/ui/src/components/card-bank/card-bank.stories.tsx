import { Meta, StoryFn } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import * as DocBlock from '@storybook/blocks';
import { BytebankCardBank, BytebankCardBankProps } from '.';
import { BankCardVariant } from '../../classes';

const cardDetails = {
  name: 'Joana da Silva',
  cardNumber: '12234565665773',
  expirationDate: '12/2029',
};

export default {
  title: 'Components/Card Bank',
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

          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Variações de cartões
            </Typography>
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              flexWrap="nowrap"
              alignItems="flex-end"
              gap={4}
            >
              {[
                { name: 'Cartão Físico', variant: 'Físico' as BankCardVariant },
                { name: 'Cartão Virtual', variant: 'Virtual' as BankCardVariant },
              ].map((item) => (
                <Box
                  width="50%"
                  key={item.name}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <BytebankCardBank variant={item.variant} details={cardDetails} />
                  <Typography variant="caption" style={{ marginTop: '8px' }}>
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['Físico', 'Virtual'], // Mantém as opções corretas
    },
  },
} as Meta;

const Template: StoryFn<BytebankCardBankProps> = (args) => <BytebankCardBank {...args} />;

export const CartaoFisico = Template.bind({});
CartaoFisico.args = {
  variant: 'Físico' as BankCardVariant,
  details: cardDetails,
};

export const CartaoVirtual = Template.bind({});
CartaoVirtual.args = {
  variant: 'Virtual' as BankCardVariant,
  details: cardDetails,
};
