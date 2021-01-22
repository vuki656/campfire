import type React from 'react'
import type {
    StyleProp,
    TextStyle,
} from 'react-native'

export type TextFieldProps = {
    label?: string
    onChange(e: string | React.ChangeEvent<any>): void
    value: string
    secure?: boolean
    error?: boolean
    styles?: StyleProp<TextStyle>
    helperText?: string
}

