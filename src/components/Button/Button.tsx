import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { ButtonProps } from './Button.types'

const styles = StyleSheet.create({
    label: {
        color: theme.color.black,
        fontFamily: theme.fontFamily.mPlus,
    },
    root: {
        alignItems: 'center',
        backgroundColor: theme.color.orange,
        borderColor: theme.color.black,
        borderRadius: 5,
        borderWidth: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        width: 'auto',
    },
})

export const Button = (props: ButtonProps) => {
    const {
        label,
        labelFontSize = 18,
        startIcon,
        style: stylesProperty,
        variant = 'primary',
        ...other
    } = props

    return (
        <TouchableOpacity
            style={[
                styles.root,
                stylesProperty, {
                    backgroundColor: variant === 'secondary'
                        ? theme.color.orange
                        : theme.color.white,
                },
            ]}
            {...other}
        >
            {startIcon ? startIcon : null}
            <Text style={[styles.label, { fontSize: labelFontSize }]}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}
