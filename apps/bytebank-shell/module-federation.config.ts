import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    remote: 'remote@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    '@repo/data-access': { singleton: true },
    '@repo/utils': {singleton: true, requiredVersion: '0.0.0' },
    '@mui/material': { singleton: true, strictVersion: true, requiredVersion: '7.0.2', version: '7.0.2' },
    '@mui/icons-material': { singleton: true, strictVersion: true, requiredVersion: '7.0.2', version: '7.0.2' },
  },
});