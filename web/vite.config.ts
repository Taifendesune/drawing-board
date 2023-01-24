import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@canvas': path.resolve(__dirname, './src/canvas'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    open: true,
    port: 8888,
    host: 'localhost',
  },
});
