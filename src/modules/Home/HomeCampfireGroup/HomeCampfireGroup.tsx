import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

import theme from '../../../lib/variables/theme'
import { HomeCampfireCard } from '../HomeCampfireCard'

import type { HomeCampfireGroupProps } from './HomeCampfireGroup.types'

const styles = StyleSheet.create({
    list: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    title: {
        fontFamily: theme.fontFamily.MPLUS,
        fontSize: 30,
        marginBottom: 20,
    },
})

export const HomeCampfireGroup = (props: HomeCampfireGroupProps) => {
    const { campfires, title } = props

    if (!campfires.length) {
        return null
    }

    return (
        <View style={styles.root}>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.list}>
                {campfires.map((campfire) => {
                    return (
                        <HomeCampfireCard
                            campfire={campfire}
                            key={campfire.id}
                        />
                    )
                })}
            </View>
        </View>
    )
}