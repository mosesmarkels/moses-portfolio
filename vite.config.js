import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set this to match your GitHub repo name, e.g. '/moses-portfolio/'.
// Only matters for the production build served from GitHub Pages —
// `npm run dev` ignores it.
const GITHUB_REPO_NAME = 'moses-portfolio';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${GITHUB_REPO_NAME}/` : '/',
});
