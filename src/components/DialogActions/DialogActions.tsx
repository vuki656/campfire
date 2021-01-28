import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import type { DialogActionsProps } from './DialogActions.types'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
})

export const DialogActions = (props: DialogActionsProps) => {
    const { children } = props

    return (
        <View style={styles.root}>
            {children}
        </View>
    )
}
