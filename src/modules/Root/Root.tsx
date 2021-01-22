import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import {
    Image,
    StyleSheet,
} from 'react-native'

import { Home } from '../Home'
import { Settings } from '../Settings'

const styles = StyleSheet.create({
    tabIcon: {
        height: 35,
        width: 35,
    },
})

enum Tabs {
    HOME = 'HOME',
    SETTINGS = 'SETTINGS'
}

const Tab = createBottomTabNavigator()

export const Root = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={(props) => ({
                    tabBarIcon: () => {
                        switch (props.route.name) {
                            case Tabs.HOME:
                                return (
                                    <Image
                                        source={require('../../../assets/screens/global/logs.png')}
                                        style={styles.tabIcon}
                                    />
                                )
                            case Tabs.SETTINGS:
                                return (
                                    <Image
                                        source={require('../../../assets/screens/global/axe.png')}
                                        style={styles.tabIcon}
                                    />
                                )
                        }
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: '#cccccc',
                    labelStyle: {
                        fontFamily: 'MPlus',
                        paddingTop: 18,
                    },
                    style: {
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        height: 70,
                        padding: 20,
                    },
                }}
            >
                <Tab.Screen
                    component={Home}
                    name={Tabs.HOME}
                />
                <Tab.Screen
                    component={Settings}
                    name={Tabs.SETTINGS}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
