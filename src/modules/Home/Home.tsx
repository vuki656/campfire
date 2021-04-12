import * as React from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import {
    Header,
    UserImage,
} from '../../components'
import {
    Collections,
    connection,
    useCurrentUser,
} from '../../lib'
import theme from '../../lib/variables/theme'
import type { CampfireType } from '../Campfire'

import { HomeCampfireGroup } from './HomeCampfireGroup'
import { HomeNewCampfireDialog } from './HomeNewCampfireDialog'

const styles = StyleSheet.create({
    headerContainer: {
        height: '20%',
    },
    listContainer: {
        height: '80%',
        marginTop: 30,
    },
    logo: {
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
    userInfo: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    username: {
        fontFamily: theme.fontFamily.mPlus,
        marginRight: 10,
    },
})

export const Home = () => {
    const [ownedCampfires, setOwnedCampfires] = React.useState<CampfireType[]>([])
    const [joinedCampfires, setJoinedCampfires] = React.useState<CampfireType[]>([])

    const user = useCurrentUser()

    const fetchOwnedCampfires = () => {
        void connection(Collections.CAMPFIRES)
            .where('author.id', '==', user?.id)
            .onSnapshot((results) => {
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
            .where('id', '==', user?.id)
            .onSnapshot((results) => {
                let fetchedCampfires: CampfireType[] = []

                results.forEach((result) => {
                    fetchedCampfires = result.data().memberOf as CampfireType[] ?? []
                })

                setJoinedCampfires(fetchedCampfires)
            })
    }

    React.useEffect(() => {
        fetchOwnedCampfires()
        fetchJoinedCampfires()
    }, [user])

    return (
        <View>
            <View style={styles.headerContainer}>
                <Header
                    leftNode={(
                        <Image
                            resizeMode="contain"
                            source={require('../../../assets/screens/home/top-logo.png')}
                            style={styles.logo}
                        />
                    )}
                />
                <View style={styles.topContainer}>
                    <HomeNewCampfireDialog />
                    {user?.name
                        ? (
                            <View style={styles.userInfo}>
                                <Text style={styles.username}>
                                    {user?.name}
                                </Text>
                                <UserImage url={user?.imageURL ?? ''} />
                            </View>
                        )
                        : null}
                </View>
            </View>
            <View style={styles.listContainer}>
                <ScrollView>
                    <HomeCampfireGroup
                        campfires={ownedCampfires}
                        title="Your Campfires"
                    />
                    <HomeCampfireGroup
                        campfires={joinedCampfires}
                        title="Joined Campfires"
                    />
                </ScrollView>
            </View>
        </View>
    )
}
