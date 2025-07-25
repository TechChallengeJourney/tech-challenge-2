import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import mfConfig from "./module-federation.config";
import { pluginSass } from "@rsbuild/plugin-sass";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_", "PUBLIC_"] });
const APP_URL = process.env.PUBLIC_INVESTMENTS_APP_URL || "http://localhost:3002";

export default defineConfig({
  server: {
    port: 3001,
  },
  mode: 'production',
  dev: {
    assetPrefix: 'http://localhost:3001',
  },
  output: {
    assetPrefix: APP_URL,
  },
  html: {
    template: "./public/index.html",
  },
  plugins: [
    pluginReact(),
    pluginSvgr({ mixedImport: true }),
    pluginModuleFederation(mfConfig),
    pluginSass(),
  ],
  source: {
    // Compile all JS files and exclude core-js
    include: [{ not: /[\\/]core-js[\\/]/ }],
    define: publicVars,
  },
});
