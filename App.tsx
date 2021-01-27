import 'firebase/firestore'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { initializeErrorSuppression } from './src/lib/initializeErrorSuppression'
import { initializeFirebase } from './src/lib/initializeFirebase'
import { useFontsInitialization } from './src/lib/useFontsInitialization'
import { useUserAuthentication } from './src/lib/useUserAuthentication'
import { Login } from './src/modules/Login'
import { BottomNavigator } from './src/Navigators'

initializeErrorSuppression()
initializeFirebase()

export default function App() {
    const isUserAuthenticated = useUserAuthentication()
    const fontsLoaded = useFontsInitialization()

    if (!fontsLoaded) {
        return null
    }

    return (
        <SafeAreaProvider>
            {isUserAuthenticated ? <BottomNavigator /> : <Login />}
        </SafeAreaProvider>
    )
}
