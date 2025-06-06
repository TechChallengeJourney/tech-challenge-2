import { Meta, StoryFn } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import * as DocBlock from '@storybook/blocks';
import { BytebankIllustration, BytebankIllustrationProps } from '.';

export default {
  title: 'Design Tokens/Illustrations',
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
          <Typography variant="h5" gutterBottom>Lista de ilustrações</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="flex-end" gap={5}>
              {['card-holding', 'card-saving', 'login', 'register', 'error', 'graphic', 'pixels-01', 'pixels-02'].map((name) => (
                <Box key={name} display="flex" alignItems="center" flexDirection="column">
                  <BytebankIllustration name={name} variant="md" />
                  <Typography variant="caption" style={{ marginTop: '8px' }}>
                    {name}
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
    name: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['auto', 'sm', 'md', 'lg'],
    },
  },
} as Meta;

const createStory = ({ name = 'card-holding', variant = 'md' }): StoryFn<BytebankIllustrationProps> => {
  const Template: StoryFn<BytebankIllustrationProps> = (args: BytebankIllustrationProps) => (
      <BytebankIllustration {...args} />
  );
  Template.args = {
      name,
      variant
  };

  return Template;
};

const illustrationStories: { [key: string]: Story<BytebankIllustrationProps> } = {};
const templates = [ 'card-holding'];

templates.forEach((name) => {
  illustrationStories[`${name}`] = createStory({ name, variant: 'md' });
});

export const cardHolding = illustrationStories[templates[0]];
