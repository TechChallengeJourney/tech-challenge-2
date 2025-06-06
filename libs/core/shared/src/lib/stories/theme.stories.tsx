import { Meta, StoryFn } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import { defaultTheme } from '../shared';
import * as DocBlock from '@storybook/blocks';

export default {
  title: 'Design Tokens/Text & Spacing',
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
  argTypes: {
    label: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
    },
  },
} as Meta;

const TextsTemplate: StoryFn<{variant: string, label: string}> = ({variant = 'lg', label = 'Bytebank Dynamic Heading'}) => (
  <>
      <Box sx={{ margin: 2 }}> 
        <Typography variant={variant}>{label}</Typography>
      </Box>
      <Box sx={{ margin: 2 }}> 
        <Typography variant="lg">Heading</Typography> (lg)
      </Box>
      <Box sx={{ margin: 2 }}>
        <Typography variant="md">Heading</Typography> (md)
      </Box>
      <Box sx={{ margin: 2 }}>
        <Typography variant="sm">Text</Typography> (sm)
      </Box>
      <Box sx={{ margin: 2 }}>
        <Typography variant="xs">Text</Typography> (xs)
      </Box>
  </>
);

const SpacingTemplate: Story = () => (
  <>
      <Box paddingBottom={defaultTheme.spacing(1)}>
        <Box padding={defaultTheme.spacing(1)} sx={{ backgroundColor: defaultTheme.palette.grey[100] }}>
          <Typography variant="md">Espaçamento</Typography> 8px
        </Box>
      </Box>
      <Box paddingBottom={defaultTheme.spacing(2)}>
        <Box padding={defaultTheme.spacing(2)} sx={{ backgroundColor: defaultTheme.palette.grey[200] }}>
          <Typography variant="md">Espaçamento</Typography> 16px
        </Box>
      </Box>
      <Box paddingBottom={defaultTheme.spacing(3)}>
        <Box padding={defaultTheme.spacing(2)} sx={{ backgroundColor: defaultTheme.palette.grey[400] }}>
          <Typography variant="md">Espaçamento</Typography> 24px
        </Box>
      </Box>
      <Box paddingBottom={defaultTheme.spacing(4)}>
        <Box padding={defaultTheme.spacing(2)} sx={{ backgroundColor: defaultTheme.palette.grey[500] }}>
          <Typography variant="md">Espaçamento</Typography> 32px
        </Box>
      </Box>
      <Box paddingBottom={defaultTheme.spacing(5)}>
        <Box padding={defaultTheme.spacing(2)} sx={{ backgroundColor: defaultTheme.palette.grey[600] }}>
          <Typography variant="md">Espaçamento</Typography> 64px
        </Box>
      </Box>
      <Box padding={defaultTheme.spacing(2)} sx={{ height: '2rem', backgroundColor: defaultTheme.palette.grey[700] }}>
      </Box>
  </>
);

export const Texts = TextsTemplate.bind({});
Texts.storyName = 'Text';

export const Spacing = SpacingTemplate.bind({});
Spacing.storyName = 'Spacing';