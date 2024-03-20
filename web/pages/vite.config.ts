import {defineConfig} from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    root: __dirname,
    server: {
        port: 3300
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components')
        }
    },
    build: {
        minify: 'terser',
        reportCompressedSize: false
    },
    plugins: [
        vuePlugin()
    ],
});
