import { defineConfig } from 'vite';

export default defineConfig({
    root: './', // Root is the project root since index.html is there for now
    build: {
        outDir: 'dist',
    },
    server: {
        open: true,
    }
});
