import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import { Campfire } from '../../modules/Campfire'
import { CampfireInvite } from '../../modules/Campfire/CampfireInvite'
import { Home } from '../../modules/Home'

import type { RootStackParamList as RootStackParameterList } from './HomeNavigator.types'

const Stack = createStackNavigator<RootStackParameterList>()

export const HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                component={Campfire}
                name="Campfire"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                component={Home}
                name="Home"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                component={CampfireInvite}
                name="CampfireInvite"
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
