import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        recipe_list: resolve(__dirname, 'src/recipe-list/index.html'),
        recipe_details: resolve(__dirname, 'src/recipe-details/index.html'),
        favorites: resolve(__dirname, 'src/favorites/index.html'),
        shopping_list: resolve(__dirname, 'src/shopping-list/index.html'),
      },
    },
  },
});
