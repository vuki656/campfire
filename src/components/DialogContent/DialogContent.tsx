import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import type { DialogContentProps } from './DialogContent.types'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
})

export const DialogContent = (props: DialogContentProps) => {
    const { children } = props

    return (
        <View style={styles.root}>
            {children}
        </View>
    )
}
