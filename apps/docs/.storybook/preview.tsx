import  defaultTheme  from "../../../packages/utils/src/styles/default.theme.tsx";
import type { Preview } from "@storybook/react-vite";
import { CssBaseline, ThemeProvider } from "@mui/material";

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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

export const decorators = [withTheme];

