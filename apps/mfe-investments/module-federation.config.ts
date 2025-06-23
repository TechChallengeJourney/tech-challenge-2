import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';
import pkg from './package.json';
const { dependencies } = pkg;

export default createModuleFederationConfig({
  name: 'remote',
  exposes: {
    './Components': './src/components/index.ts',
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
    '@repo/utils': {singleton: true, requiredVersion: '0.0.0' },
    '@mui/material': { singleton: true, strictVersion: true, requiredVersion: '7.0.2', version: '7.0.2' },
    '@mui/icons-material': { singleton: true, strictVersion: true, requiredVersion: '7.0.2', version: '7.0.2' },
  },
});