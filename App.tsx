import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { initializeFirebase } from './src/lib/initializeFirebase'
import { useFontsInitialization } from './src/lib/useFontsInitialization'
import { useUserAuthentication } from './src/lib/useUserAuthentication'
import { Login } from './src/modules/Login'
import { Root } from './src/modules/Root'

initializeFirebase()

export default function App() {
    const isUserAuthenticated = useUserAuthentication()
    const fontsLoaded = useFontsInitialization()

    if (!fontsLoaded) {
        return null
    }

    return (
        <SafeAreaProvider>
            {isUserAuthenticated ? <Root /> : <Login />}
        </SafeAreaProvider>
    )
}
