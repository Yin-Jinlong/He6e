import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'rollup-plugin-obfuscator'
import path from "node:path";

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
        vue(),
        obfuscator({
            options: {
                controlFlowFlattening: false,
                deadCodeInjectionThreshold: 0,
                stringArray: false,
                renameProperties: true
            }
        })
    ],
});
