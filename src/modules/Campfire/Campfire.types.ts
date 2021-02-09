import type { RouteProp } from '@react-navigation/native'

import type { RootStackParamList } from '../../Navigators/HomeNavigator'

type CampfireScreenRouteProp = RouteProp<RootStackParamList, 'Campfire'>

export type CampfireProps = {
    route: CampfireScreenRouteProp
}

export type CampfireType = {
    id: string
    createdAt: string
    emoji: string
    name: string
    author: {
        id: string
        name: string
    }
}

export type LogType = {
    metadata: {
        author: {
            id: string
            name: string
        }
        campfire: {
            id: string
        }
    }
    postDate: string
    id: string
    link: string
    description: string
}

