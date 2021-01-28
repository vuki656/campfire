import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
// @ts-expect-error // Doesn't have types
import RNUrlPreview from 'react-native-url-preview'

import theme from '../../../lib/variables/theme'

import type { CampfireLogCardProps } from './CampfireLogCard.types'

const styles = StyleSheet.create({
    authorContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    authorName: {
        fontSize: theme.fontSize.caption,
        fontWeight: 'bold',
    },
    authorPrefix: {
        fontSize: theme.fontSize.caption,
        marginRight: 3,
    },
    description: {
        borderColor: theme.color.black,
        borderTopWidth: 2,
        fontSize: theme.fontSize.subtitle,
        padding: 10,
    },
    link: {
        padding: 10,
    },
    root: {
        borderColor: theme.color.black,
        borderRadius: 6,
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
})

export const CampfireLogCard = (props: CampfireLogCardProps) => {
    const { log } = props

    return (
        <View
            key={log.id}
            style={styles.root}
        >
            <View style={styles.link}>
                <RNUrlPreview text={log.link} />
                <View style={styles.authorContainer}>
                    <Text style={styles.authorPrefix}>
                        Posted by:
                    </Text>
                    <Text style={styles.authorName}>
                        {log.metadata.author.name}
                    </Text>
                </View>
            </View>
            {log.description ? (
                <Text style={styles.description}>
                    {log.description}
                </Text>
            ) : null}
        </View>
    )
}
