import pkg from './package.json';
const { dependencies } = pkg;
import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'remote',
  exposes: {
    './Button': './src/components/Button',
  },
  filename: 'remoteEntry.js',
  shared: {
    ...dependencies,
    react: {
      singleton: true,
    },
    'react-dom': {
      singleton: true,
    },
    '@mui/material': { singleton: true, requiredVersion: '7.1.1' },
  },
});