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
        fontSize: 18,
    },
    root: {
        backgroundColor: '#f78e00',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 3,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
})

export const Button = (props: ButtonProps) => {
    const {
        label,
        style: stylesProp,
        ...other
    } = props

    return (
        <TouchableOpacity
            style={StyleSheet.compose<TextStyle>(styles.root, stylesProp)}
            {...other}
        >
            <Text style={styles.label}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}
