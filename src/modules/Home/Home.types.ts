import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import type { RouteProp } from '@react-navigation/native'

export type CampfireType = {
    id: string
    createdAt: Date
    emoji: string
    name: string
    author: {
        id: string
        name: string
    }
}

