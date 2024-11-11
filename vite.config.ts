import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'utils': ['date-fns', 'immer', 'zod'],
          'ui': ['lucide-react', 'react-virtualized'],
        },
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});