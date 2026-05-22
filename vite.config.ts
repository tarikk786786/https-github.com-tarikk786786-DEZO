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
      output: {
        manualChunks(id) {
          // Three.js + GSAP → lazy-loaded with AwwwardsBackground
          if (
            id.includes('node_modules/three/') ||
            id.includes('node_modules/@react-three/') ||
            id.includes('node_modules/gsap/') ||
            id.includes('node_modules/@gsap/')
          ) {
            return 'three-vendor';
          }
          // Core vendor chunk (React, Router, Framer Motion, etc.)
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
          // Service pages → lazy-loaded
          if (id.includes('/src/pages')) {
            return 'route-pages';
          }
          return undefined;
        },
      },
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
