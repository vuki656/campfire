import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { DialogHeaderProps } from './DialogHeader.types'

const styles = StyleSheet.create({
    icon: {
        fontSize: 10,
    },
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
    titleContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
})
export const DialogHeader = (props: DialogHeaderProps) => {
    const {
        title,
        startIcon,
        note,
    } = props

    return (
        <View style={styles.root}>
            <View style={styles.titleContainer}>
                {startIcon ? startIcon : null}
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            {note ? (
                <Text style={styles.note}>
                    {note}
                </Text>
            ) : null}
        </View>
    )
}
