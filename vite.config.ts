import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  base: process.env.VITE_BASE ?? '/todo-list/',
  plugins: [react()],
  resolve: {
    alias: {
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@application': path.resolve(__dirname, 'src/application'),
      '@adapters': path.resolve(__dirname, 'src/adapters'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
