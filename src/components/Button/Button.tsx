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
        color: 'black',
        fontFamily: 'MPlus',
    },
    root: {
        alignItems: 'center',
        backgroundColor: '#f78e00',
        borderColor: 'black',
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
        startIcon,
        variant = 'primary',
        labelFontSize = 18,
        style: stylesProp,
        ...other
    } = props

    return (
        <TouchableOpacity
            style={[
                styles.root,
                stylesProp, {
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
