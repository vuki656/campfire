import * as firebase from 'firebase'
import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    Button,
    Header,
    HeaderTitle,
} from '../../components'

const styles = StyleSheet.create({
    root: {
        padding: 20,
    },
})

export const Settings = () => {
    const handleLogout = () => {
        void firebase.auth().signOut()
    }

    return (
        <SafeAreaView>
            <Header
                leftNode={
                    <HeaderTitle title="Settings" />
                }
            />
            <View style={styles.root}>
                <Button
                    label="Logout"
                    onPress={handleLogout}
                />
            </View>
        </SafeAreaView>
    )
}
