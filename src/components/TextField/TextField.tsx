import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type {
    LabelPositionType,
    TextFieldProps,
} from './TextField.types'

const styles = StyleSheet.create({
    // @ts-expect-error
    field: (multiline: boolean) => ({
        borderColor: theme.color.black,
        borderRadius: 4,
        borderWidth: 3,
        paddingHorizontal: 10,
        paddingTop: multiline ? 10 : 0,
        textAlignVertical: multiline ? 'top' : 'auto',
        width: '100%',
        flexShrink: 1,
    }),
    // @ts-expect-error
    helperText: (error: boolean) => ({
        color: error ? theme.color.red : theme.color.gray200,
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.caption,
        marginTop: 3,
    }),
    label: {
        fontFamily: theme.fontFamily.mPlus,
        fontSize: 20,
        marginBottom: 5,
    },
    // @ts-expect-error
    labelContainer: (labelPosition: LabelPositionType) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: labelPosition === 'center' ? 'center' : `flex-${labelPosition}`,
        width: '100%',
    }),
    // @ts-expect-error
    root: (fullWidth: boolean) => ({
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 15,
        width: fullWidth ? '100%' : '65%',
    }),
})

export const TextField = (props: TextFieldProps) => {
    const {
        label,
        onChangeText,
        value,
        helperText,
        style,
        labelPosition = 'start',
        required = false,
        fullWidth = false,
        error = false,
        secure = false,
        multiline,
        ...other
    } = props

    return (
        // @ts-expect-error
        <View style={styles.root(fullWidth)}>
            {/*
            // @ts-expect-error */}
            <View style={styles.labelContainer(labelPosition)}>
                <Text style={styles.label}>
                    {label}
                    <Text>
                        {required ? '*' : ''}
                    </Text>
                </Text>
            </View>
            <TextInput
                {...other}
                multiline={multiline}
                onChangeText={onChangeText}
                secureTextEntry={secure}
                // @ts-expect-error
                style={[styles.field(multiline), style]}
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
