import { useFonts } from 'expo-font'
import * as firebase from 'firebase'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { firebaseConfig } from './firebaseconfig'
import { Home } from './src/modules/Home'
import { Login } from './src/modules/Login'

if (firebase.apps.length) {
    firebase.app()
} else {
    firebase.initializeApp(firebaseConfig)
}

export default function App() {
    const [loaded] = useFonts({
        MPlus: require('./assets/fonts/MPlus-Bold.ttf'),
    })

    if (!loaded) {
        return null
    }

    let renderComponent = <Login />

    firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (user) {
                renderComponent = <Home />
            }
        })

    return (
        <SafeAreaProvider>
            {renderComponent}
        </SafeAreaProvider>
    )
}
