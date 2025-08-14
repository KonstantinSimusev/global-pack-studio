import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production'
    ? '/global-pack-studio/'
    : '/',
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    outDir: 'dist',
    minify: true,
    cssCodeSplit: false,
  },
});
