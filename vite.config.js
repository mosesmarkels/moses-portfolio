import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/moses-portfolio/',
  plugins: [react()],
  resolve: {
    alias: {
      three: path.resolve(__dirname, 'node_modules/three'),
    },
  },
})
