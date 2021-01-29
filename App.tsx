import 'firebase/firestore'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
    initializeErrorSuppression,
    initializeFirebase,
    useFontsInitialization,
    useUserAuthentication,
} from './src/lib'
import { Login } from './src/modules/Login'
import { BottomNavigator } from './src/Navigators'

initializeErrorSuppression()
initializeFirebase()

export default function App() {
    const isUserAuthenticated = useUserAuthentication()
    const fontsLoaded = useFontsInitialization()

    if (!fontsLoaded || typeof isUserAuthenticated === 'undefined') {
        return null
    }

    return (
        <SafeAreaProvider>
            {isUserAuthenticated ? <BottomNavigator /> : <Login />}
        </SafeAreaProvider>
    )
}
