import * as firebase from 'firebase'
import * as React from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
})

export const Settings = () => {
    const logout = () => {
        void firebase.auth().signOut()
    }

    return (
        <View style={styles.root}>
            <Button
                onPress={logout}
                title="Logout"
            />
            <Text>
                Settings
            </Text>
        </View>
    )
}
