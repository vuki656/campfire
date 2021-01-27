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

import { Collections } from '../../lib/Collections'
import { getCurrentUser } from '../../lib/getCurrentUser'
import type { CampfireType } from '../Campfire'
import type { UserType } from '../Login/Login.types'

import { HomeCampfireCard } from './HomeCampfireCard'
import { HomeNewCampfireDialog } from './HomeNewCampfireDialog'

const styles = StyleSheet.create({
    campfireGroupContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    campfireGroupContainerList: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    campfireGroupContainerTitle: {
        fontFamily: 'MPlus',
        fontSize: 30,
        marginBottom: 20,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        elevation: 6,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            height: 3,
            width: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    headerImage: {
        height: 40,
        width: 120,
    },
    topContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    userImage: {
        borderColor: 'black',
        borderRadius: 100,
        borderWidth: 4,
        height: 40,
        marginLeft: 20,
        width: 40,
    },
    userInfo: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    username: {
        fontFamily: 'MPlus',
    },
})

export const Home = () => {
    const [ownedCampfires, setOwnedCampfires] = React.useState<CampfireType[]>([])
    const [joinedCampfires, setJoinedCampfires] = React.useState<CampfireType[]>([])

    const user = getCurrentUser()

    const fetchOwnedCampfires = () => {
        void firebase
            .firestore()
            .collection(Collections.CAMPFIRES)
            .where('author.id', '==', user?.uid)
            .get()
            .then((result) => {
                result.forEach((singleResult) => {
                    const ownedCampfire = singleResult.data() as CampfireType

                    setOwnedCampfires((currentOwnedCampfire) => {
                        return [...currentOwnedCampfire, ownedCampfire]
                    })
                })
            })
    }

    const fetchJoinedCampfires = () => {
        void firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(user?.uid)
            .get()
            .then((result) => {
                const fetchedUser = result.data() as UserType

                setJoinedCampfires(fetchedUser.memberOf)
            })
    }

    // TODO: FIX DUPS
    const registerCampfireListener = () => {
        firebase
            .firestore()
            .collection(Collections.CAMPFIRES)
            .onSnapshot(() => {
                setOwnedCampfires([])

                fetchOwnedCampfires()
            })

        firebase
            .firestore()
            .collection(Collections.USERS)
            .onSnapshot(() => {
                setJoinedCampfires([])

                fetchJoinedCampfires()
            })
    }

    React.useEffect(() => {
        registerCampfireListener()
    }, [])

    return (
        <SafeAreaView>
            <View>
                <View style={styles.headerContainer}>
                    <Image
                        resizeMode="contain"
                        source={require('../../../assets/screens/home/top-logo.png')}
                        style={styles.headerImage}
                    />
                </View>
                <View style={styles.topContainer}>
                    <HomeNewCampfireDialog />
                    {user?.displayName ? (
                        <View style={styles.userInfo}>
                            <Text style={styles.username}>
                                {user?.displayName}
                            </Text>
                            <Image
                                source={{ uri: user?.photoURL ?? '' }}
                                style={styles.userImage}
                            />
                        </View>
                    ) : null}
                </View>
                <View style={styles.campfireGroupContainer}>
                    <Text style={styles.campfireGroupContainerTitle}>
                        Your Campfires
                    </Text>
                    <View style={styles.campfireGroupContainerList}>
                        {ownedCampfires.map((campfire) => {
                            return (
                                <HomeCampfireCard
                                    campfire={campfire}
                                    key={campfire.id}
                                />
                            )
                        })}
                    </View>
                </View>
                <View style={styles.campfireGroupContainer}>
                    <Text style={styles.campfireGroupContainerTitle}>
                        Joined Campfires
                    </Text>
                    <View style={styles.campfireGroupContainerList}>
                        {joinedCampfires.map((campfire) => {
                            return (
                                <HomeCampfireCard
                                    campfire={campfire}
                                    key={campfire.id}
                                />
                            )
                        })}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

