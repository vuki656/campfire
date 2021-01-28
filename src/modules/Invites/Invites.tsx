import firebase from 'firebase'
import * as React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import {
    Button,
    Header,
    HeaderTitle,
} from '../../components'
import {
    Collections,
    useCurrentUser,
} from '../../lib'

import type { InviteType } from './Invites.types'

const styles = StyleSheet.create({
    cancelButton: {
        marginRight: 5,
    },
    invite: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inviteActions: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    invitePerson: {
        fontWeight: 'bold',
    },
    inviteTitle: {
        fontFamily: 'MPlus',
        fontSize: 30,
    },
    root: {
        padding: 20,
    },
    safeAreaView: {
        height: '100%',
    },
})

export const Invites: React.FunctionComponent = () => {
    const user = useCurrentUser()

    const [invites, setInvites] = React.useState<InviteType[]>([])

    const fetchInvites = () => {
        void firebase
            .firestore()
            .collection(Collections.INVITES)
            .where('to.id', '==', user?.id)
            .get()
            .then((results) => {
                const fetchedInvites: InviteType[] = []

                results.forEach((result) => {
                    const fetchedInvite = result.data() as InviteType

                    fetchedInvites.push(fetchedInvite)
                })

                setInvites(fetchedInvites)
            })
    }

    React.useEffect(() => {
        fetchInvites()
    }, [])

    const deleteInvite = (inviteId: string) => {
        void firebase
            .firestore()
            .collection(Collections.INVITES)
            .doc(inviteId)
            .delete()
            .then(() => {
                fetchInvites()
            })
    }

    const handleInviteCancel = (inviteId: string) => () => {
        deleteInvite(inviteId)
    }

    const handleInviteAccept = (invite: InviteType) => () => {
        void firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(user?.id)
            .update({
                memberOf: [...user?.memberOf ?? [], invite.campfire ],
            })
            .then(() => {
                deleteInvite(invite.id)
            })
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View>
                <Header
                    rightNode={
                        <HeaderTitle title="Campfire Invites" />
                    }
                />
                <View style={styles.root}>
                    {invites.map((invite) => {
                        return (
                            <View
                                key={invite.id}
                                style={styles.invite}
                            >
                                <View>
                                    <Text style={styles.inviteTitle}>
                                        {invite.campfire.name}
                                    </Text>
                                    <Text>
                                        <Text style={styles.invitePerson}>
                                            {invite.from.name}
                                        </Text>
                                        <Text>
                                            {' '}
                                            has invited you
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.inviteActions}>
                                    <Button
                                        label="✖"
                                        onPress={handleInviteCancel(invite.id)}
                                        style={styles.cancelButton}
                                    />
                                    <Button
                                        label="✔"
                                        onPress={handleInviteAccept(invite)}
                                    />
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </SafeAreaView>
    )
}
