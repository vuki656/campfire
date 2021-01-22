import type {
    StyleProp,
    TextInputProps,
    TextStyle,
} from 'react-native'

export type TextFieldProps = TextInputProps & {
    label?: string
    value: string
    secure?: boolean
    error?: boolean
    styles?: StyleProp<TextStyle>
    helperText?: string
}

