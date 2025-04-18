import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      timeout: 10000,
      protocol: 'ws',
      host: 'localhost'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
