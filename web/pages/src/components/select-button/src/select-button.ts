export type SelectButtonStatus = '' | 'selected' | 'success' | 'failed' | 'half-right'

export declare interface SelectButtonProps {
    i: number
    text: string
    status: SelectButtonStatus
}
