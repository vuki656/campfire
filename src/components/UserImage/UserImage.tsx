import * as React from 'react'
import {
    Image,
    StyleSheet,
} from 'react-native'

import theme from '../../lib/variables/theme'

import type { UserImageProps } from './UserImage.types'

const styles = StyleSheet.create({
    userImage: {
        borderColor: theme.color.black,
        borderRadius: 100,
        borderWidth: 4,
        height: 40,
        width: 40,
    },
})

export const UserImage = (props: UserImageProps) => {
    const { url } = props

    return (
        <Image
            source={{ uri: url }}
            style={styles.userImage}
        />
    )
}
