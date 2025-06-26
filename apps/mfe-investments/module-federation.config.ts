import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';
import pkg from './package.json';
const { dependencies } = pkg;

export default createModuleFederationConfig({
  name: 'remote',
  exposes: {
    './Button': './src/components/Button',
    './BytebankExtract': './src/components/extract/extract',
  },
  filename: 'remoteEntry.js',
  shared: ['react', 'react-dom']
});