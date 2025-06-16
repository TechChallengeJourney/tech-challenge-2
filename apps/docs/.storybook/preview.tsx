import React from "react";
import { BytebankThemeProvider } from "@repo/ui";
import type { Preview } from "@storybook/react-vite";
import { CssBaseline } from "@mui/material";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const withTheme = (Story) => {
  return (
    <BytebankThemeProvider>
      <CssBaseline />
      <Story />
    </BytebankThemeProvider>
  );
};

export const decorators = [withTheme];

