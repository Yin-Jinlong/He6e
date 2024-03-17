import ts from 'ts-node'
import fs from 'fs'
import readline from 'readline'
import chalk from 'chalk'

import {rollup, Plugin, OutputOptions as RollupOuts, FunctionPluginHooks} from 'rollup'
import config from '../build.config.ts'
import vuePlugin from "@vitejs/plugin-vue"
import postcss from "rollup-plugin-postcss"
import typescript from "rollup-plugin-typescript2"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

ts.register()

function out(...text: string[]) {
    process.stdout.write(text.join(''))
}

function outln(...text: string[]) {
    out(...text)
    process.stdout.write('\n')
}

function outCmd(cmd: string, msg: string, ln: boolean = true) {
    out(chalk.cyan(cmd), msg)
    if (ln)
        process.stdout.write('\n')
}

function genOuts(): RollupOuts[] {
    let outs: RollupOuts[] = []
    for (const o of config.output) {
        let jsName = o.ext ? `[name].${o.ext}` : '[name].js'
        outs.push({
            exports: "named",
            sourcemap: true,
            entryFileNames: jsName,
            chunkFileNames: jsName,
            format: o.format,
            dir: o.dir,
            preserveModules: config.preserveModules
        })
    }
    return outs
}

function getOutPaths(): string[] {
    return config.output.map(o => o.dir)
}

function del(file: fs.PathLike) {
    if (fs.existsSync(file)) {
        outln(chalk.red('delete '), chalk.yellow(file))
        fs.rmSync(file, {recursive: true, force: true})
    }
}

function delOuts() {
    let outs = [config.dist, ...getOutPaths()]
    for (const path of outs) {
        del(path)
    }
}

function processPlugin(): Plugin {
    function lineStart() {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
    }

    let count = 0
    return {
        name: 'process',
        transform(code: string, id: string) {
            let w = process.stdout.columns
            let head = `transform(${++count}) `
            let content = id
            let rw = w - head.length
            if (content.length > rw)
                content = '...' + content.substring(content.length - rw + 3, content.length)
            lineStart()
            outCmd('transform', `(${count}) ${chalk.gray(content)}`, false)
        },
        buildEnd() {
            lineStart()
            outln(chalk.green('transformed '), chalk.greenBright(count.toString()), ' modules')
        }
    } //as FunctionPluginHooks
}

async function build() {
    delOuts()

    outCmd('build', ' start...')

    let outs = genOuts()
    let buildOut = await rollup({
        input: config.input,
        external: id => {
            return /node_modules/.test(id);
        },
        output: outs,
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
            processPlugin()
        ],
    })

    outCmd('write', ' output...')
    for (const out of outs) {
        await buildOut.write(out)
    }
}

function convertTime(time: number): string {
    let ms = time % 1000
    time = Math.floor(time / 1000)
    let s = time % 60
    time = Math.floor(time / 60)
    return time === 0 ? `${s}.${ms}s` : `${time}m${s}.${ms}s`
}

let startTime = Date.now()
build().then(() => {
    let time = Date.now() - startTime
    outln(chalk.yellow('took '), convertTime(time))
})
