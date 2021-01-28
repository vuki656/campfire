import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import theme from '../../../lib/variables/theme'

import type { HomeCampfireCardProps } from './HomeCampfireCard.types'

const styles = StyleSheet.create({
    createdBy: {
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.annotation,
    },
    emoji: {
        fontSize: theme.fontSize.subtitle,
    },
    header: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    root: {
        backgroundColor: theme.color.white,
        borderColor: theme.color.black,
        borderRadius: 5,
        borderWidth: 4,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
        padding: 15,
        width: '100%',
    },
    title: {
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.subtitle,
        marginLeft: 10,
    },
})

export const HomeCampfireCard = (props: HomeCampfireCardProps) => {
    const { campfire } = props

    const navigator = useNavigation()

    const handleNavigation = () => {
        navigator.navigate('Campfire', { campfire: campfire })
    }

    return (
        <TouchableOpacity
            onPress={handleNavigation}
            style={styles.root}
        >
            <View style={styles.header}>
                <Text style={styles.emoji}>
                    {campfire.emoji}
                </Text>
                <Text style={styles.title}>
                    {campfire.name}
                </Text>
            </View>
            <Text style={styles.createdBy}>
                <Text>
                    Author:
                    {' '}
                </Text>
                {campfire.author.name}
            </Text>
        </TouchableOpacity>
    )
}
