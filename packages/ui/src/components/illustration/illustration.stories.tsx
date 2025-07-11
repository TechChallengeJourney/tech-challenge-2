import { Meta, StoryFn } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import * as DocBlock from '@storybook/blocks';
import { BytebankIllustration, BytebankIllustrationProps } from './illustration';

export default {
  title: 'Design Tokens/Illustration',
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
            <Box display="flex" flexDirection="row" flexWrap="nowrap" alignItems="flex-end" gap={5}>
              {['not-found'].map((name) => (
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
} as Meta<typeof BytebankIllustration>;

const createStory = (args: BytebankIllustrationProps): StoryFn<BytebankIllustrationProps> => {
  const Template = (props: BytebankIllustrationProps) => <BytebankIllustration {...props} />;
  Template.args = args;
  return Template;
};

const illustrationStories = {
  notFound: createStory({ name: 'not-found', variant: 'md' }),
};

export const notFound = illustrationStories.notFound;