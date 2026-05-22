import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress circular chunk warning between three-vendor ↔ vendor (benign)
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        warn(warning);
      },
      output: {},
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
