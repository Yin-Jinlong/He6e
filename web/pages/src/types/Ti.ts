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
