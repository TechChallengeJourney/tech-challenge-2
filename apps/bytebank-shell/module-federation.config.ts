import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";
import pkg from "./package.json";
const { dependencies } = pkg;

const INVESTMENTS_APP_URL =
  process.env.PUBLIC_INVESTMENTS_APP_URL || "http://localhost:3001";
const TRANSACTIONS_APP_URL =
  process.env.PUBLIC_TRANSACTIONS_APP_URL || "http://localhost:3002";

console.log(`Using Investments App URL: ${INVESTMENTS_APP_URL}`);
console.log(`Using Transactions App URL: ${TRANSACTIONS_APP_URL}`);

export default createModuleFederationConfig({
  name: "bytebank-shell",
  remotes: {
    investments: `investments@${INVESTMENTS_APP_URL}/remoteEntry.js`,
    transactions: `transactions@${TRANSACTIONS_APP_URL}/remoteEntry.js`,
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: dependencies.react,
      eager: true,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
      eager: true,
    },
    "@mui/material": {
      singleton: true,
      requiredVersion: dependencies["@mui/material"],
      eager: true,
    },
    "react-hook-form": {
      singleton: true,
      requiredVersion: dependencies["react-hook-form"],
    },
    "@emotion/react": {
      singleton: true,
      requiredVersion: dependencies["@emotion/react"],
    },
    "@emotion/styled": {
      singleton: true,
      requiredVersion: dependencies["@emotion/styled"],
    },
    "@repo/ui": {
      singleton: true,
    },
    "@repo/utils": {
      singleton: true,
    },
    "@repo/data-access": {
      singleton: true,
    },
  },
});
