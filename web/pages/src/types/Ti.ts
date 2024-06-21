export type TiType = 'select' | 'judge' | 'essay' | 'fill'

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

export declare interface EssayTi extends Ti {
    type: 'essay'
    points: string[]
}

export declare interface FillTi extends Ti {
    type: 'fill'

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
 * 解析简答题
 * @param json 对象
 */
function parseEssayTi(json: EssayTi): EssayTi | null {
    if (!json.points || !Array.isArray(json.points) || json.points.length < 1)
        return null
    return {
        type: 'essay',
        title: json.title,
        points: json.points
    } as EssayTi
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
    switch (json.type as TiType) {
        case 'select':
            return parseSelectTi(json);
        case 'judge':
            return {
                type: 'judge',
                title: json.title,
                right: json.right
            } as JudgeTi
        case 'essay':
            return parseEssayTi(json);
        default:
            return null
    }
}
