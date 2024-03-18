import fs from 'fs'
import {performance} from 'perf_hooks'
import readline from 'readline'
import chalk from 'chalk'

import {OutputOptions as RollupOuts, Plugin, rollup} from 'rollup'
import config from '../build.config.ts'

import {color, convertSize, convertTime, out, outln} from "./tools.ts"
import {rollupProcessPlugin} from "./process-plugin.ts"


const startTime = performance.now()

/**
 * 生成输出配置
 *
 * 从build.config.ts生成所有输出配置
 *
 * @return 输出配置
 */
function genOuts(): RollupOuts[] {
    let outs: RollupOuts[] = []
    for (const o of config.output) {
        let jsName = `[name].${o.ext ?? 'js'}`
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

/**
 * 获取输出路径
 *
 * @return 输出路径
 */
function getOutPaths(): string[] {
    return config.output.map(o => o.dir)
}

/**
 * 删除文件
 * @param file 文件路径
 */
function del(file: fs.PathLike) {
    if (fs.existsSync(file)) {
        outln(color.danger('delete '), color.path(file))
        fs.rmSync(file, {recursive: true, force: true})
    }
}

/**
 * 删除输出目录
 */
function delOuts() {
    let outs = [config.dist, ...getOutPaths()]
    for (const path of outs) {
        del(path)
    }
}

/**
 * 进度插件
 *
 * @return Rollup插件
 */
function processPlugin(): Plugin {
    /**
     * 清空行，并到行开头
     */
    function lineStart() {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
    }

    let count = 0
    return rollupProcessPlugin({
        transform(id: string) {
            let w = process.stdout.columns
            let head = `transform(${++count}) `
            let content = id
            let rw = w - head.length
            if (content.length > rw) // 超出宽度
                content = '...' + content.substring(content.length - rw + 3, content.length)
            lineStart()
            out(color.cmd('transform'), `(${count}) ${color.gray(content)}`)
        },
        buildEnd() {
            lineStart()
            outln(color.action('transformed '), color.num(count), ' modules')
        },
        writeBundle(files: string[]) {
            let sizeAll = 0
            files.forEach(f => {
                let w = process.stdout.columns
                out(chalk.yellow(f))
                let {size} = fs.statSync(f)
                sizeAll += size
                let sizeStr = convertSize(size)
                let sizeStrLen = sizeStr.size.toString().length + sizeStr.unit.length
                // 如果空间不够了则换行
                if (w - f.length % w < sizeStrLen + 1)
                    outln()
                readline.cursorTo(process.stdout, w - sizeStrLen)
                outln(color.emphasize(sizeStr.size), sizeStr.unit)
            })
            let sizeStr = convertSize(sizeAll)
            outln(color.action('written '), color.num(files.length), 'files, ', color.emphasize(sizeStr.size), sizeStr.unit)
        }
    })
}

/**
 * 构建
 */
async function build() {
    // 删除输出目录
    delOuts()

    outln(color.cmd('build'), ' start...')

    let plugins = [processPlugin()]
    if (config.plugins)
        plugins.push(...config.plugins)
    let outs = genOuts()
    let buildOut = await rollup({
        input: config.input,
        external: id => {
            return /node_modules/.test(id);
        },
        output: outs,
        plugins
    })

    // 输出
    for (const out of outs) {
        outln(color.cmd('write '), color.emphasize(out.format!), '...')
        await buildOut.write(out)
    }
    await buildOut.close
}

build().then(() => {
    outln(color.action('took '), convertTime(performance.now() - startTime))
})
