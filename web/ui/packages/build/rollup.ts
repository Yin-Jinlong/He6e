import fs from 'fs'
import readline from 'readline'
import chalk from 'chalk'

import {rollup, Plugin, OutputOptions as RollupOuts} from 'rollup'
import config from '../build.config.ts'

import {out, outln, convertTime} from "./tools.ts"
import {rollupProcessPlugin} from "./process-plugin.ts"


/**
 * 输出命令（彩色）
 * @param cmd 命令
 * @param msg 消息
 * @param ln 是否换行
 */
function outCmd(cmd: string, msg: string, ln: boolean = true) {
    out(chalk.cyan(cmd), msg)
    if (ln)
        process.stdout.write('\n')
}

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
        outln(chalk.red('delete '), chalk.yellow(file))
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
            outCmd('transform', `(${count}) ${chalk.gray(content)}`, false)
        },
        buildEnd() {
            lineStart()
            outln(chalk.green('transformed '), chalk.greenBright(count.toString()), ' modules')
        }
    })
}

/**
 * 构建
 */
async function build() {
    // 删除输出目录
    delOuts()

    outCmd('build', ' start...')

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
    outCmd('write', ' output...')
    for (const out of outs) {
        await buildOut.write(out)
    }
}

let startTime = Date.now()
build().then(() => {
    let time = Date.now() - startTime
    outln(chalk.yellow('took '), convertTime(time))
})
