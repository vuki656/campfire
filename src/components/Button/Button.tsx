import React from 'react'
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
    const { label, ...other } = props

    return (
        <TouchableOpacity
            style={styles.root}
            {...other}
        >
            <Text style={styles.label}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}
