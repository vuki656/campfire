import firebase from 'firebase'
import * as React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { Button } from '../../components/Button'
import { Collections } from '../../lib/Collections'
import { getCurrentUser } from '../../lib/getCurrentUser'
import { useCurrentUserData } from '../../lib/useCurrentUserData'
import type { CampfireType } from '../Campfire'

import type { InviteType } from './Invites.types'

const styles = StyleSheet.create({
    cancelButton: {
        backgroundColor: 'white',
        marginRight: 5,
    },
    headerBar: {
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 6,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'flex-end',
        marginTop: 50, // TODO: FIX
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
    headerTitle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerTitleText: {
        fontFamily: 'MPlus',
        fontSize: 20,
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
    const user = getCurrentUser()
    const userData = useCurrentUserData()

    const [invites, setInvites] = React.useState<InviteType[]>([])

    const fetchInvites = () => {
        setInvites([])

        void firebase
            .firestore()
            .collection(Collections.INVITES)
            .where('to.id', '==', user?.uid)
            .get()
            .then((result) => {
                result.forEach((singleResult) => {
                    const invite = singleResult.data() as InviteType

                    setInvites((currentInvites) => {
                        return [...currentInvites, invite]
                    })
                })
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
            .doc(user?.uid)
            .update({
                memberOf: [...userData?.memberOf ?? [], invite.campfire ],
            })
            .then(() => {
                deleteInvite(invite.id)
            })
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View>
                <View style={styles.headerBar}>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerTitleText}>
                            Campfire Invites
                        </Text>
                    </View>
                </View>
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
