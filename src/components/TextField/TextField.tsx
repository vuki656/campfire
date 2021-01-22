import React from 'react'
import type { TextStyle } from 'react-native'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

import type { TextFieldProps } from './TextField.types'

const styles = StyleSheet.create({
    field: {
        borderColor: 'black',
        borderRadius: 4,
        borderWidth: 3,
        paddingHorizontal: 10,
    },
    // @ts-expect-error
    helperText: (error: boolean) => ({
        color: error ? 'red' : '#5f7d95',
        fontFamily: 'MPlus',
        fontSize: 10,
        marginTop: 3,
    }),
    label: {
        fontFamily: 'MPlus',
        fontSize: 20,
        marginBottom: 5,
    },
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 15,
        width: '100%',
    },
})

export const TextField = (props: TextFieldProps) => {
    const {
        label,
        onChangeText,
        value,
        helperText,
        styles: stylesProp,
        fullWidth = false,
        error = false,
        secure = false,
        ...other
    } = props

    return (
        <View style={styles.root}>
            <Text style={styles.label}>
                {label}
            </Text>
            <TextInput
                {...other}
                onChangeText={onChangeText}
                secureTextEntry={secure}
                style={[{ width: fullWidth ? '100%' : styles.field.width  }, styles.field, stylesProp ]}
                value={value}
            />
            {helperText ? (
                // @ts-expect-error
                <Text style={styles.helperText(error)}>
                    {helperText}
                </Text>
            ) : null}
        </View>
    )
}
