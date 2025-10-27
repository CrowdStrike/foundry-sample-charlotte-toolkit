import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Environment configuration
const isProd = process.env.NODE_ENV === 'production';

// Generate cache-busting hash
const generateHash = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `${timestamp}${random}`;
};
const hash = generateHash();

export default defineConfig({
  plugins: [react()],

  // Use relative paths for assets (required for Foundry CDN deployment)
  base: './',

  root: 'src',
  publicDir: resolve(__dirname, 'src'),

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: !isProd,
    minify: isProd ? 'esbuild' : false,
    target: 'es2015',

    rollupOptions: {
      output: {
        // Cache-busting for production
        entryFileNames: isProd ? `[name]-${hash}.js` : '[name].js',
        chunkFileNames: isProd ? `[name]-${hash}.js` : '[name].js',
        assetFileNames: isProd ? `[name]-${hash}.[ext]` : '[name].[ext]',

        // Automatic code splitting
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },

    // Build optimization
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: isProd,
  },

  // CSS configuration
  css: {
    devSourcemap: !isProd,
  },

  // Development server
  server: {
    port: 3000,
    open: false,
  },

  // Preview server (for production builds)
  preview: {
    port: 3000,
  },

  // Environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    BUILD_NUMBER: JSON.stringify(hash),
    BUILD_DATE: JSON.stringify(new Date().toISOString().split('T')[0]),
    IS_PRODUCTION: JSON.stringify(isProd),
    __DEV__: JSON.stringify(!isProd),
  },
});
