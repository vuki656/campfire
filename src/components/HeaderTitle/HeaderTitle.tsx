import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { HeaderTitleProps } from './HeaderTitle.types'

const styles = StyleSheet.create({
    headerEmoji: {
        fontSize: theme.fontSize.subtitle,
        marginRight: 10,
    },
    headerTitle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerTitleText: {
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.subtitle,
    },
})

export const HeaderTitle = (props: HeaderTitleProps) => {
    const {
        title,
        emoji,
    } = props

    return (
        <View style={styles.headerTitle}>
            {emoji ? (
                <Text style={styles.headerEmoji}>
                    {emoji}
                </Text>
            ) : null}
            <Text style={styles.headerTitleText}>
                {title}
            </Text>
        </View>
    )
}
