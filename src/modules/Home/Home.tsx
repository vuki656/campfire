import * as firebase from 'firebase'
import * as React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HomeNewCampfireDialog } from './HomeNewCampfireDialog'

const styles = StyleSheet.create({
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

    const user = firebase.auth().currentUser

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
            </View>
        </SafeAreaView>
    )
}
