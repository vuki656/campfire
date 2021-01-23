import 'firebase/firestore'
import React from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { initializeFirebase } from './src/lib/initializeFirebase'
import { useFontsInitialization } from './src/lib/useFontsInitialization'
import { useUserAuthentication } from './src/lib/useUserAuthentication'
import { Login } from './src/modules/Login'
import { RootScreen } from './src/Screens'

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

initializeFirebase()

export default function App() {
    const isUserAuthenticated = useUserAuthentication()
    const fontsLoaded = useFontsInitialization()

    if (!fontsLoaded) {
        return null
    }

    return (
        <SafeAreaProvider>
            {isUserAuthenticated ? <RootScreen /> : <Login />}
        </SafeAreaProvider>
    )
}
