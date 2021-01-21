import * as React from 'react'
import {
    Image,
    StyleSheet,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
})

export const Login = () => {

    return (
        <View style={styles.root}>
            <Image source={require('../../../assets/campfire.png')} />
        </View>
    )
}
