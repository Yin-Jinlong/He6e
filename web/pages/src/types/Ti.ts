export type TiType = 'select' | 'judge'

export interface Ti {
    type: TiType
    title: string
}

export declare interface TiOption<T> {
    content: T,
    right?: boolean
}

export declare interface SelectTi<T> extends Ti {
    type: 'select'
    options: TiOption<T>[]
}

export declare interface JudgeTi extends Ti {
    type: 'judge'
    right?: boolean
}

export declare interface TiJson {
    version: number
    data: Ti[]
}

function isTiOption(obj: any | undefined): boolean {
    return obj && obj.content
}

function parseSelectTi<T>(json: SelectTi<T>): SelectTi<T> | null {
    if (!json.options || !Array.isArray(json.options) || json.options.length < 2)
        return null
    let os: TiOption<T>[] = []
    for (const o of json.options) {
        if (isTiOption(o))
            os.push(o)
    }
    return {
        type: 'select',
        title: json.title,
        options: os
    } as SelectTi<T>
}

/**
 *
 * 解析题目
 * @param json 对象
 *
 * @return 题目或null（不合法）
 *
 * @author YJL
 */
export function parseTi(json: any | undefined): Ti | null {
    if (!json || !json.type || !json.title)
        return null
    switch (json.type) {
        case 'select':
            return parseSelectTi(json);
        case 'judge':
            return {
                type: 'judge',
                title: json.title,
                right: json.right
            } as JudgeTi
        default:
            return null
    }
}
