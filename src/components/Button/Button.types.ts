import type React from 'react'
import type { TouchableOpacityProps } from 'react-native'

export type ButtonVariant = 'primary' | 'secondary'

export type ButtonProps = TouchableOpacityProps & {
    label?: string
    labelFontSize?: number
    variant?: ButtonVariant
    startIcon?: React.ReactElement
}
