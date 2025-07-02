import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";
import pkg from "./package.json";
const { dependencies } = pkg;

export default createModuleFederationConfig({
  name: "remote",
  exposes: {
    "./components": "./src/components/index.ts",
  },
  filename: "remoteEntry.js",
  shared: [
    "react",
    "react-dom",
    "@mui/material",
    "@mui/system",
    "@emotion/react",
    "@emotion/styled",
    "@repo/data-access",
  ],
});
