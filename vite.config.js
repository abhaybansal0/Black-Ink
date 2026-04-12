import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // In dev, all 404s fall back to index.html
  },
  // For production build (Netlify / Vercel), add a _redirects file or vercel.json
})