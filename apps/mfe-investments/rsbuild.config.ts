import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import mfConfig from "./module-federation.config";
import { pluginSass } from "@rsbuild/plugin-sass";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_"] });

export default defineConfig({
  env: {
    API_URL: process.env.API_URL,
  },
  server: {
    port: 3001,
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
