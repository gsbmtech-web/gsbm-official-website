import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        // Split vendors into separate cached chunks.
        // Users who come back don't re-download react/router — only your changed code.
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router':       ['react-router-dom'],
          'helmet':       ['react-helmet-async'],
          'icons':        ['react-icons'],
        },
      },
    },
    // Warn when any single chunk exceeds 600KB
    chunkSizeWarningLimit: 600,
  },

  // Pre-bundle these on dev server start so first load isn't slow in dev either
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
  },
})