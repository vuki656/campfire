import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../components/Button'

import type { CampfireProps } from './Campfire.types'
import { CampfireAddDialog } from './CampfireAddDialog/CampfireAddDialog'

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: 'white',
        height: 30,
        width: 100,
    },
    headerBar: {
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 6,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            height: 3,
            width: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        width: '100%',
    },
    headerEmoji: {
        fontSize: 20,
        marginRight: 10,
    },
    headerTitle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerTitleText: {
        fontFamily: 'MPlus',
        fontSize: 20,
    },
    root: {
        padding: 10,
    },
    safeAreaView: {
        height: '100%',
    },
})

export const Campfire = (props: CampfireProps) => {
    const { route } = props

    const navigator = useNavigation()

    const handleBack = () => {
        navigator.goBack()
    }

    const {
        name,
        id,
        emoji,
    } = route.params.campfire

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.headerBar}>
                <Button
                    label="Back"
                    onPress={handleBack}
                    style={styles.backButton}
                />
                <View style={styles.headerTitle}>
                    <Text style={styles.headerEmoji}>
                        {emoji}
                    </Text>
                    <Text style={styles.headerTitleText}>
                        {name}
                    </Text>
                </View>
            </View>
            <View style={styles.root}>
                <ScrollView>
                    <Text>
                        Hello
                    </Text>
                    <Text>
                        Hello
                    </Text>
                    <Text>
                        Hello
                    </Text>
                    <Text>
                        Hello
                    </Text>
                    <Text>
                        Hello
                    </Text>
                    <Text>
                        Hello
                    </Text>
                </ScrollView>
            </View>
            <CampfireAddDialog id={id} />
        </SafeAreaView>
    )
}
