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
// @ts-expect-error // Doesn't have types
import RNUrlPreview from 'react-native-url-preview'

import { Button } from '../../components/Button'
import { Collections } from '../../lib/Collections'

import type {
    CampfireProps,
    LogType,
} from './Campfire.types'
import { CampfireAddDialog } from './CampfireAddDialog/CampfireAddDialog'

const styles = StyleSheet.create({
    authorContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    authorName: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    authorPrefix: {
        fontSize: 10,
    },
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
    logDescription: {
        borderColor: 'black',
        borderTopWidth: 2,
        fontSize: 17,
        padding: 10,
    },
    logLink: {
        padding: 10,
    },
    logRoot: {
        borderColor: 'black',
        borderRadius: 6,
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: 20,
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

    const [logs, setLogs] = React.useState<LogType[]>([])

    const handleBack = () => {
        navigator.goBack()
    }

    const {
        name,
        id,
        emoji,
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
                <ScrollView>
                    {logs.map((log) => {
                        return (
                            <View
                                key={log.id}
                                style={styles.logRoot}
                            >
                                <View style={styles.logLink}>
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
                                    <Text style={styles.logDescription}>
                                        {log.description}
                                    </Text>
                                ) : null}
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <CampfireAddDialog id={id} />
        </SafeAreaView>
    )
}
