import {Ti} from '@/types'


export declare interface SelectCardProps {
    tiIndex: number
    confirm: boolean
    ti: Ti

    onShow(right:boolean): void
}

export declare interface SelectCardExpose {
    reset(): void
}
