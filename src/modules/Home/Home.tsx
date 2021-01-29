import * as React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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

    React.useEffect(() => {
        fetchOwnedCampfires()
    }, [])

    return (
        <SafeAreaView>
            <View>
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
                    {user?.name ? (
                        <View style={styles.userInfo}>
                            <Text style={styles.username}>
                                {user?.name}
                            </Text>
                            <UserImage url={user?.imageURL ?? ''} />
                        </View>
                    ) : null}
                </View>
                <HomeCampfireGroup
                    campfires={ownedCampfires}
                    title="Your Campfires"
                />
                <HomeCampfireGroup
                    campfires={user.memberOf}
                    title="Joined Campfires"
                />
            </View>
        </SafeAreaView>
    )
}

