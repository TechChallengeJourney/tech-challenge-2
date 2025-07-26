import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import mfConfig from "./module-federation.config.ts";
import { pluginSass } from "@rsbuild/plugin-sass";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_", "PUBLIC_"] });
const APP_URL = process.env.PUBLIC_TRANSACTIONS_APP_URL;

export default defineConfig({
  server: {
    port: 3002,
  },
  // mode: 'production',
  dev: {
    assetPrefix: APP_URL,
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
