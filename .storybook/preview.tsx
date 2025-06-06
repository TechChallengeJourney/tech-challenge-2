import React from "react";
import { defaultTheme } from '@bytebank/shared';
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Design Tokens', '*'],
      }
    },
    controls: { expanded: true },
    viewport: {
        options: INITIAL_VIEWPORTS,
      },
  },
};
 
export default preview;

export const withTheme = (Story) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

export const decorators = [withTheme];

