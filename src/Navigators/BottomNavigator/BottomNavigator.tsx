import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import {
    Image,
    StyleSheet,
} from 'react-native'

import theme from '../../lib/variables/theme'
import { Invites } from '../../modules/Invites'
import { Settings } from '../../modules/Settings'
import { HomeNavigator } from '../HomeNavigator'

const styles = StyleSheet.create({
    tabIcon: {
        height: 35,
        width: 35,
    },
})

enum Tabs {
    HOME = 'HOME',
    SETTINGS = 'SETTINGS',
    INVITES = 'INVITES'
}

const Tab = createBottomTabNavigator()

export const BottomNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={Tabs.HOME}
                screenOptions={(props) => ({
                    tabBarIcon: () => {
                        switch (props.route.name) {
                            case Tabs.HOME: {
                                return (
                                    <Image
                                        source={require('../../../assets/screens/global/logs.png')}
                                        style={styles.tabIcon}
                                    />
                                )
                            }
                            case Tabs.INVITES: {
                                return (
                                    <Image
                                        source={require('../../../assets/screens/global/email.png')}
                                        style={styles.tabIcon}
                                    />
                                )
                            }
                            case Tabs.SETTINGS: {
                                return (
                                    <Image
                                        source={require('../../../assets/screens/global/axe.png')}
                                        style={styles.tabIcon}
                                    />
                                )
                            }
                        }
                    },
                })}
                tabBarOptions={{
                    activeTintColor: theme.color.black,
                    inactiveTintColor: theme.color.gray500,
                    labelStyle: {
                        fontFamily: theme.fontFamily.mPlus,
                    },
                    style: {
                        height: 70,
                    },
                    tabStyle: {
                        paddingVertical: 10,
                    },
                }}
            >
                <Tab.Screen
                    component={HomeNavigator}
                    name={Tabs.HOME}
                />
                <Tab.Screen
                    component={Invites}
                    name={Tabs.INVITES}
                />
                <Tab.Screen
                    component={Settings}
                    name={Tabs.SETTINGS}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
