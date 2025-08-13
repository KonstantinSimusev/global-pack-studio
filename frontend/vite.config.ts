import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from 'autoprefixer';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],

  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    minify: true,
    cssCodeSplit: false,
  },
});
