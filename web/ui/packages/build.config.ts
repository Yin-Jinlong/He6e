import {BuildOptions} from './build'
import vuePlugin from "@vitejs/plugin-vue";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const options: BuildOptions = {
    name: 'yjl-ui',
    input: 'index.ts',
    dist: '../dist',
    preserveModules: true,
    output: [
        {
            format: 'es',
            dir: '../es',
            ext: 'mjs'
        },
        {
            format: 'cjs',
            dir: '../lib'
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
            tsconfigOverride: {
                allowImportingTsExtensions: false
            }
        }),
        resolve(),
        commonjs(),
    ]
}

export default options
