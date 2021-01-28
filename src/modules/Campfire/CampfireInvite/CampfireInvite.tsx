import { useNavigation } from '@react-navigation/native'
import cuid from 'cuid'
import * as React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    Button,
    Header,
    HeaderTitle,
    UserImage,
} from '../../../components'
import {
    Collections,
    connection,
    useCurrentUser,
} from '../../../lib'
import theme from '../../../lib/variables/theme'
import type { UserType } from '../../Login'

import type { CampfireInviteProps } from './CampfireInvite.types'

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: theme.color.white,
        height: 30,
        width: 120,
    },
    backButton: {
        backgroundColor: theme.color.white,
        height: 30,
        width: 100,
    },
    list: {
        padding: 20,
    },
    safeAreaView: {
        height: '100%',
    },
    userContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userInfo: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    username: {
        fontFamily: theme.fontFamily.mPlus,
        marginLeft: 20,
    },
})

export const CampfireInvite = (props: CampfireInviteProps) => {
    const { route } = props

    const navigator = useNavigation()
    const currentUser = useCurrentUser()

    const [users, setUsers] = React.useState<UserType[]>([])

    const {
        emoji,
        name,
        id,
        author,
    } = route.params.campfire

    const fetchUsers = () => {
        void connection(Collections.USERS)
            .get()
            .then((results) => {
                const fetchedUsers: UserType[] = []

                results.forEach((result) => {
                    const fetchedUser = result.data() as UserType

                    fetchedUsers.push(fetchedUser)
                })

                setUsers(fetchedUsers)
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

        void connection(Collections.INVITES)
            .doc(newId)
            .set({
                campfire: {
                    author: author,
                    emoji: emoji,
                    id: id,
                    name: name,
                },
                from: {
                    id: currentUser?.id,
                    name: currentUser?.name,
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
            <Header
                leftNode={(
                    <Button
                        label="Back"
                        onPress={handleBack}
                        style={styles.backButton}
                    />
                )}
                rightNode={(
                    <HeaderTitle title="Invite" />
                )}
            />
            <View style={styles.list}>
                <ScrollView>
                    {users.map((user) => {
                        if (user.id === currentUser?.id) {
                            return null
                        }

                        return (
                            <View
                                key={user.id}
                                style={styles.userContainer}
                            >
                                <View style={styles.userInfo}>
                                    <UserImage url={user?.imageURL ?? ''} />
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
