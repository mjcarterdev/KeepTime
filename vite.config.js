/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config();

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  preview: {
    port: 3000,
  },
  server: {
    host: '0.0.0.0',
    strictPort: true,
    port: 8080,
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      build: {
        outDir: 'dist/app',
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setup.js',
    browser: {
      enabled: false,
      name: 'chrome', // browser name is required
    },
  },
});
