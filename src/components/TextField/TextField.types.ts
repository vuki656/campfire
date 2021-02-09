import type { TextInputProps } from 'react-native'

export type LabelPositionType = 'center' | 'start' | 'end'

export type TextFieldProps = TextInputProps & {
    label?: string
    value: string
    secure?: boolean
    fullWidth?: boolean
    labelPosition?: LabelPositionType
    error?: boolean
    helperText?: string
    required?: boolean
}

