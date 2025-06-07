import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'Bytebank | Storybook',
  brandImage: 'images/logo.png',
  brandTarget: '_self',
  colorPrimary: '#52cc68',
  colorSecondary: '#4b9c4f',
  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#9fc2a5',
  appBorderRadius: 4,
  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',
  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#4b9c4f',
  barHoverColor: '#4b9c4f',
  barBg: '#ffffff',
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
});