import type React from 'react'
import type { TouchableOpacityProps } from 'react-native'

export type ButtonProps = TouchableOpacityProps & {
    label?: string
    labelFontSize?: number
    startIcon?: React.ReactElement
}
