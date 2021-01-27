import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import theme from '../../../lib/variables/theme'

import type { DialogHeaderProps } from './DialogHeader.types'

const styles = StyleSheet.create({
    note: {
        color: theme.color.gray,
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.text,
        marginTop: 10,
    },
    root: {
        marginBottom: 20,
    },
    title: {
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.title,
    },
})
export const DialogHeader = (props: DialogHeaderProps) => {
    const {
        title,
        note,
    } = props

    return (
        <View style={styles.root}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.note}>
                {note}
            </Text>
        </View>
    )
}
