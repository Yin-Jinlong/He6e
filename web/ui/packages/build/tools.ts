import * as process from "process";

let os=process.stdout

/**
 * 输出（到stdout）
 * @param text 输出内容
 */
export function out(...text: (string | Uint8Array)[]) {
    for (const t of text) {
        os.write(t)
    }
}

/**
 * 输出（到stdout）并换行
 * @param text 输出内容
 */
export function outln(...text: (string | Uint8Array)[]) {
    out(...text)
    os.write('\n')
}

/**
 * 转换（耗时）时间（到字符串）
 * @param time 时间
 */
export function convertTime(time: number): string {
    let ms = time % 1000
    time = Math.floor(time / 1000)
    let s = time % 60
    time = Math.floor(time / 60)
    return time === 0 ? `${s}.${ms}s` : `${time}m${s}.${ms}s`
}
