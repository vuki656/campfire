import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { initializeFirebase } from './src/lib/initializeFirebase'
import { useFontsInitialization } from './src/lib/useFontsInitialization'
import { useUserAuthentication } from './src/lib/useUserAuthentication'
import { Home } from './src/modules/Home'
import { Login } from './src/modules/Login'

initializeFirebase()

export default function App() {
    const isUserAuthenticated = useUserAuthentication()
    const loaded = useFontsInitialization()

    if (!loaded) {
        return null
    }

    return (
        <SafeAreaProvider>
            {isUserAuthenticated ? <Home /> : <Login />}
        </SafeAreaProvider>
    )
}
