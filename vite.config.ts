import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and related packages into a separate chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split Firebase related packages
          'firebase-vendor': ['firebase', 'react-firebase-hooks'],
          // Split other major dependencies
          'ui-vendor': ['@headlessui/react', 'lucide-react'],
          'query-vendor': ['@tanstack/react-query'],
        },
        // Ensure chunk filenames include content hash for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Enable source maps for production (optional, remove if bundle size is a concern)
    sourcemap: true,
    // Minify the output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Set to true in production to remove console logs
        drop_debugger: true,
      },
    },
  },
});
