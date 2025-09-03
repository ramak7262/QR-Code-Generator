import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/QR-Code-Generator/',  // 👈 must match repo name
  plugins: [react()],
})
