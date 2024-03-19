import {DefinedNamedColor} from "components/types"

/**
 * 按钮样式
 */
export type YjlButtonType = '' | 'primary' | 'text' | 'plain'
export type YjlButtonSize = 'default' | 'small' | 'large' | 'xlarge'

export declare interface YjlButtonProps {
    type?: YjlButtonType
    color?: string | DefinedNamedColor
    size?: YjlButtonSize
    /**
     * 边框
     */
    border?: boolean
    /**
     * 阴影
     */
    shadow?: boolean
}
