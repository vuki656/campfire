import type { TextInputProps } from 'react-native'

export type TextFieldProps = TextInputProps & {
    value: string
    secure?: boolean
    fullWidth?: boolean
    error?: boolean
    helperText?: string
    required?: boolean
}
