const config = {
  stories: [
    '../libs/design-system/src/**/*.mdx',
    '../libs/design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/blocks",
    "@storybook/addon-mdx-gfm"
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  staticDirs: ['../apps/core/bytebank/public'],
  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;