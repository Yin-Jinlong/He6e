import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'rollup-plugin-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3366
    },
    build: {
        minify: 'terser',
        reportCompressedSize: false,
        lib: {
            entry: 'src/index.ts'
        }
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
