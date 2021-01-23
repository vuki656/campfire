import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import { Campfire } from '../modules/Campfire'
import { Home } from '../modules/Home'

const Stack = createStackNavigator()

export const HomeScreen = () => {

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                component={Campfire}
                name="Campfire"
            />
            <Stack.Screen
                component={Home}
                name="Home"
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
