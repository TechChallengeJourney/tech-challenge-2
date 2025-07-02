import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "host",
  remotes: {
    remote: "remote@http://localhost:3001/remoteEntry.js",
  },
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
