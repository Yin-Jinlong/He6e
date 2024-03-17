import {BuildOptions} from 'build'

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
    ]
}

export default options
