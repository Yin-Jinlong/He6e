import {ModuleFormat} from 'rollup'

/**
 * 输出选项
 */
export declare interface OutputOption {
    /**
     * 输出格式
     */
    format: ModuleFormat,
    /**
     * 输出目录，可以是相对路径，也可以是绝对路径
     */
    dir: string
    /**
     * 输出（js）文件扩展名，不需要加 .
     */
    ext?: string
}

/**
 * 构建选项
 */
export declare interface BuildOptions {
    /**
     * 名称
     */
    name: string
    /**
     * 输入文件路径
     */
    input: string
    /**
     * 输出目录
     */
    dist: string
    /**
     * 是否保留模块
     */
    preserveModules?: boolean
    /**
     * 输出选项
     */
    output: OutputOption[]
}
