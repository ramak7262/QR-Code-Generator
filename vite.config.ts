import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/QR-Code-Generator/', // 👈 repo name, case-sensitive!
  plugins: [react()],
})
