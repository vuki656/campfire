import * as React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components/Header'
import { Collections } from '../../lib/Collections'
import { connection } from '../../lib/connection'
import { useCurrentUser } from '../../lib/getCurrentUser'
import theme from '../../lib/variables/theme'
import type { CampfireType } from '../Campfire'
import type { UserType } from '../Login/Login.types'

import { HomeCampfireGroup } from './HomeCampfireGroup'
import { HomeNewCampfireDialog } from './HomeNewCampfireDialog'

const styles = StyleSheet.create({
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
        borderColor: theme.color.black,
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
        fontFamily: theme.fontFamily.MPLUS,
    },
})

export const Home = () => {
    const [ownedCampfires, setOwnedCampfires] = React.useState<CampfireType[]>([])
    const [joinedCampfires, setJoinedCampfires] = React.useState<CampfireType[]>([])

    const user = useCurrentUser()

    const fetchOwnedCampfires = () => {
        void connection(Collections.CAMPFIRES)
            .where('author.id', '==', user?.id)
            .get()
            .then((results) => {
                const fetchedCampfires: CampfireType[] = []

                results.forEach((result) => {
                    const fetchedCampfire = result.data() as CampfireType

                    fetchedCampfires.push(fetchedCampfire)
                })

                setOwnedCampfires(fetchedCampfires)
            })
    }

    const fetchJoinedCampfires = () => {
        void connection(Collections.USERS)
            .doc(user?.id)
            .get()
            .then((result) => {
                const fetchedUser = result.data() as UserType

                setJoinedCampfires(fetchedUser.memberOf)
            })
    }

    React.useEffect(() => {
        fetchOwnedCampfires()
        fetchJoinedCampfires()
    }, [])

    return (
        <SafeAreaView>
            <View>
                <Header
                    leftNode={(
                        <Image
                            resizeMode="contain"
                            source={require('../../../assets/screens/home/top-logo.png')}
                            style={styles.headerImage}
                        />
                    )}
                />
                <View style={styles.topContainer}>
                    <HomeNewCampfireDialog />
                    {user?.name ? (
                        <View style={styles.userInfo}>
                            <Text style={styles.username}>
                                {user?.name}
                            </Text>
                            <Image
                                source={{ uri: user?.imageURL ?? '' }}
                                style={styles.userImage}
                            />
                        </View>
                    ) : null}
                </View>
                <HomeCampfireGroup
                    campfires={ownedCampfires}
                    title="Your Campfires"
                />
                <HomeCampfireGroup
                    campfires={joinedCampfires}
                    title="Joined Campfires"
                />
            </View>
        </SafeAreaView>
    )
}

