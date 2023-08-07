import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),         createHtmlPlugin({
        minify: true,
        /**
         * After writing entry here, you will not need to add script tags in `index.html`
         * The original tags need to be deleted
         */
        entry: '/src/main.ts',
    }),],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});