import {SelectTi} from "@/types";

export type SelectCardType = 'radio' | 'multi' | 'judge'

export declare interface SelectCardProps {
    type: SelectCardType
    confirm: boolean
    ti: SelectTi<string>
}
