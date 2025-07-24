import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";
import pkg from "./package.json";
const { dependencies } = pkg;

export default createModuleFederationConfig({
  name: "transactions",
  exposes: {
    "./components": "./src/components/extract/index",
  },
  filename: "remoteEntry.js",
  shared: {
    react: {
      singleton: true,
      eager: true,
      requiredVersion: dependencies.react,
    },
    "react-dom": {
      singleton: true,
      eager: true,
      requiredVersion: dependencies["react-dom"],
    },
    "react-hook-form": {
      singleton: true,
      eager: true,
      requiredVersion: dependencies["react-hook-form"],
    },
    "@mui/material": {
      singleton: true,
      requiredVersion: dependencies["@mui/material"],
      eager: true,
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
