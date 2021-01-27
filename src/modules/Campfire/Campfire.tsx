import { useNavigation } from '@react-navigation/native'
import firebase from 'firebase'
import * as React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../components/Button'
import { Collections } from '../../lib/Collections'
import { getCurrentUser } from '../../lib/getCurrentUser'

import type {
    CampfireProps,
    LogType,
} from './Campfire.types'
import { CampfireAddDialog } from './CampfireAddDialog/CampfireAddDialog'
import { CampfireLogCard } from './CampfireLogCard/CampfireLogCard'

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: 'white',
        height: 30,
        width: 100,
    },
    headerBar: {
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 6,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            height: 3,
            width: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        width: '100%',
    },
    headerEmoji: {
        fontSize: 20,
        marginRight: 10,
    },
    headerTitle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerTitleText: {
        fontFamily: 'MPlus',
        fontSize: 20,
    },
    inviteButton: {
        backgroundColor: 'white',
        height: 30,
        marginBottom: 20,
        width: 150,
    },
    root: {
        padding: 20,
    },
    safeAreaView: {
        height: '100%',
    },
})

export const Campfire = (props: CampfireProps) => {
    const { route } = props

    const navigator = useNavigation()
    const user = getCurrentUser()

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
        setLogs([])

        void firebase
            .firestore()
            .collection(Collections.LOGS)
            .where('metadata.campfire.id', '==', id)
            .get()
            .then((result) => {
                result.forEach((singleResult) => {
                    const log = singleResult.data() as LogType

                    setLogs((currentLogs) => {
                        return [...currentLogs, log]
                    })
                })
            })

    }

    React.useEffect(() => {
        fetchLogs()
    }, [])

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.headerBar}>
                <Button
                    label="Back"
                    onPress={handleBack}
                    style={styles.backButton}
                />
                <View style={styles.headerTitle}>
                    <Text style={styles.headerEmoji}>
                        {emoji}
                    </Text>
                    <Text style={styles.headerTitleText}>
                        {name}
                    </Text>
                </View>
            </View>
            <View style={styles.root}>
                {author.id === user?.uid ? (
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
        </SafeAreaView>
    )
}
