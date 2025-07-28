import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { pluginSass } from "@rsbuild/plugin-sass";
import mfConfig from "./module-federation.config";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_", "PUBLIC_"] });

export default defineConfig({
  environments: {
    web: {
      output: {
        target: "web",
        manifest: true,
      },
      source: {
        entry: {
          index: "./src/index",
        },
      },
    },
    ssr: {
      output: {
        target: "node",
        distPath: {
          root: "dist/server",
        },
      },
      source: {
        entry: {
          index: "./src/index.server",
        },
      },
    },
  },
  output: {
    manifest: true,
  },
  html: {
    template: "./public/index.html",
  },
  plugins: [
    pluginReact(),
    pluginSass(),
    pluginSvgr({ mixedImport: true }),
    pluginModuleFederation(mfConfig),
  ],
  source: {
    // Compile all JS files and exclude core-js
    include: [{ not: /[\\/]core-js[\\/]/ }],
    define: publicVars,
  },
});
