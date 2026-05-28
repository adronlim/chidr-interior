import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Served from GitHub Pages at https://adronlim.github.io/chidr-interior-mockupv2/
  base: '/chidr-interior-mockupv2/',
})
