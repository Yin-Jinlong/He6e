import {defineConfig} from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from "@rollup/plugin-commonjs"
import vuePlugin from "@vitejs/plugin-vue"
import postcss from 'rollup-plugin-postcss'
import del from "rollup-plugin-delete"

/**
 * @type {import('rollup').OutputOptions}
 */
const outConfig = {
    preserveModules: true,
    name: 'yjl-ui',
    exports: "named",
    sourcemap: true,
}

export default defineConfig(commandLineArguments => {
    return {
        input: 'index.ts',
        external: id => {
            return /node_modules/.test(id);
        },
        output: [
            {
                format: 'es',
                dir: '../es',
                entryFileNames: '[name].mjs',
                chunkFileNames: '[name].mjs',
                ...outConfig
            },
            {
                format: 'cjs',
                dir: '../lib',
                ...outConfig
            }
        ],
        plugins: [
            vuePlugin({
                isProduction: true,
            }),
            postcss({
                extract: true,
                extensions: ['.scss', '.sass'],
            }),
            typescript({
                check: false,
            }),
            resolve(),
            commonjs(),
            del({
                targets: [
                    'es/*',
                    'lib/*',
                    'dist/*'
                ]
            }),
        ],
    }
});
