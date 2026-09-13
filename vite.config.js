import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps built asset paths relative, so the site works regardless
// of which GitHub Pages subpath (repo name) it is served from.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  preview: {
    port: Number(process.env.PORT) || 4173,
  },
})
