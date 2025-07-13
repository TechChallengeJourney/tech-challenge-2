import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";
import pkg from "./package.json";
const { dependencies } = pkg;

// Função para obter a URL do remote baseado no ambiente
const getRemoteUrl = (remoteName: string, defaultPort: string) => {
  if (process.env.NODE_ENV === 'production') {
    // Em produção, use variáveis de ambiente ou URLs fixas da Vercel
    const investmentsUrl = process.env.INVESTMENTS_URL || 'https://mfe-investments-vercel.vercel.app';
    const transactionsUrl = process.env.TRANSACTIONS_URL || 'https://mfe-transactions-vercel.vercel.app';
    
    if (remoteName === 'remote') return `${investmentsUrl}/remoteEntry.js`;
    if (remoteName === 'transactions') return `${transactionsUrl}/remoteEntry.js`;
  }
  
  // Em desenvolvimento, use localhost
  return `http://localhost:${defaultPort}/remoteEntry.js`;
};

export default createModuleFederationConfig({
  name: "host",
  remotes: {
    remote: `remote@${getRemoteUrl('remote', '3001')}`,
    transactions: `transactions@${getRemoteUrl('transactions', '3002')}`,
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: dependencies.react,
      eager: true
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
      eager: true
    },
    '@mui/material': {
      singleton: true,
      requiredVersion: dependencies['@mui/material'],
      eager: true
    },
    'react-hook-form': {
      singleton: true,
      requiredVersion: dependencies['react-hook-form']
    },
    '@emotion/react': {
      singleton: true,
      requiredVersion: dependencies['@emotion/react']
    },
    '@emotion/styled': {
      singleton: true,
      requiredVersion: dependencies['@emotion/styled']
    },
    '@repo/ui': {
      singleton: true
    },
    '@repo/utils': {
      singleton: true
    },
    '@repo/data-access': {
      singleton: true, 
    }
  }
});
