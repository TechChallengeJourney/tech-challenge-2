import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Esta é uma configuração específica para o build do servidor (SSR)
export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env.IS_SERVER': true,
    },
    // Não precisamos processar node_modules para o servidor
    include: ['./src/**/*'],
  },
  output: {
    // Exportar como CommonJS para Node.js
    format: 'cjs',
    // Alvo Node.js
    target: 'node',
    // Desabilitar minificação para melhor depuração
    disableMinimize: true,
    // Nome do arquivo de saída
    filename: {
      js: 'server.js',
    },
  },
  // Ponto de entrada específico para o servidor
  entry: {
    server: './src/server.tsx',
  },
});
