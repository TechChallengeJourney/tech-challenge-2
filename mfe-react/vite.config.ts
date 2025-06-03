import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'mfe-react',
      formats: ['system'],
      fileName: () => 'mfe-react.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'single-spa', 'single-spa-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
