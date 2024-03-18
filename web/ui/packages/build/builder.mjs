import fs from "fs"
import path from "path"

import {rollup} from 'rollup'
import typescript from "rollup-plugin-typescript2"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"

let outFile = ''

async function builder() {
    const out = await rollup({
        input: 'build/rollup.ts',
        external(id) {
            return /node_modules/.test(id)
        },
        plugins: [
            json(),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        sourceMap: true
                    }
                }
            }),
            resolve(),
            commonjs(),
            terser()
        ]
    })

    function genOutFile() {
        do {
            outFile = (Math.random() * 100).toString(36) + '-tmp.mjs'
        } while (fs.existsSync(outFile))
    }

    genOutFile()
    await out.write({
        format: 'esm',
        file: outFile,
        sourcemap: 'inline'
    })
    outFile = path.resolve('./', outFile)
    await out.close()
}

builder().then(async () => {
    await import('file://' + outFile)
}).finally(() => {
    fs.rmSync(outFile)
})
