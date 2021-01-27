import { useNavigation } from '@react-navigation/native'
import cuid from 'cuid'
import firebase from 'firebase'
import * as React from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../../components/Button'
import { Collections } from '../../../lib/Collections'
import { getCurrentUser } from '../../../lib/getCurrentUser'
import type { UserType } from '../../Login/Login.types'

import type { CampfireInviteProps } from './CampfireInvite.types'

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: 'white',
        height: 30,
        width: 120,
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
    headerTitle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerTitleText: {
        fontFamily: 'MPlus',
        fontSize: 20,
    },
    root: {
        padding: 20,
    },
    safeAreaView: {
        height: '100%',
    },
    user: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userImage: {
        borderColor: 'black',
        borderRadius: 100,
        borderWidth: 4,
        height: 40,
        width: 40,
    },
    userInfo: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    username: {
        fontFamily: 'MPlus',
        marginLeft: 20,
    },
})

export const CampfireInvite = (props: CampfireInviteProps) => {
    const { route } = props

    const navigator = useNavigation()
    const currentUser = getCurrentUser()

    const [users, setUsers] = React.useState<UserType[]>([])

    const {
        emoji,
        name,
        id,
        author,
    } = route.params.campfire

    const fetchUsers = () => {
        void firebase
            .firestore()
            .collection(Collections.USERS)
            .get()
            .then((result) => {
                setUsers([])

                result.forEach((singleResult) => {
                    const log = singleResult.data() as UserType

                    setUsers((currentUsers) => {
                        return [...currentUsers, log]
                    })
                })
            })
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])

    const handleBack = () => {
        navigator.goBack()
    }

    const handleInvite = (targetUser: UserType) => () => {
        const newId = cuid()

        void firebase
            .firestore()
            .collection(Collections.INVITES)
            .doc(newId)
            .set({
                campfire: {
                    author: author,
                    emoji: emoji,
                    id: id,
                    name: name,
                },
                from: {
                    id: currentUser?.uid,
                    name: currentUser?.displayName,
                },
                id: newId,
                to: {
                    id: targetUser.id,
                    name: targetUser.name,
                },

            })
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.headerBar}>
                <Button
                    label="Back"
                    onPress={handleBack}
                    style={styles.backButton}
                />
                <View style={styles.headerTitle}>
                    <Text style={styles.headerTitleText}>
                        Invite
                    </Text>
                </View>
            </View>
            <View style={styles.root}>
                <ScrollView>
                    {users.map((user) => {
                        if (user.id === currentUser?.uid) {
                            return
                        }

                        return (
                            <View
                                key={user.id}
                                style={styles.user}
                            >
                                <View style={styles.userInfo}>
                                    <Image
                                        source={{ uri: user?.imageURL ?? '' }}
                                        style={styles.userImage}
                                    />
                                    <Text style={styles.username}>
                                        {user?.name}
                                    </Text>
                                </View>
                                <Button
                                    label="Invite"
                                    onPress={handleInvite(user)}
                                    style={styles.addButton}
                                />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
