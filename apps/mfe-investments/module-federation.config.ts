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
    '@repo/ui': {singleton: true},
    '@mui/material': { singleton: true, strictVersion: true, requiredVersion: '7.0.2', version: '7.0.2' },
    '@mui/icons-material': { singleton: true, strictVersion: true, requiredVersion: '7.0.2', version: '7.0.2' },
  },
});