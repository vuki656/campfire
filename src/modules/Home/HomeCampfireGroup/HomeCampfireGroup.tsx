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
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.title,
        marginBottom: 20,
    },
})

export const HomeCampfireGroup = (props: HomeCampfireGroupProps) => {
    const { campfires, title } = props

    if (!campfires?.length) {
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
