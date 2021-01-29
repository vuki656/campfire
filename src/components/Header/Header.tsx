import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { HeaderProps } from './Header.types'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: theme.color.white,
        display: 'flex',
        elevation: 6,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        shadowColor: theme.color.gray100,
        shadowOffset: {
            height: 3,
            width: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
})

export const Header = (props: HeaderProps) => {
    const {
        leftNode,
        rightNode,
    } = props

    const getPosition = () => {
        if (leftNode && rightNode) {
            return 'space-between'
        } else if (leftNode && !rightNode) {
            return 'flex-start'
        } else {
            return 'flex-end'
        }
    }

    return (
        <View
            style={[styles.root, {
                justifyContent: getPosition(),
            }]}
        >
            {leftNode}
            {rightNode}
        </View>
    )
}
