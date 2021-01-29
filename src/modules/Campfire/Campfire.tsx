import { useNavigation } from '@react-navigation/native'
import firebase from 'firebase'
import * as React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import {
    Button,
    Header,
} from '../../components'
import {
    Collections,
    useCurrentUser,
} from '../../lib'
import theme from '../../lib/variables/theme'

import type {
    CampfireProps,
    LogType,
} from './Campfire.types'
import { CampfireAddDialog } from './CampfireAddDialog/CampfireAddDialog'
import { CampfireLogCard } from './CampfireLogCard/CampfireLogCard'

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: theme.color.white,
        height: 30,
        width: 100,
    },
    headerEmoji: {
        fontSize: theme.fontSize.subtitle,
        marginRight: 10,
        textAlign: 'right',
    },
    headerTitle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        maxWidth: 150,
    },
    headerTitleText: {
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.subtitle,
        textAlign: 'left',
    },
    inviteButton: {
        backgroundColor: theme.color.white,
        height: 30,
        marginBottom: 20,
        width: 150,
    },
    root: {
        height: '85%',
        padding: 20,
    },
})

export const Campfire = (props: CampfireProps) => {
    const { route } = props

    const navigator = useNavigation()
    const user = useCurrentUser()

    const [logs, setLogs] = React.useState<LogType[]>([])

    const handleBack = () => {
        navigator.goBack()
    }

    const handleInvite = () => {
        navigator.navigate('CampfireInvite', { campfire: route.params.campfire })
    }

    const {
        name,
        id,
        emoji,
        author,
    } = route.params.campfire

    const fetchLogs = () => {
        void firebase
            .firestore()
            .collection(Collections.LOGS)
            .where('metadata.campfire.id', '==', id)
            .get()
            .then((result) => {
                const fetchedLogs: LogType[] = []

                result.forEach((singleResult) => {
                    const fetchedLog = singleResult.data() as LogType

                    fetchedLogs.push(fetchedLog)
                })

                setLogs(fetchedLogs)
            })
    }

    React.useEffect(() => {
        fetchLogs()
    }, [])

    return (
        <View>
            <Header
                leftNode={(
                    <Button
                        label="Back"
                        onPress={handleBack}
                        style={styles.backButton}
                    />
                )}
                rightNode={(
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerEmoji}>
                            {emoji}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={styles.headerTitleText}
                        >
                            {name}
                        </Text>
                    </View>
                )}
            />
            <View style={styles.root}>
                {author.id === user?.id ? (
                    <Button
                        label="Invite"
                        onPress={handleInvite}
                        style={styles.inviteButton}
                    />
                ) : null}
                <ScrollView>
                    {logs.map((log) => {
                        return (
                            <CampfireLogCard
                                key={log.id}
                                log={log}
                            />
                        )
                    })}
                </ScrollView>
            </View>
            <CampfireAddDialog id={id} />
        </View>
    )
}
