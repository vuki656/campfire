import * as React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { HomeNewCampfireDialog } from '../../modules/Home/HomeNewCampfireDialog'

import type { HeaderProps } from './Header.types'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        display: 'flex',
        elevation: 6,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            height: 3,
            width: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
})

export const Header = (props: HeaderProps) => {
    const { leftNode, rightNode } = props

    return (
        <View style={styles.root}>
            {leftNode}
            {rightNode}
        </View>
    )
}
