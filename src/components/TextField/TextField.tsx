import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { TextFieldProps } from './TextField.types'

const styles = StyleSheet.create({
    // @ts-expect-error
    field: (multiline: boolean) => ({
        borderColor: theme.color.grayNew.light500,
        borderRadius: 7,
        borderWidth: 2,
        fontFamily: theme.fontFamily.mPlusRegular,
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlignVertical: multiline ? 'top' : 'center',
        width: '100%',
    }),
    // @ts-expect-error
    helperText: (error: boolean) => ({
        color: error ? theme.color.red : theme.color.gray200,
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.caption,
        marginTop: 3,
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
        error = false,
        fullWidth = false,
        helperText,
        multiline,
        onChangeText,
        required = false,
        secure = false,
        style,
        value,
        ...other
    } = props

    return (
        // @ts-expect-error
        <View style={styles.root(fullWidth)}>
            <TextInput
                {...other}
                multiline={multiline}
                onChangeText={onChangeText}
                secureTextEntry={secure}
                // @ts-expect-error
                style={[styles.field(multiline), style]}
                value={value}
            />
            {helperText ?
                (
                    // @ts-expect-error
                    <Text style={styles.helperText(error)}>
                        {helperText}
                    </Text>
                )
                : null}
        </View>
    )
}
