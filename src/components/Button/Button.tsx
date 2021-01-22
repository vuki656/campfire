import React from 'react'
import type { TextStyle } from 'react-native'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

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
        labelFontSize = 18,
        style: stylesProp,
        ...other
    } = props

    return (
        <TouchableOpacity
            style={StyleSheet.compose<TextStyle>(styles.root, stylesProp)}
            {...other}
        >
            {startIcon ? startIcon : null}
            <Text style={StyleSheet.compose<TextStyle>(styles.label, { fontSize: labelFontSize })}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}
