import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    Button,
    Header,
    HeaderTitle,
} from '../../components'
import {
    Collections,
    connection,
    useCurrentUser,
} from '../../lib'
import theme from '../../lib/variables/theme'

import type { InviteType } from './Invites.types'

const styles = StyleSheet.create({
    button: {
        width: 150,
    },
    invite: {
        alignItems: 'center',
        borderColor: theme.color.black,
        borderRadius: 5,
        borderWidth: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    inviteActions: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%',
    },
    invitePerson: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inviteTitle: {
        fontFamily: 'MPlus',
        fontSize: 30,
        textAlign: 'center',
    },
    root: {
        padding: 20,
    },
})

export const Invites: React.FunctionComponent = () => {
    const user = useCurrentUser()

    const [invites, setInvites] = React.useState<InviteType[]>([])

    const fetchInvites = () => {
        void connection(Collections.INVITES)
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
        void connection(Collections.INVITES)
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
        void connection(Collections.USERS)
            .doc(user?.id)
            .update({
                memberOf: [...user?.memberOf ?? [], invite.campfire ],
            })
            .then(() => {
                deleteInvite(invite.id)
            })
    }

    return (
        <SafeAreaView>
            <View>
                <Header
                    leftNode={
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
                                        style={styles.button}
                                    />
                                    <Button
                                        label="✔"
                                        onPress={handleInviteAccept(invite)}
                                        style={styles.button}
                                        variant="secondary"
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
