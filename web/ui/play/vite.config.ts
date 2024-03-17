import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4466,
    },
    resolve:{
      alias: {
          '@ui':path.resolve('../packages'),
          '@pages':path.resolve('src/pages')
      }
    },
    plugins: [
        vue(),
    ],
});