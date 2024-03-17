import {ModuleFormat} from 'rollup'

export declare interface OutputOption {
    format: ModuleFormat,
    dir: string
    ext?: string
}

export declare interface BuildOptions {
    name: string
    input: string
    dist: string
    preserveModules?: boolean
    output: OutputOption[]
}
