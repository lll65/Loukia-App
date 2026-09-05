import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Chemins relatifs : le build fonctionne aussi bien sur GitHub Pages
  // (https://user.github.io/Loukia-App/) qu'en local ou sur n'importe quel hébergeur.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
  },
})
