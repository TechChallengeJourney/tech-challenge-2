import { Meta } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import * as DocBlock from '@storybook/blocks';
import { BytebankCardBank, BytebankCardBankProps } from '.';

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

          <Box>
            <Typography variant="h5" gutterBottom>Variações de cartões</Typography>
            <Box width="100%" display="flex" flexDirection="row" flexWrap="nowrap" alignItems="flex-end" gap={4}>
              {[{ name: 'Physical Card', variant: 'physical' }, { name: 'Virtual Card', variant: 'virtual' }].map((item) => (
                <>
                  <Box width="50%" key={item.name} display="flex" flexDirection="column" alignItems="flex-start">
                    <BytebankCardBank
                      variant={item.variant}
                      details={cardDetails}
                    ></BytebankCardBank><Typography variant="caption" style={{ marginTop: '8px' }}>
                      {item.name}
                    </Typography>
                  </Box></>
              ))}
            </Box>
          </Box>
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['physical', 'virtual'],

    },
  },
} as Meta;

const CardTemplate: Story<BytebankCardBankProps> = ({ variant, details = cardDetails }: BytebankCardBankProps) => (
  <BytebankCardBank variant={variant} details={details} />
);

export const PhysicalCard = CardTemplate;
