import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    hmr: {
      timeout: 120000,
      protocol: 'ws',
      clientPort: 443,
      overlay: true,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    headers: {
      'Cache-Control': 'no-store',
      'Connection': 'keep-alive',
      'Keep-Alive': 'timeout=120',
    }
  }
})