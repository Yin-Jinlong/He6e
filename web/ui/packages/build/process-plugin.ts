export declare interface ProcessPluginHook {
    transform?: (id: string) => void
    buildEnd?: () => void
}

/**
 * Rollup进度插件
 * @param hook 插件钩子
 */
export function rollupProcessPlugin(hook: ProcessPluginHook) {
    return {
        name: 'process-hook',
        transform(code: string, id: string) {
            hook?.transform?.call(this, id)
        },
        buildEnd() {
            hook?.buildEnd?.call(this)
        }
    } // as FunctionPluginHooks
}
