import * as React from 'react'
import {
    Modal,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'

import type { DialogProps } from './Dialog.types'

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
    },
})

export const Dialog = (props: DialogProps) => {
    const {
        children,
        isOpen,
        ...other
    } = props

    return (
        <Modal
            animationType="slide"
            presentationStyle="pageSheet"
            visible={isOpen}
            {...other}
        >
            <View>
                <ScrollView contentContainerStyle={styles.root}>
                    {children}
                </ScrollView>
            </View>
        </Modal>
    )
}
