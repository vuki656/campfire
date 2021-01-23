import * as React from 'react'
import {
    Button,
    Text,
    View,
} from 'react-native'

export const Campfire = () => {

    const handlePress = () => {
        console.log('campfire screen')
    }

    return (
        <View>
            <Text>
                Single
            </Text>
            <View style={{ marginTop: 50 }}>
                <Button
                    onPress={handlePress}
                    title="Press me"
                />
            </View>
        </View>
    )
}
