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
    let renderComponent = <Login />

    firebase.auth().onAuthStateChanged((user) => {
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
