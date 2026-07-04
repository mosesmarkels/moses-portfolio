import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Site now serves from mosesmarkels.com (a custom domain), which sits at
// the domain root — unlike the old mosesmarkels.github.io/moses-portfolio/
// project-page URL, there's no repo-name subpath to account for.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
