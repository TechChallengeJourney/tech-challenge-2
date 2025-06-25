import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração personalizada para forçar a porta 3000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
