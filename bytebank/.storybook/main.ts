const config = {
  stories: [
    '../libs/shared/src/**/*.mdx',
    '../libs/shared/**/*.stories.@(js|jsx|mjs|ts|tsx)',
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

  staticDirs: ['../apps/bytebank/public'],
  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;