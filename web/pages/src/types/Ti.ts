export declare interface TiOption<T> {
    content: T,
    right?: boolean
}

export declare interface SelectTi<T> {
    title: string
    options: TiOption<T>[]
}
