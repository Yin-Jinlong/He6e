export interface Ti {
    type: 'select' | 'judge'
}

export declare interface TiOption<T> {
    content: T,
    right?: boolean
}

export declare interface SelectTi<T> extends Ti {
    type: 'select'
    title: string
    options: TiOption<T>[]
}

export declare interface JudgeTi extends Ti {
    type: 'judge'
    title: string
    right?: boolean
}
