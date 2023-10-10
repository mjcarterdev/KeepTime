import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config();

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080,
  },
  server: {
    host: true,
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
});
