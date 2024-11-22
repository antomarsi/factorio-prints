import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3003,
    strictPort: true,
   },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: 'http://localhost:3000'
  }
})
